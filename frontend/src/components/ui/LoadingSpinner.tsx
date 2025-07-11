export function LoadingSpinner() {
  return (
    <div className="px-4 sm:px-8 py-8 sm:py-12 text-center">
      <div className="relative">
        <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
        <div className="absolute inset-0 w-10 sm:w-12 h-10 sm:h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto animation-delay-150"></div>
      </div>
      <p className="mt-3 sm:mt-4 text-gray-600 font-medium text-base">Loading your tasks...</p>
    </div>
  );
} 