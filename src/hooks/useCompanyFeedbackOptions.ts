import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslations, getTranslatedFeedbackOption } from './useTranslations';
import { useLanguageStore } from './useLanguageStore';
import { feedbackOptions as enFeedbackOptions } from '../translations/en/feedbackOptions';
import { feedbackOptions as slFeedbackOptions } from '../translations/sl/feedbackOptions';
import { feedbackOptions as itFeedbackOptions } from '../translations/it/feedbackOptions';

interface FeedbackOption {
  id: string;
  translation_key: string;
  industry_id: string;
  flow_type?: string;
}

/**
 * Hook to fetch industry-specific feedback options for a company
 * 
 * @param companyId - The ID of the company
 * @param isMidRating - Whether to fetch mid-rating (4 stars) feedback options
 * @returns An object containing the feedback options, loading state, and error
 */
export const useCompanyFeedbackOptions = (companyId?: string, isMidRating?: boolean) => {
  const [feedbackOptions, setFeedbackOptions] = useState<string[]>([]);
  // Store the raw options with translation keys for internal use
  const [rawOptions, setRawOptions] = useState<FeedbackOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguageStore();
  
  // Get the appropriate translations based on language
  const translationMap = {
    'en': enFeedbackOptions,
    'sl': slFeedbackOptions,
    'it': itFeedbackOptions
  };

  useEffect(() => {
    const fetchFeedbackOptions = async () => {
      if (!companyId) {
        setFeedbackOptions([]);
        setRawOptions([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // First, get the company's industry_id and any custom feedback options
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('industry_id, feedback_options, mid_rating_feedback_options')
          .eq('id', companyId)
          .single();

        if (companyError) throw companyError;

        // If company has predefined feedback options for the appropriate rating type, use those
        const optionsField = isMidRating ? 'mid_rating_feedback_options' : 'feedback_options';
        
        if (companyData && companyData[optionsField] && companyData[optionsField].length > 0) {
          console.log(`Using company predefined ${isMidRating ? 'mid-rating' : 'low-rating'} feedback option codes:`, companyData[optionsField]);
          
          // Translate the codes to display text using the selected language
          const translatedOptions = companyData[optionsField].map(code => {
            return getTranslatedFeedbackOption(code, language);
          });
          
          setFeedbackOptions(translatedOptions);
          setLoading(false);
          return;
        }

        let options: FeedbackOption[] = [];

        // First try to get industry-specific options with the correct flow_type
        if (companyData?.industry_id) {
          const flowTypeToFetch = isMidRating ? 'mid_rating' : 'low_rating';
          console.log(`Fetching ${flowTypeToFetch} feedback options for industry ${companyData.industry_id}`);
          
          const { data: optionsData, error: optionsError } = await supabase
            .from('industry_feedback_options')
            .select('id, translation_key, industry_id, flow_type')
            .eq('industry_id', companyData.industry_id)
            .eq('flow_type', flowTypeToFetch)
            .order('translation_key');

          if (optionsError) throw optionsError;
          
          if (optionsData && optionsData.length > 0) {
            options = optionsData;
            setRawOptions(optionsData);
          } else {
            console.log(`No ${flowTypeToFetch} options found for industry ${companyData.industry_id}, looking for general options`);
          }
        }

        // If no industry-specific options found, fall back to general options
        if (options.length === 0) {
          // Try to get general feedback options
          const { data: generalIndustryData } = await supabase
            .from('industries')
            .select('id')
            .eq('translation_key', 'general')
            .single();

          if (generalIndustryData?.id) {
            const flowTypeToFetch = isMidRating ? 'mid_rating' : 'low_rating';
            const { data: generalOptionsData } = await supabase
              .from('industry_feedback_options')
              .select('id, translation_key, industry_id, flow_type')
              .eq('industry_id', generalIndustryData.id)
              .eq('flow_type', flowTypeToFetch)
              .order('translation_key');

            if (generalOptionsData && generalOptionsData.length > 0) {
              options = generalOptionsData;
              setRawOptions(generalOptionsData);
            }
          }
        }

        // If still no options, use hardcoded fallback
        if (options.length === 0) {
          // Create translated display options based on current language
          const selectedTranslations = translationMap[language as keyof typeof translationMap] || enFeedbackOptions;
          
          // Use different fallback keys based on rating type
          const fallbackKeys = isMidRating ? [
            'satisfied_but_room_for_improvement',
            'overall_good_experience_with_minor_issues',
            'would_recommend_with_caveats',
            'reasonable_value_for_money',
            'good_but_could_be_more_efficient'
          ] : [
            'long_wait_times',
            'poor_communication',
            'staff_attitude',
            'quality_concerns',
            'price_issues',
            'cleanliness_issues',
            'technical_problems'
          ];
          
          // Use translated fallback options
          const translatedFallbacks = fallbackKeys.map(key => 
            selectedTranslations[key as keyof typeof selectedTranslations] || key
          );
          
          setFeedbackOptions(translatedFallbacks);
        } else {
          // Translate translation keys to display text using the selected language
          const translatedOptions = options.map(option => {
            return getTranslatedFeedbackOption(option.translation_key, language);
          });
          
          setFeedbackOptions(translatedOptions);
        }
      } catch (err) {
        console.error('Error fetching feedback options:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch feedback options');
        
        // Set default options in case of error based on rating type
        const selectedTranslations = translationMap[language as keyof typeof translationMap] || enFeedbackOptions;
        
        if (isMidRating) {
          setFeedbackOptions([
            selectedTranslations['satisfied_but_room_for_improvement'] || 'Satisfied but room for improvement',
            selectedTranslations['overall_good_experience_with_minor_issues'] || 'Good experience with minor issues',
            selectedTranslations['would_recommend_with_caveats'] || 'Would recommend with caveats',
            selectedTranslations['reasonable_value_for_money'] || 'Reasonable value for money',
            selectedTranslations['good_but_could_be_more_efficient'] || 'Good but could be more efficient'
          ]);
        } else {
          setFeedbackOptions([
            selectedTranslations['long_wait_times'] || 'Long wait times',
            selectedTranslations['poor_communication'] || 'Poor communication',
            selectedTranslations['staff_attitude'] || 'Staff attitude',
            selectedTranslations['quality_concerns'] || 'Quality concerns',
            selectedTranslations['price_issues'] || 'Price issues',
            selectedTranslations['cleanliness_issues'] || 'Cleanliness issues',
            selectedTranslations['technical_problems'] || 'Technical problems'
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackOptions();
  }, [companyId, language, isMidRating]);

  // Get translation_key for a displayed option text
  const getOptionCode = (optionText: string): string => {
    const option = rawOptions.find(o => getTranslatedFeedbackOption(o.translation_key, language) === optionText);
    return option?.translation_key || optionText;
  };

  // Get display text for a stored translation_key
  const getOptionText = (code: string): string => {
    return getTranslatedFeedbackOption(code, language);
  };

  return { 
    feedbackOptions, 
    loading, 
    error,
    rawOptions,
    getOptionCode,
    getOptionText 
  };
};

export default useCompanyFeedbackOptions;