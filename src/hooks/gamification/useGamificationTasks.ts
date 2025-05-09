import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useTranslations } from '../useTranslations';

/**
 * Hook for managing gamification tasks
 * @param reviewId The ID of the review
 * @param companyId The ID of the company
 * @returns Task management functions and state
 */
export const useGamificationTasks = (
  reviewId: string | null,
  companyId: string | null
) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const translations = useTranslations();

  // Fetch social tasks for the company
  const fetchTasks = useCallback(async () => {
    if (!companyId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch social tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('social_tasks')
        .select('*')
        .eq('company_id', companyId);
        
      if (tasksError) throw tasksError;
      
      const allTasks = [
        ...(tasksData || []).map(task => ({
          ...task,
          is_completed: false
        }))
      ];

      setTasks(allTasks);
      
      // Fetch completed tasks from the review
      if (reviewId) {
        const { data: reviewData, error: reviewError } = await supabase
          .from('reviews')
          .select('gamification_steps_completed')
          .eq('id', reviewId)
          .single();
          
        if (reviewError) throw reviewError;
        
        if (reviewData?.gamification_steps_completed) {
          setCompletedTasks(reviewData.gamification_steps_completed);
          
          // Update task completion status
          const updatedTasks = allTasks.map(task => ({
            ...task,
            is_completed: reviewData.gamification_steps_completed.includes(task.platform)
          }));
          
          setTasks(updatedTasks);
        }
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [companyId, reviewId]);

  // Mark a task as completed
  const completeTask = useCallback(async (taskId: string, platform: string) => {
    if (!reviewId) return;
    
    try {
      setError(null);
      
      const newCompletedTasks = [...completedTasks, platform];
      setCompletedTasks(newCompletedTasks);
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId || task.platform === platform
            ? { ...task, is_completed: true }
            : task
        )
      );
      
      const { error: updateError } = await supabase
        .from('reviews')
        .update({
          gamification_steps_completed: newCompletedTasks
        })
        .eq('id', reviewId);
        
      if (updateError) throw updateError;
      
      return true;
    } catch (err) {
      console.error('Error completing task:', err);
      setError(err instanceof Error ? err.message : 'Failed to complete task');
      return false;
    }
  }, [reviewId, completedTasks]);

  const areAllTasksCompleted = useCallback(() => {
    return tasks.length > 0 && tasks.every(task => task.is_completed);
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    completedTasks,
    completeTask,
    areAllTasksCompleted,
    fetchTasks
  };
};

export default useGamificationTasks;