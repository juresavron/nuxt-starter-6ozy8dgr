/**
 * Hook for managing rating state in the review flow
 */
import { useState } from 'react';

/**
 * Manages the rating state and related UI state
 * @returns Rating state and setters
 */
export const useRatingState = () => {
  // Core rating data
  const [rating, setRating] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // UI state for rating
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [manualRedirectUrl, setManualRedirectUrl] = useState<string | null>(null);
  
  return {
    // State
    rating,
    isTransitioning,
    popupBlocked,
    manualRedirectUrl,
    
    // Setters
    setRating,
    setIsTransitioning,
    setPopupBlocked,
    setManualRedirectUrl
  };
};

export default useRatingState;