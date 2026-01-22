from openai import AsyncOpenAI
from agents import Agent, Runner, OpenAIChatCompletionsModel, set_tracing_disabled

from app.config import get_settings
from app.ai.prompts import SYSTEM_PROMPT
from app.mcp_server.agent_tools import get_mcp_tools

# Disable tracing for cleaner output
set_tracing_disabled(True)

# Get settings
settings = get_settings()

# Create Gemini client using OpenAI-compatible endpoint
gemini_client = AsyncOpenAI(
    api_key=settings.gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Define model with Gemini backend
model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=gemini_client
)

# Create Task Master Agent
task_agent = Agent(
    name="TaskMasterAgent",
    instructions=SYSTEM_PROMPT,
    tools=get_mcp_tools(),
    model=model
)


async def run_task_agent(
    user_id: str,
    message: str,
    conversation_history: list[dict]
) -> str:
    """
    Run OpenAI Agents SDK with Gemini backend.

    Args:
        user_id: Authenticated user ID
        message: Current user message
        conversation_history: Previous messages

    Returns:
        Response text from agent
    """
    try:
        # Run agent with context
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
    """Wrapper class for compatibility with existing API."""

    def __init__(self, user_id: str):
        self.user_id = user_id

    async def run_conversation(
        self,
        session,  # Not used with agents SDK - tools handle their own DB
        messages: list[dict],
        user_message: str,
    ) -> str:
        """
        Run a conversation turn with the AI agent.

        Args:
            session: Database session (passed to context)
            messages: Previous conversation history
            user_message: Current user message

        Returns:
            AI assistant response text
        """
        return await run_task_agent(
            user_id=self.user_id,
            message=user_message,
            conversation_history=messages
        )
