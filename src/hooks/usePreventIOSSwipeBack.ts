import { useEffect } from 'react';

/**
 * Hook to prevent iOS Safari swipe back gesture
 * This works by overriding the default iOS Safari behavior
 */
export const usePreventIOSSwipeBack = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (!isIOS) return;
    
    // Save the original overflow and overscrollBehavior
    const originalOverscrollBehavior = document.body.style.overscrollBehavior;
    
    // Apply CSS to prevent swipe back
    document.body.style.overscrollBehavior = 'contain';
    
    // Add a transparent div that covers the left edge of the screen
    // This prevents the swipe gesture from being detected
    const edgeBlocker = document.createElement('div');
    edgeBlocker.id = 'ios-edge-blocker';
    edgeBlocker.style.position = 'fixed';
    edgeBlocker.style.top = '0';
    edgeBlocker.style.left = '0';
    edgeBlocker.style.width = '20px'; // Width of the edge area to block
    edgeBlocker.style.height = '100%';
    edgeBlocker.style.zIndex = '9999';
    edgeBlocker.style.backgroundColor = 'transparent';
    edgeBlocker.style.webkitOverflowScrolling = 'touch';
    
    // Add touch event handlers to prevent default behavior
    const preventDefault = (e: TouchEvent) => {
      if (e.touches[0].pageX < 30) { // If touch is near the left edge
        e.preventDefault();
      }
    };
    
    edgeBlocker.addEventListener('touchstart', preventDefault, { passive: false });
    edgeBlocker.addEventListener('touchmove', preventDefault, { passive: false });
    
    document.body.appendChild(edgeBlocker);
    
    // Add meta tag to disable viewport bouncing
    const metaTag = document.createElement('meta');
    metaTag.name = 'viewport';
    metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(metaTag);
    
    // Clean up function
    return () => {
      // Restore original styles
      document.body.style.overscrollBehavior = originalOverscrollBehavior;
      
      // Remove the edge blocker
      const blocker = document.getElementById('ios-edge-blocker');
      if (blocker) {
        blocker.removeEventListener('touchstart', preventDefault);
        blocker.removeEventListener('touchmove', preventDefault);
        document.body.removeChild(blocker);
      }
      
      // Remove meta tag
      document.head.removeChild(metaTag);
    };
  }, []);
};