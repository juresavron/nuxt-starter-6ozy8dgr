import * as React from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import ErrorAlert from '../shared/ErrorAlert';
import { ErrorSeverity } from '../../utils/errorHandler';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Button from '../shared/Button';
import { ArrowRight } from 'lucide-react';

// Import components
import FeedbackForm from './components/FeedbackForm';
import ContactForm from './ContactForm';
import FeedbackFormHeader from './components/FeedbackFormHeader';
import CommentField from './components/CommentField';
import GdprConsent from './components/GdprConsent';
import SubmitButton from './components/SubmitButton';
import LanguageSelector from './LanguageSelector';

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
  couponType?: 'coupon' | 'lottery' | 'none';
  sendCouponEmail?: boolean;
  sendCouponSms?: boolean;
  sendThankYouEmail?: boolean;
  sendGoogleReviewEmail?: boolean;
}

/**
 * Feedback step component for the review flow
 */
const FeedbackStep: React.FC<FeedbackStepProps> = ({
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
  reviewId,
  couponType = 'coupon',
  sendCouponEmail,
  sendCouponSms,
  sendThankYouEmail,
  sendGoogleReviewEmail
}) => {
  const translations = useTranslations();
  const navigate = useNavigate();
  const [localError, setLocalError] = React.useState<string>('');
  
  // Navigation handler for 4-star ratings
  const handleNavigateToGamification = () => {
    console.log('Navigating to gamification with:', { companyId, rating, reviewId });
    if (companyId && reviewId) {
      navigate(`/gamification?companyId=${companyId}&rating=${rating}&reviewId=${reviewId}`);
    } else {
      setLocalError('Missing company ID or review ID for gamification.');
    }
  };
  
  /**
   * Form submission handler with validation
   */
  const handleValidatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 FeedbackStep: Form submission started', { rating, couponType });
    setLocalError('');
    
    // For 4-star rating, we want to navigate to gamification instead
    if (rating === 4) {
      handleNavigateToGamification();
      return;
    }
    
    // Make sure at least one contact method is provided
    if (!email.trim() && !phone.trim()) {
      console.error('🚨 FeedbackStep: Missing contact information', {
        timestamp: new Date().toISOString()
      });
      setLocalError(translations?.review?.form?.error?.contactRequired || 'Prosimo, vnesite e-poštni naslov ALI telefonsko številko');
      return;
    }
    
    // Validate email format if provided
    if (email.trim()) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email.trim())) {
        console.error('🚨 FeedbackStep: Invalid email format', {
          timestamp: new Date().toISOString()
        });
        setLocalError(translations?.review?.form?.error?.invalidEmail || 'Prosimo, vnesite veljaven e-poštni naslov');
        return;
      }
    }
    
    // Validate phone format if provided
    if (phone.trim()) {
      const phoneRegex = /^[+]?[0-9\s()-]{8,15}$/;
      if (!phoneRegex.test(phone.trim())) {
        console.error('🚨 FeedbackStep: Invalid phone format', {
          timestamp: new Date().toISOString()
        });
        setLocalError(translations?.review?.form?.error?.invalidPhone || 'Prosimo, vnesite veljavno telefonsko številko');
        return;
      }
    }
    
    console.log('✅ FeedbackStep: Validation passed successfully', {
      emailProvided: !!email?.trim(),
      phoneProvided: !!phone?.trim(),
      timestamp: new Date().toISOString()
    });
    
    // Call the onSubmit handler
    onSubmit(e);
  };
  
  // Determine content based on rating
  const getContent = () => {
    if (rating <= 3) {
      // Low Rating Feedback Form (1-3 stars)
      return (
        <div className="space-y-6">
          <FeedbackFormHeader
            title={translations?.review?.lowRatingNotice?.title || 'Hvala za vaše povratne informacije'}
            description={translations?.review?.lowRatingNotice?.message || 'Vaše mnenje nam je pomembno. Vaše povratne informacije bodo posredovane vodstvu, ki bo delalo na izboljšavah.'}
            rating={rating}
          />
          <FeedbackForm
            selectedIssues={selectedIssues}
            comment={comment}
            colorScheme={colorScheme}
            onIssueToggle={onIssueToggle}
            onCommentChange={onCommentChange}
            feedbackOptions={feedbackOptions}
            isLoading={loadingFeedbackOptions}
          />
        </div>
      );
    } else if (rating === 4) {
      // Mid Rating Feedback Form (4 stars)
      return (
        <div className="space-y-6">
          <FeedbackFormHeader
            title={translations?.review?.midRatingNotice?.title || 'Hvala za vašo pozitivno oceno!'}
            description={translations?.review?.midRatingNotice?.message || 'Cenimo vašo 4-zvezdično oceno! Prosimo, povejte nam, če obstaja kaj, kar bi lahko izboljšali, da bo vaša naslednja izkušnja še boljša.'}
            rating={rating}
          />
          <FeedbackForm
            selectedIssues={selectedIssues}
            comment={comment}
            colorScheme={colorScheme}
            onIssueToggle={onIssueToggle}
            onCommentChange={onCommentChange}
            feedbackOptions={feedbackOptions}
            isLoading={loadingFeedbackOptions}
          />
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={handleNavigateToGamification}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
                colorScheme === 'amber' ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' :
                colorScheme === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' :
                colorScheme === 'rose' ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700' :
                colorScheme === 'bw' ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950' :
                'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
              )}
            >
              <span>{translations?.gamification?.nextStep || 'Nadaljuj do nagrad'}</span>
              <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      );
    } else {
      // High Rating Feedback Form (5 stars)
      return (
        <div className="space-y-6">
          <FeedbackFormHeader
            title={translations?.gamification?.title?.five_stars || 'Hvala za vašo odlično oceno!'}
            description={translations?.gamification?.subtitle?.five_stars || 'Vaša 5-zvezdična ocena nam veliko pomeni! Če nam želite še dodatno pomagati, vas prosimo, da nas podprete tudi na drugih platformah. Kot zahvalo vam bomo poslali posebno darilo.'}
            rating={rating}
          />
          <CommentField
            comment={comment}
            onCommentChange={onCommentChange}
            colorScheme={colorScheme}
          />
        </div>
      );
    }
  };

  // Get submit button text based on coupon type
  const getSubmitButtonText = () => {
    if (couponType === 'lottery') {
      return translations?.review?.form?.submitButtonLottery || 'Sodeluj v žrebanju';
    } else if (couponType === 'none') {
      return translations?.review?.form?.submitButtonNoReward || 'Pošlji povratne informacije';
    } else {
      return translations?.review?.form?.submitButton || 'Pošlji povratne informacije';
    }
  };
  
  return (
    <form onSubmit={handleValidatedSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mt-4 ios-optimized">
      {/* Form content based on rating */}
      {getContent()}

      {/* Contact form - only show for non-4-star ratings */}
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

          {/* Error alert - only show if there is an actual error */}
          {(error || localError) && (
            <ErrorAlert 
              message={error || localError} 
              severity={ErrorSeverity.ERROR}
            />
          )}

          {/* GDPR consent */}
          <GdprConsent />

          {/* Submit button - only disabled when submitting */}
          <SubmitButton
            isSubmitting={isSubmitting}
            disabled={isSubmitting}
            colorScheme={colorScheme}
            buttonText={getSubmitButtonText()}
          />
        </>
      )}
    </form>
  );
};

export default React.memo(FeedbackStep);