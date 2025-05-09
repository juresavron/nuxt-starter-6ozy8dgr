import React from 'react';
import { Building2 } from 'lucide-react';
import { useTranslations } from '../../../../../hooks/useTranslations';

interface LogoUrlFieldProps {
  logoUrl: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  helpText?: string;
}

const LogoUrlField: React.FC<LogoUrlFieldProps> = ({
  logoUrl,
  onChange,
  placeholder = 'https://example.com/logo.png',
  disabled = false,
  label,
  helpText
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.form || {};

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-gray-500" />
          <span>{label || t.logo || "Logotip (neobvezno)"}</span>
        </div>
      </label>
      <input
        type="url"
        value={logoUrl}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder}
        disabled={disabled}
      />
      {helpText && (
        <p className="text-xs text-gray-500 mt-1">
          {helpText || t.logoRequirements || "URL do logotipa podjetja"}
        </p>
      )}
    </div>
  );
};

export default React.memo(LogoUrlField);