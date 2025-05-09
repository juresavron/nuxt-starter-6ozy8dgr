import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';

/**
 * Hook for hero section
 * @returns Hero section data
 */
export const useHero = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const currentLanguage = useLanguageStore(state => state.language);

  // Prepare hero features
  const heroFeatures = useMemo(() => {
    if (!isClient) return [];
    return [
      { 
        text: 'noContract', 
        label: translations?.landing?.hero?.features?.noContract || 'No contract'
      },
      { 
        text: 'trial', 
        label: translations?.landing?.hero?.features?.trial || '14-day trial'
      },
      { 
        text: 'support', 
        label: translations?.landing?.hero?.features?.support || 'Technical support'
      }
    ];
  }, [isClient, translations]);

  // Prepare hero stats
  const heroStats = useMemo(() => {
    if (!isClient) return [];
    return [
      { 
        icon: 'Star', 
        value: '4.8/5', 
        text: currentLanguage === 'sl' ? 'Povišanje povprečne ocene' : 
              currentLanguage === 'it' ? 'Aumento della valutazione media' : 'Average rating increase',
        gradient: 'from-amber-500 to-orange-600'
      },
      { 
        icon: 'TrendingUp', 
        value: '+127%', 
        text: currentLanguage === 'sl' ? 'Več Google ocen' : 
              currentLanguage === 'it' ? 'Più recensioni Google' : 'More Google reviews',
        gradient: 'from-blue-500 to-blue-700'
      },
      { 
        icon: 'Award', 
        value: '20+', 
        text: currentLanguage === 'sl' ? 'Zadovoljne stranke' : 
              currentLanguage === 'it' ? 'Aziende soddisfatte' : 'Satisfied businesses',
        gradient: 'from-purple-500 to-indigo-600'
      }
    ];
  }, [isClient, currentLanguage]);

  return {
    translations,
    heroFeatures,
    heroStats
  };
};