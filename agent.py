from agno.agent import Agent
from agno.models.groq import Groq
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.db.sqlite import SqliteDb
from dotenv import load_dotenv
from rich.pretty import pprint

load_dotenv()


def build_agent():
  return Agent(
    model=Groq(id="qwen/qwen3-32b"),
    tools=[DuckDuckGoTools()],
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

agent = build_agent()

user_id = "shree@email.com"
query = "What key factors to consider while choosing a right database."

agent.print_response(query, user_id=user_id)

memories = agent.get_user_memories(user_id)

print("MEMORIES: ")
pprint(memories)