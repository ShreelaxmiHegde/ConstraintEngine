import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError.js";
import { verifyToken } from "../utils/token.js";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;
  if (!token) throw new ExpressError("Unauthorized", 401);

  verifyToken(req, token);

  next();
}