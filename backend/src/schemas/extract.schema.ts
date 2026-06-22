import { z } from "zod";

export const ConstraintSchema = z.object({
  category: z.string(),
  value: z.string(),
  source: z.string(),
  confidence: z.number()
});

export const DecisionSchema = z.object({
  decision: z.string(),
  reason: z.string(),
  confidence: z.number()
});

export const JsonValueSchema: z.ZodTypeAny = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonValueSchema),
    z.record(z.string(), JsonValueSchema)
  ])
);

export const ExtractConstraintOutputSchema = z.object({
  constraints: z.array(ConstraintSchema),

  // Equivalent to Python `dict`
  architectureState: z.record(z.string(), JsonValueSchema),
  summary: z.string(),
  decisions: z.array(DecisionSchema)
});

export type Constraint = z.infer<typeof ConstraintSchema>;
export type Decision = z.infer<typeof DecisionSchema>;

export type ExtractConstraintOutput =
  z.infer<typeof ExtractConstraintOutputSchema>;