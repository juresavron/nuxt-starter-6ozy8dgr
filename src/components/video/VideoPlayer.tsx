import React, { useState, useEffect, useRef } from 'react';
import VideoControls from './VideoControls';
import VideoPlayButton from './VideoPlayButton';
import VideoErrorMessage from './VideoErrorMessage';
import VideoThumbnail from './VideoThumbnail';
import { useWindowSize } from 'react-use';
import { cn } from '../../utils/cn';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  className,
  onPlay,
  onPause,
  onEnd,
  onError
}) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  
  // Window size for responsive behavior
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // Hide controls after inactivity
  useEffect(() => {
    if (isPlaying && controlsVisible) {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
      
      controlsTimeoutRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, controlsVisible]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
    };
    const handleDurationChange = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnd) onEnd();
    };
    const handleError = (e: any) => {
      console.error('Video error:', e);
      setError('Error playing video. Please try the fallback link below.');
      setIsLoading(false);
      if (onError) onError(e);
    };
    
    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    
    // Clean up
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onEnd, onError]);

  // Handle play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
          setIsPlaying(false);
        });
      }
      if (onPlay) onPlay();
    } else {
      video.pause();
      if (onPause) onPause();
    }
  }, [isPlaying, onPlay, onPause]);

  // Toggle play/pause
  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsMuted(false);
    }
    setIsPlaying(!isPlaying);
    setControlsVisible(true);
  };

  // Toggle mute
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    setControlsVisible(true);
  };

  // Seek to position
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    video.currentTime = pos * video.duration;
    setControlsVisible(true);
  };

  // Toggle fullscreen
  const handleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
    
    setControlsVisible(true);
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setControlsVisible(true);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-black rounded-xl shadow-xl",
        isFullscreen ? "w-full h-full" : "aspect-video w-full",
        className
      )}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full bg-black z-0"
        webkit-playsinline="true"
        playsInline
        muted={isMuted}
        preload="auto"
        x5-playsinline="true"
        x-webkit-airplay="allow"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
      
      {/* Custom thumbnail that properly crops out black bars */}
      {!isPlaying && (
        <VideoThumbnail 
          src={thumbnailUrl} 
          alt="Video thumbnail" 
          className="absolute inset-0 z-5"
        />
      )}
      
      {/* Loading overlay */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <VideoErrorMessage 
          message={error} 
          fallbackUrl="/video-fallback.html" 
        />
      )}
      
      {/* Play button overlay */}
      {!isPlaying && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <VideoPlayButton 
            onClick={handlePlayPause} 
            isLoading={isLoading} 
          />
        </div>
      )}
      
      {/* Video controls */}
      {controlsVisible && !error && (
        <VideoControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          isFullscreen={isFullscreen}
          isMobile={isMobile}
          onPlayPause={handlePlayPause}
          onMuteToggle={handleMuteToggle}
          onSeek={handleSeek}
          onFullscreen={handleFullscreen}
        />
      )}
    </div>
  );
};

export default VideoPlayer;