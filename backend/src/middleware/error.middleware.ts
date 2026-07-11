import type { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError.js";

export function errorHandler(
  err: ExpressError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {

  console.log(err)
  if (err.name === "PrismaClientKnownRequestError") {
    err.message = "You provided invalid projectId";
  }

  if (err.name === "ZodError") {
    err.message = "Invalid request";
  }

  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    message: err.message || "Internal Server Error"
  });
}