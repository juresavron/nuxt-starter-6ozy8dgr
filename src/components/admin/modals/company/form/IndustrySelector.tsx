import React, { useEffect, useState } from 'react';
import { AtomIcon } from 'lucide-react';
import { cn } from '../../../../../utils/cn';
import { supabase } from '../../../../../lib/supabase';
import { useTranslations, getTranslatedIndustry } from '../../../../../hooks/useTranslations';
import { useLanguageStore } from '../../../../../hooks/useLanguageStore';

interface Industry {
  id: string;
  translation_key: string;
  created_at?: string;
}

interface IndustrySelectorProps {
  industryId: string | null;
  onChange: (industryId: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/**
 * Industry selector component
 * Used to select an industry from a dropdown in the company form
 */
const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  industryId,
  onChange,
  disabled = false,
  label,
  className,
}) => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.app?.admin?.company?.form || {};

  // Fetch industries from the database
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('industries')
          .select('id, translation_key, created_at')
          .order('translation_key');
          
        if (error) throw error;
        
        setIndustries(data || []);
      } catch (err) {
        console.error('Error fetching industries:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch industries');
      } finally {
        setLoading(false);
      }
    };
    
    fetchIndustries();
  }, []);

  // Get translated industry name using translation_key
  const getIndustryName = (industry: Industry): string => {
    return getTranslatedIndustry(industry.translation_key || '', language) || industry.translation_key;
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndustryId = e.target.value;
    onChange(newIndustryId);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <AtomIcon className="h-4 w-4 text-gray-500" />
          <span>{label || t.industry || "Industrija"}</span>
        </div>
      </label>
      
      <select
        value={industryId || ''}
        onChange={handleIndustryChange}
        className={cn(
          "w-full p-2.5 bg-white border border-gray-300 rounded-lg",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          "transition-colors duration-200"
        )}
        disabled={disabled || loading}
      >
        <option value="">{t.selectIndustry || "Izberi industrijo"}</option>
        {industries.map((industry) => (
          <option key={industry.id} value={industry.id}>
            {getIndustryName(industry)}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
      
      {loading && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {t.loadingIndustries || "Nalaganje industrij..."}
        </p>
      )}
      
      <p className="mt-1 text-xs text-gray-500">
        {t.industryDescription || "Izbira industrije omogoča prikaz specifičnih povratnih informacij za vašo panogo"}
      </p>
    </div>
  );
};

export default React.memo(IndustrySelector);