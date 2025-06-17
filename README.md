# Backend Coding Assessment - FastAPI Todo API

## Overview

This assessment evaluates your ability to build a RESTful API using FastAPI. You'll be creating the backend for a todo management system. Ideally this back end could be used by [front end coding assessment](https://github.com/topschool-ai/fe-coding-assessment). This assessment should cover:

- FastAPI application structure
- Pydantic models for data validation
- HTTP methods and status codes
- Request/response handling
- Error handling and validation
- CORS configuration

## Getting Started

### Prerequisites

- Python 3.12+
- This project uses `uv` for dependency management

### Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   uv sync
   ```
3. Run the development server:
   ```bash
   uv run uvicorn app.main:app --reload
   ```

The API will be available at `http://localhost:8000`

## Assessment Tasks

You need to implement a complete CRUD API for managing todos. The API should handle the following operations:

### Task 1: Data Models

Create Pydantic models in `app/models.py`:

- **Todo model** with fields: `id` (int), `title` (str), `completed` (bool)
- **Request models** for creating and updating todos
- **Response models** for API responses

### Task 2: In-Memory Database

Implement basic data storage in `app/database.py`, you can implement this in any way you like:

- Initialize with sample todo data
- Provide functions for CRUD operations
- Handle ID generation for new todos

### Task 3: API Endpoints

Implement the following endpoints in `app/routers/todos.py`:

#### GET /todos

- Returns all todos
- Response: `200 OK` with list of todos

#### POST /todos

- Creates a new todo
- Request body: `{"title": "Your todo title"}`
- Response: `201 Created` with created todo
- Validation: title is required and non-empty

#### PUT /todos/{}

- Updates an existing todo
- Request body: `{"title": "Updated title", "completed": true}` (both fields optional)
- Response: `200 OK` with updated todo
- Response: `404 Not Found` if todo doesn't exist

#### DELETE /todos/

- Deletes a todo
- Response: `204 No Content` on success
- Response: `404 Not Found` if todo doesn't exist

### Task 4: FastAPI Application Setup

Configure the main FastAPI app in `app/main.py`:

- Include the todos router
- Add basic error handling

### Task 5: Error Handling

Implement proper error responses:

- `400 Bad Request` for validation errors
- `404 Not Found` for non-existent resources
- `422 Unprocessable Entity` for invalid request data

## API Contract Specification

### Todo Data Structure

```json
{
  "id": 1,
  "title": "Complete the assessment",
  "completed": false
}
```

### Request/Response Examples

**GET /todos**

```json
Response (200):
[
  {
    "id": 1,
    "title": "Write documentation",
    "completed": false
  },
  {
    "id": 2,
    "title": "Review code",
    "completed": true
  }
]
```

**POST /todos**

```json
Request:
{
  "title": "New todo item"
}

Response (201):
{
  "id": 3,
  "title": "New todo item",
  "completed": false
}
```

**PUT /todos/1**

```json
Request:
{
  "title": "Updated todo title",
  "completed": true
}

Response (200):
{
  "id": 1,
  "title": "Updated todo title",
  "completed": true
}
```

**DELETE /todos/1**

```
Response: 204 No Content
```

## Helpful Resources

These are some helpful resources to use if you're not entirely familiar.

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Testing Your Implementation

Once completed, you can test your API using:

- FastAPI's automatic documentation at `http://localhost:8000/docs`
- curl commands or tools like Postman
- The browser for GET endpoints

## Submission

Ensure your code:

- Runs without errors using `uv run uvicorn app.main:app --reload`
- Implements all required endpoints
- Handles edge cases and errors appropriately
- Follows Python and FastAPI conventions
