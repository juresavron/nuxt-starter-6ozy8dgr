import React from 'react';
import { User } from 'lucide-react';

interface BlogAuthorFieldProps {
  author: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

/**
 * Blog post author input field
 */
const BlogAuthorField: React.FC<BlogAuthorFieldProps> = ({
  author,
  onChange,
  placeholder = 'Enter author name',
  disabled = false,
  required = true,
  label = 'Author'
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500" />
          <span>{label}</span>
        </div>
      </label>
      <input
        type="text"
        name="author"
        value={author}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(BlogAuthorField);