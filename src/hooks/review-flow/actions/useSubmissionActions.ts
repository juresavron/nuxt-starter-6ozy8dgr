/**
 * Hook for managing submission actions in the review flow
 */
import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { validateForm } from '../utils/formValidation';
import { updateReviewData } from '../utils/reviewUpdate';
import { sendNotifications } from '../utils/notificationSender';
import { createReward } from '../utils/rewardCreation';
import { navigateToThankYou } from '../utils/navigationUtils';
import type { Translations } from '../../../translations/types';

// Define interfaces for better type safety
interface ReviewData {
  reviewId: string | null;
  companyId?: string;
  companyName: string;
  rating: number;
  selectedIssues: string[];
  comment: string;
  email: string;
  phone: string;
}

interface NotificationConfig {
  couponType?: 'coupon' | 'lottery' | 'none';
  sendCouponEmail?: boolean;
  sendCouponSms?: boolean;
  sendThankYouEmail?: boolean;
  sendGoogleReviewEmail?: boolean;
}

interface UseSubmissionActionsProps extends ReviewData, NotificationConfig {
  validateContactInfo: (email: string, phone: string) => string | null;
  translations?: Translations | null;
  setError: (error: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  navigate?: NavigateFunction;
}

/**
 * Hook for managing submission-related actions
 */
export const useSubmissionActions = ({
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
  navigate,
  couponType = 'coupon',
  sendCouponEmail = true,
  sendCouponSms = false,
  sendThankYouEmail = true,
  sendGoogleReviewEmail = false
}: UseSubmissionActionsProps) => {
  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('🚀 handleSubmit: Starting submission process', { 
      contactInfo: `${email ? 'Email provided' : 'No email'}, ${phone ? 'Phone provided' : 'No phone'}`,
      rating, 
      selectedIssues,
      reviewId: reviewId || 'none',
      couponType,
      timestamp: new Date().toISOString()
    });
    setError('');
    
    try {
      // Step 1: Validate form data
      const validationError = validateForm(email, phone, validateContactInfo);
      if (validationError) {
        setError(validationError);
        setIsSubmitting(false);
        return;
      }
      
      console.log('✅ handleSubmit: Validation passed successfully', {
        emailProvided: !!email?.trim(),
        phoneProvided: !!phone?.trim(),
        timestamp: new Date().toISOString()
      });
      
      // Step 2: Submit review data
      const updateSuccess = await updateReviewData(
        reviewId,
        selectedIssues,
        comment,
        email,
        phone
      );
      
      if (!updateSuccess) {
        throw new Error('Failed to update review with feedback');
      }
      
      // Step 3: Prepare review data for notifications and rewards
      const reviewData = {
        reviewId,
        companyId,
        companyName,
        rating,
        comment,
        selectedIssues,
        email,
        phone
      };
      
      // Step 4: Send notifications
      await sendNotifications(
        reviewData, 
        {
          sendThankYouEmail,
          sendCouponEmail,
          sendCouponSms,
          sendGoogleReviewEmail
        }
      );
      
      // Step 5: Create reward (coupon or lottery entry)
      // Only create coupon if couponType is not lottery
      if (couponType !== 'lottery') {
        await createReward(
          reviewData,
          couponType
        );
      } else {
        // For lottery, we only create the lottery entry but not the coupon
        // The coupon will be generated when the winner is drawn
        await createReward(
          reviewData,
          'lottery'
        );
      }
      
      // Step 6: Navigate to thank you page
      console.log('✅ handleSubmit: About to navigate to thank you page', {
        companyId,
        rating,
        timestamp: new Date().toISOString()
      });
      
      if (navigate) {
        navigateToThankYou(companyId, rating, navigate);
      } else if (!navigate) {
        console.error('🚨 handleSubmit: Navigation function not provided', {
          timestamp: new Date().toISOString()
        });
        throw new Error('Navigation error');
      }
      
    } catch (err) {
      console.error('🚨 handleSubmit: Error submitting review', {
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        reviewId,
        timestamp: new Date().toISOString()
      });
      setError(translations?.review?.form?.error?.submitFailed || 'Failed to submit. Please try again.');
      setIsSubmitting(false);
    }
  }, [
    reviewId, email, phone, rating, selectedIssues, comment, companyId, companyName, 
    navigate, translations, setError, setIsSubmitting, validateContactInfo,
    sendNotifications, createReward, couponType, sendThankYouEmail, sendCouponEmail,
    sendCouponSms, sendGoogleReviewEmail
  ]);

  return {
    handleSubmit
  };
};

export default useSubmissionActions;