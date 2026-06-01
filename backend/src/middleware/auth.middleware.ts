import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request } from "express";
import { ExpressError } from "../utils/ExpressError.js";
import { AuthPayload } from "../types/types.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req: Request, next: NextFunction) => {
  const token = req.cookies?.access_token;

  if (!token) throw new ExpressError("Unauthorized", 401);
  if (!JWT_SECRET) throw new ExpressError("Missing JWT secret", 500);

  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded as AuthPayload;

  next();
}