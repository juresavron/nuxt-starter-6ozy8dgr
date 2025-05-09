/**
 * Hook for handling review submission
 */
import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { validateFormData } from './utils/validationUtils';
import { updateReview, verifyReview } from './utils/reviewUtils';
import { sendEmailByRating } from './utils/emailUtils';
import { navigateToThankYou } from './utils/navigationUtils';
import type { Translations } from '../../translations/types';

interface UseReviewSubmissionProps {
  companyId?: string;
  companyName: string;
  reviewId: string | null;
  rating: number;
  selectedIssues: string[];
  comment: string;
  email: string;
  phone: string;
  validateContactInfo: (email: string, phone: string) => string | null;
  translations?: Translations | null;
  setError: (error: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  navigate?: NavigateFunction;
}

/**
 * Hook for handling review submission
 * @param props Hook props
 * @returns Submission handler
 */
export function useReviewSubmission({
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
}: UseReviewSubmissionProps) {
  /**
   * Main submission handler
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('🔍 handleSubmit: Starting submission process with detailed info', { 
      email, 
      phone, 
      rating, 
      selectedIssues,
      reviewId: reviewId || 'none',
      emailLength: email?.length || 0,
      phoneLength: phone?.length || 0,
      emailValid: email ? /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) : false,
      phoneValid: phone ? /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, '')) : false,
      timestamp: new Date().toISOString()
    });
    setError('');
    
    try {
      // Step 1: Validate form
      const validationError = validateFormData(email, phone, validateContactInfo);
      if (validationError) {
        console.error('🚨 handleSubmit: Validation failed', { 
          error: validationError, 
          email, 
          phone,
          emailTrimmed: email?.trim() || '',
          phoneTrimmed: phone?.trim() || '',
          timestamp: new Date().toISOString()
        });
        setError(validationError);
        setIsSubmitting(false);
        return;
      }
      
      console.log('✅ handleSubmit: Validation passed successfully', {
        emailProvided: !!email?.trim(),
        phoneProvided: !!phone?.trim(),
        timestamp: new Date().toISOString()
      });
      
      // Step 2: Ensure review ID exists
      if (!reviewId) {
        console.error('🚨 handleSubmit: No review ID found, cannot proceed', {
          timestamp: new Date().toISOString()
        });
        setError(translations?.review?.form?.error?.missingReviewId || 'Review ID is missing. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      // Step 3: Update review with feedback and contact info
      console.log('🔄 handleSubmit: Updating review with feedback and contact info', {
        reviewId,
        selectedIssuesCount: selectedIssues.length,
        commentLength: comment?.length || 0,
        emailProvided: !!email?.trim(),
        phoneProvided: !!phone?.trim(),
        timestamp: new Date().toISOString()
      });
      
      const updateSuccess = await updateReview(
        reviewId,
        selectedIssues,
        comment,
        email,
        phone
      );
      
      if (!updateSuccess) {
        console.error('🚨 handleSubmit: Failed to update review with feedback', {
          reviewId,
          timestamp: new Date().toISOString()
        });
        throw new Error('Failed to update review with feedback');
      }
      
      console.log('✅ handleSubmit: Review updated successfully', {
        reviewId,
        timestamp: new Date().toISOString()
      });
      
      // Step 4: Verify the review was updated correctly
      console.log('🔍 handleSubmit: Verifying review update in database', {
        reviewId,
        timestamp: new Date().toISOString()
      });
      
      const checkReview = await verifyReview(reviewId);
      if (!checkReview) {
        console.error('🚨 handleSubmit: Failed to verify review update in database', {
          reviewId,
          timestamp: new Date().toISOString()
        });
        throw new Error('Failed to verify review update');
      }
      
      console.log('✅ handleSubmit: Review verification successful', {
        reviewId,
        verifiedEmail: checkReview.email,
        verifiedPhone: checkReview.phone,
        timestamp: new Date().toISOString()
      });
      
      // Step 5: Send email notification if email is provided
      if (email) {
        console.log('📧 handleSubmit: Sending email notification', {
          email,
          companyName,
          rating,
          timestamp: new Date().toISOString()
        });
        
        await sendEmailByRating(
          email,
          companyName,
          rating,
          selectedIssues,
          comment
        );
      }
      
      // Step 6: Navigate to thank you page
      console.log('✅ handleSubmit: About to navigate to thank you page', {
        companyId,
        rating,
        timestamp: new Date().toISOString()
      });
      if (updateSuccess && navigate) {
        navigateToThankYou(companyId, rating, navigate);
      } else if (!navigate) {
        console.warn('⚠️ Navigation function not available — skipping redirect');
        // Prevent error fallback
      }
      
    } catch (err) {
      console.error('🚨 handleSubmit: Error submitting review - CATCH', {
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        reviewId,
        email: email ? '(email provided)' : '(no email)',
        phone: phone ? '(phone provided)' : '(no phone)',
        timestamp: new Date().toISOString()
      });
      setError(translations?.review?.form?.error?.submitFailed || 'Failed to submit. Please try again.');
      setIsSubmitting(false);
    }
  }, [
    reviewId, email, phone, rating, selectedIssues, comment, companyId, companyName, 
    navigate, translations, setError, setIsSubmitting, validateContactInfo
  ]);

  return { handleSubmit };
}

// Export as both named and default export
export default useReviewSubmission;