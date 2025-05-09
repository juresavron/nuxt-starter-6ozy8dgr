import React from 'react';
import { FileText } from 'lucide-react';

interface BlogTitleFieldProps {
  title: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

/**
 * Blog post title input field
 */
const BlogTitleField: React.FC<BlogTitleFieldProps> = ({
  title,
  onChange,
  placeholder = 'Enter post title',
  disabled = false,
  required = true,
  label = 'Title'
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span>{label}</span>
        </div>
      </label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(BlogTitleField);