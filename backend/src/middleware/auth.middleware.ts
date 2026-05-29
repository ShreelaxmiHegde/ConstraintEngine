import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, tokenFromHeader] = authHeader.split(' ');
  const tokenFromCookie = req.cookies?.access_token;
  const token = scheme === 'Bearer' && tokenFromHeader ? tokenFromHeader : tokenFromCookie;

  if (scheme !== 'Bearer' || !token) throw new ExpressError("Missing or invalid authorization header", 401);
  if (!token) throw new ExpressError("Unauthorized", 401);
  if (!JWT_SECRET) throw new ExpressError("Missing JWT secret", 500);

  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;

  next();
}