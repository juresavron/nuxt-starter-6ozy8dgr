import React from 'react';
import { cn } from '../../utils/cn';

interface VideoThumbnailProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Video thumbnail component that handles proper cropping to remove black bars
 */
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  src,
  alt = "Video thumbnail",
  className,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "relative w-full h-full overflow-hidden bg-black",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={src} 
          alt={alt}
          className="w-full object-cover"
          style={{
            objectPosition: 'center 25%', // Adjust to crop out black bars
            objectFit: 'cover',
            height: '100%',
            transform: 'scale(1.1)', // Slightly scale up to ensure no black edges
            WebkitTransform: 'translateZ(0)', // Performance optimization
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default VideoThumbnail;