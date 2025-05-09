import React from 'react';
import LoadingSpinner from '../../../shared/LoadingSpinner';

interface ContactLoadingStateProps {
  message?: string;
}

/**
 * Loading state component for contact requests
 */
const ContactLoadingState: React.FC<ContactLoadingStateProps> = ({
  message = 'Loading contact requests...'
}) => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <LoadingSpinner size="lg" color="indigo" />
      <p className="ml-4 text-gray-600">{message}</p>
    </div>
  );
};

export default React.memo(ContactLoadingState);