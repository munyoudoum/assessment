from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models import Todo, TodoCreate, TodoUpdate
from app import database

router = APIRouter()

def _validate_title(title: str, field_name: str = "Title") -> str:
    """
    Validate and clean title input.
    
    Args:
        title: The title string to validate
        field_name: Name of the field for error messages
        
    Returns:
        Cleaned title string
        
    Raises:
        HTTPException: If title is empty or invalid
    """
    if not title or not title.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{field_name} is required and cannot be empty"
        )
    return title.strip()

def _get_todo_or_404(todo_id: int) -> dict:
    """
    Get todo by ID or raise 404 error.
    
    Args:
        todo_id: The ID of the todo to retrieve
        
    Returns:
        Todo dictionary
        
    Raises:
        HTTPException: If todo not found
    """
    todo = database.get_todo_by_id(todo_id)
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    return todo

@router.get("/", response_model=List[Todo])
async def get_todos():
    """Get all todos"""
    return database.get_all_todos()

@router.post("/", response_model=Todo, status_code=status.HTTP_201_CREATED)
async def create_todo(todo_data: TodoCreate):
    """Create a new todo"""
    cleaned_title = _validate_title(todo_data.title)
    return database.create_todo(cleaned_title)

@router.put("/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo_data: TodoUpdate):
    """Update an existing todo"""
    # Ensure todo exists before attempting update
    _get_todo_or_404(todo_id)
    
    # Validate and clean title if provided
    title_to_update = None
    if todo_data.title is not None:
        title_to_update = _validate_title(todo_data.title)
    
    # Perform update
    updated_todo = database.update_todo(
        todo_id=todo_id,
        title=title_to_update,
        completed=todo_data.completed
    )
    
    # This should not happen given our validation above, but defensive programming
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    
    return updated_todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: int):
    """Delete a todo"""
    # Ensure todo exists before attempting deletion
    _get_todo_or_404(todo_id)
    
    # Perform deletion
    deleted = database.delete_todo(todo_id)
    
    # This should not happen given our validation above, but defensive programming
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    
    return  # No content response
