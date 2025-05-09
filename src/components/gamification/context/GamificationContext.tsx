import React, { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useTranslations } from '../../../hooks/useTranslations';
import { useFormValidation } from '../../../hooks/useFormValidation';

interface GamificationContextType {
  tasks: Task[];
  completedTasks: string[];
  email: string;
  phone: string;
  error: string;
  isSubmitting: boolean;
  allTasksCompleted: boolean;
  progress: number;
  onTaskClick: (taskId: string) => Promise<void>;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  url: string;
  platform: string;
  completed: boolean;
}

export const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = React.useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const navigate = useNavigate();
  const translations = useTranslations();
  const { validateGamificationForm } = useFormValidation();

  // Calculate progress whenever tasks or completed tasks change
  useEffect(() => {
    if (tasks.length === 0) return;
    
    const progressPercentage = Math.round((completedTasks.length / tasks.length) * 100);
    setProgress(progressPercentage);
    setAllTasksCompleted(completedTasks.length === tasks.length);
  }, [completedTasks, tasks]);

  // Handle task click
  const onTaskClick = useCallback(async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      
      // Open the URL in a new tab
      window.open(task.url, '_blank');
      
      // If task is not already completed, mark it as completed
      if (!completedTasks.includes(taskId)) {
        const newCompletedTasks = [...completedTasks, taskId];
        setCompletedTasks(newCompletedTasks);
        
        // Update tasks array to mark this task as completed
        setTasks(prevTasks => prevTasks.map(t => 
          t.id === taskId ? {...t, completed: true} : t
        ));
      }
    } catch (err) {
      console.error('Error completing task:', err);
      setError('Failed to complete task. Please try again.');
    }
  }, [tasks, completedTasks]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate form data
      const validation = validateGamificationForm({
        email,
        phone
      });
      
      if (!validation.success) {
        setError(validation.error || 'Please provide valid contact information');
        setIsSubmitting(false);
        return;
      }
      
      // Get review ID and company ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const reviewId = urlParams.get('reviewId');
      const companyId = urlParams.get('companyId');
      
      if (!reviewId) {
        setError('Review ID is missing');
        setIsSubmitting(false);
        return;
      }
      
      // Update review in database
      const { error: updateError } = await supabase
        .from('reviews')
        .update({
          email: email || null,
          phone: phone || null,
          gamification_steps_completed: completedTasks,
          completed_at: new Date().toISOString()
        })
        .eq('id', reviewId);
      
      if (updateError) throw updateError;
      
      // Navigate to thank you page
      navigate(`/thank-you?companyId=${companyId}&rating=5`);
    } catch (err) {
      console.error('Error submitting gamification form:', err);
      setError(((translations?.gamification?.form?.error?.submitFailed) || 'Failed to submit. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  }, [email, phone, completedTasks, validateGamificationForm, navigate, translations]);

  const value = {
    tasks,
    completedTasks,
    email,
    phone,
    error,
    isSubmitting,
    allTasksCompleted,
    progress,
    onTaskClick,
    setEmail,
    setPhone,
    handleSubmit,
    setTasks
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

// Add missing import
import { useNavigate } from 'react-router-dom';