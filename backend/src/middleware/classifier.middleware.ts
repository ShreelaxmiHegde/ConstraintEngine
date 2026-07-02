import { GoogleGenAI } from "@google/genai";
import { ProjectClassifierSchema, ProjectInputBody, PromptClassifierSchema, PromptInputBody } from "../schemas/classifier.schema.js";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { ExpressError } from "../utils/ExpressError.js";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
            Examples:
            - "How to make lemonade?"
            - "What's the weather?"
            - "Tell me a joke."
            - "I like cars."
            - Random unrelated conversation.

          Rules:
          - Classify ONLY the latest user message.
          - Do not infer hidden intentions.
          - Do not answer the user's question.
          - Do not generate explanations.
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
    })
  }

  next();
}