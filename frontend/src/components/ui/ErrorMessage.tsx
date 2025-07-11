interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mx-4 sm:mx-8 mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg animate-in slide-in-from-top duration-300">
      <div className="flex items-center">
        <span className="text-red-400 text-lg sm:text-xl mr-2 sm:mr-3">⚠️</span>
        <p className="text-red-700 font-medium text-base">{message}</p>
      </div>
    </div>
  );
} 