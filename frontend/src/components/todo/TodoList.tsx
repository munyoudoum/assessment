import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { EmptyState } from '@/components/ui/EmptyState';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onToggle: (todo: Todo) => void;
  onUpdate: (id: number, updates: { title?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoList({ todos, loading, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (loading) {
    return null; // Loading is handled by parent component
  }

  return (
    <div className="max-h-80 sm:max-h-96 overflow-y-auto">
      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="divide-y divide-gray-100">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
} 