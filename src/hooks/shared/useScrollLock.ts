import { useEffect } from 'react';

/**
 * Hook to lock/unlock scrolling on the body
 * @param lock Whether to lock scrolling
 */
export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (lock) {
      // Save current scroll position and body style
      const scrollY = window.scrollY;
      const originalStyle = {
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
        overflowY: document.body.style.overflowY,
        height: document.body.style.height,
        touchAction: document.body.style.touchAction
      };
      
      // iOS-specific handling
      if (isIOS) {
        // For iOS, use position: fixed approach
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.touchAction = 'none';
      } else {
        // For other browsers
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
      }
      
      return () => {
        // Restore original style and position
        if (isIOS) {
          document.body.style.position = originalStyle.position;
          document.body.style.top = originalStyle.top;
          document.body.style.width = originalStyle.width;
          document.body.style.height = originalStyle.height;
          document.body.style.touchAction = originalStyle.touchAction;
          
          // Restore scroll position
          window.scrollTo(0, parseInt(scrollY.toString() || '0', 10));
        } else {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        }
      };
    }
  }, [lock]);
};