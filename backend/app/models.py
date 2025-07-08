from pydantic import BaseModel
from typing import Optional

# TODO: Define your Pydantic models here
#
# You'll need:
# 1. A Todo model with id, title, and completed fields
# 2. A TodoCreate model for creating new todos (no id needed)
# 3. A TodoUpdate model for updating todos (all fields optional)

class Todo(BaseModel):
    """Main Todo model with all fields"""
    id: int
    title: str
    completed: bool = False

class TodoCreate(BaseModel):
    """Model for creating new todos (no id needed)"""
    title: str
    
    class Config:
        # Example for API docs
        json_schema_extra = {
            "example": {
                "title": "Complete the assessment"
            }
        }

class TodoUpdate(BaseModel):
    """Model for updating todos (all fields optional)"""
    title: Optional[str] = None
    completed: Optional[bool] = None
    
    class Config:
        # Example for API docs
        json_schema_extra = {
            "example": {
                "title": "Updated todo title",
                "completed": True
            }
        }
