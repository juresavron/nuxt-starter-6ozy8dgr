import React from 'react';
import { Gift } from 'lucide-react';
import { useTranslations } from '../../../../../hooks/useTranslations';

interface GiftDescriptionFieldProps {
  giftDescription: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  description?: string;
  rows?: number;
}

const GiftDescriptionField: React.FC<GiftDescriptionFieldProps> = ({
  giftDescription,
  onChange,
  placeholder,
  disabled = false,
  label,
  description,
  rows = 2
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.form?.gift || {};

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-gray-500" />
          <span>{label || t?.title || "Darilo za oceno (neobvezno)"}</span>
        </div>
      </label>
      <textarea
        value={giftDescription}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder || t?.placeholder || "npr. 10% popust pri naslednjem obisku"}
        rows={rows}
        disabled={disabled}
      />
      <p className="text-xs text-gray-500 mt-1">
        {description || t?.description || "Opis darila, ki ga bo stranka prejela po oddani oceni (prikazano v zahvalnem e-mailu)"}
      </p>
    </div>
  );
};

export default React.memo(GiftDescriptionField);