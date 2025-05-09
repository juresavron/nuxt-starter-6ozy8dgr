/**
 * Hook for managing review state
 */
import { useState } from 'react';

/**
 * Hook for managing review state
 * @returns Review state and setters
 */
export const useReviewState = () => {
  // Core review data
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  
  // Contact information
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [manualRedirectUrl, setManualRedirectUrl] = useState<string | null>(null);
  
  return {
    // State
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
    
    // Setters
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
  };
};

export default useReviewState;