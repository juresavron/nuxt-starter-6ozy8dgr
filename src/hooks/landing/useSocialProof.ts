import { useState, useEffect, useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';

/**
 * Hook for social proof section
 * @returns Social proof state and data
 */
export const useSocialProof = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Enhanced reviews with more detailed information and translations
  const testimonials = useMemo(() => {
    if (language === 'en') {
      return [
        {
          name: 'Thomas K.',
          role: 'Restaurant Owner',
          content: 'In the first month of use, we got more Google reviews than in the entire previous year. The system is truly efficient and easy to use! Our ratings rose from 4.2 to 4.8 in just two months.',
          rating: 5,
          company: 'Lipa Restaurant',
          location: 'Ljubljana'
        },
        {
          name: 'Anna P.',
          role: 'Beauty Salon Manager',
          content: 'The best investment for our salon. Customers are happy to leave a review, and we also gain new followers on social media. In three months, we gained over 200 new Instagram followers.',
          rating: 5,
          company: 'Beauty Studio Anna',
          location: 'Maribor'
        },
        {
          name: 'Mark B.',
          role: 'Auto Service Director',
          content: 'Since we started using ocenagor.si, our Google rating has increased from 4.2 to 4.8. The system intercepts dissatisfied customers and allows us to resolve issues internally. I recommend it to all businesses that care about their online reputation.',
          rating: 5,
          company: 'Mark\'s Auto Service',
          location: 'Celje'
        },
        {
          name: 'Maya N.',
          role: 'Café Owner',
          content: 'The system is extremely easy to use. Our customers appreciate being able to quickly and easily give feedback. We\'ve also noticed more people returning since we started using ocenagor.si.',
          rating: 5,
          company: 'Café Maya',
          location: 'Koper'
        }
      ];
    } else {
      // Default Slovenian testimonials
      return [
        {
          name: 'Tomaž K.',
          role: 'Lastnik restavracije',
          content: 'V prvem mesecu uporabe smo dobili več Google ocen kot v celem prejšnjem letu. Sistem je res učinkovit in preprost za uporabo! Naše ocene so se dvignile iz 4.2 na 4.8 v samo dveh mesecih.',
          rating: 5,
          company: '',
          location: 'Ljubljana'
        },
        {
          name: 'Ana P.',
          role: 'Vodja lepotnega salona',
          content: 'Najboljša investicija za naš salon. Stranke z veseljem pustijo oceno, mi pa dobimo tudi nove sledilce na družbenih omrežjih. V treh mesecih smo pridobili več kot 200 novih sledilcev na Instagramu.',
          rating: 5,
          company: '',
          location: 'Maribor'
        },
        {
          name: 'Marko B.',
          role: 'Direktor avtoservisa',
          content: 'Odkar uporabljamo ocenagor.si, se je naš rating na Google dvignil iz 4.2 na 4.8. Sistem prestreže nezadovoljne stranke in nam omogoči, da rešimo težave interno. Priporočam vsem podjetjem, ki jim je mar za svoj spletni ugled.',
          rating: 5,
          company: '',
          location: 'Celje'
        },
        {
          name: 'Maja N.',
          role: 'Lastnica kavarne',
          content: 'Sistem je izjemno preprost za uporabo. Naše stranke cenijo, da lahko hitro in enostavno oddajo svoje mnenje. Opažamo tudi, da se več ljudi vrača, odkar smo začeli uporabljati ocenagor.si.',
          rating: 5,
          company: '',
          location: 'Koper'
        }
      ];
    }
  }, [language]);
  
  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isClient, testimonials.length]);

  return {
    testimonials,
    activeIndex,
    setActiveIndex,
    translations,
    isClient
  };
};