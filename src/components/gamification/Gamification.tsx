import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslations } from '../../hooks/useTranslations';
import { useCompanyData } from '../../hooks/useCompanyData';
import { supabase } from '../../lib/supabase';
import { Star, CheckCircle, ExternalLink, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorAlert from '../shared/ErrorAlert';
import { cn } from '../../utils/cn';
import GamificationHeader from './components/GamificationHeader';
import TaskList from './components/TaskList';
import ContactSection from './components/ContactSection';
import ProgressBar from './components/ProgressBar';

type Task = {
  id: string;
  title: string;
  url: string;
  completed: boolean;
};

const Gamification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const translations = useTranslations();
  
  // Get parameters from URL
  const companyId = searchParams.get('companyId');
  const rating = parseInt(searchParams.get('rating') || '0', 10);
  const reviewId = searchParams.get('reviewId');
  
  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactError, setContactError] = useState('');
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Fetch company data
  const { company, loading: companyLoading } = useCompanyData(companyId || undefined);
  
  useEffect(() => {
    const fetchReviewData = async () => {
      if (!companyLoading && company) {
        try {
          // Fetch review data
          const { data: review, error: reviewError } = await supabase
            .from('reviews')
            .select('gamification_steps_completed')
            .eq('id', reviewId)
            .single();
            
          if (reviewError) throw reviewError;
          
          // Set completed tasks
          if (review && Array.isArray(review.gamification_steps_completed)) {
            setCompletedTasks(review.gamification_steps_completed);
          }
          
          // Fetch social tasks for the company
          if (companyId) {
            const { data: socialTasks, error: tasksError } = await supabase
              .from('social_tasks')
              .select('*')
              .eq('company_id', companyId);
              
            if (tasksError) throw tasksError;
            
            // Add social tasks to tasks list
            if (socialTasks && socialTasks.length > 0) {
              const formattedTasks = socialTasks.map(task => ({
                id: task.platform,
                title: task.platform,
                url: task.url,
                completed: review?.gamification_steps_completed?.includes(task.platform) || false
              }));
              
              setTasks(formattedTasks);
            }
          }
        } catch (err) {
          console.error('Error fetching review data:', err);
          setError('Failed to load gamification data. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchReviewData();
  }, [companyId, reviewId, companyLoading, company]);
  
  // Check if all tasks are completed
  useEffect(() => {
    if (tasks.length > 0) {
      const allCompleted = tasks.every(task => task.completed || completedTasks.includes(task.id));
      setAllTasksCompleted(allCompleted);
    }
  }, [tasks, completedTasks]);
  
  // Handle task completion
  const handleTaskComplete = async (taskId: string) => {
    if (completedTasks.includes(taskId)) return;
    
    try {
      // Add task to completed tasks
      const updatedTasks = [...completedTasks, taskId];
      setCompletedTasks(updatedTasks);
      
      // Update tasks state
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      ));
      
      // Update review in database
      if (reviewId) {
        await supabase
          .from('reviews')
          .update({ gamification_steps_completed: updatedTasks })
          .eq('id', reviewId);
      }
    } catch (err) {
      console.error('Error completing task:', err);
      setError('Failed to complete task. Please try again.');
    }
  };
  
  // Handle contact form submission
  const handleContactSubmit = async ({ email, phone }: { email: string, phone: string }) => {
    setIsSubmitting(true);
    
    try {
      // Update review with contact info
      if (reviewId) {
        const { error: updateError } = await supabase
          .from('reviews')
          .update({
            email: email || null,
            phone: phone || null,
            completed_at: new Date().toISOString()
          })
          .eq('id', reviewId);
          
        if (updateError) throw updateError;
      }
      
      // Generate coupon if applicable
      if (companyId && (email || phone)) {
        try {
          await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-coupon`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
              review_id: reviewId,
              company_id: companyId,
              email,
              phone
            })
          });
        } catch (couponError) {
          console.error('Error generating coupon:', couponError);
          // Continue even if coupon generation fails
        }
      }
      
      // Redirect to thank you page
      navigate(`/thank-you?companyId=${companyId}&rating=${rating}`);
    } catch (err) {
      console.error('Error submitting contact info:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate progress
  const progress = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;
  
  // Show loading state
  if (loading || companyLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <LoadingSpinner size="lg" color={company?.color_scheme || 'indigo'} />
      </div>
    );
  }
  
  // Show error state
  if (error || !company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorAlert 
            message={error || 'Company not found'} 
            severity="error"
            onDismiss={() => navigate('/')}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <GamificationHeader 
          companyName={company.name}
          companyLogo={company.logo_url}
          colorScheme={company.color_scheme}
          rating={rating}
        />
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {completedTasks.length} / {tasks.length} {translations?.gamification?.progress || 'tasks completed'}
            </span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <ProgressBar progress={progress} colorScheme={company.color_scheme} />
        </div>
        
        {/* Tasks */}
        <TaskList 
          tasks={tasks}
          completedTasks={completedTasks}
          onTaskComplete={handleTaskComplete}
          colorScheme={company.color_scheme}
        />
        
        {/* Contact form */}
        <ContactSection
          onSubmit={handleContactSubmit}
          colorScheme={company.color_scheme}
        />
      </div>
    </div>
  );
};

export default Gamification;