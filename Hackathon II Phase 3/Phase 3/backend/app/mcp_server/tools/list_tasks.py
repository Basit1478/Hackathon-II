from typing import Optional, List
from pydantic import BaseModel


class ListTasksInput(BaseModel):
    user_id: str
    status: Optional[str] = "all"  # "all", "pending", "completed"


class TaskItem(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    created_at: str


class ListTasksOutput(BaseModel):
    tasks: List[TaskItem]
    total: int


async def list_tasks_tool(session, input_data: ListTasksInput) -> ListTasksOutput:
    """
    List tasks for a user, optionally filtered by status.

    Args:
        session: Database session
        input_data: ListTasksInput with user_id and optional status filter

    Returns:
        ListTasksOutput with tasks array and total count
    """
    from app.services.task_service import TaskService

    service = TaskService(session)
    status_filter = input_data.status if input_data.status != "all" else None
    tasks = await service.list_tasks(user_id=input_data.user_id, status=status_filter)

    task_items = [
        TaskItem(
            id=task.id,
            title=task.title,
            description=task.description,
            status=task.status,
            created_at=task.created_at.isoformat(),
        )
        for task in tasks
    ]

    return ListTasksOutput(tasks=task_items, total=len(task_items))


# Tool definition for MCP
TOOL_DEFINITION = {
    "name": "list_tasks",
    "description": "List all tasks for a user, optionally filtered by status",
    "input_schema": {
        "type": "object",
        "properties": {
            "user_id": {"type": "string", "description": "The user's ID"},
            "status": {
                "type": "string",
                "enum": ["all", "pending", "completed"],
                "description": "Filter by task status (default: all)",
            },
        },
        "required": ["user_id"],
    },
}
