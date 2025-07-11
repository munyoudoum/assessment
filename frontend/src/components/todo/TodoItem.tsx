import { useState } from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (todo: Todo) => void;
  onUpdate: (id: number, updates: { title?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoItem({ todo, index, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const startEdit = () => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const saveEdit = async () => {
    if (editingTitle.trim()) {
      await onUpdate(todo.id, { title: editingTitle.trim() });
      setEditingId(null);
      setEditingTitle('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const isEditing = editingId === todo.id;

  return (
    <div
      className="px-4 sm:px-8 py-4 sm:py-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 transition-all duration-200 group animate-in slide-in-from-bottom"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Custom checkbox */}
        <div className="relative">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            className="sr-only"
          />
          <div
            onClick={() => onToggle(todo)}
            className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
              todo.completed
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
          {isEditing ? (
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  saveEdit();
                }
                if (e.key === 'Escape') {
                  e.preventDefault();
                  cancelEdit();
                }
              }}
              autoFocus
              className="w-full px-3 sm:px-4 py-2 text-lg text-gray-800 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            />
          ) : (
            <span
              onClick={startEdit}
              className={`block cursor-pointer text-lg transition-all duration-200 ${
                todo.completed
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
          {isEditing ? (
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
                onClick={startEdit}
                className="p-1.5 sm:p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                title="Edit"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(todo.id)}
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
  );
} 