import React from 'react';
import { Clock } from 'lucide-react';
import { useWindowSize } from 'react-use';
import { formatDate } from '../../../utils/date';
import type { Database } from '../../../types/database';
import type { SocialTask } from '../modals/SocialTasksSection';
import {
  RatingDisplay,
  ContactInfo,
  FeedbackOptions,
  Comment,
  CompletionStatus,
  TaskStatus,
  getTaskCompletion
} from './ReviewTableComponents';

type Review = Database['public']['Tables']['reviews']['Row'];
type Company = Database['public']['Tables']['companies']['Row'];

interface ReviewRowProps {
  review: Review;
  companies: Company[] | undefined;
  tasks: SocialTask[] | any[];
  hideCompanyColumn?: boolean;
}

// Memoize the ReviewRow component to prevent unnecessary re-renders
const ReviewRow = React.memo(function ReviewRow({ 
  review, 
  companies, 
  tasks,
  hideCompanyColumn = false 
}: ReviewRowProps) {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  // Safety check for review object
  if (!review || !review.id) {
    console.warn('ReviewRow: Received invalid review object');
    return null;
  }
  
  // Debug: Log the review object
  React.useEffect(() => {
    console.log('ReviewRow: Rendering review', {
      id: review.id,
      company_id: review.company_id,
      rating: review.rating,
      created_at: review.created_at,
      hasEmail: !!review.email,
      hasPhone: !!review.phone,
      hasComment: !!review.comment,
      hasFeedbackOptions: Array.isArray(review.feedback_options) && review.feedback_options.length > 0,
      isCompleted: !!review.completed_at
    });
  }, [review]);
  
  // Calculate company tasks once
  const companyTasks = React.useMemo(() => {
    return Array.isArray(tasks) ? tasks.filter(task => task && task.company_id === review.company_id) : [];
  }, [tasks, review.company_id]);
  
  // Get task completion status
  const taskStatus = React.useMemo(() => {
    // For high rating flow, show task status regardless of completion
    if (review.flow_type === 'high_rating_gamification') {
      // Calculate total tasks (social tasks + Google review)
      const totalTasks = companyTasks.length + 1; // +1 for Google review
      
      // Get completed tasks from gamification_steps_completed array
      const completedSteps = review.gamification_steps_completed || [];
      const completedTasks = completedSteps.length;
      
      return {
        completed: completedTasks,
        total: totalTasks,
        isComplete: completedTasks >= totalTasks && !!review.completed_at
      };
    }
    
    // For low rating flow, don't show task status
    return null;
  }, [review, companyTasks]);

  // Debug: Log the company name for this review
  React.useEffect(() => {
    const companyName = companies && Array.isArray(companies) 
      ? companies.find(c => c && c.id === review.company_id)?.name 
      : 'Unknown Company';
    console.log(`ReviewRow: Rendering review for ${companyName}`, {
      reviewId: review.id,
      companyId: review.company_id,
      rating: review.rating,
      created: new Date(review.created_at).toLocaleString()
    });
  }, [review, companies]);
  
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{formatDate(review.created_at)}</span>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-3"><RatingDisplay rating={review.rating} /></td>
      {!hideCompanyColumn && (
        <td className="px-3 sm:px-6 py-3">
          <span className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
            {companies && Array.isArray(companies) && companies.find(c => c && c.id === review.company_id)?.name || 'Unknown Company'} 
          </span>
        </td>
      )}
      <td className="px-3 sm:px-6 py-3">
        <ContactInfo email={review.email} phone={review.phone} />
      </td>
      {!isMobile && (
        <td className="px-3 sm:px-6 py-3 max-w-[250px]">
          <FeedbackOptions options={review.feedback_options} />
        </td>
      )}
      {!isMobile && (
        <td className="px-3 sm:px-6 py-3 max-w-[300px]">
          <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
            <Comment comment={review.comment} />
          </div>
        </td>
      )}
      <td className="px-3 sm:px-6 py-3"><CompletionStatus completed={!!review.completed_at} /></td>
      <td className="px-3 sm:px-6 py-3">
        <div className="flex items-center">
          <TaskStatus taskStatus={taskStatus} />
        </div>
      </td>
    </tr>
  );
});

export default ReviewRow;