import React from 'react';
import { Globe } from 'lucide-react';

interface PublishedToggleProps {
  published: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

/**
 * Toggle switch for blog post published status
 */
const PublishedToggle: React.FC<PublishedToggleProps> = ({
  published,
  onChange,
  disabled = false,
  label = 'Published'
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="published"
        name="published"
        checked={published}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        disabled={disabled}
      />
      <label htmlFor="published" className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Globe className="h-4 w-4 text-gray-500" />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default React.memo(PublishedToggle);