'use client';

import React, { useState, useEffect } from 'react';

// Todo type definition
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// API base URL
const API_BASE_URL = 'http://localhost:8000';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/todos/`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  // Create new todo
  const createTodo = async () => {
    if (!newTodoTitle.trim()) return;

    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodoTitle.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
    }
  };

  // Update todo
  const updateTodo = async (id: number, updates: Partial<Pick<Todo, 'title' | 'completed'>>) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  // Toggle completion status
  const toggleTodo = (todo: Todo) => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  // Start editing
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  // Save edit
  const saveEdit = () => {
    if (editingId && editingTitle.trim()) {
      updateTodo(editingId, { title: editingTitle.trim() });
      setEditingId(null);
      setEditingTitle('');
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Calculate progress stats
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Main card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 sm:px-8 py-4 sm:py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90"></div>
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                      ✨ My Tasks
                    </h1>
                    <p className="text-indigo-100 text-sm font-medium">
                      Stay organized and productive
                    </p>
                  </div>
                  {totalCount > 0 && (
                    <div className="text-left sm:text-right">
                      <div className="text-white/90 text-sm font-medium mb-1">
                        Progress
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-bold text-lg whitespace-nowrap">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add new todo */}
            <div className="p-4 sm:p-8 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-lg text-gray-800 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white hover:shadow-md placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={createTodo}
                  disabled={!newTodoTitle.trim() || loading}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                >
                  Add Task
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="mx-4 sm:mx-8 mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg animate-in slide-in-from-top duration-300">
                <div className="flex items-center">
                  <span className="text-red-400 text-lg sm:text-xl mr-2 sm:mr-3">⚠️</span>
                  <p className="text-red-700 font-medium text-base">{error}</p>
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="px-4 sm:px-8 py-8 sm:py-12 text-center">
                <div className="relative">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                  <div className="absolute inset-0 w-10 sm:w-12 h-10 sm:h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto animation-delay-150"></div>
                </div>
                <p className="mt-3 sm:mt-4 text-gray-600 font-medium text-base">Loading your tasks...</p>
              </div>
            )}

            {/* Todo list */}
            {!loading && (
              <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                {todos.length === 0 ? (
                  <div className="px-4 sm:px-8 py-8 sm:py-12 text-center">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
                    <p className="text-gray-500 text-base">Add your first task above to get started!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {todos.map((todo, index) => (
                      <div
                        key={todo.id}
                        className="px-4 sm:px-8 py-4 sm:py-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 transition-all duration-200 group animate-in slide-in-from-bottom"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">

                          {/* Custom checkbox */}
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleTodo(todo)}
                              className="sr-only"
                            />
                            <div
                              onClick={() => toggleTodo(todo)}
                              className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${todo.completed
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg'
                                  : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                                }`}
                            >
                              {todo.completed && (
                                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>

                          {/* Todo content */}
                          <div className="flex-1 min-w-0">
                            {editingId === todo.id ? (
                              <input
                                type="text"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onBlur={(e) => {
                                  // Only save on blur if the related target is not a button
                                  if (!e.relatedTarget || !e.relatedTarget.closest('button')) {
                                    saveEdit();
                                  }
                                }}
                                autoFocus
                                className="w-full px-3 sm:px-4 py-2 text-lg text-gray-800 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                              />
                            ) : (
                              <span
                                onClick={() => startEdit(todo)}
                                className={`block cursor-pointer text-lg transition-all duration-200 ${todo.completed
                                    ? 'text-gray-500 line-through'
                                    : 'text-gray-800 hover:text-indigo-600 group-hover:text-indigo-700'
                                  } font-medium`}
                              >
                                {todo.title}
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-1 sm:gap-2 opacity-100 transition-opacity duration-200">
                            {editingId === todo.id ? (
                              <>
                                <button
                                  onClick={saveEdit}
                                  onMouseDown={(e) => e.preventDefault()}
                                  className="p-1.5 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                  title="Save"
                                >
                                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  onMouseDown={(e) => e.preventDefault()}
                                  className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                  title="Cancel"
                                >
                                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => startEdit(todo)}
                                  className="p-1.5 sm:p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                                  title="Edit"
                                >
                                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => deleteTodo(todo.id)}
                                  className="p-1.5 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                  title="Delete"
                                >
                                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer stats */}
            {!loading && todos.length > 0 && (
              <div className="px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-indigo-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
                    <span className="text-gray-600 font-medium">
                      <span className="text-indigo-600 font-bold">{todos.filter(todo => !todo.completed).length}</span> remaining
                    </span>
                    <span className="text-gray-600 font-medium">
                      <span className="text-green-600 font-bold">{completedCount}</span> completed
                    </span>
                    <span className="text-gray-600 font-medium">
                      <span className="text-purple-600 font-bold">{totalCount}</span> total
                    </span>
                  </div>
                  {completedCount > 0 && (
                    <button
                      onClick={() => {
                        const completedTodos = todos.filter(todo => todo.completed);
                        completedTodos.forEach(todo => deleteTodo(todo.id));
                      }}
                      className="text-red-600 hover:text-red-800 font-medium hover:bg-red-50 px-3 py-1.5 sm:py-1 rounded-lg transition-colors duration-200 text-sm w-full sm:w-auto text-center"
                    >
                      Clear completed
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center px-4">
            <p className="text-gray-500 text-sm">
              Built with ❤️ using Next.js and FastAPI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
