import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';
import VideoPlayButton from './VideoPlayButton';
import VideoControls from './VideoControls';
import VideoMobileControls from './VideoMobileControls';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

/**
 * Main video player component that handles all video functionality
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  isPlaying,
  setIsPlaying
}) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0); 
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousUrlRef = useRef<string>(videoUrl);
  const playAttemptTimeoutRef = useRef<number | null>(null);
  
  // Responsive
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  // Set up video element and event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Only reload if the URL has changed
    if (previousUrlRef.current !== videoUrl) {
      console.log('Video URL changed, reloading video');
      previousUrlRef.current = videoUrl;
      
      // Set important attributes for iOS
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');
      video.setAttribute('x-webkit-airplay', 'allow');
      video.setAttribute('preload', 'auto');
      
      // Reset state
      setIsLoading(true);
      setIsVideoReady(false);
      setPlaybackError(null);
      
      // Force load only when URL changes
      try {
        video.load();
      } catch (e) {
        console.error('Error loading video:', e);
      }
    }
    
    // Event handlers
    const handleLoadStart = () => {
      setIsLoading(true);
      console.log('Video load started');
    };
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setIsVideoReady(true);
      console.log('Video can play');
    };
    
    const handleError = (e: any) => {
      console.error('Video error:', e);
      setIsPlaying(false);
      setIsLoading(false);
      setPlaybackError(e.target.error?.message || 'Error loading video');
    };
    
    const handleTimeUpdate = () => {
      if (video && isFinite(video.duration) && isFinite(video.currentTime)) {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    };
    
    const handleLoadedMetadata = () => {
      if (video && isFinite(video.duration)) {
        setDuration(video.duration);
        setIsVideoReady(true);
        setIsLoading(false);
        console.log('Video metadata loaded, duration:', video.duration);
      }
    };
    
    // Add all event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Make video element available globally for debugging
    if (typeof window !== 'undefined') {
      (window as any).videoElement = video;
    }
    
    // Clean up event listeners
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      
      if (playAttemptTimeoutRef.current) {
        clearTimeout(playAttemptTimeoutRef.current);
      }
    };
  }, [videoUrl]);
  
  // Handle play/pause with improved error handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const attemptPlay = async (attempt: number = 1, maxAttempts: number = 3) => {
      if (!video || attempt > maxAttempts) return;
      
      try {
        // Check if video is already in desired state
        if (isPlaying === !video.paused) return;
        
        if (isPlaying) {
          // Clear any existing timeout
          if (playAttemptTimeoutRef.current) {
            clearTimeout(playAttemptTimeoutRef.current);
            playAttemptTimeoutRef.current = null;
          }
          
          // Ensure video is ready before playing
          if (video.readyState >= 2) {
            await video.play();
            console.log('Video playback started successfully');
          } else {
            console.log('Video not ready yet, waiting for canplay event');
            // Wait for canplay event before attempting playback
            const playPromise = new Promise<void>((resolve) => {
              const canPlayHandler = () => {
                video.removeEventListener('canplay', canPlayHandler);
                video.play().then(resolve).catch(e => {
                  console.error('Play error after canplay:', e);
                  resolve();
                });
              };
              video.addEventListener('canplay', canPlayHandler);
              
              // Set a timeout in case canplay never fires
              playAttemptTimeoutRef.current = window.setTimeout(() => {
                video.removeEventListener('canplay', canPlayHandler);
                console.log('Canplay timeout, trying to play anyway');
                video.play().then(resolve).catch(e => {
                  console.error('Play error after timeout:', e);
                  resolve();
                });
              }, 1000) as unknown as number;
            });
            await playPromise;
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      } catch (error) {
        console.error(`Error ${isPlaying ? 'playing' : 'pausing'} video (attempt ${attempt}):`, error);
        
        // Only retry for play attempts, not pause
        if (isPlaying && attempt < maxAttempts) {
          console.log(`Retrying play attempt ${attempt + 1}/${maxAttempts}`);
          playAttemptTimeoutRef.current = window.setTimeout(() => {
            attemptPlay(attempt + 1, maxAttempts);
          }, 300) as unknown as number;
        }
      }
    };
    
    attemptPlay();
    
    // Cleanup function
    return () => {
      if (playAttemptTimeoutRef.current) {
        clearTimeout(playAttemptTimeoutRef.current);
      }
    };
  }, [isPlaying]);
  
  // Handle play/pause toggle
  const handlePlayPause = () => {
    if (isVideoReady) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        setIsMuted(false); // Unmute when playing
      }
    }
  };
  
  // Handle mute toggle
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVideoReady || duration <= 0) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    
    // Calculate new time and update video element
    const newTime = clickPosition * duration;
    
    // Update video element directly
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    
    // Update state
    setCurrentTime(newTime);
    setProgress(clickPosition * 100);
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };
  
  // Toggle zoom
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      id="video-container"
      className={cn(
        "relative rounded-3xl overflow-hidden shadow-xl bg-black transition-all duration-500 w-full",
        isZoomed ? "aspect-auto h-[70vh] scale-[1.03]" : "aspect-video"
      )}
    >
      {/* Video overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 pointer-events-none z-10"></div>
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full bg-black z-0 object-cover"
        webkit-playsinline="true"
        playsInline
        muted={isMuted}
        poster={thumbnailUrl}
        preload="auto"
        x5-playsinline="true"
        x-webkit-airplay="allow"
        style={{
          objectFit: 'cover',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback link for iOS */}
      {playbackError && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/70">
          <div className="bg-white p-4 rounded-lg max-w-xs text-center">
            <p className="text-red-600 mb-3">Video playback error</p>
            <a 
              href="https://f003.backblazeb2.com/file/ocenagor/0508(3).mov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block"
            >
              Open video in new tab
            </a>
          </div>
        </div>
      )}
      
      {/* Play/pause overlay */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 cursor-pointer",
          isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handlePlayPause();
        }}
      >
        {!isPlaying && (
          <VideoPlayButton 
            isLoading={isLoading}
            onClick={handlePlayPause}
          />
        )}
      </div>
      
      {/* Mobile controls */}
      {isMobile && (
        <VideoMobileControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
          onMuteToggle={handleMuteToggle}
          onProgressChange={handleProgressClick}
        />
      )}
      
      {/* Desktop controls */}
      {!isMobile && (
        <VideoControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          isZoomed={isZoomed}
          isFullscreen={isFullscreen}
          onPlayPause={handlePlayPause}
          onMuteToggle={handleMuteToggle}
          onProgressChange={handleProgressClick}
          onToggleZoom={toggleZoom}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
    </div>
  );
};

export default VideoPlayer;