from agno.agent import RunOutputEvent, RunEvent
from typing import Iterator
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from agent import extractor, architect
from schemas.extraction import ExtractConstraintOutput
from schemas.architecture import ArchitectureOutput
import logging

logger = logging.getLogger(__name__)

app = FastAPI()

class Data(BaseModel):
  query: str 
  user_id: int
  session_id: int

class RawProject(BaseModel):
  description: str = Field(min_length=10, max_length=500)

@app.post("/extract/constraints", response_model=ExtractConstraintOutput)
async def extract_constraints(project: RawProject):
  try:
    logger.info("Constraint extraction request received")

    response = extractor.run(project.description)

    if response.content is None:
      raise HTTPException(
        status_code=500,
        detail="Agent returned empty response"
      )

    return response.content

  except Exception as e:
    logger.exception("Constraint extraction failed")

    raise HTTPException(
      status_code=500,
      detail="Constraint extraction failed"
    )

 
@app.post("/architecture/respond")
def generateResponse(query):
  print(query)
  
  result = architect.run(query)

  output: ArchitectureOutput = result.content

  return output