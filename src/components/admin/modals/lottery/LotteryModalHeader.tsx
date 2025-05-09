import React from 'react';
import { Trophy } from 'lucide-react';
import type { ModalHeaderProps } from './types';

/**
 * Header component for lottery modals
 */
const LotteryModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  icon = <Trophy className="h-6 w-6 text-amber-600" style={{ fill: 'rgba(251, 191, 36, 0.2)' }} />,
  description
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

export default LotteryModalHeader;