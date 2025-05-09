import { useLanguageStore } from './useLanguageStore';
import { translations as enTranslations } from '../translations/en';
import { translations as slTranslations } from '../translations/sl';
import { translations as itTranslations } from '../translations/it';
import { industries as enIndustries } from '../translations/en/industries';
import { industries as slIndustries } from '../translations/sl/industries';
import { industries as itIndustries } from '../translations/it/industries';
import { feedbackOptions as enFeedbackOptions } from '../translations/en/feedbackOptions';
import { feedbackOptions as slFeedbackOptions } from '../translations/sl/feedbackOptions';
import { feedbackOptions as itFeedbackOptions } from '../translations/it/feedbackOptions';
import type { Translations } from '../translations/types';

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

  // Fallback to 'en' if language is not valid
  const safeLanguage = ['en', 'sl', 'it'].includes(language) ? language : 'en';

  const baseTranslations = translations[safeLanguage] || null;

  if (!baseTranslations) return null;

  const mergedTranslations = {
    ...baseTranslations,
    translation: {
      ...baseTranslations.translation || {},
      industries: industriesTranslations[safeLanguage] || industriesTranslations.en,
      feedbackOptions: feedbackOptionsTranslations[safeLanguage] || feedbackOptionsTranslations.en
    }
  };

  return mergedTranslations;
};

export const getTranslations = (lang: string): Translations | null => {
  const safeLanguage = ['en', 'sl', 'it'].includes(lang) ? lang : 'en';
  const baseTranslations = translations[safeLanguage] || null;

  if (!baseTranslations) return null;

  const mergedTranslations = {
    ...baseTranslations,
    translation: {
      ...baseTranslations.translation || {},
      industries: industriesTranslations[safeLanguage] || industriesTranslations.en,
      feedbackOptions: feedbackOptionsTranslations[safeLanguage] || feedbackOptionsTranslations.en
    }
  };

  return mergedTranslations;
};

export const getTranslatedIndustry = (key: string, language: string = 'en'): string => {
  const safeLanguage = ['en', 'sl', 'it'].includes(language) ? language : 'en';
  const industries = industriesTranslations[safeLanguage] || industriesTranslations.en;
  return industries[key as keyof typeof industries] || key;
};

export const getTranslatedFeedbackOption = (code: string, language: string = 'en'): string => {
  const safeLanguage = ['en', 'sl', 'it'].includes(language) ? language : 'en';
  const feedbackOptions = feedbackOptionsTranslations[safeLanguage] || feedbackOptionsTranslations.en;

  if (code in feedbackOptions) {
    return feedbackOptions[code as keyof typeof feedbackOptions];
  }

  return code
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};
