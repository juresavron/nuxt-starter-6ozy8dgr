import React, { useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { supabase } from '../../../lib/supabase';
import GamificationHeader from './GamificationHeader';
import TaskList from './TaskList';
import ContactSection from './ContactSection';
import ProgressBar from './ProgressBar';
import BackNavigationWarning from './BackNavigationWarning';
import CompletedTasksMessage from '../../shared/CompletedTasksMessage';

interface GamificationContainerProps {
  companyId: string;
  rating: number;
  reviewId: string;
  company: any;
  loading: boolean;
}

const GamificationContainer: React.FC<GamificationContainerProps> = ({
  companyId,
  rating,
  reviewId,
  company,
  loading
}) => {
  const { 
    tasks, 
    setTasks, 
    completedTasks, 
    progress, 
    allTasksCompleted 
  } = useGamification();

  // Fetch tasks when component mounts
  useEffect(() => {
    if (companyId && reviewId && !loading) {
      (async () => {
        try {
          console.log('GamificationContainer: Fetching tasks for company ID:', companyId);
          
          // First check if the review has any completed steps already
          const { data: reviewData, error: reviewError } = await supabase
            .from('reviews')
            .select('gamification_steps_completed')
            .eq('id', reviewId)
            .single();
            
          if (reviewError) throw reviewError;
          
          const completedSteps = reviewData?.gamification_steps_completed || [];
          
          // Fetch social tasks for the company
          const { data: tasksData, error: tasksError } = await supabase
            .from('social_tasks')
            .select('*')
            .eq('company_id', companyId);
            
          if (tasksError) throw tasksError;
          
          // Build task list from social tasks only (no Google)
          const allTasks = (tasksData || []).map(task => ({
            id: task.platform,
            title: task.platform,
            description: `Follow us on ${task.platform}`,
            url: task.url,
            platform: task.platform.toLowerCase(),
            completed: completedSteps.includes(task.platform)
          }));
          
          setTasks(allTasks);
        } catch (err) {
          console.error('Error fetching tasks:', err);
        }
      })();
    }
  }, [companyId, reviewId, company, loading, setTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <GamificationHeader 
          companyName={company?.name || ''} 
          companyLogo={company?.logo_url}
          colorScheme={company?.color_scheme}
        />
        
        <div className="mt-8">
          <ProgressBar 
            progress={progress} 
            colorScheme={company?.color_scheme}
          />
        </div>
        
        <div className="mt-8">
          {allTasksCompleted ? (
            <CompletedTasksMessage colorScheme={company?.color_scheme} />
          ) : (
            <TaskList 
              colorScheme={company?.color_scheme}
            />
          )}
        </div>
        
        <div className="mt-12">
          <ContactSection 
            colorScheme={company?.color_scheme}
            giftDescription={company?.gift_description}
          />
        </div>
      </div>
      
      <BackNavigationWarning />
    </div>
  );
};

export default GamificationContainer;