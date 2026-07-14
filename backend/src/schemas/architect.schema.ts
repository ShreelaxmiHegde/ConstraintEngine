import { z } from "zod";
import { DecisionSchema, AchitectureState } from "./extract.schema.js";

/* Enums */
const IntentSchema = z.enum([
  "QUESTION",
  "CHANGE_REQUEST"
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
  architectureState: z.array(AchitectureState),
  decisions: z.array(DecisionSchema)
});

export const ArchitectureChangeSchema = z.object({
  changeType: ChangeTypeSchema,
  target: z.string(),
  newVal: AchitectureState.nullable(),
  oldVal: AchitectureState.nullable(),
  reasoning: z.string(),
});

const ChangeStatus = z.enum([
  "ACCEPTED",
  "REJECTED"
]);

export const ExchangeSchema = z.object({
  responseText: z.string(),
  exchangeIntent: IntentSchema,
  changeStatus: ChangeStatus.nullable(),
  stateChanged: z.boolean(),
});

export const ArchitectureOutputSchema = z.object({
  changes: z.array(ArchitectureChangeSchema).default([]),
  newVersion: ArchitectureVersionSchema.nullable(),
  conversation: ExchangeSchema,
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