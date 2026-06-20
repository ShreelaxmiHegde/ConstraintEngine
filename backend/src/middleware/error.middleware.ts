import type { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError.js";

export function errorHandler(
  err: ExpressError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {

  console.log(err)

  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    message: err.message || "Internal Server Error"
  });
}