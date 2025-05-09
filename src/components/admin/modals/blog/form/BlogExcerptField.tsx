import React from 'react';
import { FileText } from 'lucide-react';

interface BlogExcerptFieldProps {
  excerpt: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  rows?: number;
}

/**
 * Blog post excerpt textarea field
 */
const BlogExcerptField: React.FC<BlogExcerptFieldProps> = ({
  excerpt,
  onChange,
  placeholder = 'Enter a short excerpt or summary of the post...',
  disabled = false,
  label = 'Excerpt (optional)',
  rows = 3
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span>{label}</span>
        </div>
      </label>
      <textarea
        name="excerpt"
        value={excerpt}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(BlogExcerptField);