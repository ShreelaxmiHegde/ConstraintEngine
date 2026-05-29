import { Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ExpressError } from "./ExpressError.js";
import { UserBody } from "../types/types.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const ACCESS_TTL = '15m';
const REFRESH_TTL_SEC = 60 * 60 * 24 * 7; // 7days

export const sendToken = (res: Response, token: string) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
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

export const signRefreshToken = (user: UserBody) => {
  const payload = {
    userId: user.id
  }

  if (!JWT_REFRESH_TOKEN) throw new ExpressError("Missing refresh token", 500);

  const token = jwt.sign(
    payload,
    JWT_REFRESH_TOKEN,
    { expiresIn: REFRESH_TTL_SEC }
  );

  return token;
}

// export const persistRefreshToken = async ({ user, refreshToken, jti, ip, userAgent }) => {
//   const tokenHash = hashToken(refreshToken);
//   const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);
//   await RefreshToken.create({ user: user._id, tokenHash, jti, expiresAt, ip, userAgent });
// }

export const setRefreshCookie = (res: Response, refreshToken) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    path: '/api/auth/refresh',
    maxAge: REFRESH_TTL_SEC * 1000
  });
}