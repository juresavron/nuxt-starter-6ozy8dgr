import React, { useEffect, useState } from 'react';
import { ListFilter } from 'lucide-react';
import { cn } from '../../../../../utils/cn';
import { supabase } from '../../../../../lib/supabase';
import { useTranslations, getTranslatedFeedbackOption } from '../../../../../hooks/useTranslations';
import { useLanguageStore } from '../../../../../hooks/useLanguageStore';

interface FeedbackOption {
  id: string;
  translation_key: string;
  industry_id: string;
  flow_type?: string;
}

interface IndustryFeedbackOptionsProps {
  industryId: string | null;
  selectedOptions: string[];
  onOptionChange: (options: string[]) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
  flowType?: 'low_rating' | 'mid_rating';
}

/**
 * Industry-specific feedback options component
 * Used to display and select feedback options based on the selected industry
 */
const IndustryFeedbackOptions: React.FC<IndustryFeedbackOptionsProps> = ({
  industryId,
  selectedOptions,
  onOptionChange,
  disabled = false,
  label,
  description,
  className,
  flowType = 'low_rating'
}) => {
  const [options, setOptions] = useState<FeedbackOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.app?.admin?.company?.form || {};

  // Fetch feedback options for the selected industry
  useEffect(() => {
    const fetchFeedbackOptions = async () => {
      if (!industryId) {
        setOptions([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('industry_feedback_options')
          .select('id, translation_key, industry_id, flow_type')
          .eq('industry_id', industryId)
          .eq('flow_type', flowType)
          .order('translation_key');
          
        if (error) throw error;
        
        setOptions(data || []);
        console.log(`Fetched ${data?.length || 0} feedback options for industry ${industryId} with flow_type ${flowType}`);
      } catch (err) {
        console.error('Error fetching feedback options:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch feedback options');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedbackOptions();
  }, [industryId, language, flowType]);

  // Handle option selection/deselection
  const handleOptionToggle = (translationKey: string) => {
    if (selectedOptions.includes(translationKey)) {
      onOptionChange(selectedOptions.filter((o) => o !== translationKey));
    } else {
      onOptionChange([...selectedOptions, translationKey]);
    }
  };

  // Translate feedback option from translation_key to display text
  const getDisplayText = (option: FeedbackOption): string => {
    // Try to get translated text using the translation_key
    if (option.translation_key) {
      const translatedText = getTranslatedFeedbackOption(option.translation_key, language);
      if (translatedText !== option.translation_key) {
        return translatedText;
      }
    }
    
    // Fallback to the translation_key itself formatted as display text
    return option.translation_key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  // If no industry is selected, don't render anything
  if (!industryId) {
    return null;
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-gray-500" />
          <span>{label || (flowType === 'mid_rating' ? t.midRatingFeedbackOptions : t.feedbackOptions) || "Možnosti povratnih informacij"}</span>
        </div>
      </label>
      
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      
      {!description && (
        <p className="text-xs text-gray-500 mb-2">
          {flowType === 'mid_rating' 
            ? (t.midRatingFeedbackOptionsDescription || "Te možnosti bodo prikazane strankam, ki pustijo 4 zvezdice")
            : (t.feedbackOptionsDescription || "Izbrane možnosti bodo prikazane strankam, ki pustijo nizke ocene")}
        </p>
      )}
      
      {loading && (
        <div className="p-4 text-center text-gray-500">
          {t.loadingFeedbackOptions || "Nalaganje možnosti povratnih informacij..."}
        </div>
      )}
      
      {error && (
        <div className="p-4 text-center text-red-500">
          {error}
        </div>
      )}
      
      {!loading && !error && options.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          {t.noFeedbackOptions || "Za to industrijo ni najdenih možnosti povratnih informacij"}
        </div>
      )}
      
      {!loading && !error && options.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`option-${option.id}`}
                  checked={selectedOptions.includes(option.translation_key)}
                  onChange={() => handleOptionToggle(option.translation_key)}
                  disabled={disabled}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`option-${option.id}`}
                  className={cn(
                    "ml-2 block text-sm text-gray-700",
                    disabled && "text-gray-400 cursor-not-allowed"
                  )}
                >
                  {getDisplayText(option)}
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {flowType === 'low_rating' 
              ? (t.feedbackOptionsDescription || "Izbrane možnosti bodo prikazane strankam, ki pustijo nizke ocene") 
              : "Izbrane možnosti bodo prikazane strankam, ki pustijo 4 zvezdice"}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(IndustryFeedbackOptions);