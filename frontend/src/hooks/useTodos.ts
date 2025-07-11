import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoUpdateRequest } from '@/types/todo';
import { todoApi, ApiError } from '@/lib/api';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : err instanceof Error 
        ? err.message 
        : 'Failed to fetch todos';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new todo
  const createTodo = useCallback(async (title: string) => {
    if (!title.trim()) return;

    try {
      setError(null);
      const newTodo = await todoApi.createTodo({ title: title.trim() });
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : err instanceof Error 
        ? err.message 
        : 'Failed to create todo';
      setError(message);
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id: number, updates: TodoUpdateRequest) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : err instanceof Error 
        ? err.message 
        : 'Failed to update todo';
      setError(message);
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (id: number) => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : err instanceof Error 
        ? err.message 
        : 'Failed to delete todo';
      setError(message);
    }
  }, []);

  // Toggle completion status
  const toggleTodo = useCallback((todo: Todo) => {
    updateTodo(todo.id, { completed: !todo.completed });
  }, [updateTodo]);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Calculate stats
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    remaining: todos.filter(todo => !todo.completed).length,
    progressPercentage: todos.length > 0 ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0,
  };

  return {
    todos,
    loading,
    error,
    stats,
    actions: {
      createTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      fetchTodos,
    },
  };
} 