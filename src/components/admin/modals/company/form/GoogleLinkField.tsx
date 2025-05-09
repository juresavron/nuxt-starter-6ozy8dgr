import React from 'react';
import { Link } from 'lucide-react';
import { useTranslations } from '../../../../../hooks/useTranslations';

interface GoogleLinkFieldProps {
  googleLink: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

const GoogleLinkField: React.FC<GoogleLinkFieldProps> = ({
  googleLink,
  onChange,
  placeholder,
  disabled = false,
  required = true,
  label
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.form || {};

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <Link className="h-4 w-4 text-gray-500" />
          <span>{label || t.googleLink || "Google povezava"}</span>
        </div>
      </label>
      <input
        type="url"
        value={googleLink}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder || t.googleLinkPlaceholder || "https://g.page/..."}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default React.memo(GoogleLinkField);