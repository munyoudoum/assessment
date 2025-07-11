interface TodoStatsProps {
  total: number;
  completed: number;
  remaining: number;
  loading: boolean;
}

export function TodoStats({ total, completed, remaining, loading }: TodoStatsProps) {
  if (loading || total === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-indigo-50 border-t border-gray-100">
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm justify-center">
        <span className="text-gray-600 font-medium">
          <span className="text-indigo-600 font-bold">{remaining}</span> remaining
        </span>
        <span className="text-gray-600 font-medium">
          <span className="text-green-600 font-bold">{completed}</span> completed
        </span>
        <span className="text-gray-600 font-medium">
          <span className="text-purple-600 font-bold">{total}</span> total
        </span>
      </div>
    </div>
  );
} 