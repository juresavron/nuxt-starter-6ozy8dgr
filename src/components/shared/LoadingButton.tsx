import * as React from 'react';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {loading && (
        <Loader2 className="absolute h-5 w-5 animate-spin" />
      )}
      <span className={loading ? 'invisible' : ''}>
        {loading ? loadingText : children}
      </span>
    </button>
  );
};

export default LoadingButton;