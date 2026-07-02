import { NextFunction, Response, Request } from "express";
import { ExpressError } from "../utils/ExpressError.js";
import { rateLimiter } from "../utils/rateLimiter.js";


export const projectRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;

  // at most 2 projects a week
  const max_limit = 2;
  const max_window = 1000 * 60 * 60 * 24 * 7; // 1 week

  if (!ip) throw new ExpressError("Client not recognized", 404);

  const isExceeded = rateLimiter(ip, max_limit, max_window);

  if (isExceeded) {
    return res.status(429).json({
      message: "Rate limit exceeded. Try again later."
    });
  }

  next();
}

export const promptRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const { ip } = req;

  // at most 5 exchanges a day
  const max_limit = 5
  const max_window = 1000 * 60 * 60 * 24; // 1 day

  if (!ip) throw new ExpressError("Client not recognized", 404);

  const isExceeded = rateLimiter(ip, max_limit, max_window);

  if (isExceeded) {
    return res.status(429).json({
      response: "RATE_LIMIT_EXCEEDED",
      message: "Rate limit exceeded. Try again later."
    });
  }

  next();
}