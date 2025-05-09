/**
 * Combined hook for managing all review state
 */
import { useRatingState } from './useRatingState';
import { useFeedbackState } from './useFeedbackState';
import { useSubmissionState } from './useSubmissionState';

/**
 * Combines all review state hooks into a single hook
 * @returns Combined review state and setters
 */
export const useReviewState = () => {
  // Get state from individual hooks
  const ratingState = useRatingState();
  const feedbackState = useFeedbackState();
  const submissionState = useSubmissionState();
  
  return {
    // Combine all state and setters
    ...ratingState,
    ...feedbackState,
    ...submissionState
  };
};

export default useReviewState;