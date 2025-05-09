import React from 'react';
import { RefreshCw, Download } from 'lucide-react';

interface LotteryHeaderProps {
  title: string;
  onRefresh: () => void;
  refreshing: boolean;
  onExport: () => void;
}

const LotteryHeader: React.FC<LotteryHeaderProps> = ({
  title,
  onRefresh,
  refreshing,
  onExport
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      
      <div className="flex space-x-2">
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>
    </div>
  );
};

export default LotteryHeader;