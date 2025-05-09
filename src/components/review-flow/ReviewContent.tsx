import * as React from 'react';
import { useEffect, useCallback } from 'react';
import useCompanyFeedbackOptions from '../../hooks/useCompanyFeedbackOptions';
import RatingContent from './RatingContent';
import FeedbackStep from './FeedbackStep';

interface ReviewContentProps {
  company?: any;
  companyName?: string;
  rating: number;
  navigate: any;
  selectedIssues: string[];
  comment: string;
  email: string;
  phone: string;
  showForm: boolean;
  error: string;
  isSubmitting: boolean;
  isFormValid: boolean;
  reviewId: string | null;
  popupBlocked?: boolean;
  manualRedirectUrl?: string | null;
  handleRating: (value: number) => void;
  handleIssueToggle: (issue: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCommentChange: (comment: string) => void;
  handleEmailChange: (email: string) => void;
  handlePhoneChange: (phone: string) => void;
  setShowForm: (show: boolean) => void;
}

const ReviewContent: React.FC<ReviewContentProps> = ({
  company,
  companyName,
  navigate,
  rating,
  selectedIssues,
  comment,
  email,
  phone,
  showForm,
  error,
  isSubmitting,
  isFormValid,
  reviewId,
  popupBlocked = false,
  manualRedirectUrl = null,
  handleRating,
  handleIssueToggle,
  handleSubmit,
  handleCommentChange, 
  handleEmailChange, 
  handlePhoneChange, 
  setShowForm
}) => {
  // Fetch feedback options based on rating (use mid-rating options for 4-star ratings)
  const isMidRating = rating === 4;
  const { feedbackOptions, loading: loadingFeedbackOptions } = useCompanyFeedbackOptions(
    company?.id, 
    isMidRating
  );

  // Determine flow type based on rating
  const getFlowType = useCallback((rating: number) => {
    if (rating <= 3) return 'low_rating';
    if (rating === 4) return 'mid_rating';
    return 'high_rating_gamification';
  }, []);

  // Log props on mount and when they change
  useEffect(() => {
    console.log("ReviewContent: Component mounted/updated with key props:", { 
      companyName, 
      rating, 
      handleRating: typeof handleRating,
      handleEmailChange: typeof handleEmailChange,
      handlePhoneChange: typeof handlePhoneChange,
      reviewId,
      showForm,
      setShowForm: typeof setShowForm,
      feedbackOptions: feedbackOptions?.length || 0,
      isMidRating,
      couponType: company?.coupon_type
    });
  }, [companyName, rating, handleRating, handleEmailChange, handlePhoneChange, reviewId, showForm, feedbackOptions, isMidRating, setShowForm, company?.coupon_type]);

  // Handle navigation based on rating when it changes
  useEffect(() => {
    if (rating > 0 && reviewId) {
      const flowType = getFlowType(rating);
      
      // For 5-star ratings, navigate to gamification
      if (flowType === 'high_rating_gamification' && rating === 5) {
        console.log('ReviewContent: Navigating to gamification for 5-star rating');
        // We'll let the handleRating function in useReviewFlow handle this navigation
      }
      
      // For other ratings, show the feedback form
      if (flowType === 'low_rating' || flowType === 'mid_rating' || (flowType === 'high_rating_gamification' && rating === 4)) {
        console.log(`ReviewContent: Showing feedback form for ${flowType}`);
        if (typeof setShowForm === 'function') { // Add safety check
          setShowForm(true);
        } else {
          console.error('setShowForm is not a function:', setShowForm);
        }
      }
    }
  }, [rating, reviewId, getFlowType, navigate, company?.id, setShowForm]);

  // Format lottery drawing frequency for display
  const formatDrawingFrequency = (frequency?: string, day?: number) => {
    if (!frequency) return '';
    
    switch (frequency) {
      case 'daily':
        return 'dnevno';
      case 'weekly':
        const days = ['nedeljo', 'ponedeljek', 'torek', 'sredo', 'četrtek', 'petek', 'soboto'];
        return `tedensko (vsak ${days[day || 0]})`;
      case 'monthly':
        return `mesečno (${day || 1}. v mesecu)`;
      default:
        return frequency;
    }
  };

  return (
    <>
      <RatingContent 
        companyName={companyName || ''}
        companyLogo={company?.logo_url}
        colorScheme={company?.color_scheme || 'indigo'}
        giftDescription={company?.gift_description}
        rating={rating}
        showForm={showForm}
        reviewId={reviewId}
        companyId={company?.id}
        couponType={company?.coupon_type}
        nextDrawingDate={company?.next_drawing_date}
        lotteryDrawingFrequency={formatDrawingFrequency(
          company?.lottery_drawing_frequency, 
          company?.lottery_drawing_day
        )}
        onRating={handleRating}
      />

      {showForm && (
       <div className="feedback-form-container">
         <FeedbackStep
          selectedIssues={selectedIssues}
          comment={comment}
          email={email || ''}
          phone={phone || ''}
          colorScheme={company?.color_scheme || 'indigo'}
          onCommentChange={handleCommentChange}
          onEmailChange={handleEmailChange}
          onPhoneChange={handlePhoneChange}
          onSubmit={handleSubmit}
          onIssueToggle={(issue) => {
            console.log('ReviewContent: Issue toggle requested', {
              issue,
              wasSelected: selectedIssues.includes(issue),
              timestamp: new Date().toISOString()
            });
            handleIssueToggle(issue);
          }}
          isFormValid={isFormValid}
          isSubmitting={isSubmitting}
          error={error}
          feedbackOptions={feedbackOptions}
          loadingFeedbackOptions={loadingFeedbackOptions}
          rating={rating}
          companyId={company?.id}
          reviewId={reviewId}
          couponType={company?.coupon_type || 'coupon'}
          sendCouponEmail={company?.send_coupon_email}
          sendCouponSms={company?.send_coupon_sms}
          sendThankYouEmail={company?.send_thank_you_email}
          sendGoogleReviewEmail={company?.send_google_review_email}
         />
       </div>
      )}
    </>
  );
};

export default React.memo(ReviewContent);