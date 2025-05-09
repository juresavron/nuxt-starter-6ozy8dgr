import React from 'react';
import { Building2 } from 'lucide-react';
import { useTranslations } from '../../../../../hooks/useTranslations';

interface CompanyNameFieldProps {
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

const CompanyNameField: React.FC<CompanyNameFieldProps> = ({
  name,
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
          <Building2 className="h-4 w-4 text-gray-500" />
          <span>{label || t.name || "Ime podjetja"}</span>
        </div>
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder || t.namePlaceholder || "Vnesite ime podjetja"}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default React.memo(CompanyNameField);