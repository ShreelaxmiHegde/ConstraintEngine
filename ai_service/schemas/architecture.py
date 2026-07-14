from pydantic import BaseModel, Field
from enum import Enum
from schemas.extraction import Decision, ArchitectureItem

class ArchitectureRequest(BaseModel):
  query_context: str

class ChangeStatus(str, Enum):
  ACCEPTED = "ACCEPTED"
  REJECTED = "REJECTED"

class Intent(str, Enum):
  QUESTION = "QUESTION"
  CHANGE_REQUEST = "CHANGE_REQUEST"

class ChangeType(str, Enum):
  ADD_COMPONENT = "ADD_COMPONENT"
  REMOVE_COMPONENT = "REMOVE_COMPONENT"
  REPLACE_COMPONENT = "REPLACE_COMPONENT"
  UPDATE_COMPONENT = "UPDATE_COMPONENT"
  UPDATE_CONSTRAINT = "UPDATE_CONSTRAINT"

class ArchitectureVersion(BaseModel):
  summary: str = Field(
    description="Updated architecture summary."
  )
  architectureState: list[ArchitectureItem] = Field(
    description="Current architecture after applying accepted changes."
  )
  decisions: list[Decision] = Field(
    description="Architectural decisions supporting the current architecture."
  )

class ArchitectureChange(BaseModel):
  changeType: ChangeType = Field(description="Type of architecture modification.")
  target: str = Field(
    description="Architecture component being modified."
  )
  oldVal: ArchitectureItem | None = Field(
    default=None,
    description="Previous component state."
  )
  newVal: ArchitectureItem | None = Field(
    default=None,
    description="Updated component state."
  )
  reasoning: str = Field(description="Reason for accepting or rejecting the change.")

class Exchange(BaseModel):
  responseText: str = Field(description="Response to user query.")
  exchangeIntent: Intent = Field(description="Detected user intent")
  changeStatus: ChangeStatus = Field(
    default=None,
    description="Present only for CHANGE_REQUEST."
  )
  stateChanged: bool = Field(
    description="True only if the architecture was updated."
  )

class ArchitectureOutput(BaseModel):
  changes: list[ArchitectureChange] = []
  newVersion: ArchitectureVersion | None = None
  conversation: Exchange
