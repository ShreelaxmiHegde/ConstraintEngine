import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "./ExpressError.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) throw new ExpressError("Unauthorized", 401);
  if (!JWT_SECRET) throw new ExpressError("Missing JWT secret", 500);

  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;

  next();
}