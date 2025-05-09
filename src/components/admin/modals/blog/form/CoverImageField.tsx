import React from 'react';
import { Image } from 'lucide-react';

interface CoverImageFieldProps {
  coverImage: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

/**
 * Blog post cover image URL input field
 */
const CoverImageField: React.FC<CoverImageFieldProps> = ({
  coverImage,
  onChange,
  placeholder = 'https://images.unsplash.com/photo-...',
  disabled = false,
  label = 'Cover Image URL (optional)'
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Image className="h-4 w-4 text-gray-500" />
          <span>{label}</span>
        </div>
      </label>
      <input
        type="url"
        name="cover_image"
        value={coverImage}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(CoverImageField);