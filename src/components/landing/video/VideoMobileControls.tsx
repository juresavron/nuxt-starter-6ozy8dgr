import React from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface VideoMobileControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onProgressChange: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Mobile-optimized video controls
 */
const VideoMobileControls: React.FC<VideoMobileControlsProps> = ({
  isPlaying,
  isMuted,
  progress,
  currentTime,
  duration,
  onPlayPause,
  onMuteToggle,
  onProgressChange
}) => {
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 z-30">
      {/* Progress bar */}
      <div 
        className="h-2 bg-white/30 rounded-full mb-3 cursor-pointer"
        onClick={onProgressChange}
      >
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Mobile controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={onPlayPause}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>
          
          <div className="text-xs sm:text-sm text-white/90">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <button 
          onClick={onMuteToggle}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoMobileControls;