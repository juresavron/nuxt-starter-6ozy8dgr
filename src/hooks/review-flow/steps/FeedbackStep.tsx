import * as React from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../../components/shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';
import LanguageSelector from '../../../components/review-flow/LanguageSelector';
import FeedbackForm from '../../../components/review-flow/components/FeedbackForm';
import ContactForm from '../../../components/review-flow/ContactForm';
import GdprConsent from '../../../components/review-flow/components/GdprConsent';
import SubmitButton from '../../../components/review-flow/components/SubmitButton';
import FeedbackFormHeader from '../../../components/review-flow/components/FeedbackFormHeader';
import CommentField from '../../../components/review-flow/components/CommentField';
import Button from '../../../components/shared/Button';
import { ArrowRight } from 'lucide-react';

// Content components for different rating types
const LowRatingContent: React.FC<{
  translations: any;
  rating: number;
  selectedIssues: string[];
  comment: string;
  colorScheme: string;
  onIssueToggle: (issue: string) => void;
  onCommentChange: (comment: string) => void;
  feedbackOptions?: string[];
  isLoading?: boolean;
}> = ({
  translations,
  rating,
  selectedIssues,
  comment,
  colorScheme,
  onIssueToggle,
  onCommentChange,
  feedbackOptions,
  isLoading
}) => (
  <div className="space-y-6">
    <FeedbackFormHeader
      title={translations?.review?.lowRatingNotice?.title || 'Thank you for your feedback'}
      description={translations?.review?.lowRatingNotice?.message || 'Your opinion matters to us. Your feedback will be forwarded to management who will work on improvements.'}
      rating={rating}
    />
    <FeedbackForm
      selectedIssues={selectedIssues}
      comment={comment}
      colorScheme={colorScheme}
      onIssueToggle={onIssueToggle}
      onCommentChange={onCommentChange}
      feedbackOptions={feedbackOptions}
      isLoading={isLoading}
    />
  </div>
);

const MidRatingContent: React.FC<{
  translations: any;
  rating: number;
  selectedIssues: string[];
  comment: string;
  colorScheme: string;
  onIssueToggle: (issue: string) => void;
  onCommentChange: (comment: string) => void;
  feedbackOptions?: string[];
  isLoading?: boolean;
  companyId?: string;
  reviewId?: string | null;
}> = ({
  translations,
  rating,
  selectedIssues,
  comment,
  colorScheme,
  onIssueToggle,
  onCommentChange,
  feedbackOptions,
  isLoading,
  companyId,
  reviewId
}) => {
  const navigate = useNavigate();

  const handleNavigateToGamification = () => {
    if (companyId && reviewId) {
      navigate(`/gamification?companyId=${companyId}&rating=${rating}&reviewId=${reviewId}`);
    }
  };

  return (
    <div className="space-y-6">
      <FeedbackFormHeader
        title={translations?.review?.midRatingNotice?.title || 'Thank you for your positive review!'}
        description={translations?.review?.midRatingNotice?.message || 'We appreciate your 4-star review! Please let us know if there\'s anything we could improve to make your next experience even better.'}
        rating={rating}
      />
      <FeedbackForm
        selectedIssues={selectedIssues}
        comment={comment}
        colorScheme={colorScheme}
        onIssueToggle={onIssueToggle}
        onCommentChange={onCommentChange}
        feedbackOptions={feedbackOptions}
        isLoading={isLoading}
      />
      <div className="mt-6">
        <Button
          variant="primary"
          onClick={handleNavigateToGamification}
          className="w-full"
          colorScheme={colorScheme}
          rightIcon={<ArrowRight className="h-5 w-5" />}
        >
          {translations?.gamification?.nextStep || 'Continue to Rewards'}
        </Button>
      </div>
    </div>
  );
};

const HighRatingContent: React.FC<{
  translations: any;
  rating: number;
  comment: string;
  colorScheme: string;
  onCommentChange: (comment: string) => void;
}> = ({
  translations,
  rating,
  comment,
  colorScheme,
  onCommentChange
}) => (
  <div className="space-y-6">
    <FeedbackFormHeader
      title={translations?.gamification?.title?.five_stars || 'Thank you for your excellent review!'}
      description={translations?.gamification?.subtitle?.five_stars || 'Your 5-star review means a lot to us! If you would like to help us further, we kindly ask you to support us on other platforms as well. As a thank you, we will send you a special gift.'}
      rating={rating}
    />
    <CommentField
      comment={comment}
      onCommentChange={onCommentChange}
      colorScheme={colorScheme}
    />
  </div>
);

