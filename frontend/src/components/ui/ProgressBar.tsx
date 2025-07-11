interface ProgressBarProps {
  percentage: number;
  totalCount: number;
}

export function ProgressBar({ percentage, totalCount }: ProgressBarProps) {
  if (totalCount === 0) return null;

  return (
    <div className="text-left sm:text-right">
      <div className="text-white/90 text-sm font-medium mb-1">
        Progress
      </div>
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <div className="flex-1 sm:w-16 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-white font-bold text-lg whitespace-nowrap">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
} 