import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { AuthPayload, LoginBody, SignUpBody } from "../types/types.js";
import { checkExistingUser, checkUser, createUser, findUserById } from "../services/user.service.js";
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
import { findDoc, updateRevokedDoc, findDocWithTokenHashJwtId } from "../services/auth.service.js";


export const signUp = async (req: Request<{}, {}, SignUpBody>, res: Response) => {
  console.log("Signup Request: ", req.body);
  const { username, email, password } = req.body;

  await checkExistingUser(email);

  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  const registerUser = await createUser(username, email, passwordHash);

  return res.status(200).json({
    message: "User registered successfully",
    user: {
      username: registerUser.username,
      email: registerUser.email
    }
  });
}

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  console.log("Login Request: ", req.body);
  const { email, password } = req.body;

  const user = await checkUser(email);

  const isMatch = bcrypt.compareSync(password, user?.passwordHash);
  if (!isMatch) throw new ExpressError("Invalid credentials", 401);

  const accessToken = signAccessToken(user);
  const jwtId = createJwtId();
  const refreshToken = signRefreshToken(user.id, jwtId);

  await persistRefreshToken(
    user.id,
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
      id: user.id,
      username: user.username,
      email: user.email
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

  } catch (error: unknown) {
    if (error instanceof JsonWebTokenError) {
      throw new ExpressError(error.message, 401);
    }

    throw error;
  }

  const tokenHash = hashToken(token);
  const jwtId = decoded.jwtId;

  const doc = await findDocWithTokenHashJwtId(tokenHash, jwtId);

  if (!doc) throw new ExpressError("Refresh token not recognized", 401);
  if (doc.revokedAt) throw new ExpressError("Refresh token revoked", 401);
  if (doc.expiresAt < new Date()) throw new ExpressError("Refresh token expired", 401);

  const result = await rotateRefreshToken(doc, doc.userId, req, res);

  setAccessCookie(res, result.accessToken);

  return res.json({
    success: true
  });
}

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies?.refresh_token;

  if (token) {
    const tokenHash = hashToken(token);

    const doc = await findDoc(tokenHash);

    if (doc && !doc.revokedAt) {
      await updateRevokedDoc(doc);
    }

    res.clearCookie('refresh_token', { path: '/auth/refresh' });

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
  const user = await findUserById(decodedUser.userId);

  return res.json({
    user: {
      userId: user.id,
      username: user.username,
      email: user.email,
    }
  });
}