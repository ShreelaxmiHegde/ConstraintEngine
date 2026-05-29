import type { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError.js";

export function errorHandler(
  err: ExpressError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err.message == "TokenExpiredError") err.message = "Access token expired";

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
}