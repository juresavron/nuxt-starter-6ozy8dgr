import React from 'react';
import { Pause, Play, Volume2, VolumeX, Maximize } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  isZoomed: boolean;
  isFullscreen: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onProgressChange: (e: React.MouseEvent<HTMLDivElement>) => void;
  onToggleZoom: () => void;
  onToggleFullscreen: () => void;
}

/**
 * Desktop video controls component
 */
const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  progress,
  currentTime,
  duration,
  isZoomed,
  isFullscreen,
  onPlayPause,
  onMuteToggle,
  onProgressChange,
  onToggleZoom,
  onToggleFullscreen
}) => {
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <div className={cn(
      "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 z-30 transition-opacity duration-300",
      isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
    )}>
      {/* Progress bar */}
      <div 
        className="h-1.5 sm:h-2 bg-white/30 rounded-full mb-3 cursor-pointer"
        onClick={onProgressChange}
      >
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onPlayPause}
            className="text-white hover:text-blue-300 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Play className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
          
          <div className="text-xs sm:text-sm text-white/90">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onMuteToggle}
            className="text-white hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-full p-1"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
          
          <button 
            onClick={onToggleZoom}
            className="text-white hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-full p-1 mr-2"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <Maximize className={cn("h-5 w-5 sm:h-6 sm:w-6 transition-transform", isZoomed && "rotate-45")} />
          </button>
          
          <button 
            onClick={onToggleFullscreen}
            className="text-white hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-full p-1"
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            <Maximize className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;