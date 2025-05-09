import { useEffect } from 'react';

/**
 * Hook to prevent back navigation on mobile devices
 * This is useful for multi-step processes where you don't want users
 * to accidentally navigate away using the browser's back button
 */
export const usePreventBackNavigation = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Save the current history state
    const currentState = window.history.state;
    
    // Push the same state to the history to create a dummy history entry
    window.history.pushState(currentState, '', window.location.href);
    
    // Handle popstate (back button) event
    const handlePopState = (event: PopStateEvent) => {
      // Push state again to prevent navigation
      window.history.pushState(currentState, '', window.location.href);
      
      // Optionally, show a message to the user
      const message = 'Please use the buttons within the app to navigate.';
      
      // Show a toast or alert
      if (window.confirm(message + ' Do you want to exit anyway?')) {
        // If user confirms, navigate to home
        window.location.href = '/';
      }
    };
    
    // Add event listener
    window.addEventListener('popstate', handlePopState);
    
    // Clean up
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
};