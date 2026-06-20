import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError.js";
import { AuthPayload } from "../types/types.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;

  if (!token) throw new ExpressError("Unauthorized", 401);
  if (!JWT_SECRET) throw new ExpressError("Missing JWT secret", 500);

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      console.log("ERROR LOG: Invalid token payload");
      throw new ExpressError("Unauthorized access", 401);
    }

    req.user = decoded as AuthPayload;

  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.log(`ERROR LOG: ${error.message}`, error);
      throw new ExpressError("Unauthorized access", 401);
    }
    console.log("ERROR LOG: Invalid token", error);
    throw new ExpressError("Unauthorized access", 401);
  }

  next();
}