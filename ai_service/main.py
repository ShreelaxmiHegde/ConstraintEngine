from agno.agent import RunOutputEvent, RunEvent
from typing import Iterator
from fastapi import FastAPI
from pydantic import BaseModel
from agent import extractor, architect
from ai_service.schemas.extraction import ExtractConstraintOutput

app = FastAPI()

class Data(BaseModel):
  query: str
  user_id: int
  session_id: int

class RawProject(BaseModel):
  description: str

@app.post("/extract_constraints")
def extractConstraints(project: RawProject):
  print(project.description)

  response = extractor.run(project.description)
  constraints: ExtractConstraintOutput = response.content
  print("Model extracted constraints: ", constraints)

  return {constraints}

@app.post("/m")
def generateResponse(d: Data):
  print(d.query, d.user_id)
  extractor.cli_app(stream=True)
  
  stream: Iterator[RunOutputEvent] = architect.run(
    d.query, 
    stream=True, 
    stream_events=True, 
    user_id=d.user_id,
    session_id=d.session_id,
    debug_mode=True
  )

  for chunk in stream:
    if chunk.event == RunEvent.run_content:
      print(f"Content: {chunk.content}")
    elif chunk.event == RunEvent.tool_call_started:
      print(f"Tool call started: {chunk.tool.tool_name}")
    elif chunk.event == RunEvent.reasoning_step:
      print(f"Reasoning step: {chunk.reasoning_content}")

  # stream.content - full content

  return {"response": stream}