interface FeedbackStepProps {
  selectedIssues: string[];
  comment: string;
  email: string;
  phone: string;
  error: string;
  isFormValid: boolean;
  colorScheme?: string;
  isSubmitting?: boolean;
  feedbackOptions?: string[];
  loadingFeedbackOptions?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onIssueToggle: (issue: string) => void;
  onCommentChange: (comment: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  rating: number;
  companyId?: string;
  reviewId?: string | null;
}

/**
 * Feedback step component for the review flow
 */
const FeedbackStep: React.FC<FeedbackStepProps> = (props) => { 
  const { 
    selectedIssues,
    comment,
    email, 
    phone, 
    error, 
    isFormValid,
    colorScheme = 'indigo',
    isSubmitting = false,
    feedbackOptions,
    loadingFeedbackOptions = false,
    onSubmit,
    onIssueToggle,
    onCommentChange,
    onEmailChange,
    onPhoneChange,
    rating,
    companyId,
    reviewId
  } = props;

  const translations = useTranslations();
  const navigate = useNavigate();
  const [localError, setLocalError] = React.useState('');
  
  // Get content based on rating
  const getContent = () => {
    if (rating <= 3) {
      return <LowRatingContent 
        translations={translations}
        rating={rating}
        selectedIssues={selectedIssues}
        comment={comment}
        colorScheme={colorScheme}
        onIssueToggle={onIssueToggle}
        onCommentChange={onCommentChange}
        feedbackOptions={feedbackOptions}
        isLoading={loadingFeedbackOptions}
      />;
    } else if (rating === 4) {
      return <MidRatingContent 
        translations={translations}
        rating={rating}
        selectedIssues={selectedIssues}
        comment={comment}
        colorScheme={colorScheme}
        onIssueToggle={onIssueToggle}
        onCommentChange={onCommentChange}
        feedbackOptions={feedbackOptions}
        isLoading={loadingFeedbackOptions}
        companyId={companyId}
        reviewId={reviewId}
      />;
    } else {
      // High rating (5)
      return <HighRatingContent 
        translations={translations}
        rating={rating}
        comment={comment}
        colorScheme={colorScheme}
        onCommentChange={onCommentChange}
      />;
    }
  };

  // Handle form submission with validation
  const handleValidatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLocalError('');
    
    // Skip validation for 4-star ratings since they use a different flow
    if (rating === 4) {
      return;
    }
    
    // Both email AND phone are required
    if (!email.trim() || !phone.trim()) {
      setLocalError(translations?.review?.form?.error?.contactRequired || 'Prosimo, vnesite e-poštni naslov IN telefonsko številko');
      return;
    }
    
    // Validate email format
    if (email.trim() && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim())) {
      setLocalError(translations?.review?.form?.error?.invalidEmail || 'Prosimo, vnesite veljaven e-poštni naslov');
      return;
    }
    
    // Validate phone format
    if (phone.trim() && !/^[+]?[0-9\s()-]{8,15}$/.test(phone.trim())) {
      setLocalError(translations?.review?.form?.error?.invalidPhone || 'Prosimo, vnesite veljavno telefonsko številko');
      return;
    }
    
    // If we get here, validation passed
    onSubmit(e);
  };
  
  return (
    <form onSubmit={handleValidatedSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mt-4 ios-optimized">
      {/* Rating-specific content */}
      {getContent()}

      {/* Contact form - only show if NOT a 4-star rating */}
      {rating !== 4 && (
        <>
          <ContactForm
            email={email}
            phone={phone}
            onEmailChange={onEmailChange}
            onPhoneChange={onPhoneChange}
            error={localError || error}
            colorScheme={colorScheme}
          />

          {/* Error alert */}
          {(error || localError) && (
            <ErrorAlert 
              message={error || localError} 
              severity={ErrorSeverity.ERROR}
            />
          )}

          {/* Language selector */}
          <LanguageSelector colorScheme={colorScheme} className="mb-4" />
          
          {/* GDPR consent */}
          <GdprConsent />
          
          {/* Submit button */}
          <SubmitButton
            isSubmitting={isSubmitting}
            disabled={isSubmitting}
            colorScheme={colorScheme}
          />
        </>
      )}
    </form>
  );
};

export default React.memo(FeedbackStep);