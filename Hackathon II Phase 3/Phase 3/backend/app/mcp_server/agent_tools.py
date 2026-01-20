"""MCP Tools using OpenAI Agents SDK function_tool decorator."""

from datetime import datetime
from agents import function_tool, RunContextWrapper
from sqlmodel import Session, select
from app.db.database import engine
from app.models.task import Task


@function_tool
def add_task(
    ctx: RunContextWrapper[dict],
    title: str,
    description: str = ""
) -> str:
    """
    Add a new task to the user's task list.

    Args:
        title: The task title (required)
        description: Optional task description
    """
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found in context"

    with Session(engine) as session:
        task = Task(
            user_id=user_id,
            title=title,
            description=description or None,
            status="pending",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        session.add(task)
        session.commit()
        session.refresh(task)

        return f"✓ Task created: {task.title} (ID: {task.id})"


@function_tool
def list_tasks(
    ctx: RunContextWrapper[dict],
    status: str = "all"
) -> str:
    """
    List all tasks for the user.

    Args:
        status: Filter by status - "all", "pending", or "completed"
    """
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found in context"

    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)

        if status == "pending":
            statement = statement.where(Task.status == "pending")
        elif status == "completed":
            statement = statement.where(Task.status == "completed")

        tasks = session.exec(statement).all()

        if not tasks:
            return "📋 No tasks found."

        task_list = "\n".join([
            f"{'✓' if t.status == 'completed' else '○'} [ID: {t.id}] {t.title}"
            for t in tasks
        ])

        return f"📋 Your Tasks:\n{task_list}"


@function_tool
def complete_task(
    ctx: RunContextWrapper[dict],
    task_id: int
) -> str:
    """
    Mark a task as completed.

    Args:
        task_id: The ID of the task to complete
    """
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found in context"

    with Session(engine) as session:
        task = session.get(Task, task_id)

        if not task or task.user_id != user_id:
            return f"Task {task_id} not found or access denied."

        task.status = "completed"
        task.updated_at = datetime.utcnow()
        session.commit()

        return f"✓ Completed: {task.title}"


@function_tool
def delete_task(
    ctx: RunContextWrapper[dict],
    task_id: int
) -> str:
    """
    Delete a task from the user's list.

    Args:
        task_id: The ID of the task to delete
    """
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found in context"

    with Session(engine) as session:
        task = session.get(Task, task_id)

        if not task or task.user_id != user_id:
            return f"Task {task_id} not found or access denied."

        title = task.title
        session.delete(task)
        session.commit()

        return f"✗ Deleted: {title}"


@function_tool
def update_task(
    ctx: RunContextWrapper[dict],
    task_id: int,
    title: str = None,
    description: str = None
) -> str:
    """
    Update a task's title or description.

    Args:
        task_id: The ID of the task to update
        title: New title for the task (optional)
        description: New description for the task (optional)
    """
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found in context"

    with Session(engine) as session:
        task = session.get(Task, task_id)

        if not task or task.user_id != user_id:
            return f"Task {task_id} not found or access denied."

        if title:
            task.title = title
        if description:
            task.description = description
        task.updated_at = datetime.utcnow()

        session.commit()

        return f"✓ Updated: {task.title}"


def get_mcp_tools():
    """Return all MCP tools for the agent."""
    return [
        add_task,
        list_tasks,
        complete_task,
        delete_task,
        update_task
    ]
