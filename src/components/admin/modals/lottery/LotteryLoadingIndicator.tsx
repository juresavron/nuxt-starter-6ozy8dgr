import React from 'react';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import type { LoadingIndicatorProps } from './types';

/**
 * Loading indicator component for lottery modals
 */
const LotteryLoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  color = 'amber'
}) => {
  return (
    <div className="flex items-center justify-center py-4">
      <LoadingSpinner size="md" color={color} />
      <span className="ml-3 text-amber-700">{message}</span>
    </div>
  );
};

export default LotteryLoadingIndicator;