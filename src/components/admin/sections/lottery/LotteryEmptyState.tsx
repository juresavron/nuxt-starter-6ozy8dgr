import React from 'react';
import { Award } from 'lucide-react';

interface LotteryEmptyStateProps {
  message: string;
}

const LotteryEmptyState: React.FC<LotteryEmptyStateProps> = ({ message }) => {
  return (
    <div className="bg-white shadow rounded-lg p-8 text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
        <Award className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">{message}</h3>
      <p className="mt-2 text-sm text-gray-500">
        Lottery entries will appear here when customers participate in your lottery.
      </p>
    </div>
  );
};

export default LotteryEmptyState;