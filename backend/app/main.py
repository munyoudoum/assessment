from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# TODO: Import your todos router here
# from app.routers import todos

# Create FastAPI instance
app = FastAPI(
    title="Todo API",
    description="A simple todo management API built with FastAPI",
    version="1.0.0",
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: Include your todos router
# app.include_router(todos.router, prefix="/todos", tags=["todos"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Todo API is running!"}
