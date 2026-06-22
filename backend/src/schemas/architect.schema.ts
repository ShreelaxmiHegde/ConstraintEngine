import { z } from "zod";
import { JsonValueSchema } from "./extract.schema.js";

/* Enums */
const IntentSchema = z.enum([
  "QUESTION",
  "PROPOSE_CHANGE",
  "ACCEPT_CHANGE",
  "REJECT_CHANGE",
]);

const ChangeTypeSchema = z.enum([
  "ADD_COMPONENT",
  "REMOVE_COMPONENT",
  "REPLACE_COMPONENT",
  "UPDATE_COMPONENT",
  "UPDATE_CONSTRAINT",
]);

/* Models */
const ArchitectureVersionSchema = z.object({
  summary: z.string(),
  architectureState: z.record(z.string(), JsonValueSchema),
});

export const ArchitectureChangeSchema = z.object({
  changeType: ChangeTypeSchema,
  target: z.string(),
  newVal: z.string().optional(),
  oldVal: z.string().optional(),
  reasoning: z.string(),
});

export const ExchangeSchema = z.object({
  responseText: z.string(),
  exchangeIntent: IntentSchema,
  stateChanged: z.boolean(),
});

export const ArchitectureOutputSchema = z.object({
  changes: z.array(ArchitectureChangeSchema).default([]),
  newVersion: ArchitectureVersionSchema.nullable().optional(),
  conversation: ExchangeSchema,
  projectModified: z.boolean(),
});

/* Types */
export type Intent = z.infer<typeof IntentSchema>;
export type ChangeType = z.infer<typeof ChangeTypeSchema>;
export type Exchange = z.infer<typeof ExchangeSchema>;

export type ArchitectureVersion = z.infer<
  typeof ArchitectureVersionSchema
>;

export type ArchitectureChange = z.infer<
  typeof ArchitectureChangeSchema
>;

export type ArchitectureOutput = z.infer<
  typeof ArchitectureOutputSchema
>;