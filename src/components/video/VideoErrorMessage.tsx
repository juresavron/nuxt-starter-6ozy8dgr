import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface VideoErrorMessageProps {
  message: string;
  fallbackUrl?: string;
}

const VideoErrorMessage: React.FC<VideoErrorMessageProps> = ({
  message,
  fallbackUrl
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-30 p-4">
      <div className="bg-white p-4 rounded-lg max-w-xs text-center">
        <div className="flex justify-center mb-3">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-red-600 mb-3 font-medium">{message}</p>
        {fallbackUrl && (
          <a 
            href={fallbackUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block hover:bg-blue-700 transition-colors"
          >
            Open video in new tab
          </a>
        )}
      </div>
    </div>
  );
};

export default VideoErrorMessage;