import React from 'react';
import { Palette } from 'lucide-react';
import { useTranslations } from '../../../../../hooks/useTranslations';

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
}

interface ColorSchemeSelectorProps {
  selectedScheme: string;
  onChange: (scheme: string) => void;
  disabled?: boolean;
  label?: string;
}

const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  selectedScheme,
  onChange,
  disabled = false,
  label
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.colorSchemes || {};
  
  // Color scheme options
  const colorSchemes: ColorScheme[] = [
    { id: 'indigo', name: t?.indigo || 'Indigo', primary: 'from-indigo-500 to-purple-500', secondary: 'bg-indigo-50' },
    { id: 'emerald', name: t?.emerald || 'Emerald', primary: 'from-emerald-500 to-teal-500', secondary: 'bg-emerald-50' },
    { id: 'amber', name: t?.amber || 'Amber', primary: 'from-amber-500 to-orange-500', secondary: 'bg-amber-50' },
    { id: 'rose', name: t?.rose || 'Rose', primary: 'from-rose-500 to-pink-500', secondary: 'bg-rose-50' },
    { id: 'bw', name: t?.bw || 'Black & White', primary: 'from-gray-700 to-gray-900', secondary: 'bg-gray-100' }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-gray-500" />
          <span>{label || translations?.app?.admin?.company?.form?.colorScheme || "Barvna shema"}</span>
        </div>
      </label>
      <div className="grid grid-cols-5 gap-3 mt-2">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            type="button"
            onClick={() => onChange(scheme.id)}
            className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center gap-2 ${
              selectedScheme === scheme.id
                ? 'border-blue-500 ring-2 ring-blue-200 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            disabled={disabled}
          >
            <div className={`w-full h-8 rounded-md bg-gradient-to-r ${scheme.primary}`}></div>
            <span className="text-xs font-medium">{scheme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ColorSchemeSelector);