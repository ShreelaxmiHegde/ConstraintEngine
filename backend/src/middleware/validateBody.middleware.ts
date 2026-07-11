import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateBody =
  <T extends z.ZodType>(schema: T) =>
    (req: Request, res: Response, next: NextFunction) => {
      req.body = schema.parse(req.body);
      next();
    }