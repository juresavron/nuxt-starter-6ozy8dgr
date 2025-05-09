import React from 'react';

// Feedback options component
export const FeedbackOptions = React.memo(function FeedbackOptions({ options }: { options?: string[] | null }) {
  return (
    <div className="max-w-[250px]">
      {options && options.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {options.map((option, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"
              title={option}
            >
              {option.length > 20 ? `${option.substring(0, 18)}...` : option}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-sm text-gray-400">Brez izbire</span>
      )}
    </div>
  );
});