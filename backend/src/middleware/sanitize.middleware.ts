import { NextFunction, Request, Response } from "express";
import { validateCode } from "../utils/sanitizer/validateCode.js";
import { validateLength, validateWordCount } from "../utils/sanitizer/validateLength.js";
import { ProjectInputBody, PromptInputBody } from "../schemas/classifier.schema.js";


function normalize(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[.,!?]/g, "");
}

export const sanitizeProjectInput = (req: Request<{}, {}, ProjectInputBody>, res: Response, next: NextFunction) => {
  const inputText = req.body.rawDescription;

  let result = validateLength(normalize(inputText), 20, 5000);
  if (!result.passed) return res.status(400).json(result);

  result = validateWordCount(normalize(inputText), 10, 10);
  if (!result.passed) return res.status(400).json(result);

  result = validateCode(normalize(inputText));
  if (!result.passed) return res.status(400).json(result);

  next();
}

export const sanitizePromptInput = (req: Request<{}, {}, PromptInputBody>, res: Response, next: NextFunction) => {
  const prompt = req.body.prompt;

  let result = validateLength(normalize(prompt), 1, 300);
  if (!result.passed) return res.status(400).json(result);

  result = validateWordCount(normalize(prompt), 10, 300);
  if (!result.passed) return res.status(400).json(result);

  result = validateCode(normalize(prompt));
  if (!result.passed) return res.status(400).json(result);

  next();
}