import { GoogleGenAI } from "@google/genai";
import { ProjectClassifierSchema, ProjectInputBody, PromptClassifierSchema, PromptInputBody } from "../schemas/classifier.schema.js";
import { NextFunction, Request, response, Response } from "express";
import "dotenv/config";
import { ExpressError } from "../utils/ExpressError.js";


const ai = new GoogleGenAI({});

export const projectIntentClassifier = async (req: Request<{}, {}, ProjectInputBody>, res: Response, next: NextFunction) => {
  const userInput = req.body.rawDescription;

  if ((typeof process.env.CLASSIFIER_MODEL) !== "string") throw new ExpressError("CLASSIFIER_MODEL specification error", 500);

  const interaction = await ai.interactions.create({
    model: process.env.CLASSIFIER_MODEL,
    input: [
      {
        role: "system",
        content: `
          You are an intent classifier.
          Determine whether the user's message is describing a software project that they want to build.
          Return JSON only.

          Rules:
          - Greetings -> false
          - General questions -> false
          - Casual conversation -> false
          - Random text -> false
          - Software project descriptions -> true
        `
      },
      {
        role: "user",
        content: userInput
      }
    ],
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: ProjectClassifierSchema
    }
  });

  if (!interaction.output_text) throw new ExpressError("Classifier returned no result", 500);

  const result = ProjectClassifierSchema.parse(JSON.parse(interaction.output_text));

  if (!result.inDomain) {
    return res.status(422).json({
      success: false,
      message: "Please describe the software application or product you'd like to build."
    });
  }

  next();
}


export const promptIntentClassifier = async (req: Request<{}, {}, PromptInputBody>, res: Response, next: NextFunction) => {
  const prompt = req.body.prompt;

  if ((typeof process.env.CLASSIFIER_MODEL) !== "string") throw new ExpressError("CLASSIFIER_MODEL specification error", 500);

  const interaction = await ai.interactions.create({
    model: process.env.CLASSIFIER_MODEL,
    input: [
      {
        role: "system",
        content: `
          You are an intent classifier.
          Determine whether the user's message is describing a software project that they want to build.
          Return JSON only.

          Rules:
          - Greetings -> false
          - General questions -> false
          - Casual conversation -> false
          - Random text -> false
          - Software project descriptions -> true
        `
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: PromptClassifierSchema
    }
  });

  if (!interaction.output_text) throw new ExpressError("Classifier returned no result", 500);

  const result = PromptClassifierSchema.parse(JSON.parse(interaction.output_text));

  if (result.intent === "acknowledgement") {
    return res.status(201).json({
      response: ""
    });
  }

  if (result.intent === "gratitude") {
    return res.status(201).json({
      response: "Glad to hear that."
    })
  }

  next();
}