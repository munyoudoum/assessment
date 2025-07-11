import { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => Promise<void>;
  loading: boolean;
}

export function TodoForm({ onSubmit, loading }: TodoFormProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = async () => {
    if (!newTodoTitle.trim()) return;
    
    await onSubmit(newTodoTitle);
    setNewTodoTitle('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 sm:p-8 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-lg text-gray-800 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white hover:shadow-md placeholder-gray-400"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!newTodoTitle.trim() || loading}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
        >
          Add Task
        </button>
      </div>
    </div>
  );
} 