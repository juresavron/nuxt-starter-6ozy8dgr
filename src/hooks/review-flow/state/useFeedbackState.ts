/**
 * Hook for managing feedback state in the review flow
 */
import { useState } from 'react';

/**
 * Manages the feedback form state
 * @returns Feedback state and setters
 */
export const useFeedbackState = () => {
  // Feedback data
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  
  // Contact information
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // UI state
  const [showForm, setShowForm] = useState(false);
  
  return {
    // State
    selectedIssues,
    comment,
    email,
    phone,
    showForm,
    
    // Setters
    setSelectedIssues,
    setComment,
    setEmail,
    setPhone,
    setShowForm
  };
};

export default useFeedbackState;