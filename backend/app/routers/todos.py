from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models import Todo, TodoCreate, TodoUpdate
from app import database

router = APIRouter()

@router.get("/", response_model=List[Todo])
async def get_todos():
    """Get all todos"""
    todos = database.get_all_todos()
    return todos

@router.post("/", response_model=Todo, status_code=status.HTTP_201_CREATED)
async def create_todo(todo_data: TodoCreate):
    """Create a new todo"""
    if not todo_data.title.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title is required and cannot be empty"
        )
    
    new_todo = database.create_todo(todo_data.title.strip())
    return new_todo

@router.put("/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo_data: TodoUpdate):
    """Update an existing todo"""
    # Validate title if provided
    if todo_data.title is not None and not todo_data.title.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title cannot be empty"
        )
    
    # Prepare title for update (strip whitespace if provided)
    title_to_update = todo_data.title.strip() if todo_data.title is not None else None
    
    updated_todo = database.update_todo(
        todo_id=todo_id,
        title=title_to_update,
        completed=todo_data.completed
    )
    
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    
    return updated_todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: int):
    """Delete a todo"""
    deleted = database.delete_todo(todo_id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    
    return  # No content response
