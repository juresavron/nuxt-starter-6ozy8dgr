import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { isValidUUID } from '../../utils/validation';
import { createLotteryEntry } from '../review-flow/utils/lotteryUtils';

interface UseReviewActionsProps {
  companyId?: string;
  reviewId: string | null;
  navigate: NavigateFunction;
  setError: (error: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setReviewId: (id: string) => void;
  setShowForm: (show: boolean) => void;
  email: string;
  phone: string;
  couponType?: 'coupon' | 'lottery' | 'none';
}

export function useReviewActions({
  companyId,
  reviewId,
  navigate,
  setError,
  setIsSubmitting,
  setReviewId,
  setShowForm,
  email,
  phone,
  couponType = 'coupon'
}: UseReviewActionsProps) {
  const handleIssueToggle = useCallback((issue: string) => {
    return (prev: string[]) => {
      const newIssues = prev.includes(issue)
        ? prev.filter(i => i !== issue)
        : [...prev, issue];

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
    };
  }, [reviewId]);

  const handleRating = useCallback(async (value: number) => {
    setIsSubmitting(true);
    console.log('🌟 handleRating: Processing rating', { 
      value, 
      companyId, 
      reviewId: reviewId || 'none',
      timestamp: new Date().toISOString()
    });

    let flowType;
    if (value <= 3) {
      flowType = 'low_rating';
    } else if (value === 4) {
      flowType = 'mid_rating';
    } else {
      flowType = 'high_rating_gamification';
    }

    try {
      if (!companyId) throw new Error('Company ID is required');
      const now = new Date().toISOString();
      let currentReviewId = reviewId;

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

        // Create lottery entry for existing review if coupon type is lottery
        if (couponType === 'lottery' && (email || phone)) {
          console.log('🎲 handleRating: Creating lottery entry for existing review', {
            reviewId,
            companyId,
            email: email ? `${email.substring(0, 3)}...` : 'not provided',
            phone: phone ? `${phone.substring(0, 3)}...` : 'not provided',
            timestamp: new Date().toISOString()
          });
          
          await createLotteryEntry(companyId, reviewId, email, phone);
        }

        if (flowType === 'low_rating' || flowType === 'mid_rating') {
          setShowForm(true);
        }

        if (value === 5 && flowType === 'high_rating_gamification') {
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

        currentReviewId = reviewData.id;
        setReviewId(currentReviewId);

        // Create lottery entry for new review if coupon type is lottery
        if (couponType === 'lottery' && (email || phone)) {
          console.log('🎲 handleRating: Creating lottery entry for new review', {
            reviewId: currentReviewId,
            companyId,
            email: email ? `${email.substring(0, 3)}...` : 'not provided',
            phone: phone ? `${phone.substring(0, 3)}...` : 'not provided',
            timestamp: new Date().toISOString()
          });
          
          await createLotteryEntry(companyId, currentReviewId, email, phone);
        }

        if (value === 5 && flowType === 'high_rating_gamification') {
          navigate(`/gamification?companyId=${companyId}&rating=${value}&reviewId=${currentReviewId}`);
        }

        if (flowType === 'low_rating' || flowType === 'mid_rating') {
          setShowForm(true);
        }
      }

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
  }, [companyId, navigate, reviewId, setError, setIsSubmitting, setReviewId, setShowForm, email, phone, couponType]);

  const setComment = useCallback((comment: string) => comment, []);
  const setEmail = useCallback((email: string) => email, []);
  const setPhone = useCallback((phone: string) => phone, []);

  return {
    handleIssueToggle,
    handleRating,
    setComment,
    setEmail,
    setPhone
  };
}

export default useReviewActions;