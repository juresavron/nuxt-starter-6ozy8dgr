import React from 'react';
import { Mail, Clock } from 'lucide-react';
import { cn } from '../../../../../utils/cn';
import { useTranslations } from '../../../../../hooks/useTranslations';

interface EmailSettingsToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onDelayChange?: (delay: number) => void;
  delay?: number;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

/**
 * Toggle component for email notification settings
 */
const EmailSettingsToggle: React.FC<EmailSettingsToggleProps> = ({
  checked,
  onChange,
  onDelayChange,
  delay = 0,
  label,
  description,
  disabled = false,
  icon
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.notifications || {};

  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <div className="flex items-center h-6">
          <input
            type="checkbox"
            className={cn(
              "h-5 w-5 rounded border-gray-300",
              "text-indigo-600 focus:ring-indigo-500",
              "transition duration-100 ease-in",
              disabled && "opacity-60 cursor-not-allowed"
            )}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            id={`email-toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`email-toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className={cn(
              "text-sm font-medium flex items-center gap-1.5",
              checked ? "text-indigo-700" : "text-gray-700",
              disabled && "opacity-60 cursor-not-allowed"
            )}
          >
            {icon ? icon : <Mail className="h-4 w-4 text-indigo-500" />}
            {label}
          </label>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      
      {/* Delay setting (only shown when toggle is on) */}
      {checked && onDelayChange && (
        <div className="ml-8 flex items-center gap-2 mt-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">{t.email?.sendAfter || 'Send after'}</span>
            <input
              type="number"
              min="0"
              max="1440"
              value={delay}
              onChange={(e) => onDelayChange(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              disabled={disabled}
            />
            <span className="text-xs text-gray-600">{t.email?.minutes || 'minutes'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(EmailSettingsToggle);