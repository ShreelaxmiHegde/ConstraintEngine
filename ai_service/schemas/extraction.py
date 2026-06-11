from pydantic import BaseModel, Field

class Constraint(BaseModel):
  category: str
  value: str
  source: str
  confidence: float

class Decision(BaseModel):
  decision: str
  reason: str
  confidence: float

class Question(BaseModel):
  question: str
  reason: str

class ExtractConstraintOutput(BaseModel):
  constraints: list[Constraint]
  architectureState: dict = Field(description="Project state")
  decisions: list[Decision] = Field(description="Derived decisions")
  unresolvedQuestions: list[Question] = Field(description="Required clarifications")