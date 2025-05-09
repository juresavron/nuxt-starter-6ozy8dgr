import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

interface ProgressBarProps {
  progress: number;
  colorScheme?: string;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  colorScheme = 'indigo',
  height = 'h-2'
}) => {
  // Get progress bar color based on color scheme
  const getProgressColor = () => {
    switch (colorScheme) {
      case 'amber': return 'bg-gradient-to-r from-amber-500 to-amber-600';
      case 'emerald': return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
      case 'rose': return 'bg-gradient-to-r from-rose-500 to-rose-600';
      case 'bw': return 'bg-gradient-to-r from-gray-700 to-gray-900';
      default: return 'bg-gradient-to-r from-indigo-500 to-indigo-600';
    }
  };

  return (
    <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", height)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "h-full rounded-full",
          getProgressColor()
        )}
      />
    </div>
  );
};

export default ProgressBar;