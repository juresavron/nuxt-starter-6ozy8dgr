/**
 * Hook for managing rating actions in the review flow
 */
import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { getFlowType } from '../utils/reviewUtils';
import { createLotteryEntry } from '../utils/lotteryUtils';

interface UseRatingActionsProps {
  companyId?: string;
  reviewId: string | null;
  navigate: NavigateFunction;
  setError: (error: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setReviewId: (id: string) => void;
  setShowForm: (show: boolean) => void;
  setRating: (rating: number) => void;
  email?: string;
  phone?: string;
  couponType?: 'coupon' | 'lottery' | 'none';
}

/**
 * Hook for managing rating-related actions
 */
export const useRatingActions = ({
  companyId,
  reviewId,
  navigate,
  setError,
  setIsSubmitting,
  setReviewId,
  setShowForm,
  setRating,
  email,
  phone,
  couponType = 'coupon'
}: UseRatingActionsProps) => {
  /**
   * Handles rating selection
   */
  const handleRating = useCallback(async (value: number) => {
    setIsSubmitting(true);
    console.log('🌟 handleRating: Processing rating', { 
      value, 
      companyId, 
      reviewId: reviewId || 'none',
      timestamp: new Date().toISOString()
    });

    // Determine the flow type based on rating value
    const flowType = getFlowType(value);

    try {
      if (!companyId) throw new Error('Company ID is required');
      const now = new Date().toISOString();

      if (reviewId) {
        console.log('🔄 handleRating: Updating existing review', { 
          reviewId, 
          rating: value, 
          flowType,
          timestamp: new Date().toISOString()
        });
        const { error: updateError } = await supabase.from('reviews').update({
          rating: value || 0,
          flow_type: flowType,
          updated_at: now,
          feedback_options: [],
          comment: null,
          completed_at: null,
          redirected_to_google_at: null,
          google_redirect_type: null
        }).eq('id', reviewId);

        if (updateError) throw updateError;
        console.log('✅ handleRating: Successfully updated review', { 
          reviewId, 
          rating: value,
          flowType,
          timestamp: new Date().toISOString()
        });

        // Note: We don't create lottery entries here as we don't have complete contact info yet
        // Lottery entries will be created during the submission phase

        if (flowType === 'low_rating' || flowType === 'mid_rating') {
          console.log('🔍 handleRating: Showing feedback form for low/mid rating', {
            flowType,
            timestamp: new Date().toISOString()
          });
          setShowForm(true);
        }
        
        // Only navigate to gamification for 5-star ratings
        if (value === 5 && flowType === 'high_rating_gamification') {
          console.log('🎮 handleRating: Navigating to gamification for 5-star rating', {
            companyId,
            reviewId,
            timestamp: new Date().toISOString()
          });
          navigate(`/gamification?companyId=${companyId}&rating=${value}&reviewId=${reviewId}`);
        }

      } else {
        console.log('➕ handleRating: Creating new review', { 
          companyId, 
          rating: value, 
          flowType,
          timestamp: new Date().toISOString()
        });
        const { data: reviewData, error: insertError } = await supabase
          .from('reviews')
          .insert({
            rating: value,
            flow_type: flowType,
            company_id: companyId
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (!reviewData?.id) throw new Error('Failed to create review: missing ID');
        console.log('✅ handleRating: Successfully created new review', { 
          reviewId: reviewData.id, 
          rating: value,
          flowType,
          timestamp: new Date().toISOString()
        });

        // Note: We don't create lottery entries here as we don't have complete contact info yet
        // Lottery entries will be created during the submission phase

        // Only navigate to gamification for 5-star ratings
        if (value === 5 && flowType === 'high_rating_gamification') {
          console.log('🎮 handleRating: Navigating to gamification for new 5-star review', {
            companyId,
            reviewId: reviewData.id,
            timestamp: new Date().toISOString()
          });
          navigate(`/gamification?companyId=${companyId}&rating=${value}&reviewId=${reviewData.id}`);
        }

        // Save the ID in state
        setReviewId(reviewData.id);

        if (flowType === 'low_rating' || flowType === 'mid_rating') {
          console.log('🔍 handleRating: Showing feedback form for new low/mid rating', {
            flowType,
            timestamp: new Date().toISOString()
          });
          setShowForm(true);
        }
      }

      // Update the rating state
      setRating(value);
      return value;
    } catch (err) {
      console.error("🚨 handleRating: Failed with error:", {
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        companyId,
        reviewId: reviewId || 'none',
        rating: value,
        timestamp: new Date().toISOString()
      });
      setError('Failed to process your rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }

    return null;
  }, [companyId, navigate, reviewId, setError, setIsSubmitting, setReviewId, setShowForm, setRating, email, phone, couponType]);

  return {
    handleRating
  };
};

export default useRatingActions;