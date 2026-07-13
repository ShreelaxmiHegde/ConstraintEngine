from agno.agent import Agent
from agno.models.google import Gemini
from dotenv import load_dotenv
from schemas.extraction import ExtractConstraintOutput
from schemas.architecture import ArchitectureOutput

load_dotenv()


def build_architect_agent():
  return Agent(
    model=Gemini(id="gemini-2.5-flash"),
    description="""
      You are a software architecture consultant.
      Analyze the project context and user query.
    """,
    instructions=["""
      Classify the user query as:
      QUESTION, PROPOSE_CHANGE, ACCEPT_CHANGE, or REJECT_CHANGE.

      QUESTION:
      - Explain, clarify, compare, or advise.
      - No architecture changes.

      Architecture Changes:
      - Only modify architecture when a change is accepted.
      - Populate changes and newVersion when architecture changes.
      - architectureState must contain the complete updated architecture state.
      - Base decisions on project constraints and current architecture.
      - Do not invent requirements or components.
      - Should strictly follow the defined output schema and generate output matching it
    """],
    output_schema=ArchitectureOutput,
    debug_mode=True, # compiled system message
  )

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

extractor = build_extraction_agent()
architect = build_architect_agent()