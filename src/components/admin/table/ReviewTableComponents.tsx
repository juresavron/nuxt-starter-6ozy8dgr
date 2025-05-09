import React from 'react';
import { Star, Mail, Phone, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useTranslations, getTranslatedFeedbackOption } from '@/hooks/useTranslations';
import { useLanguageStore } from '@/hooks/useLanguageStore';
import type { Database } from '@/types/database';
import type { SocialTask } from '@/components/admin/modals/SocialTasksSection';
import { useWindowSize } from 'react-use';
import { translations } from '@/translations/sl';

type Review = Database['public']['Tables']['reviews']['Row'];

// Rating display component
export const RatingDisplay = React.memo(function RatingDisplay({ rating }: { rating: number }) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  return (
  <div className="flex items-center">
    <span className={cn(
      "text-xs sm:text-sm font-medium",
      rating >= 4 ? "text-green-600" :
      rating >= 3 ? "text-yellow-600" :
      "text-red-600"
    )}>
      {rating}
    </span>
    <div className="flex ml-1 sm:ml-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn( 
            "h-3 w-3 sm:h-4 sm:w-4",
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          )}
        />
      ))}
    </div>
  </div>
  );
});

// Contact info component
export const ContactInfo = React.memo(function ContactInfo({ email, phone }: { email?: string | null; phone?: string | null }) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  return (
  <div className="flex flex-col gap-1">
    {email && (
      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-indigo-600">
        <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="truncate max-w-[120px] sm:max-w-none">{email}</span>
      </div>
    )}
    {phone && (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone className="h-4 w-4" />
        {phone}
      </div>
    )}
  </div>
  );
});

// Feedback options component
export const FeedbackOptions = React.memo(function FeedbackOptions({ options }: { options?: string[] | null }) {
  const { language } = useLanguageStore();

  return (
    <div className="max-w-[250px]">
      {options && options.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {options.map((option, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"
              title={option}
            >
              {getTranslatedFeedbackOption(option, language) || option}
              {/* Displaying truncated text for better UI */}
              {option.length > 20 ? `${option.substring(0, 18)}...` : option}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-sm text-gray-400">Brez izbire</span>
      )}
    </div>
  );
});

// Comment component
export const Comment = React.memo(function Comment({ comment }: { comment?: string | null }) {
  return (
    <div className="flex items-start gap-2">
      <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-600 max-w-md break-words">
        {comment || <span className="text-gray-400">Brez komentarja</span>}
      </p>
    </div>
  );
});

// Completion status component
export const CompletionStatus = React.memo(function CompletionStatus({ completed }: { completed: boolean }) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  return (
  <div className="flex items-center">
    {completed ? (
      <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full ${isMobile ? 'w-7 h-7 justify-center p-0' : ''}`}>
        <CheckCircle className="h-3 w-3 flex-shrink-0" />
        {!isMobile && <span>Zaključeno</span>}
      </div>
    ) : (
      <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full ${isMobile ? 'w-7 h-7 justify-center p-0' : ''}`}>
        <Clock className="h-3 w-3 flex-shrink-0" />
        {!isMobile && <span>V teku</span>}
      </div>
    )}
  </div>
  );
});

// Task completion helper function
export const getTaskCompletion = (review: Review, companyTasks: any[]) => {
  if (!review) return null;
  
  // For high rating flow, show task status regardless of completion
  if (review.flow_type === 'high_rating_gamification') {
    // Calculate total tasks (social tasks + Google review)
    const totalTasks = (Array.isArray(companyTasks) ? companyTasks.filter(t => t && t.company_id).length : 0) + 1; // +1 for Google review
    
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
}

// Task status component
export const TaskStatus = React.memo(function TaskStatus({ taskStatus }: { taskStatus: ReturnType<typeof getTaskCompletion> }) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  if (!taskStatus) return null; 
  
  return (
    <div className={cn(
      "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-full",
      taskStatus.isComplete ? "text-green-700 bg-green-100" : "text-gray-600 bg-gray-100"
    )}>
      <span>{taskStatus.completed}/{taskStatus.total}</span>
    </div>
  );
});

// Empty state component
export const EmptyState = React.memo(function EmptyState() {
  return (
    <tr>
      <td colSpan={8} className="px-4 py-8 text-center text-gray-500"> 
        {translations?.app?.admin?.reviews?.noReviews || 'No reviews found'}
      </td>
    </tr>
  );
});

// Empty state with search term component
export const EmptyStateWithSearch = React.memo(function EmptyStateWithSearch({ searchTerm }: { searchTerm: string }) {
  return (
    <tr>
      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
        {searchTerm 
          ? `No reviews found matching "${searchTerm}"`
          : translations?.app?.admin?.reviews?.noReviews || 'No reviews found'}
      </td>
    </tr>
  );
});

// Loading state component
export const LoadingState = React.memo(function LoadingState() {
  return (
    <tr>
      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
        {translations?.app?.admin?.reviews?.loading || 'Loading...'}
      </td>
    </tr>
  );
});