/**
 * Hook for managing submission state in the review flow
 */
import { useState } from 'react';

/**
 * Manages the submission state including errors and loading
 * @returns Submission state and setters
 */
export const useSubmissionState = () => {
  // Submission state
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  return {
    // State
    reviewId,
    isSubmitting,
    error,
    
    // Setters
    setReviewId,
    setIsSubmitting,
    setError
  };
};

export default useSubmissionState;