'use client';

import React from 'react';
import { useTodos } from '@/hooks';
import { TodoForm, TodoList, TodoStats } from '@/components/todo';
import { ProgressBar, ErrorMessage, LoadingSpinner } from '@/components/ui';

export default function TodoApp() {
  const { todos, loading, error, stats, actions } = useTodos();

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
                  <ProgressBar 
                    percentage={stats.progressPercentage} 
                    totalCount={stats.total} 
                  />
                </div>
              </div>
            </div>

            {/* Add new todo */}
            <TodoForm onSubmit={actions.createTodo} loading={loading} />

            {/* Error message */}
            {error && <ErrorMessage message={error} />}

            {/* Loading state */}
            {loading && <LoadingSpinner />}

            {/* Todo list */}
            {!loading && (
              <TodoList
                todos={todos}
                loading={loading}
                onToggle={actions.toggleTodo}
                onUpdate={actions.updateTodo}
                onDelete={actions.deleteTodo}
              />
            )}

            {/* Footer stats */}
            <TodoStats
              total={stats.total}
              completed={stats.completed}
              remaining={stats.remaining}
              loading={loading}
            />
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
