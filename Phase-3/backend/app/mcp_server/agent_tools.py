from datetime import datetime
from agents import function_tool, RunContextWrapper
from sqlmodel import Session, select
from app.db.database import engine
from app.models.task import Task


@function_tool
def add_task(ctx: RunContextWrapper[dict], title: str, description: str = "") -> str:
    """Add a new task to the user's task list."""
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found"
    with Session(engine) as session:
        task = Task(user_id=user_id, title=title, description=description or None, status="pending")
        session.add(task)
        session.commit()
        session.refresh(task)
        return f"\u2713 Task created: {task.title} (ID: {task.id})"


@function_tool
def list_tasks(ctx: RunContextWrapper[dict], status: str = "all") -> str:
    """List all tasks for the user."""
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found"
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)
        if status == "pending":
            statement = statement.where(Task.status == "pending")
        elif status == "completed":
            statement = statement.where(Task.status == "completed")
        tasks = session.exec(statement).all()
        if not tasks:
            return "\ud83d\udccb No tasks found."
        task_list = "\n".join([f"{'\u2713' if t.status == 'completed' else '\u25cb'} [ID: {t.id}] {t.title}" for t in tasks])
        return f"\ud83d\udccb Your Tasks:\n{task_list}"


@function_tool
def complete_task(ctx: RunContextWrapper[dict], task_id: int) -> str:
    """Mark a task as completed."""
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found"
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return f"Task {task_id} not found."
        task.status = "completed"
        task.updated_at = datetime.utcnow()
        session.commit()
        return f"\u2713 Completed: {task.title}"


@function_tool
def delete_task(ctx: RunContextWrapper[dict], task_id: int) -> str:
    """Delete a task from the user's list."""
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found"
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return f"Task {task_id} not found."
        title = task.title
        session.delete(task)
        session.commit()
        return f"\u2717 Deleted: {title}"


@function_tool
def update_task(ctx: RunContextWrapper[dict], task_id: int, title: str = None, description: str = None) -> str:
    """Update a task's title or description."""
    user_id = ctx.context.get("user_id")
    if not user_id:
        return "Error: User ID not found"
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return f"Task {task_id} not found."
        if title:
            task.title = title
        if description:
            task.description = description
        task.updated_at = datetime.utcnow()
        session.commit()
        return f"\u2713 Updated: {task.title}"


def get_mcp_tools():
    return [add_task, list_tasks, complete_task, delete_task, update_task]
