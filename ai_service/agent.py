from agno.agent import Agent
from agno.models.groq import Groq
from agno.db.sqlite import SqliteDb
from dotenv import load_dotenv
from ai_service.schemas.extraction import ExtractConstraintOutput

load_dotenv()


def build_architect_agent():
  return Agent(
    model=Groq(id="qwen/qwen3-32b"),
    description="You are a Database engineer expert in Database architectural decision making.",
    instructions=["You should understand the situation, evaluate constraints, compare options, reason about tradeoffs and recommend best fit."],
    db=SqliteDb(db_file="agent.db"),
    add_history_to_context=True,
    num_history_runs=3,
    enable_user_memories=True,
    markdown=True,
    add_datetime_to_context=True,
    debug_mode=True
  )

def build_extraction_agent():
  return Agent(
    model=Groq(id="qwen/qwen3-32b"),
    description="Extract requirements from software project descriptions.",
    instructions="""
      Extract:
      - Functional requirements
      - Non-functional requirements
      - Technical constraints
      - User roles
      - Integrations
      - Scale requirements
      Identify ambiguities and generate clarification questions.
    """,
    output_schema=ExtractConstraintOutput
  )

extractor = build_extraction_agent()
architect = build_architect_agent()