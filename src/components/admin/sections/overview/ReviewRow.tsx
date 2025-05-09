import React from 'react';
import { Clock, Star, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDate } from '../../../../utils/date';
import { useWindowSize } from 'react-use';

interface ReviewRowProps {
  review: any;
  companies: any[];
  tasks: any[];
  hideCompanyColumn?: boolean;
}

/**
 * Row component for the reviews table
 */
const ReviewRow: React.FC<ReviewRowProps> = ({ 
  review, 
  companies, 
  tasks,
  hideCompanyColumn = false 
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  // Debug: Log the review object
  React.useEffect(() => {
    console.log('ReviewRow: Rendering review', {
      id: review?.id,
      company_id: review?.company_id,
      rating: review?.rating,
      created_at: review?.created_at,
      hasEmail: !!review?.email,
      hasPhone: !!review?.phone,
      hasComment: !!review?.comment,
      hasFeedbackOptions: Array.isArray(review?.feedback_options) && review?.feedback_options.length > 0,
      isCompleted: !!review?.completed_at,
      flow_type: review?.flow_type
    });
  }, [review]);

  // Get company name
  const companyName = companies?.find(c => c.id === review.company_id)?.name || 'Unknown Company';
  
  // Get task completion status
  const getTaskCompletion = () => {
    if (!review) return null;
    
    // For high rating flow, show task status regardless of completion
    if (review.flow_type === 'high_rating_gamification') {
      // Calculate total tasks (social tasks + Google review)
      const companyTasks = tasks.filter(t => t.company_id === review.company_id);
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
  };
  
  const taskStatus = getTaskCompletion();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {/* Date */}
      <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>{formatDate(review.created_at)}</span>
        </div>
      </td>
      
      {/* Rating */}
      <td className="px-3 sm:px-6 py-3">
        <div className="flex items-center">
          <span className={`text-xs sm:text-sm font-medium ${
            review.rating >= 4 ? "text-green-600" :
            review.rating >= 3 ? "text-yellow-600" :
            "text-red-600"
          }`}>
            {review.rating}
          </span>
          <div className="flex ml-1 sm:ml-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </td>
      
      {/* Company (if not hidden) */}
      {!hideCompanyColumn && (
        <td className="px-3 sm:px-6 py-3">
          <span className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
            {companyName}
          </span>
        </td>
      )}
      
      {/* Contact Info */}
      <td className="px-3 sm:px-6 py-3">
        <div className="flex flex-col gap-1">
          {review.email && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-indigo-600">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
              <span className="truncate max-w-[120px] sm:max-w-none">{review.email}</span>
            </div>
          )}
          {review.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-amber-500" />
              {review.phone}
            </div>
          )}
        </div>
      </td>
      
      {/* Feedback Options */}
      {!isMobile && (
        <td className="px-3 sm:px-6 py-3">
          {review.feedback_options && review.feedback_options.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {review.feedback_options.map((option: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"
                >
                  {option}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-400">Brez izbire</span>
          )}
        </td>
      )}
      
      {/* Comment */}
      {!isMobile && (
        <td className="px-3 sm:px-6 py-3">
          <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 max-w-md">
                {review.comment || <span className="text-gray-400">Brez komentarja</span>}
              </p>
            </div>
          </div>
        </td>
      )}
      
      {/* Completion Status */}
      <td className="px-3 sm:px-6 py-3">
        <div className="flex items-center">
          {review.completed_at ? (
            <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full ${isMobile ? 'w-7 h-7 justify-center p-0' : ''}`}>
              <CheckCircle className="h-3 w-3 flex-shrink-0 text-emerald-600" />
              {!isMobile && <span>Zaključeno</span>}
            </div>
          ) : (
            <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full ${isMobile ? 'w-7 h-7 justify-center p-0' : ''}`}>
              <Clock className="h-3 w-3 flex-shrink-0 text-blue-500" />
              {!isMobile && <span>V teku</span>}
            </div>
          )}
        </div>
      </td>
      
      {/* Task Status */}
      <td className="px-3 sm:px-6 py-3">
        <div className="flex items-center">
          {taskStatus && (
            <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-full ${
              taskStatus.isComplete ? "text-green-700 bg-green-100" : "text-gray-600 bg-gray-100"
            }`}>
              <span>{taskStatus.completed}/{taskStatus.total}</span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default React.memo(ReviewRow);