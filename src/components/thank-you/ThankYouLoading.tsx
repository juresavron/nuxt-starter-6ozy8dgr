import React from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';

interface ThankYouLoadingProps {
  colorScheme?: string;
}

const ThankYouLoading: React.FC<ThankYouLoadingProps> = ({
  colorScheme = 'indigo'
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90 flex items-center justify-center px-4 py-12">
      <LoadingSpinner size="lg" color={colorScheme} />
    </div>
  );
};

export default ThankYouLoading;