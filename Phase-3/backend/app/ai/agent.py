import os
from pydantic import BaseModel, Field
from agents import (
    Agent,
    Runner,
    OpenAIChatCompletionsModel,
    AsyncOpenAI,
    RunContextWrapper,
    ModelSettings,
    set_tracing_disabled,
)
from app.config import get_settings
from app.mcp_server.agent_tools import get_mcp_tools

# ------------------ Setup ------------------

set_tracing_disabled(True)
settings = get_settings()

if not settings.groq_api_key:
    raise ValueError("GROQ_API_KEY not set in environment")

# Create Gemini client
client = AsyncOpenAI(
    api_key=settings.groq_api_key,
    base_url="https://api.groq.com/openai/v1"
)

# Define model - using correct Gemini 2.5 Flash model name
model = OpenAIChatCompletionsModel(
    model="openai/gpt-oss-20b",  # Latest stable model
    openai_client=client
)

# ------------------ Context Model ------------------

class TaskMasterContext(BaseModel):
    user_id: str
    user_name: str = "User"

# ------------------ Dynamic Instructions ------------------

def dynamic_instructions(ctx: RunContextWrapper[TaskMasterContext], agent: Agent) -> str:
    return f"""
    You are TaskMaster AI, a professional task management assistant.
    
    User: {ctx.context.user_name} (ID: {ctx.context.user_id})
    
    Your capabilities:
    - Create, update, and delete tasks
    - List and search tasks
    - Set priorities and deadlines
    - Organize tasks efficiently
    
    Always:
    - Be concise and actionable
    - Confirm task operations clearly
    - Use natural language processing
    
    Use the available tools to manage tasks in the database.
    """

# ------------------ Main TaskMaster Agent ------------------

task_master_agent = Agent(
    name="TaskMasterAgent",
    instructions=dynamic_instructions,
    tools=get_mcp_tools(),  # Your MCP tools for task management
    model_settings=ModelSettings(
        temperature=0.3,
        tool_choice="auto",
        max_tokens=1000
    ),
    model=model
)

# ------------------ Main Runner Function ------------------

async def run_task_agent(
    user_id: str,
    message: str,
    conversation_history: list[dict],
    user_name: str = "User"
) -> str:
    """
    Run TaskMaster agent with Gemini backend.
    
    Args:
        user_id: User identifier
        message: Current user message
        conversation_history: Previous conversation (not used in current impl)
        user_name: Optional user display name
        
    Returns:
        AI response text
    """
    from agents.exceptions import InputGuardrailTripwireTriggered
    
    # Create context
    context = TaskMasterContext(
        user_id=user_id,
        user_name=user_name
    )
    
    try:
        # Run agent
        result = await Runner.run(
            task_master_agent,
            input=message,
            context=context
        )
        return result.final_output
        
    except InputGuardrailTripwireTriggered:
        return "I'm TaskMaster AI, focused on helping you manage tasks and todos. Please ask me about creating, updating, or organizing your tasks!"
        
    except Exception as e:
        print(f"Agent error: {type(e).__name__}: {e}")
        raise

# ------------------ Compatibility Wrapper ------------------

class TaskMasterAgent:
    """Wrapper class for compatibility with existing FastAPI routes."""
    
    def __init__(self, user_id: str):
        self.user_id = user_id
    
    async def run_conversation(
        self,
        session,
        messages: list[dict],
        user_message: str,
    ) -> str:
        """
        Run conversation with OpenAI Agents SDK.
        
        Args:
            session: Database session (passed to tools via context)
            messages: Conversation history
            user_message: Current message
            
        Returns:
            AI response
        """
        return await run_task_agent(
            user_id=self.user_id,
            message=user_message,
            conversation_history=messages
        )