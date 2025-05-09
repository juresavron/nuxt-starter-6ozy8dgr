import React from 'react';
import LoadingSpinner from '../../../shared/LoadingSpinner';

interface CouponLoadingStateProps {
  message?: string;
}

/**
 * Loading state component for coupons
 */
const CouponLoadingState: React.FC<CouponLoadingStateProps> = ({
  message = 'Loading coupons...'
}) => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <LoadingSpinner size="lg" color="indigo" />
      <p className="ml-4 text-gray-600">{message}</p>
    </div>
  );
};

export default React.memo(CouponLoadingState);