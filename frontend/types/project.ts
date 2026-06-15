export interface Constraint {
  category: string;
  value: string;
  source: string;
  confidence: number;
}

export interface Decision {
  decision: string;
  reason: string;
  confidence: number;
}

export interface Question {
  question: string;
  reason: string;
}

export interface ExtractConstraintOutput {
  constraints: Constraint[];
  architectureState: Record<string, unknown>;
  decisions: Decision[];
  unresolvedQuestions: Question[];
}