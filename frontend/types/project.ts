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
  extractedConstraints: Constraint[];
  architectureState: Record<string, unknown>;
  decisions: Decision[];
  unresolvedQuestions: Question[];
}

export interface ProjectType {
  title: string;
  rawDescription: string;
  extractedConstraints: Constraint[];
  architectureState: Record<string, unknown>;
  decisions: Decision[];
  unresolvedQuestions: Question[];
}