from openai import AsyncOpenAI
from agents import Agent, Runner, OpenAIChatCompletionsModel, set_tracing_disabled

from app.config import get_settings
from app.ai.prompts import SYSTEM_PROMPT
from app.mcp_server.agent_tools import get_mcp_tools

set_tracing_disabled(True)
settings = get_settings()

gemini_client = AsyncOpenAI(
    api_key=settings.gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=gemini_client
)

task_agent = Agent(
    name="TaskMasterAgent",
    instructions=SYSTEM_PROMPT,
    tools=get_mcp_tools(),
    model=model
)


async def run_task_agent(user_id: str, message: str, conversation_history: list[dict]) -> str:
    try:
        result = await Runner.run(
            task_agent,
            input=message,
            context={"user_id": user_id}
        )
        return result.final_output
    except Exception as e:
        print(f"Agent error: {type(e).__name__}: {e}")
        raise


class TaskMasterAgent:
    def __init__(self, user_id: str):
        self.user_id = user_id

    async def run_conversation(self, session, messages: list[dict], user_message: str) -> str:
        return await run_task_agent(
            user_id=self.user_id,
            message=user_message,
            conversation_history=messages
        )
