import React from 'react';

const LotteryLoadingState: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          <div className="h-4 bg-gray-200 rounded col-span-2"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          <div className="h-4 bg-gray-200 rounded col-span-2"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          <div className="h-4 bg-gray-200 rounded col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LotteryLoadingState;