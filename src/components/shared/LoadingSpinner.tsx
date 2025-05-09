import * as React from 'react';
import { useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'gray';
  className?: string; 
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'indigo',
  className = '',
  fullScreen = false
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    none: 'h-0 w-0'
  };

  const colors = {
    indigo: 'border-blue-200 border-t-blue-600',
    blue: 'border-blue-200 border-t-blue-600',
    emerald: 'border-emerald-200 border-t-emerald-600',
    amber: 'border-amber-200 border-t-amber-600',
    rose: 'border-rose-200 border-t-rose-600',
    gray: 'border-gray-200 border-t-gray-600',
  };

  // Return null for invisible spinner
  if (size === 'none') return null;

  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : ''} ${className} ios-optimized`} role="status">
      <div 
        className={`${sizes[size]} animate-spin rounded-full border-[3px] ${colors[color]} ios-optimized`}
        aria-label="Loading"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default React.memo(LoadingSpinner);