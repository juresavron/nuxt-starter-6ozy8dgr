import * as React from 'react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';

interface CommentFieldProps {
  comment: string;
  onCommentChange: (comment: string) => void;
  colorScheme?: string;
  rows?: number;
}

/**
 * Comment textarea component for feedback form
 */
const CommentField: React.FC<CommentFieldProps> = ({
  comment,
  onCommentChange,
  colorScheme = 'indigo',
  rows = 4
}) => {
  const translations = useTranslations();

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
        <span className="text-lg">💬</span>
        {translations?.review?.form?.comments || 'Dodatni komentarji'}
      </label>
      <textarea
        name="review-comment"
        id="review-comment"
        value={comment}
        onChange={e => onCommentChange(e.target.value)}
        className={cn(
          "input-field text-sm",
          colorScheme === 'amber' ? 'focus:ring-amber-500 focus:border-amber-500' :
          colorScheme === 'emerald' ? 'focus:ring-emerald-500 focus:border-emerald-500' :
          colorScheme === 'rose' ? 'focus:ring-rose-500 focus:border-rose-500' :
          colorScheme === 'bw' ? 'focus:ring-gray-700 focus:border-gray-700' :
          'focus:ring-indigo-500 focus:border-indigo-500'
        )}
        rows={rows}
        placeholder={translations?.review?.form?.commentsPlaceholder || 'Povejte nam več o vaši izkušnji...'}
      />
    </div>
  );
};

export default React.memo(CommentField);