import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { cn } from '../../utils/cn';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  isMobile: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFullscreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  progress,
  currentTime,
  duration,
  isFullscreen,
  isMobile,
  onPlayPause,
  onMuteToggle,
  onSeek,
  onFullscreen
}) => {
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 z-30">
      {/* Progress bar */}
      <div 
        className="h-1.5 sm:h-2 bg-white/30 rounded-full mb-3 cursor-pointer"
        onClick={onSeek}
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
            className="text-white hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-full p-1"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className={cn("transition-transform", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            ) : (
              <Play className={cn("transition-transform", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            )}
          </button>
          
          {!isMobile && (
            <div className="text-xs sm:text-sm text-white/90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onMuteToggle}
            className="text-white hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-full p-1"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className={cn("transition-transform", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            ) : (
              <Volume2 className={cn("transition-transform", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            )}
          </button>
          
          {isMobile && (
            <div className="text-xs text-white/90">
              {formatTime(currentTime)}
            </div>
          )}
          
          <button 
            onClick={onFullscreen}
            className="text-white hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-full p-1"
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className={cn("transition-transform", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            ) : (
              <Maximize className={cn("transition-transform", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;