import { useState, useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { Building2, Scissors, Coffee, Car, Stethoscope, Home } from 'lucide-react';
import { useLanguageStore } from '../useLanguageStore';
import type { LucideIcon } from 'lucide-react';

interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  slug: string;
}

/**
 * Hook for industries section
 * @returns Industries section data
 */
export const useIndustries = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Define industries with their details
  const industries = useMemo<Industry[]>(() => {
    // Translations for industry titles and descriptions
    const industryTitles = {
      business: {
        en: 'Business Services',
        sl: 'Poslovne storitve',
        it: 'Servizi per le Aziende'
      },
      beauty: {
        en: 'Beauty Salons',
        sl: 'Lepotni saloni',
        it: 'Saloni di Bellezza'
      },
      hospitality: {
        en: 'Hospitality',
        sl: 'Gostinstvo',
        it: 'Ristorazione'
      },
      automotive: {
        en: 'Automotive Services',
        sl: 'Avtoservisi',
        it: 'Servizi Automobilistici'
      },
      healthcare: {
        en: 'Healthcare Services',
        sl: 'Zdravstvene storitve',
        it: 'Servizi Sanitari'
      },
      realestate: {
        en: 'Real Estate',
        sl: 'Nepremičnine',
        it: 'Immobiliare'
      }
    };
    
    const industryDescriptions = {
      business: {
        en: 'Increase customer trust and gain more business with credible reviews.',
        sl: 'Povečajte zaupanje strank in pridobite več posla z verodostojnimi ocenami.',
        it: 'Aumenta la fiducia dei clienti e ottieni più affari con recensioni credibili.'
      },
      beauty: {
        en: 'Get more customers and social media followers with our review system.',
        sl: 'Pridobite več strank in sledilcev na družbenih omrežjih z našim sistemom ocen.',
        it: 'Ottieni più clienti e follower sui social media con il nostro sistema di recensioni.'
      },
      hospitality: {
        en: 'Improve your online reputation and get more bookings with reviews from satisfied customers.',
        sl: 'Izboljšajte svoj spletni ugled in pridobite več rezervacij z ocenami zadovoljnih strank.',
        it: 'Migliora la tua reputazione online e ottieni più prenotazioni con recensioni di clienti soddisfatti.'
      },
      automotive: {
        en: 'Build trust and get more customers with credible reviews.',
        sl: 'Zgradite zaupanje in pridobite več strank z verodostojnimi ocenami.',
        it: 'Crea fiducia e ottieni più clienti con recensioni credibili.'
      },
      healthcare: {
        en: 'Increase patient trust and improve your online reputation.',
        sl: 'Povečajte zaupanje pacientov in izboljšajte svoj spletni ugled.',
        it: 'Aumenta la fiducia dei pazienti e migliora la tua reputazione online.'
      },
      realestate: {
        en: 'Get more clients and improve your reputation with reviews from satisfied customers.',
        sl: 'Pridobite več strank in izboljšajte svoj ugled z ocenami zadovoljnih strank.',
        it: 'Ottieni più clienti e migliora la tua reputazione con recensioni di clienti soddisfatti.'
      }
    };

    // Determine the current language and use appropriate translations
    const currentLang = language === 'en' ? 'en' : (language === 'it' ? 'it' : 'sl');

    return [
      {
        icon: Building2,
        title: industryTitles.business[currentLang],
        description: industryDescriptions.business[currentLang],
        color: 'from-blue-500 to-indigo-600',
        slug: 'poslovne'
      },
      {
        icon: Scissors,
        title: industryTitles.beauty[currentLang],
        description: industryDescriptions.beauty[currentLang],
        color: 'from-pink-500 to-rose-600',
        slug: 'lepota'
      },
      {
        icon: Coffee,
        title: industryTitles.hospitality[currentLang],
        description: industryDescriptions.hospitality[currentLang],
        color: 'from-amber-500 to-orange-600',
        slug: 'gostinstvo'
      },
      {
        icon: Car,
        title: industryTitles.automotive[currentLang],
        description: industryDescriptions.automotive[currentLang],
        color: 'from-emerald-500 to-teal-600',
        slug: 'avtoservisi'
      },
      {
        icon: Stethoscope,
        title: industryTitles.healthcare[currentLang],
        description: industryDescriptions.healthcare[currentLang],
        color: 'from-cyan-500 to-blue-600',
        slug: 'zdravje'
      },
      {
        icon: Home,
        title: industryTitles.realestate[currentLang],
        description: industryDescriptions.realestate[currentLang],
        color: 'from-purple-500 to-violet-600',
        slug: 'nepremicnine'
      }
    ];
  }, [language]);
  
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
    industries,
    containerVariants,
    itemVariants
  };
};