import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useFormValidation } from './useFormValidation';
import { useTranslations } from './useTranslations';
import { isValidUUID } from '../utils/validation';
import { sendReviewNotification } from '../utils/reviews/ai-generation';

/**
 * Hook for managing the review flow
 * @param companyId Company ID
 * @returns Review flow state and functions
 */
export const useReviewFlow = (companyId?: string) => {
  const navigate = useNavigate();
  const translations = useTranslations();
  const { validateContactInfo } = useFormValidation();
  
  // State
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [manualRedirectUrl, setManualRedirectUrl] = useState<string | null>(null);
  
  // Fetch company name
  useEffect(() => {
    const fetchCompanyName = async () => {
      if (!companyId) return;
      
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('name')
          .eq('id', companyId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setCompanyName(data.name);
        }
      } catch (err) {
        console.error('Error fetching company name:', err);
      }
    };
    
    fetchCompanyName();
  }, [companyId]);
  
  // Handle issue toggle
  const handleIssueToggle = useCallback((issue: string) => {
    setSelectedIssues(prev => {
      const newIssues = prev.includes(issue)
        ? prev.filter(i => i !== issue)
        : [...prev, issue];
      
      // Update review in database if we have a valid reviewId
      if (reviewId && isValidUUID(reviewId)) {
        supabase
          .from('reviews')
          .update({ feedback_options: newIssues })
          .eq('id', reviewId)
          .then(({ error }) => {
            if (error) console.error('Error updating feedback options:', error);
          });
      }
      
      return newIssues;
    });
  }, [reviewId]);
  
  // Handle rating selection
  const handleRating = useCallback(async (value: number) => {
    console.log("useReviewFlow: handleRating called with value:", value);

    // Update rating state immediately for UI feedback
    setRating(value);
    setIsSubmitting(true);

    try {
      if (!companyId) {
        console.error('useReviewFlow: Company ID is required but not provided');
        throw new Error('Company ID is required');
      }

      console.log('useReviewFlow: Starting with value:', value, 'companyId:', companyId, 'existing reviewId:', reviewId);
      const now = new Date().toISOString();

      if (reviewId) {
        console.log('useReviewFlow: Updating existing review:', reviewId, 'with rating:', value);
        const { error: updateError } = await supabase.from('reviews').update({
          rating: value || 0,
          flow_type: value >= 4 ? 'high_rating_gamification' : 'low_rating',
          updated_at: now,
          feedback_options: [],
          comment: null,
          email: null,
          phone: null,
          completed_at: null,
          redirected_to_google_at: null,
          google_redirect_type: null
        }).eq('id', reviewId);

        if (updateError) {
          console.error('useReviewFlow: Error updating review:', updateError);
          throw updateError;
        }

        console.log('useReviewFlow: Successfully updated review:', reviewId);
      } else {
        console.log('useReviewFlow: Creating new review for company:', companyId, 'with rating:', value);
        const { data: reviewData, error: insertError } = await supabase
          .from('reviews')
          .insert({ 
            rating: value,
            flow_type: value >= 4 ? 'high_rating_gamification' : 'low_rating',
            company_id: companyId
          })
          .select()
          .single();

        if (insertError) {
          console.error('useReviewFlow: Error inserting review:', insertError);
          throw insertError;
        }

        if (reviewData && reviewData.id) {
          console.log('useReviewFlow: Review created successfully with ID:', reviewData.id);
          setReviewId(reviewData.id);
          setShowForm(value < 4); // Show form for ratings less than 4
        } else {
          console.error('useReviewFlow: Review data is missing ID');
          throw new Error('Failed to create review: missing ID in response');
        }
      }
      
      // For high ratings (4-5), redirect to Google
      if (value >= 4) {
        try {
          // Fetch Google link for the company
          const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .select('google_link')
            .eq('id', companyId)
            .single();
            
          if (companyError) throw companyError;
          
          if (companyData && companyData.google_link) {
            // Try to open Google in a new window
            const googleWindow = window.open(companyData.google_link, '_blank');
            
            // If popup is blocked, set flag to show manual redirect notice
            if (!googleWindow || googleWindow.closed || typeof googleWindow.closed === 'undefined') {
              console.log("useReviewFlow: Popup blocked, showing manual redirect");
              setPopupBlocked(true);
              setManualRedirectUrl(companyData.google_link);
            } else {
              // Mark as redirected to Google automatically
              await supabase
                .from('reviews')
                .update({
                  redirected_to_google_at: new Date().toISOString(),
                  google_redirect_type: 'automatic',
                  gamification_steps_completed: ['google_review']
                })
                .eq('id', reviewId || '');
              
              // Navigate to gamification page after a short delay
              setTimeout(() => {
                navigate(`/gamification?companyId=${companyId}&rating=${value}&reviewId=${reviewId}`);
              }, 100);
            }
          }
        } catch (err) {
          console.error("useReviewFlow: Error redirecting to Google:", err);
          setPopupBlocked(true);
        }
      }
      
      return value;
    } catch (err) {
      console.error("useReviewFlow: handleRating failed:", err);
      setError('Failed to process your rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    return null;
  }, [companyId, navigate, reviewId]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate form data
      const contactError = validateContactInfo(email, phone);
      if (contactError) {
        setError(contactError);
        setIsSubmitting(false);
        return;
      }
      
      if (!reviewId) {
        setError('Review ID is missing. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      // Submit review
      const { error: submitError } = await supabase
        .from('reviews')
        .update({
          feedback_options: selectedIssues,
          comment,
          email: email.trim() || null,
          phone,
          completed_at: new Date().toISOString()
        })
        .eq('id', reviewId);
        
      if (submitError) throw submitError;
      
      // Send notification email if email is provided
      if (email && companyName) {
        await sendReviewNotification(
          companyName,
          rating,
          comment,
          email
        );
      }
      
      // Redirect to thank you page
      window.location.href = `/thank-you?companyId=${companyId}&rating=${rating}`;
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(translations?.review?.form?.error?.submitFailed || 'Failed to submit. Please try again.');
      setIsSubmitting(false);
    }
  }, [companyId, companyName, comment, email, phone, rating, reviewId, selectedIssues, translations, validateContactInfo]);
  
  // Check if form is valid
  const isFormValid = useCallback(() => {
    const contactError = validateContactInfo(email, phone);
    return !contactError;
  }, [email, phone, validateContactInfo]);

  return {
    companyName,
    rating,
    selectedIssues,
    comment,
    email,
    phone,
    showForm,
    error,
    isSubmitting,
    isFormValid: isFormValid(),
    reviewId,
    popupBlocked,
    manualRedirectUrl,
    handleRating,
    handleSubmit,
    handleIssueToggle,
    setComment,
    setEmail,
    setPhone
  };
};