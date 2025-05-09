import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { Package, UserPlus, Truck, Settings, Star } from 'lucide-react';

/**
 * Hook for the How to Start section
 * @returns How to Start section data
 */
export const useHowToStart = () => {
  const translations = useTranslations();
  const isClient = useClientSide();
  const { language } = useLanguageStore();
  const t = translations?.landing?.howToStart;
  
  // Define step items with their icons and descriptions
  const steps = useMemo(() => {
    if (language === 'en') {
      return [
        {
          icon: Package,
          title: t?.steps?.[0]?.title || 'Choose a Package',
          description: t?.steps?.[0]?.description || 'Select a package that best suits your needs and number of locations.',
          gradient: 'from-blue-500 to-indigo-600'
        },
        {
          icon: UserPlus,
          title: t?.steps?.[1]?.title || 'Create an Account',
          description: t?.steps?.[1]?.description || 'Create an account in minutes and gain access to your dashboard.',
          gradient: 'from-purple-500 to-indigo-600'
        },
        {
          icon: Truck,
          title: t?.steps?.[2]?.title || 'Receive NFC Components',
          description: t?.steps?.[2]?.description || 'Receive all necessary NFC components (cards, stickers, stands) within 2 days.',
          gradient: 'from-pink-500 to-rose-600'
        },
        {
          icon: Settings,
          title: t?.steps?.[3]?.title || 'Set Up Details',
          description: t?.steps?.[3]?.description || 'Set up all the details of the rating system and customize your profile.',
          gradient: 'from-amber-500 to-orange-600'
        },
        {
          icon: Star,
          title: t?.steps?.[4]?.title || 'Start Receiving Reviews',
          description: t?.steps?.[4]?.description || 'Customers start scanning your NFC components and submitting reviews on Google.',
          gradient: 'from-emerald-500 to-teal-600'
        }
      ];
    } else {
      return [
        {
          icon: Package,
          title: t?.steps?.[0]?.title || 'Izberite paket',
          description: t?.steps?.[0]?.description || 'Izberite paket, ki najbolje ustreza vašim potrebam in številu lokacij.',
          gradient: 'from-blue-500 to-indigo-600'
        },
        {
          icon: UserPlus,
          title: t?.steps?.[1]?.title || 'Ustvarite račun',
          description: t?.steps?.[1]?.description || 'Ustvarite račun v nekaj minutah in pridobite dostop do vaše nadzorne plošče.',
          gradient: 'from-purple-500 to-indigo-600'
        },
        {
          icon: Truck,
          title: t?.steps?.[2]?.title || 'Prejmite NFC komponente',
          description: t?.steps?.[2]?.description || 'V 2 dneh prejmite vse potrebne NFC komponente (kartice, nalepke, stojala).',
          gradient: 'from-pink-500 to-rose-600'
        },
        {
          icon: Settings,
          title: t?.steps?.[3]?.title || 'Nastavite podrobnosti',
          description: t?.steps?.[3]?.description || 'Nastavite vse podrobnosti ocenjevalnega sistema in prilagodite svoj profil.',
          gradient: 'from-amber-500 to-orange-600'
        },
        {
          icon: Star,
          title: t?.steps?.[4]?.title || 'Začnite prejemati ocene',
          description: t?.steps?.[4]?.description || 'Stranke začnejo skenirati vaše NFC komponente in oddajati ocene na Google.',
          gradient: 'from-emerald-500 to-teal-600'
        }
      ];
    }
  }, [t, language]);
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return {
    translations,
    isClient,
    steps,
    containerVariants,
    itemVariants
  };
};

export default useHowToStart;