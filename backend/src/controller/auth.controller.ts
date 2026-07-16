import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/types.js";
import { SignUpBody, LoginBody } from "../schemas/auth.schema.js";
import * as user from "../services/user.service.js";
import { ExpressError } from "../utils/ExpressError.js";
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from "../constants.js";
import {
  createJwtId,
  hashToken,
  persistRefreshToken,
  rotateRefreshToken,
  setAccessCookie,
  setRefreshCookie,
  signAccessToken,
  signRefreshToken
} from "../utils/token.js";
import * as refreshSession from "../services/auth.service.js";


export const signUp = async (req: Request<{}, {}, SignUpBody>, res: Response) => {
  const { username, email, password, guestId } = req.body;

  const userExist = await user.findByEmail(email);
  if (userExist) throw new ExpressError("An account with this email already exist", 409);

  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  let userData;

  if (guestId) {
    userData = await user.convertToUser(guestId, username, email, password);
  } else {
    userData = await user.create(username, email, passwordHash);
  }

  // auto-login
  const accessToken = signAccessToken(userData);
  const jwtId = createJwtId();
  const refreshToken = signRefreshToken(userData.id, jwtId);

  await persistRefreshToken(
    userData.id,
    refreshToken,
    jwtId,
    req.ip ?? "",
    req.headers['user-agent'] || ''
  );

  setAccessCookie(res, accessToken);
  setRefreshCookie(res, refreshToken);

  return res.status(200).json({
    message: "User registered successfully",
    user: {
      username: userData.username,
      email: userData.email
    }
  });
}

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  console.log("Login Request: ", req.body);
  const { email, password } = req.body;

  const userData = await user.findByEmail(email);
  if (!userData) throw new ExpressError("User not found!", 404)

  const isMatch = bcrypt.compareSync(password, userData?.passwordHash);
  if (!isMatch) throw new ExpressError("Invalid credentials", 401);

  const accessToken = signAccessToken(userData);
  const jwtId = createJwtId();
  const refreshToken = signRefreshToken(userData.id, jwtId);

  await persistRefreshToken(
    userData.id,
    refreshToken,
    jwtId,
    req.ip ?? "",
    req.headers['user-agent'] || ''
  );

  setAccessCookie(res, accessToken);
  setRefreshCookie(res, refreshToken);

  return res.status(200).json({
    success: true,
    message: "Login was successful",
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email
    }
  });
}

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies?.refresh_token;
  if (!token) throw new ExpressError("No refresh token", 401);

  if (!REFRESH_TOKEN_SECRET) throw new ExpressError("Missing REFRESH_TOKEN_SECRET", 500);

  // decode refresh token
  let decoded;
  try {
    decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

    if (typeof decoded === "string") {
      throw new ExpressError("Invalid token payload", 401);
    }

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ExpressError(error.message, 401);
    } else if (error instanceof Error) {
      throw new ExpressError("Invalid token", 401);
    } else {
      throw new ExpressError("Invalid token", 401);
    }
  }

  const tokenHash = hashToken(token);
  const jwtId = decoded.jwtId;

  const session = await refreshSession.findByTokenAndJti(tokenHash, jwtId);

  if (!session) throw new ExpressError("Refresh token not recognized", 401);
  if (session.revokedAt) throw new ExpressError("Refresh token revoked", 401);
  if (session.expiresAt < new Date()) throw new ExpressError("Refresh token expired", 401);

  const result = await rotateRefreshToken(session.id, session.userId, req, res);

  setAccessCookie(res, result.accessToken);

  return res.json({
    success: true
  });
}

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies?.refresh_token;

  if (token) {
    const tokenHash = hashToken(token);

    const session = await refreshSession.findByTokenHash(tokenHash);

    if (session && !session.revokedAt) {
      await refreshSession.revoke(session.id);
    }

    res.clearCookie('refresh_token', { path: '/auth/' });

    return res.json({
      success: true
    });
  }

  return res.json({
    success: false
  });
}

export const getMe = async (req: Request, res: Response) => {
  const token = req.cookies?.access_token;

  if (!token) throw new ExpressError("Access token not found", 401);

  if (!JWT_SECRET) throw new ExpressError("Missing JWT_SECTRET", 500);
  const decoded = jwt.verify(token, JWT_SECRET);
  const decodedUser = decoded as AuthPayload;
  const userData = await user.findById(decodedUser.userId);

  return res.json({
    user: {
      userId: userData.id,
      username: userData.username,
      email: userData.email,
    }
  });
}