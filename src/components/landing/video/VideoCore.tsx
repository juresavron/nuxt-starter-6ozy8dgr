import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';

interface VideoCoreProps {
  videoUrl: string;
  thumbnailUrl: string;
  isMuted: boolean;
  isPlaying: boolean;
  onLoadStart: () => void;
  onCanPlay: () => void;
  onError: (error: any) => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onEnded: () => void;
  onLoadedMetadata: (duration: number) => void;
  className?: string;
}

/**
 * Core video element with all necessary attributes for iOS compatibility
 */
const VideoCore: React.FC<VideoCoreProps> = ({
  videoUrl,
  thumbnailUrl,
  isMuted,
  isPlaying,
  onLoadStart,
  onCanPlay,
  onError,
  onTimeUpdate,
  onEnded,
  onLoadedMetadata,
  className
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasAttemptedPlay, setHasAttemptedPlay] = useState(false);
  const previousUrlRef = useRef<string>(videoUrl);
  const isMountedRef = useRef<boolean>(true);
  const playAttemptTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cleanup function to clear timeouts and set mounted state
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (playAttemptTimeoutRef.current) {
        clearTimeout(playAttemptTimeoutRef.current);
      }
    };
  }, []);

  // Set up video element and event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Only reload if the URL has changed
    if (previousUrlRef.current !== videoUrl) {
      previousUrlRef.current = videoUrl;
      
      // Set important attributes for iOS
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');
      video.setAttribute('x-webkit-airplay', 'allow');
      video.setAttribute('preload', 'auto');
      
      // Force load only when URL changes
      try {
        video.load();
      } catch (e) {
        console.error('Error loading video:', e);
      }
    }
    
    // Set up event listeners
    const handleLoadStart = () => onLoadStart();
    const handleCanPlay = () => onCanPlay();
    const handleError = (e: any) => onError(e);
    const handleTimeUpdate = () => {
      if (video && isFinite(video.duration) && isFinite(video.currentTime)) {
        onTimeUpdate(video.currentTime, video.duration);
      }
    };
    const handleEnded = () => onEnded();
    const handleLoadedMetadata = () => {
      if (video && isFinite(video.duration)) {
        onLoadedMetadata(video.duration);
      }
    };
    
    // Add all event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Clean up event listeners
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoUrl, onLoadStart, onCanPlay, onError, onTimeUpdate, onEnded, onLoadedMetadata]);
  
  // Handle play/pause with improved error handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasAttemptedPlay === isPlaying) return;
    
    setHasAttemptedPlay(isPlaying);
    
    const attemptPlay = async (attempt: number = 1, maxAttempts: number = 3) => {
      if (!isMountedRef.current || !video || attempt > maxAttempts) return;
      
      try {
        // Check if video is already in desired state
        if (isPlaying === !video.paused) return;
        
        if (isPlaying) {
          // Ensure video is ready before playing
          if (video.readyState >= 2) {
            await video.play();
            console.log('Video playback started successfully');
          } else {
            // Wait for canplay event before attempting playback
            const playPromise = new Promise((resolve) => {
              const canPlayHandler = () => {
                video.removeEventListener('canplay', canPlayHandler);
                resolve(video.play());
              };
              video.addEventListener('canplay', canPlayHandler);
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
        if (isPlaying && attempt < maxAttempts && isMountedRef.current) {
          playAttemptTimeoutRef.current = setTimeout(() => {
            attemptPlay(attempt + 1, maxAttempts);
          }, 300);
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
  }, [isPlaying, hasAttemptedPlay]);
  
  return (
    <video
      ref={videoRef}
      className={cn(
        "absolute inset-0 w-full h-full bg-black z-0 object-cover",
        className
      )}
      webkit-playsinline="true"
      playsInline
      muted={isMuted}
      poster={thumbnailUrl}
      preload="auto"
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
  );
};

export default VideoCore;