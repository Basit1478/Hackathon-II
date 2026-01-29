from typing import Optional
from pydantic import BaseModel, Field


class AddTaskInput(BaseModel):
    user_id: str
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = None


class AddTaskOutput(BaseModel):
    task_id: int
    status: str = "created"
    title: str


async def add_task_tool(session, input_data: AddTaskInput) -> AddTaskOutput:
    """
    Add a new task for a user.

    Args:
        session: Database session
        input_data: AddTaskInput with user_id, title, and optional description

    Returns:
        AddTaskOutput with task_id, status, and title
    """
    from app.services.task_service import TaskService

    service = TaskService(session)
    task = await service.create_task(
        user_id=input_data.user_id,
        title=input_data.title,
        description=input_data.description,
    )

    return AddTaskOutput(
        task_id=task.id,
        status="created",
        title=task.title,
    )


# Tool definition for MCP
TOOL_DEFINITION = {
    "name": "add_task",
    "description": "Add a new task to the user's task list",
    "input_schema": {
        "type": "object",
        "properties": {
            "user_id": {"type": "string", "description": "The user's ID"},
            "title": {
                "type": "string",
                "description": "The task title (1-200 characters)",
                "minLength": 1,
                "maxLength": 200,
            },
            "description": {
                "type": "string",
                "description": "Optional task description",
            },
        },
        "required": ["user_id", "title"],
    },
}
