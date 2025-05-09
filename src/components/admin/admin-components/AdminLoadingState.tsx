import React from 'react';
import LoadingSpinner from '../../shared/LoadingSpinner';

/**
 * Loading state component for the admin panel
 */
const AdminLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingSpinner size="lg" color="indigo" />
      <p className="mt-4 text-gray-600">Loading admin panel...</p>
    </div>
  );
};

export default AdminLoadingState;