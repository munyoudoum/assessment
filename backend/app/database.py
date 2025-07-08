# TODO: Implement your in-memory database here
#
# You'll need:
# 1. A list or dictionary to store todos
# 2. Functions to perform CRUD operations
# 3. ID generation for new todos
#
# Example structure:
# todos_db = [
#     {"id": 1, "title": "Write documentation", "completed": False},
#     {"id": 2, "title": "Review code", "completed": True},
# ]
#
# def get_all_todos():
#     return todos_db
#
# def get_todo_by_id(todo_id: int):
#     # Implementation here
#     pass
#
# def create_todo(title: str):
#     # Implementation here
#     pass
#
# def update_todo(todo_id: int, title: str = None, completed: bool = None):
#     # Implementation here
#     pass
#
# def delete_todo(todo_id: int):
#     # Implementation here
#     pass

from typing import List, Optional
from app.models import Todo

# In-memory database with sample data
todos_db: List[dict] = [
    {"id": 1, "title": "Write documentation", "completed": False},
    {"id": 2, "title": "Review code", "completed": True},
    {"id": 3, "title": "Test the API", "completed": False},
]

# Keep track of the next available ID
next_id = 4

def get_all_todos() -> List[dict]:
    """Get all todos from the database"""
    return todos_db

def get_todo_by_id(todo_id: int) -> Optional[dict]:
    """Get a specific todo by ID"""
    for todo in todos_db:
        if todo["id"] == todo_id:
            return todo
    return None

def create_todo(title: str) -> dict:
    """Create a new todo and return it"""
    global next_id
    new_todo = {
        "id": next_id,
        "title": title,
        "completed": False
    }
    todos_db.append(new_todo)
    next_id += 1
    return new_todo

def update_todo(todo_id: int, title: Optional[str] = None, completed: Optional[bool] = None) -> Optional[dict]:
    """Update an existing todo and return it, or None if not found"""
    todo = get_todo_by_id(todo_id)
    if not todo:
        return None
    
    # Update fields only if provided
    if title is not None:
        todo["title"] = title
    if completed is not None:
        todo["completed"] = completed
    
    return todo

def delete_todo(todo_id: int) -> bool:
    """Delete a todo by ID. Returns True if deleted, False if not found"""
    global todos_db
    for i, todo in enumerate(todos_db):
        if todo["id"] == todo_id:
            todos_db.pop(i)
            return True
    return False
