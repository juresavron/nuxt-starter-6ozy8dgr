import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { WarningMessageProps } from './types';

/**
 * Warning message component for lottery modals
 */
const LotteryWarningMessage: React.FC<WarningMessageProps> = ({
  title,
  message,
  icon = <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
}) => {
  return (
    <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-amber-800 mb-1">
            {title}
          </p>
          <p className="text-sm text-amber-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LotteryWarningMessage;