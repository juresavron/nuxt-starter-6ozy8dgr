import { useState, useCallback, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { useFormValidation } from '../../hooks/useFormValidation';

interface UseGamificationSubmitProps {
  companyId?: string | null;
  reviewId?: string | null;
  email: string;
  phone: string;
  gdprConsent: boolean;
  completedTasks: string[];
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useGamificationSubmit = ({
  companyId,
  reviewId,
  email,
  phone,
  gdprConsent,
  completedTasks,
  onSuccess,
  onError
}: UseGamificationSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validateContactInfo } = useFormValidation();
  
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Validate inputs
      if (!gdprConsent) {
        throw new Error('Please accept the privacy policy to continue');
      }
      
      // At least one contact method is required
      if (!email.trim() && !phone.trim()) {
        throw new Error('Please provide either email or phone number');
      }
      
      // Validate contact info
      const contactError = validateContactInfo(email, phone);
      if (contactError) {
        throw new Error(contactError);
      }
      
      // Validate required parameters
      if (!companyId) {
        throw new Error('Company ID is required');
      }
      
      if (!reviewId) {
        throw new Error('Review ID is required');
      }
      
      console.log('Submitting gamification data:', {
        reviewId,
        email: email ? `[MASKED]` : undefined,
        phone: phone ? `[MASKED]` : undefined,
        completedTasks
      });
      
      // Update the review record with contact info and completed gamification steps
      const { error: updateError } = await supabase
        .from('reviews')
        .update({
          email: email.trim() || null,
          phone: phone.trim() || null,
          gamification_steps_completed: completedTasks,
          completed_at: new Date().toISOString()
        })
        .eq('id', reviewId);
      
      if (updateError) throw updateError;
      
      // Generate a coupon if applicable (depends on company settings)
      if (email || phone) {
        try {
          const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-coupon`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
              review_id: reviewId,
              company_id: companyId,
              email: email.trim() || undefined,
              phone: phone.trim() || undefined
            })
          });
          
          if (!res.ok) {
            const errorData = await res.json();
            console.warn('Error generating coupon:', errorData.error);
            // Don't fail the whole submission just because coupon generation failed
          }
        } catch (couponError) {
          console.warn('Error calling generate-coupon function:', couponError);
          // Don't fail the whole submission just because coupon generation failed
        }
      }
      
      console.log('Gamification submission successful');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting gamification data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit. Please try again.';
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    companyId,
    reviewId,
    email,
    phone,
    gdprConsent,
    completedTasks,
    validateContactInfo,
    onSuccess,
    onError
  ]);
  
  return {
    handleSubmit,
    isSubmitting
  };
};

export default useGamificationSubmit;