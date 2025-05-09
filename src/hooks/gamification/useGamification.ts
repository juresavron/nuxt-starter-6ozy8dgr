import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useGamificationTasks } from './useGamificationTasks';
import { useGamificationSubmit } from './useGamificationSubmit';
import { useGamificationState } from './useGamificationState';

export const useGamification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get parameters from URL
  const companyId = searchParams.get('companyId');
  const rating = parseInt(searchParams.get('rating') || '0', 10);
  const reviewId = searchParams.get('reviewId');
  
  // Form state (from useGamificationState)
  const { 
    email, 
    phone, 
    gdprConsent,
    completionPercentage,
    loading: submitLoading,
    error: submitError,
    success,
    setEmail,
    setPhone,
    setGdprConsent,
    setError,
    setSuccess
  } = useGamificationState();
  
  // Tasks state (from useGamificationTasks)
  const tasks = useGamificationTasks({
    companyId, 
    reviewId,
    onError: setError
  });
  
  // Form submission logic (from useGamificationSubmit)
  const { handleSubmit, isSubmitting } = useGamificationSubmit({
    companyId,
    reviewId,
    email,
    phone,
    gdprConsent,
    completedTasks: tasks.completedTasks,
    onSuccess: () => setSuccess(true),
    onError: (error) => setError(error)
  });
  
  // Validate parameters
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setParameterError] = useState<string | null>(null);
  
  // Verify URL parameters on mount
  useEffect(() => {
    if (!companyId) {
      setIsValid(false);
      setParameterError('Missing company ID parameter');
      return;
    }
    
    if (!rating || rating < 1 || rating > 5) {
      setIsValid(false);
      setParameterError('Invalid rating parameter');
      return;
    }
    
    if (!reviewId) {
      setIsValid(false);
      setParameterError('Missing review ID parameter');
      return;
    }
    
    setIsValid(true);
    setParameterError(null);
  }, [companyId, rating, reviewId]);
  
  // Redirect to home if invalid parameters
  useEffect(() => {
    if (!isValid && error) {
      // Wait a bit to show the error before redirecting
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isValid, error, navigate]);
  
  // Calculate completion percentage
  const calculatedCompletionPercentage = tasks.completedTasks.length > 0 && tasks.tasks.length > 0
    ? Math.round((tasks.completedTasks.length / tasks.tasks.length) * 100)
    : 0;
  
  return {
    // URL parameters
    companyId,
    rating,
    reviewId,
    
    // Validation state
    isValid,
    validationError: error,
    
    // Tasks state
    tasks: tasks.tasks,
    loading: tasks.loading,
    tasksError: tasks.error,
    completedTasks: tasks.completedTasks,
    completeTask: tasks.completeTask,
    areAllTasksCompleted: tasks.areAllTasksCompleted,
    
    // Form state
    email,
    phone,
    gdprConsent,
    completionPercentage: calculatedCompletionPercentage,
    isSubmitting,
    submitError,
    success,
    setEmail,
    setPhone,
    setGdprConsent,
    setError,
    
    // Submit handler
    handleSubmit
  };
};

export default useGamification;