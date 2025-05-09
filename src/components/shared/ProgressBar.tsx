import React, { useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'indigo',
  height = '4',
  showLabel = true,
  animate = true
}) => {
  return (
    <div className="relative">
      <div className={`h-${height} bg-gray-100 rounded-full overflow-hidden shadow-inner`}>
        <div
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 ${
            animate ? 'transition-all duration-500' : ''
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <div className="absolute -top-6 right-0 text-sm font-medium text-gray-600">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;