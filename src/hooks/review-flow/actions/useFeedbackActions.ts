/**
 * Hook for managing feedback actions in the review flow
 */
import { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { isValidUUID } from '../../../utils/validation';
import { formatContactInfo } from '../utils/contactUtils';

interface UseFeedbackActionsProps {
  reviewId: string | null;
  setSelectedIssues: (updater: (prev: string[]) => string[]) => void;
  setComment: (comment: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
}

/**
 * Hook for managing feedback-related actions
 */
export const useFeedbackActions = ({
  reviewId,
  setSelectedIssues,
  setComment,
  setEmail,
  setPhone
}: UseFeedbackActionsProps) => {
  /**
   * Handles toggling a feedback issue
   */
  const handleIssueToggle = useCallback((issue: string) => {
    console.log('🔄 useFeedbackActions: Toggling issue', {
      issue,
      reviewId: reviewId || 'none',
      timestamp: new Date().toISOString()
    });
    
    setSelectedIssues((prev) => {
      // Check if the issue is already selected
      const isSelected = prev.includes(issue);
      
      // Create new array with issue toggled
      const newIssues = isSelected
        ? prev.filter(i => i !== issue) // Remove if already selected
        : [...prev, issue];             // Add if not selected

      // Update in database if reviewId exists
      if (reviewId && isValidUUID(reviewId)) {
        console.log('💾 useFeedbackActions: Updating feedback options in database', {
          reviewId,
          issuesCount: newIssues.length,
          timestamp: new Date().toISOString()
        });
        
        supabase
          .from('reviews')
          .update({ feedback_options: newIssues })
          .eq('id', reviewId)
          .then(({ error }) => {
            if (error) {
              console.error('🚨 useFeedbackActions: Error updating feedback options:', {
                error: error.message,
                code: error.code,
                details: error.details,
                reviewId,
                timestamp: new Date().toISOString()
              });
            } else {
              console.log('✅ useFeedbackActions: Successfully updated feedback options', {
                reviewId,
                issuesCount: newIssues.length,
                timestamp: new Date().toISOString()
              });
            }
          });
      }

      return newIssues;
    });
  }, [reviewId]);

  /**
   * Handles comment changes
   */
  const handleCommentChange = useCallback((comment: string) => {
    console.log('💬 useFeedbackActions: Comment changed', {
      length: comment?.length || 0,
      timestamp: new Date().toISOString()
    });
    setComment(comment);
  }, [setComment]);

  /**
   * Handles email changes
   */
  const handleEmailChange = useCallback((email: string) => {
    console.log('📧 useFeedbackActions: Email changed', {
      value: formatContactInfo(email, null),
      length: email?.length || 0,
      isValid: email ? /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) : false,
      timestamp: new Date().toISOString()
    });
    setEmail(email);
  }, [setEmail]);

  /**
   * Handles phone changes
   */
  const handlePhoneChange = useCallback((phone: string) => {
    console.log('📱 useFeedbackActions: Phone changed', {
      value: formatContactInfo(null, phone),
      length: phone?.length || 0,
      containsOnlyDigits: /^[\d\s+()-]+$/.test(phone),
      timestamp: new Date().toISOString()
    });
    setPhone(phone);
  }, [setPhone]);

  return {
    handleIssueToggle,
    handleCommentChange,
    handleEmailChange,
    handlePhoneChange
  };
};

export default useFeedbackActions;