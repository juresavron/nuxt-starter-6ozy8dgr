import React, { useState, useEffect, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  fallbackSrc?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Optimized image component with WebP support, lazy loading, and error handling
 */
const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  fallbackSrc,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  
  // Log when the component mounts or updates
  useEffect(() => {
    console.log(`OptimizedImage: Rendering with src=${src}, fallbackSrc=${fallbackSrc || 'none'}`);
  }, [src, fallbackSrc]);
  
  // Generate WebP URL for Unsplash images
  const getWebPUrl = (url: string): string => {
    if (url.includes('unsplash.com') && !url.includes('&fm=webp')) {
      return `${url}${url.includes('?') ? '&' : '?'}fm=webp`;
    }
    return url;
  };
  
  const webpSrc = getWebPUrl(src);
  
  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    setImgSrc(src);
  }, [src]);
  
  // Set loading and fetchpriority attributes
  const loadingAttr = priority ? 'eager' : loading;
  const fetchPriorityAttr = priority ? 'high' : 'auto';
  
  // Handle error by using fallback if available
  const handleError = () => {
    console.log(`OptimizedImage: Error loading image: ${imgSrc}`);
    setError(true);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      console.log(`OptimizedImage: Switching to fallback: ${fallbackSrc}`);
      setImgSrc(fallbackSrc);
    }
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!error && (
        <picture>
          {/* WebP version for modern browsers */}
          <source srcSet={webpSrc} type="image/webp" />
          
          {/* Original image as fallback */}
          <img
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loadingAttr}
            fetchPriority={fetchPriorityAttr as any}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit }}
          />
        </picture>
      )}
      
      {/* Show placeholder while loading or error state */}
      {(!isLoaded || error) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {error ? (
            <span className="text-sm text-gray-500">Image not available</span>
          ) : (
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
});

export default OptimizedImage;