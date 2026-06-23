from fastapi import FastAPI, HTTPException
from agent import extractor, architect
from schemas.extraction import ExtractConstraintOutput, ProjectData
from schemas.architecture import ArchitectureOutput, ArchitectureRequest
import logging

logger = logging.getLogger(__name__)

app = FastAPI()

@app.post("/extract/constraints")
async def extract_constraints(project: ProjectData):
  try:
    response = extractor.run(project.description)

    if response.content is None:
      raise HTTPException(
        status_code=500,
        detail="Agent returned empty response"
      )
    
    output: ExtractConstraintOutput = response.content

    return output 

  except Exception as e:
    logger.exception("Constraint extraction failed")

    raise HTTPException(
      status_code=500,
      detail="Constraint extraction failed"
    )

 
@app.post("/architecture/respond")
def generateResponse(request: ArchitectureRequest):
  try:
    response = architect.run(request.query_context)

    if response.content is None:
      raise HTTPException(
        status_code=500,
        detail="Agent returned empty response"
      )

    output: ArchitectureOutput = response.content

    return output

  except Exception as e:
    logger.exception("Constraint extraction failed")

    raise HTTPException(
      status_code=500,
      detail="Constraint extraction failed"
    )