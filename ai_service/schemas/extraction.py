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

class ExtractConstraintOutput(BaseModel):
  constraints: list[Constraint]
  architectureState: dict = Field(description="Project state")
  decisions: list[Decision] = Field(description="Derived decisions")
  summary: str = Field(description="architecture summary")