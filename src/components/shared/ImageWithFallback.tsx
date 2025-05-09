import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Reset state when src changes
    setImgSrc(src);
    setHasError(false);
  }, [src]);
  
  return (
    <img
      src={imgSrc}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding} 
      crossOrigin="anonymous"
      onError={(e) => {
        if (!hasError) {
          setImgSrc(fallbackSrc);
          setHasError(true);
        }
      }}
    />
  );
};

export default React.memo(ImageWithFallback);
export { ImageWithFallback as I };