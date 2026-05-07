from agno.agent import Agent
from agno.models.groq import Groq
from agno.tools.duckduckgo import DuckDuckGoTools
from dotenv import load_dotenv

load_dotenv()


def build_agent():
  return Agent(
    model=Groq(id="qwen/qwen3-32b"),
    tools=[DuckDuckGoTools()],
    markdown=True,
    instructions="You are an expert engineering decision maker with reasoning in database related confusions and development practices.",
    add_datetime_to_context=True
  )