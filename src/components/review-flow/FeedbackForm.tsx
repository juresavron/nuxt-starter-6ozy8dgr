import * as React from 'react';
import { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { MessageSquare } from 'lucide-react';
import { useTranslations } from '../../hooks/useTranslations';

interface FeedbackFormProps {
  selectedIssues: string[];
  comment: string;
  colorScheme?: string;
  feedbackOptions?: string[];
  onIssueToggle: (issue: string) => void;
  onCommentChange: (comment: string) => void;
  isLoading?: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  selectedIssues,
  comment,
  colorScheme = 'indigo',
  feedbackOptions,
  onIssueToggle,
  onCommentChange,
  isLoading = false
}) => {
  const translations = useTranslations();
  
  // Use company-specific/industry-specific feedback options if provided, otherwise fallback to default options
  const issues = feedbackOptions || [
    translations?.review?.issues?.longWaitTimes,
    translations?.review?.issues?.poorCommunication,
    translations?.review?.issues?.qualityConcerns,
    translations?.review?.issues?.staffAttitude,
    translations?.review?.issues?.priceIssues,
    translations?.review?.issues?.technicalProblems
  ].filter(Boolean);

  useEffect(() => {
    if (selectedIssues.length > 0) {
      console.log("FeedbackForm: Selected issues:", selectedIssues);
    }
  }, [selectedIssues]);

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <h3 className="text-sm sm:text-lg font-medium text-gray-900 mb-4">
          {translations?.review?.issues?.title}
          <span className="text-red-500 ml-1">*</span>
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {issues.map((issue) => (
              <label
                key={issue}
                className={cn(
                  "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedIssues.includes(issue)
                    ? colorScheme === 'amber' ? 'bg-amber-50 border-amber-200 shadow-sm' :
                      colorScheme === 'emerald' ? 'bg-emerald-50 border-emerald-200 shadow-sm' :
                      colorScheme === 'rose' ? 'bg-rose-50 border-rose-200 shadow-sm' :
                      colorScheme === 'bw' ? 'bg-gray-100 border-gray-200 shadow-sm' :
                      'bg-indigo-50 border-indigo-200 shadow-sm'
                    : 'border-gray-200 hover:bg-white/80'
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedIssues.includes(issue)}
                  onChange={() => onIssueToggle(issue)}
                />
                <span className={cn(
                  "text-sm",
                  selectedIssues.includes(issue) 
                    ? colorScheme === 'amber' ? 'text-amber-700' :
                      colorScheme === 'emerald' ? 'text-emerald-700' :
                      colorScheme === 'rose' ? 'text-rose-700' :
                      colorScheme === 'bw' ? 'text-gray-900' :
                      'text-indigo-700'
                    : 'text-gray-600'
                )}>
                  <span className="text-xs sm:text-sm">{issue}</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5 text-gray-500" />
          {translations?.review?.form?.comments}
        </label>
        <textarea
          name="review-comment"
          id="review-comment"
          value={comment}
          onChange={e => onCommentChange(e.target.value)}
          className={cn(
            "input-field",
            colorScheme === 'amber' ? 'focus:ring-amber-500 focus:border-amber-500' :
            colorScheme === 'emerald' ? 'focus:ring-emerald-500 focus:border-emerald-500' :
            colorScheme === 'rose' ? 'focus:ring-rose-500 focus:border-rose-500' :
            colorScheme === 'bw' ? 'focus:ring-gray-700 focus:border-gray-700' :
            'focus:ring-indigo-500 focus:border-indigo-500'
          )}
          rows={4}
          placeholder={translations?.review?.form?.commentsPlaceholder}
        />
      </div>
    </div>
  );
};

export default React.memo(FeedbackForm);