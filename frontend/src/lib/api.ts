import { Todo, TodoCreateRequest, TodoUpdateRequest } from '@/types/todo';

const API_BASE_URL = 'http://localhost:8000';

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
  }
  return response.json();
}

export const todoApi = {
  // Fetch all todos
  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos/`);
    return handleResponse<Todo[]>(response);
  },

  // Create new todo
  async createTodo(todoData: TodoCreateRequest): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    return handleResponse<Todo>(response);
  },

  // Update todo
  async updateTodo(id: number, updates: TodoUpdateRequest): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<Todo>(response);
  },

  // Delete todo
  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new ApiError(`Failed to delete todo: ${response.status}`, response.status);
    }
  },
};

export { ApiError }; 