import * as React from 'react';

interface FeedbackFormHeaderProps {
  title: string;
  description?: string;
  rating: number;
}

/**
 * Header component for the feedback form section
 */
const FeedbackFormHeader: React.FC<FeedbackFormHeaderProps> = ({
  title,
  description,
  rating
}) => {
  return (
    <div className="space-y-2 text-center mb-6">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
        {title}
      </h3>
      {description && (
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default React.memo(FeedbackFormHeader);