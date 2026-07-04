import { z } from "zod";

export const ProjectInputSchema = z.object({
  rawDescription: z.string().min(20).max(5000)
});

export const PromptInputSchema = z.object({
  prompt: z.string().min(1).max(300)
});

export const ProjectClassifierSchema = z.object({
  inDomain: z.boolean()
});

export const PromptClassifierSchema = z.object({
  intent: z.enum([
    "architecture",
    "follow_up",
    "acknowledgement",
    "feedback",
    "gratitude",
    "other"
  ])
});

export type ProjectInputBody = z.infer<typeof ProjectInputSchema>;
export type PromptInputBody = z.infer<typeof PromptInputSchema>;