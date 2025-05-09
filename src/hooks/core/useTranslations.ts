import { useLanguageStore } from '../useLanguageStore';
import { translations as enTranslations } from '../../translations/en';
import { translations as slTranslations } from '../../translations/sl';
import { translations as itTranslations } from '../../translations/it';
import { industries as enIndustries } from '../../translations/en/industries';
import { industries as slIndustries } from '../../translations/sl/industries';
import { industries as itIndustries } from '../../translations/it/industries';
import { feedbackOptions as enFeedbackOptions } from '../../translations/en/feedbackOptions';
import { feedbackOptions as slFeedbackOptions } from '../../translations/sl/feedbackOptions';
import { feedbackOptions as itFeedbackOptions } from '../../translations/it/feedbackOptions';
import type { Translations } from '../../translations/types';

const translations = {
  en: enTranslations,
  sl: slTranslations,
  it: itTranslations,
};

const industriesTranslations = {
  en: enIndustries,
  sl: slIndustries,
  it: itIndustries,
};

const feedbackOptionsTranslations = {
  en: enFeedbackOptions,
  sl: slFeedbackOptions,
  it: itFeedbackOptions,
};

/**
 * Hook to access translations based on the current language
 * @returns Translations object for the current language
 */
export const useTranslations = (): Translations | null => {
  const { language } = useLanguageStore();
  
  // Get the base translations for the current language
  const baseTranslations = translations[language] || null;
  
  // If there are no base translations, return null
  if (!baseTranslations) return null;
  
  // Merge in the specialized translations
  const mergedTranslations = {
    ...baseTranslations,
    translation: {
      ...baseTranslations.translation || {},
      industries: industriesTranslations[language] || industriesTranslations.en,
      feedbackOptions: feedbackOptionsTranslations[language] || feedbackOptionsTranslations.en
    }
  };
  
  return mergedTranslations;
};

// Helper function to get translations without hooks
export const getTranslations = (lang: string): Translations | null => {
  // Get the base translations for the specified language
  const baseTranslations = translations[lang] || null;
  
  // If there are no base translations, return null
  if (!baseTranslations) return null;
  
  // Merge in the specialized translations
  const mergedTranslations = {
    ...baseTranslations,
    translation: {
      ...baseTranslations.translation || {},
      industries: industriesTranslations[lang] || industriesTranslations.en,
      feedbackOptions: feedbackOptionsTranslations[lang] || feedbackOptionsTranslations.en
    }
  };
  
  return mergedTranslations;
};

/**
 * Get translated industry name from the translation key
 * @param key The industry translation key
 * @param language The language code (en, sl, it)
 * @returns Translated industry name
 */
export const getTranslatedIndustry = (key: string, language: string = 'en'): string => {
  const industries = industriesTranslations[language as keyof typeof industriesTranslations] 
    || industriesTranslations.en;
  return industries[key as keyof typeof industries] || key;
};

/**
 * Get feedback options translation for a specific code
 * @param code The feedback option translation key
 * @param language The language code (en, sl, it)
 * @returns Translated feedback option text
 */
export const getTranslatedFeedbackOption = (code: string, language: string = 'en'): string => {
  const feedbackOptions = feedbackOptionsTranslations[language as keyof typeof feedbackOptionsTranslations] 
    || feedbackOptionsTranslations.en;
  
  // First try to find it in the feedbackOptions object
  if (code in feedbackOptions) {
    return feedbackOptions[code as keyof typeof feedbackOptions];
  }
  
  // If not found, format the code to be more readable
  return code
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};