import React, { useState, useEffect, memo, useCallback } from 'react';
import { getWebPUrl } from '../../utils/imageOptimizer';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
  priority?: boolean;
}

/**
 * Optimized image component with lazy loading, WebP support, and placeholder
 */
const LazyImage = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderColor = '#f3f4f6',
  priority = false
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate WebP URL
  const webpSrc = getWebPUrl(src);
  
  // Set loading attribute based on priority
  const loadingAttr = priority ? 'eager' : 'lazy';
  
  // Calculate aspect ratio for placeholder
  const aspectRatio = width && height ? (height / width) : undefined;
  
  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setError(false);
    
    // Preload image if priority is true
    if (priority && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        backgroundColor: placeholderColor,
        paddingTop: aspectRatio ? `${aspectRatio * 100}%` : undefined,
        width: width ? `${width}px` : '100%',
        height: height && !aspectRatio ? `${height}px` : undefined
      }}
    >
      {!error && (
        <picture>
          {/* WebP version for modern browsers */}
          <source srcSet={webpSrc} type="image/webp" />
          
          {/* Original image as fallback */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loadingAttr}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
      )}
      
      {/* Show placeholder or error state */}
      {(!isLoaded || error) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {error ? (
            <span className="text-sm text-gray-500">Failed to load image</span>
          ) : (
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
});

export default LazyImage;