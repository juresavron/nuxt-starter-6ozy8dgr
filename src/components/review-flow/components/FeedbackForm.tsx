import * as React from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import FeedbackIssueList from './FeedbackIssueList';
import CommentField from './CommentField';

interface FeedbackFormProps {
  selectedIssues: string[];
  comment: string;
  colorScheme?: string;
  feedbackOptions?: string[];
  onIssueToggle: (issue: string) => void;
  onCommentChange: (comment: string) => void;
  isLoading?: boolean;
}

/**
 * Feedback form component for collecting issues and comments
 */
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

  // Log selected issues when they change
  React.useEffect(() => {
    if (selectedIssues.length > 0) {
      console.log("FeedbackForm: Selected issues:", {
        issues: selectedIssues,
        count: selectedIssues.length,
        timestamp: new Date().toISOString()
      });
    }
  }, [selectedIssues]);

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-4">
          {translations?.review?.issues?.title || 'Kaj bi lahko izboljšali?'}
          <span className="text-red-500 ml-1">*</span>
        </h3>
        
        <FeedbackIssueList
          issues={issues}
          selectedIssues={selectedIssues}
          onIssueToggle={(issue) => {
            console.log('FeedbackForm: Issue toggle requested', {
              issue,
              wasSelected: selectedIssues.includes(issue),
              timestamp: new Date().toISOString()
            });
            onIssueToggle(issue);
          }}
          colorScheme={colorScheme}
          isLoading={isLoading}
        />
      </div>

      <CommentField
        comment={comment}
        onCommentChange={onCommentChange}
        colorScheme={colorScheme}
      />
    </div>
  );
};

export default React.memo(FeedbackForm);