import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";
import "dotenv/config";
import { ExpressError } from "./ExpressError.js";
import { UserBody } from "../types/types.js";
import prisma from "../lib/prisma.js";
import { findUserById } from "../services/user.service.js";
import {
  JWT_SECRET,
  ACCESS_TTL,
  REFRESH_TOKEN_SECRET,
  REFRESH_TTL_SEC,
  NODE_ENV
} from "../constants.js";
import { createRefreshToken } from "../services/auth.service.js";
import { RefreshToken } from "@prisma/client";


export const setAccessCookie = (res: Response, token: string) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite:
      NODE_ENV === "production"
        ? "none"
        : "strict",
    maxAge: 15 * 60 * 1000, // 15min
  });
}

export const hashToken = (token: string) => {
  return createHash('sha256').update(token).digest('hex');
}

export const createJwtId = () => {
  return randomBytes(16).toString("hex");
}

export const signAccessToken = (user: UserBody) => {
  if (!JWT_SECRET) throw new ExpressError("Missing JWT secret", 500);

  const payload = {
    userId: user.id,
    email: user.email
  }

  return jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: ACCESS_TTL }
  );
}

export const signRefreshToken = (userId: string, jwtId: string) => {
  const payload = { userId, jwtId }

  if (!REFRESH_TOKEN_SECRET) throw new ExpressError("Missing refresh token", 500);

  const token = jwt.sign(
    payload,
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TTL_SEC }
  );

  return token;
}

export const persistRefreshToken = async (
  userId: string,
  refreshToken: string,
  jwtId: string,
  ip: string,
  userAgent: string
) => {
  if (!REFRESH_TOKEN_SECRET) throw new ExpressError("Missing refresh token secret", 500);

  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);

  await createRefreshToken(userId, tokenHash, jwtId, ip, userAgent, expiresAt);
}

export const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite:
      NODE_ENV === "production"
        ? "none"
        : "strict",
    path: '/auth/',
    maxAge: REFRESH_TTL_SEC * 1000
  });
}

export const rotateRefreshToken = async (oldDoc: RefreshToken, userId: string, req: Request, res: Response) => {
  // revoke old
  const newJwtId = createJwtId();

  await prisma.refreshToken.update({
    where: { id: oldDoc.id },
    data: {
      revokedAt: new Date(),
      replacedBy: newJwtId
    }
  });

  const user = await findUserById(userId);

  // issue new
  const newAccess = signAccessToken(user);
  const newRefresh = signRefreshToken(user.id, newJwtId);

  await persistRefreshToken(
    user.id,
    newRefresh,
    newJwtId,
    req.ip ?? "",
    req.headers['user-agent'] || ''
  );

  setRefreshCookie(res, newRefresh);

  return { accessToken: newAccess };
}
