import { useParams, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../useFormValidation';
import { useTranslations } from '../useTranslations';
import { isValidUUID } from '../../utils/validation';
import { useCallback, useMemo } from 'react';

import {
  useCompanyData,
  useReviewState,
  useReviewActions
} from './';

/**
 * Main hook for managing the review flow
 * @param companyId Company ID
 * @returns Review flow state and functions
 */
const useReviewFlow = (companyId?: string) => {
  const navigate = useNavigate();
  const translations = useTranslations();
  const { validateContactInfo } = useFormValidation();
  
  // Get company data
  const { company, loading: companyLoading } = useCompanyData(companyId);
  // Derive company name from the company object
  const companyName = company?.name || '';
  
  // Get review state from combined hook
  const {
    reviewId,
    rating,
    selectedIssues,
    comment,
    email,
    phone,
    showForm,
    error,
    isSubmitting,
    popupBlocked,
    manualRedirectUrl,
    setReviewId,
    setRating,
    setSelectedIssues,
    setComment,
    setEmail,
    setPhone,
    setShowForm,
    setError,
    setIsSubmitting,
    setPopupBlocked,
    setManualRedirectUrl
  } = useReviewState();
  
  // Get all review actions from combined hook
  const { 
    handleRating,
    handleIssueToggle: originalHandleIssueToggle,
    handleCommentChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit
  } = useReviewActions({
    companyId,
    companyName,
    reviewId,
    rating,
    selectedIssues,
    comment,
    email,
    phone,
    navigate,
    setError,
    setIsSubmitting,
    setReviewId,
    setRating,
    setSelectedIssues,
    setComment,
    setEmail,
    setPhone,
    setShowForm,
    validateContactInfo,
    translations,
    couponType: company?.coupon_type
  });
  
  // Create a direct issue toggle handler that doesn't use the updater function
  const handleIssueToggle = useCallback((issue: string) => {
    console.log('useReviewFlow: Issue toggle requested', {
      issue,
      wasSelected: selectedIssues.includes(issue),
      timestamp: new Date().toISOString()
    });
    originalHandleIssueToggle(issue);
  }, [originalHandleIssueToggle, selectedIssues]);
  
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
    // We're not using isFormValid for button disabling anymore - it should only depend on isSubmitting
    isFormValid: true,
    reviewId,
    popupBlocked,
    manualRedirectUrl,
    handleRating,
    handleSubmit,
    handleIssueToggle,
    handleCommentChange, 
    handleEmailChange,
    handlePhoneChange,
    setShowForm
  };
};

export default useReviewFlow;