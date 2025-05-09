import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

interface BlogContentFieldProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  rows?: number;
}

/**
 * Blog post content textarea field
 */
const BlogContentField: React.FC<BlogContentFieldProps> = ({
  content,
  onChange,
  placeholder = 'Write your blog post content here...',
  disabled = false,
  required = true,
  label = 'Content',
  rows = 8
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 text-gray-500" />
          <span>{label}</span>
        </div>
      </label>
      <textarea
        name="content"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        rows={rows}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(BlogContentField);