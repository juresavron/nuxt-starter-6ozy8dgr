import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useState, useEffect } from 'react';
import { Star, MessageSquare, Users, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Hook for benefits section
 * @returns Benefits section data
 */
export const useBenefits = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // Set initial render to false after a small delay
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setIsInitialRender(false);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isClient]);
  
  // Define benefit items with their icons and keys
  const benefitItems = useMemo(() => [
    {
      icon: Star,
      key: 'ratings',
      gradient: 'from-amber-500 to-orange-500',
      rotate: '-rotate-6'
    },
    {
      icon: MessageSquare,
      key: 'ai_messages',
      gradient: 'from-blue-500 to-indigo-600',
      rotate: 'rotate-3'
    },
    {
      icon: Users,
      key: 'contacts',
      gradient: 'from-emerald-500 to-teal-600',
      rotate: '-rotate-3'
    }
  ], []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Benefits data with translations
  const benefitsData = useMemo(() => {
    if (!translations?.landing?.benefits?.items) return [];
    
    return [
      {
        icon: Star,
        title: translations.landing.benefits.items.ratings.title,
        description: translations.landing.benefits.items.ratings.description,
        features: translations.landing.benefits.items.ratings.features,
        colorGradient: 'from-amber-500 to-orange-500'
      },
      {
        icon: MessageSquare,
        title: translations.landing.benefits.items.protection.title,
        description: translations.landing.benefits.items.protection.description,
        features: translations.landing.benefits.items.protection.features,
        colorGradient: 'from-blue-500 to-indigo-600'
      },
      {
        icon: Users,
        title: translations.landing.benefits.items.contacts.title,
        description: translations.landing.benefits.items.contacts.description,
        features: translations.landing.benefits.items.contacts.features,
        colorGradient: 'from-emerald-500 to-teal-600'
      }
    ];
  }, [translations]);

  return {
    isClient,
    translations,
    benefitItems,
    benefitsData,
    containerVariants,
    itemVariants,
    isInitialRender
  };
};

export default useBenefits;