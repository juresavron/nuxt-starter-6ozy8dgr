import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { Smartphone, Share2, Gift, Award, Users, Zap } from 'lucide-react';

/**
 * Hook for gamification section
 * @returns Gamification section data
 */
export const useGamification = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.gamification;
  
  // Define features with their icons and descriptions
  const features = useMemo(() => {
    if (!t) return [];
    
    return [
      {
        icon: Smartphone,
        title: t.features[0]?.title || 'Easy to Use',
        description: t.features[0]?.description || 'After submitting a review on Google, the customer gets access to the gamification system where they can complete additional tasks with one touch.',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        icon: Share2,
        title: t.features[1]?.title || 'More Followers',
        description: t.features[1]?.description || 'Customers can follow your social media (Instagram, Facebook, TikTok) and thus increase your follower base.',
        color: 'from-amber-500 to-orange-600'
      },
      {
        icon: Gift,
        title: t.features[2]?.title || 'Rewards for Customers',
        description: t.features[2]?.description || 'For each completed task, the customer receives a reward that they can redeem on their next visit (discounts, free services).',
        color: 'from-emerald-500 to-teal-600'
      }
    ];
  }, [t]);
  
  // Define benefits with their icons and descriptions
  const benefits = useMemo(() => {
    if (!t) return [];
    
    return [
      {
        icon: Share2,
        title: t.benefits[0]?.title || 'More Followers',
        description: t.benefits[0]?.description || 'Gain new followers on social media, which increases your visibility and reach.',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        icon: Gift,
        title: t.benefits[1]?.title || 'Customer Loyalty',
        description: t.benefits[1]?.description || 'Rewards encourage customers to return and increase loyalty to your brand.',
        color: 'from-amber-500 to-orange-600'
      },
      {
        icon: Users,
        title: t.benefits[2]?.title || 'Contact Database',
        description: t.benefits[2]?.description || 'Collect customer contact information for further marketing and communication.',
        color: 'from-emerald-500 to-teal-600'
      }
    ];
  }, [t]);

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
    features,
    benefits,
    containerVariants,
    itemVariants,
    language
  };
};