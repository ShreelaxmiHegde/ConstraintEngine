from agno.agent import Agent
from agno.models.google import Gemini
from dotenv import load_dotenv
from schemas.extraction import ExtractConstraintOutput
from schemas.architecture import ArchitectureOutput

load_dotenv()

def build_extraction_agent():
  return Agent(
    model=Gemini(id="gemini-2.5-flash"),
    description="Extract key architectural constraints, decisions and architecture state from software project descriptions.",
    instructions="""
      Process the project in this order:

      1. Extract up to 10 most important explicit constraints.
      2. Derive up to 5 architectural decisions from those constraints only.
      3. Build a concise architectureState using those decisions. Use meaningful keys (e.g. backend, database, authentication, api, deployment). Include only known concepts.
      4. Write a 2-4 sentence summary.

      Do not invent unsupported requirements.
      Return only valid JSON matching the output schema.
    """,
    output_schema=ExtractConstraintOutput,
    debug_mode=True
  )

def build_architect_agent():
  return Agent(
    model=Gemini(id="gemini-2.5-flash"),
    description="""
      You are a software architecture consultant.
    """,
    instructions=["""
      Process the input in this order:

      1. Determine the user intent:
        - QUESTION
        - CHANGE_REQUEST

      2. If QUESTION:
        - Answer using the project context.
        - Do not modify the architecture.
        - Return no changes and no newVersion.

      3. If CHANGE_REQUEST:
        - Evaluate the requested change against the project constraints, current architecture and existing decisions.
        - Accept the change only if it is compatible.
        - Otherwise reject it and explain why.

      4. If the change is accepted:
        - Record the architecture changes.
        - Update architectural decisions.
        - Generate a complete new architecture version.
        - Set stateChanged=true.

      5. If the change is rejected:
        - Explain why.
        - Do not modify the architecture.
        - Return no newVersion.
        - Set stateChanged=false.

      Return only valid JSON matching the output schema.
    """],
    output_schema=ArchitectureOutput,
    debug_mode=True, # compiled system message
  )

extractor = build_extraction_agent()
architect = build_architect_agent()