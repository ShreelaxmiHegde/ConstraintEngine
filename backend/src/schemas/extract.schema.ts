import { z } from "zod";

export const ConstraintSchema = z.object({
  category: z.string(),
  value: z.string(),
  confidence: z.number()
});

export const DecisionSchema = z.object({
  decision: z.string(),
  reason: z.string(),
  confidence: z.number()
});

export const AchitectureState = z.object({
  key: z.string(),
  value: z.array(z.string())
});

export const ExtractConstraintOutputSchema = z.object({
  constraints: z.array(ConstraintSchema),
  decisions: z.array(DecisionSchema),
  architectureState: z.array(AchitectureState),
  summary: z.string(),
});

export type Constraint = z.infer<typeof ConstraintSchema>;
export type Decision = z.infer<typeof DecisionSchema>;

export type ExtractConstraintOutput =
  z.infer<typeof ExtractConstraintOutputSchema>;