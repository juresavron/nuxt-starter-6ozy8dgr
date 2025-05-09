import * as React from 'react';
import { cn } from '../../../utils/cn';

interface ContactFormFieldProps {
  type: 'email' | 'phone';
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  colorScheme?: string;
  required?: boolean;
  helpText?: string;
}

/**
 * Reusable contact form field component for email and phone inputs
 */
const ContactFormField: React.FC<ContactFormFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  colorScheme = 'indigo',
  required = true,
  helpText
}) => {
  // Determine icon based on type
  const icon = type === 'email' ? '📧' : '📱';
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Log the change with privacy protection
    console.log(`📝 ContactFormField: ${type} input changed`, {
      value: newValue ? 
        type === 'email' ? 
          `${newValue.substring(0, 3)}...${newValue.includes('@') ? newValue.substring(newValue.indexOf('@')) : ''}` : 
          `${newValue.substring(0, 3)}...` 
        : '(empty)',
      length: newValue?.length || 0,
      timestamp: new Date().toISOString()
    });
    
    // Call the onChange handler
    onChange(newValue);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={`review-${type}`}
        id={`review-${type}`}
        value={value}
        onChange={handleChange}
        className={cn(
          "input-field text-sm",
          colorScheme === 'amber' ? 'focus:ring-amber-500 focus:border-amber-500' :
          colorScheme === 'emerald' ? 'focus:ring-emerald-500 focus:border-emerald-500' :
          colorScheme === 'rose' ? 'focus:ring-rose-500 focus:border-rose-500' :
          colorScheme === 'bw' ? 'focus:ring-gray-700 focus:border-gray-700' :
          'focus:ring-indigo-500 focus:border-indigo-500'
        )}
        placeholder={placeholder}
        required={required}
      />
      {helpText && (
        <p className="mt-1 text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default React.memo(ContactFormField);