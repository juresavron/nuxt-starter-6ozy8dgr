import * as React from 'react';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  transparent?: boolean;
  fullScreen?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Loading...', 
  transparent = false,
  fullScreen = true
}) => {
  return (
    <div className={`${fullScreen ? 'fixed inset-0' : 'absolute inset-0'} ${transparent ? 'bg-white/0' : 'bg-white/80 backdrop-blur-sm'} flex items-center justify-center z-50`}>
      <div className={`flex flex-col items-center gap-4 ${transparent ? 'opacity-0' : 'opacity-100'}`}>
        <Loader2 className={`h-8 w-8 text-indigo-600 animate-spin ${transparent ? 'opacity-0' : ''}`} />
        <p className={`text-gray-600 font-medium ${transparent ? 'opacity-0' : ''}`}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;