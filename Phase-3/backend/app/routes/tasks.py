from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.services.task_service import TaskService


router = APIRouter(prefix="/api", tags=["tasks"])


class TaskCreateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)


class TaskUpdateRequest(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: Optional[str] = Field(default=None, pattern=r"^(pending|completed)$")


class TaskResponse(BaseModel):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    status: str
    created_at: str
    updated_at: str


@router.get("/{user_id}/tasks", response_model=List[TaskResponse])
async def get_tasks(
    user_id: str,
    status: Optional[str] = None,
    session: AsyncSession = Depends(get_session),
):
    """
    Get all tasks for a user.

    - Optionally filter by status ('pending', 'completed', or 'all')
    - Returns tasks ordered by creation date (newest first)
    """
    task_service = TaskService(session)
    tasks = await task_service.list_tasks(user_id, status)

    return [
        TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            status=task.status,
            created_at=task.created_at.isoformat(),
            updated_at=task.updated_at.isoformat(),
        )
        for task in tasks
    ]


@router.post("/{user_id}/tasks", response_model=TaskResponse)
async def create_task(
    user_id: str,
    request: TaskCreateRequest,
    session: AsyncSession = Depends(get_session),
):
    """
    Create a new task for a user.
    """
    task_service = TaskService(session)

    task = await task_service.create_task(
        user_id=user_id,
        title=request.title,
        description=request.description,
    )

    return TaskResponse(
        id=task.id,
        user_id=task.user_id,
        title=task.title,
        description=task.description,
        status=task.status,
        created_at=task.created_at.isoformat(),
        updated_at=task.updated_at.isoformat(),
    )


@router.put("/{user_id}/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: str,
    task_id: int,
    request: TaskUpdateRequest,
    session: AsyncSession = Depends(get_session),
):
    """
    Update a task for a user.
    """
    task_service = TaskService(session)

    # Get the existing task to check if it belongs to the user
    existing_task = await task_service.get_task(task_id, user_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found or access denied")

    # Prepare update parameters
    title = request.title if request.title is not None else existing_task.title
    description = (
        request.description if request.description is not None else existing_task.description
    )

    # Update the task with title and description
    updated_task = await task_service.update_task(
        task_id=task_id,
        user_id=user_id,
        title=title,
        description=description,
    )

    # If status was provided in the request, update it separately
    if request.status is not None and updated_task.status != request.status:
        updated_task.status = request.status
        updated_task.updated_at = datetime.utcnow()

        # Commit the status change
        session.add(updated_task)
        await session.commit()
        await session.refresh(updated_task)

    return TaskResponse(
        id=updated_task.id,
        user_id=updated_task.user_id,
        title=updated_task.title,
        description=updated_task.description,
        status=updated_task.status,
        created_at=updated_task.created_at.isoformat(),
        updated_at=updated_task.updated_at.isoformat(),
    )


@router.delete("/{user_id}/tasks/{task_id}")
async def delete_task(
    user_id: str,
    task_id: int,
    session: AsyncSession = Depends(get_session),
):
    """
    Delete a task for a user.
    """
    task_service = TaskService(session)

    success = await task_service.delete_task(task_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found or access denied")

    return {"message": "Task deleted successfully"}