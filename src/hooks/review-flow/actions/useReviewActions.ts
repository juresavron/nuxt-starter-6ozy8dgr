/**
 * Combined hook for all review flow actions
 */
import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useRatingActions } from './useRatingActions';
import { useFeedbackActions } from './useFeedbackActions';
import { useSubmissionActions } from './useSubmissionActions';
import type { Translations } from '../../../translations/types';

interface UseReviewActionsProps {
  companyId?: string;
  companyName: string;
  reviewId: string | null;
  rating: number;
  selectedIssues: string[];
  comment: string;
  email: string;
  phone: string;
  navigate: NavigateFunction;
  setError: (error: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setReviewId: (id: string) => void;
  setRating: (rating: number) => void;
  setSelectedIssues: (updater: (prev: string[]) => string[]) => void;
  setComment: (comment: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setShowForm: (show: boolean) => void;
  validateContactInfo: (email: string, phone: string) => string | null;
  translations?: Translations | null;
}

/**
 * Hook that combines all review flow actions
 */
export const useReviewActions = ({
  companyId,
  companyName,
  reviewId,
  rating,
  selectedIssues,
  comment,
  email,
  phone,
  navigate,
  setError,
  setIsSubmitting,
  setReviewId,
  setRating,
  setSelectedIssues,
  setComment,
  setEmail,
  setPhone,
  setShowForm,
  validateContactInfo,
  translations
}: UseReviewActionsProps) => {
  // Get actions from individual hooks
  const { handleRating } = useRatingActions({
    companyId,
    reviewId,
    navigate,
    setError,
    setIsSubmitting,
    setReviewId,
    setShowForm,
    setRating
  });
  
  const { 
    handleIssueToggle,
    handleCommentChange,
    handleEmailChange,
    handlePhoneChange
  } = useFeedbackActions({
    reviewId,
    setSelectedIssues,
    setComment,
    setEmail,
    setPhone
  });
  
  const { handleSubmit } = useSubmissionActions({
    companyId,
    companyName,
    reviewId,
    rating,
    selectedIssues,
    comment,
    email,
    phone,
    validateContactInfo,
    translations,
    setError,
    setIsSubmitting,
    navigate
  });

  return {
    handleRating,
    handleIssueToggle,
    handleCommentChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit
  };
};

export default useReviewActions;