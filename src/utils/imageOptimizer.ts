/**
 * Utility functions for image optimization
 */

/**
 * Generates a WebP source URL from a regular image URL
 * @param url Original image URL
 * @param quality Optional quality parameter (0-100)
 * @returns WebP version of the URL
 */
export const getWebPUrl = (url: string, quality: number = 80): string => {
  // For Unsplash images
  if (url.includes('unsplash.com')) {
    // Add WebP format if not already present
    if (!url.includes('&fm=webp')) {
      return `${url}&fm=webp&q=${quality}`;
    }
  }
  
  // For Supabase storage URLs
  if (url.includes('supabase.co/storage/v1/object/public')) {
    // Add WebP transformation if supported by your storage setup
    // This would depend on your specific Supabase storage configuration
    return url;
  }
  
  // Return original URL if no transformations can be applied
  return url;
};

/**
 * Generates responsive image srcSet for different viewport sizes
 * @param url Base image URL
 * @param widths Array of widths to generate
 * @returns srcSet string
 */
export const generateSrcSet = (url: string, widths: number[] = [320, 640, 960, 1280]): string => {
  // For Unsplash images
  if (url.includes('unsplash.com')) {
    return widths
      .map(width => {
        // Add width parameter to URL
        const widthUrl = url.includes('?') 
          ? `${url}&w=${width}` 
          : `${url}?w=${width}`;
        return `${widthUrl} ${width}w`;
      })
      .join(', ');
  }
  
  // Return original URL if no transformations can be applied
  return url;
};

/**
 * Calculates appropriate sizes attribute for responsive images
 * @param defaultSize Default size as percentage of viewport width
 * @param breakpoints Breakpoint configurations
 * @returns sizes attribute string
 */
export const generateSizes = (
  defaultSize: string = '100vw',
  breakpoints: { minWidth: number; size: string }[] = []
): string => {
  if (breakpoints.length === 0) {
    return defaultSize;
  }
  
  // Sort breakpoints by minWidth in descending order
  const sortedBreakpoints = [...breakpoints].sort((a, b) => b.minWidth - a.minWidth);
  
  // Generate sizes string
  const sizesArr = sortedBreakpoints.map(bp => `(min-width: ${bp.minWidth}px) ${bp.size}`);
  sizesArr.push(defaultSize);
  
  return sizesArr.join(', ');
};