import { GoogleGenAI } from "@google/genai";
import { ProjectClassifierSchema, ProjectInputBody, PromptClassifierSchema, PromptInputBody } from "../schemas/classifier.schema.js";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { ExpressError } from "../utils/ExpressError.js";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const extractedJson = (text: string) => {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

export const projectIntentClassifier = async (req: Request<{}, {}, ProjectInputBody>, res: Response, next: NextFunction) => {
  const userInput = req.body.rawDescription;

  if ((typeof process.env.CLASSIFIER_MODEL) !== "string") throw new ExpressError("CLASSIFIER_MODEL specification error", 500);

  const interaction = await ai.interactions.create({
    model: process.env.CLASSIFIER_MODEL,
    system_instruction: `
          You are an intent classifier.
          Determine whether the user's message is describing a software project that they want to build.
          Return JSON only in this format: {"inDomain": boolean}.

          Rules:
          - Greetings -> false
          - General questions -> false
          - Casual conversation -> false
          - Random text -> false
          - Software project descriptions -> true
        `,
    input: userInput
  });

  if (!interaction.output_text) throw new ExpressError("Classifier returned no result", 500);

  const cleaned = extractedJson(interaction.output_text);
  const parsed = JSON.parse(cleaned);
  const result = ProjectClassifierSchema.parse(parsed);

  if (!result.inDomain) {
    return res.status(422).json({
      success: false,
      message: "We couldn't identify a valid software project description. Please describe the application or product you'd like to build."
    });
  }

  next();
}


export const promptIntentClassifier = async (req: Request<{}, {}, PromptInputBody>, res: Response, next: NextFunction) => {
  const prompt = req.body.prompt;

  if ((typeof process.env.CLASSIFIER_MODEL) !== "string") throw new ExpressError("CLASSIFIER_MODEL specification error", 500);

  const interaction = await ai.interactions.create({
    model: process.env.CLASSIFIER_MODEL,
    input: prompt,
    system_instruction: `
      You are a conversation intent classifier for an AI software architecture assistant.
      Your task is to classify the prompt into exactly ONE of the following intents.
      Return ONLY valid JSON matching this schema:

      {"intent": "architecture" | "follow_up" | "acknowledgement" | "feedback" | "gratitude" | "other"}

      Intent definitions:

      - architecture
        The user is asking about software architecture, system design, technologies, implementation details, requesting architectural analysis, or proposing architectural changes.

      - follow_up
        The user wants the previous discussion to continue, clarify, elaborate, summarize, or expand without introducing a new architecture topic.

      - acknowledgement
        The user acknowledges the previous response but does not ask a new question.

      - feedback
        The user agrees, disagrees, corrects, or critiques the previous response.

      - gratitude
        The user is expressing thanks or appreciation.

      - other
        Anything unrelated to the architecture conversation or that cannot be confidently classified into the above categories.
    `
  });

  if (!interaction.output_text) throw new ExpressError("Classifier returned no result", 500);

  const cleaned = extractedJson(interaction.output_text);
  const parsed = JSON.parse(cleaned);
  const result = PromptClassifierSchema.parse(parsed);

  if (result.intent === "acknowledgement") {
    return res.status(201).json({
      response: "Glad to hear that.🙂"
    });
  }

  if (result.intent === "gratitude") {
    return res.status(201).json({
      response: "Happy to help.😊"
    });
  }

  if (result.intent === "other") {
    return res.status(201).json({
      response: "That doesn't appear to be related to our architecture discussion. If you'd like help with your project's architecture, describe the component or design decision you'd like to explore."
    });
  }

  next();
}