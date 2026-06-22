from pydantic import BaseModel, Field
from enum import Enum

class Intent(str, Enum):
  QUESTION = "QUESTION"
  PROPOSE_CHANGE = "PROPOSE_CHANGE"
  ACCEPT_CHANGE = "ACCEPT_CHANGE"
  REJECT_CHANGE = "REJECT_CHANGE"

class ChangeType(str, Enum):
  ADD_COMPONENT = "ADD_COMPONENT"
  REMOVE_COMPONENT = "REMOVE_COMPONENT"
  REPLACE_COMPONENT = "REPLACE_COMPONENT"
  UPDATE_COMPONENT = "UPDATE_COMPONENT"
  UPDATE_CONSTRAINT = "UPDATE_CONSTRAINT"

class ArchitectureVersion(BaseModel):
  summary: str = Field(description="new architecture short summary")
  architectureState: dict = Field(description="new architecture state")

class ArchitectureChange(BaseModel):
  changeType: ChangeType
  target: str
  newVal: str | None = None
  oldVal: str | None = None
  reasoning: str

class Exchange(BaseModel):
  responseText: str = Field(description="response to user query.")
  exchangeIntent: Intent = Field(description="user query intent.")
  stateChanged: bool

class ArchitectureOutput(BaseModel):
  changes: list[ArchitectureChange] = []
  newVersion: ArchitectureVersion | None = None
  conversation: Exchange
  projectModified: bool