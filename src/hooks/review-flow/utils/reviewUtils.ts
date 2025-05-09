/**
 * Utility functions for review operations
 */
import { supabase } from '../../../lib/supabase';
import { updateAndVerifyContact } from '../../../utils/reviews/contactUpdate';

/**
 * Determines the flow type based on rating
 * @param rating Review rating (1-5)
 * @returns Flow type string
 */
export const getFlowType = (rating: number): string => {
  if (rating <= 3) return 'low_rating';
  if (rating === 4) return 'mid_rating';
  return 'high_rating_gamification';
};

/**
 * Creates a new review
 * @param companyId Company ID
 * @param rating Rating value
 * @returns Review ID or null if creation failed
 */
export const createReview = async (
  companyId?: string,
  rating: number = 0
): Promise<string | null> => {
  try {
    console.log('createReview: Creating new review', { companyId, rating });
    
    const flowType = getFlowType(rating);
    
    const { data: newReview, error: insertError } = await supabase
      .from('reviews')
      .insert({
        company_id: companyId,
        rating,
        flow_type: flowType,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError || !newReview?.id) {
      console.log('createReview: Error creating review', { error: insertError });
      throw new Error('Failed to create new review record.');
    }

    console.log('createReview: Review created successfully', { reviewId: newReview.id });
    return newReview.id;
  } catch (error) {
    console.error('Error creating new review:', error);
    console.log('createReview: Exception during review creation', { error });
    return null;
  }
};

/**
 * Updates an existing review with feedback and contact info
 * @param reviewId Review ID to update
 * @param selectedIssues Selected feedback issues
 * @param comment Review comment
 * @param email Contact email
 * @param phone Contact phone
 * @returns Success status
 */
export const updateReview = async (
  reviewId: string,
  selectedIssues: string[],
  comment: string,
  email: string,
  phone: string
): Promise<boolean> => {
  try {
    console.log('🔄 updateReview: Updating review with feedback', { 
      reviewId, 
      feedbackOptions: selectedIssues, 
      commentLength: comment?.length || 0,
      emailLength: email?.length || 0,
      phoneLength: phone?.length || 0,
      timestamp: new Date().toISOString()
    });
    
    // First update feedback and mark as completed
    const { error: feedbackError } = await supabase
      .from('reviews')
      .update({
        feedback_options: selectedIssues,
        comment,
        completed_at: new Date().toISOString()
      })
      .eq('id', reviewId);
      
    if (feedbackError) {
      console.error('🚨 updateReview: Error updating feedback in database', {
        error: feedbackError.message,
        code: feedbackError.code,
        details: feedbackError.details,
        reviewId,
        timestamp: new Date().toISOString()
      });
      throw feedbackError;
    }
    
    console.log('✅ updateReview: Feedback updated successfully in database', {
      reviewId,
      timestamp: new Date().toISOString()
    });
    
    // Then update contact information separately
    const contactResult = await updateAndVerifyContact(reviewId, email, phone);
    
    if (!contactResult.success) {
      console.error('🚨 updateReview: Error updating contact info:', contactResult.error);
      return false;
    }
    
    console.log('✅ updateReview: Contact info updated successfully', {
      reviewId,
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('🚨 updateReview: Exception during update', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      reviewId,
      timestamp: new Date().toISOString()
    });
    return false;
  }
};

/**
 * Verifies if a review exists and is valid
 * @param reviewId Review ID to verify
 * @returns Review data or null if not found
 */
export const verifyReview = async (reviewId: string) => {
  try {
    console.log('🔍 verifyReview: Verifying review', { reviewId });
    
    const { data: updatedReview, error: verifyError } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', reviewId)
      .single();
      
    if (verifyError) {
      console.error('🚨 verifyReview: Error verifying review:', verifyError);
      return null;
    }
    
    console.log('✅ verifyReview: Review verification successful', {
      reviewId,
      hasEmail: !!updatedReview.email,
      hasPhone: !!updatedReview.phone,
      timestamp: new Date().toISOString()
    });
    
    return updatedReview;
  } catch (error) {
    console.error('🚨 Error verifying review:', error);
    return null;
  }
};