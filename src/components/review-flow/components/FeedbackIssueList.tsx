import * as React from 'react';
import { cn } from '../../../utils/cn';

interface FeedbackIssueListProps {
  issues: string[];
  selectedIssues: string[];
  onIssueToggle: (issue: string) => void;
  colorScheme?: string;
  isLoading?: boolean;
}

/**
 * Component for displaying and selecting feedback issues
 */
const FeedbackIssueList: React.FC<FeedbackIssueListProps> = ({
  issues,
  selectedIssues,
  onIssueToggle,
  colorScheme = 'indigo',
  isLoading = false
}) => {
  // Log when component renders
  React.useEffect(() => {
    console.log('FeedbackIssueList: Rendering with', {
      issuesCount: issues.length,
      selectedCount: selectedIssues.length,
      isLoading,
      timestamp: new Date().toISOString()
    });
  }, [issues.length, selectedIssues.length, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
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
            onChange={() => {
              console.log('FeedbackIssueList: Issue clicked', {
                issue,
                wasSelected: selectedIssues.includes(issue),
                timestamp: new Date().toISOString()
              });
              onIssueToggle(issue);
            }}
          />
          <span className={cn(
            selectedIssues.includes(issue) 
              ? colorScheme === 'amber' ? 'text-amber-700' :
                colorScheme === 'emerald' ? 'text-emerald-700' :
                colorScheme === 'rose' ? 'text-rose-700' :
                colorScheme === 'bw' ? 'text-gray-800' :
                'text-indigo-700'
              : 'text-gray-600'
          )}>
            <span className="text-sm">{issue}</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default React.memo(FeedbackIssueList);