import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';

/**
 * Hook for review motivation section
 * @returns Review motivation section data
 */
export const useReviewMotivation = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return {
    isClient,
    translations,
    containerVariants,
    itemVariants,
    language
  };
};

export default useReviewMotivation;