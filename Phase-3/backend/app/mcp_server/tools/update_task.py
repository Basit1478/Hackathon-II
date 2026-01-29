from typing import Optional
from pydantic import BaseModel, model_validator


class UpdateTaskInput(BaseModel):
    user_id: str
    task_id: int
    title: Optional[str] = None
    description: Optional[str] = None

    @model_validator(mode="after")
    def check_at_least_one_field(self):
        if self.title is None and self.description is None:
            raise ValueError("At least one of 'title' or 'description' must be provided")
        return self


class UpdateTaskOutput(BaseModel):
    task_id: int
    status: str = "updated"


async def update_task_tool(session, input_data: UpdateTaskInput) -> UpdateTaskOutput:
    """
    Update a task's title and/or description.

    Args:
        session: Database session
        input_data: UpdateTaskInput with user_id, task_id, and fields to update

    Returns:
        UpdateTaskOutput with task_id and status

    Raises:
        ValueError: If task not found or doesn't belong to user
    """
    from app.services.task_service import TaskService

    service = TaskService(session)
    task = await service.update_task(
        task_id=input_data.task_id,
        user_id=input_data.user_id,
        title=input_data.title,
        description=input_data.description,
    )

    if not task:
        raise ValueError(f"Task {input_data.task_id} not found or doesn't belong to user")

    return UpdateTaskOutput(
        task_id=task.id,
        status="updated",
    )


# Tool definition for MCP
TOOL_DEFINITION = {
    "name": "update_task",
    "description": "Update a task's title and/or description",
    "input_schema": {
        "type": "object",
        "properties": {
            "user_id": {"type": "string", "description": "The user's ID"},
            "task_id": {"type": "integer", "description": "The ID of the task to update"},
            "title": {
                "type": "string",
                "description": "New title for the task",
                "maxLength": 200,
            },
            "description": {
                "type": "string",
                "description": "New description for the task",
            },
        },
        "required": ["user_id", "task_id"],
    },
}
