from pydantic import BaseModel, Field

class ProjectData(BaseModel):
  description: str = Field(min_length=10, max_length=500)

class Constraint(BaseModel):
  category: str = Field(
    description="Constraint type (Functional, Performance, Security, Database, API, AI, etc.)."
  )

  value: str = Field(
    description="Extracted requirement or limitation."
  )

  confidence: float = Field(
    description="Confidence score (0-1)."
  )

class Decision(BaseModel):
  decision: str = Field(
    description="Architecture decision inferred from the constraints."
  )

  reason: str = Field(
    description="Constraint(s) supporting the decision."
  )

  confidence: float = Field(
    description="Confidence score (0-1)."
  )

class ArchitectureItem(BaseModel):
  key: str = Field(
    description="Architecture concept (e.g. backend, database authentication, deployment, API, frontend)."
  )
  value: list[str] = Field(
    description="Current technologies, components or architectural choices."
  )

class ExtractConstraintOutput(BaseModel):
  constraints: list[Constraint] = Field(
    description="extract up to 10 key project constraints."
  )

  decisions: list[Decision] = Field(
    description="Up to 5 decisions derived from the constraints."
  )

  architectureState: list[ArchitectureItem] = Field(
    description=(
      "Current architecture as key-value pairs derived from the constraints and decisions. Use concise meaningful keys and include only known concepts."
    )
  )

  summary: str = Field(
    description="2-4 sentence project overview."
  )