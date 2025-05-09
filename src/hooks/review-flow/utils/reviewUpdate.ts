/**
 * Utility functions for updating review data
 */
import { supabase } from '../../../lib/supabase';
import { updateAndVerifyContact } from '../../../utils/reviews/contactUpdate';

/**
 * Updates an existing review with feedback and contact info
 * @param reviewId Review ID to update
 * @param selectedIssues Selected feedback issues
 * @param comment Review comment
 * @param email Contact email
 * @param phone Contact phone
 * @returns Success status
 */
export const updateReviewData = async (
  reviewId: string | null,
  selectedIssues: string[],
  comment: string,
  email: string,
  phone: string
): Promise<boolean> => {
  if (!reviewId) {
    console.error('🚨 updateReviewData: No review ID found, cannot proceed', {
      timestamp: new Date().toISOString()
    });
    return false;
  }

  try {
    console.log('🔄 updateReviewData: Updating review with feedback', { 
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
      console.error('🚨 updateReviewData: Error updating feedback in database', {
        error: feedbackError.message,
        code: feedbackError.code,
        details: feedbackError.details,
        reviewId,
        timestamp: new Date().toISOString()
      });
      throw feedbackError;
    }
    
    console.log('✅ updateReviewData: Feedback updated successfully in database', {
      reviewId,
      timestamp: new Date().toISOString()
    });
    
    // Then update contact information separately
    const contactResult = await updateAndVerifyContact(reviewId, email, phone);
    
    if (!contactResult.success) {
      console.error('🚨 updateReviewData: Error updating contact info:', contactResult.error);
      return false;
    }
    
    console.log('✅ updateReviewData: Contact info updated successfully', {
      reviewId,
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('🚨 updateReviewData: Exception during update', { 
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