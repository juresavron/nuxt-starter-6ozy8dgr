import { useState, useEffect, useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { useRef } from 'react';

/**
 * Hook for value proposition section
 * @returns Value proposition state and data
 */
export const useValueProposition = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const language = useLanguageStore(state => state.language);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Set up intersection observer manually
  useEffect(() => {
    if (!isClient || !ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    // Set initial render to false after a small delay to prevent animation flickering
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);
    
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isClient]);

  // Create stats array
  const stats = useMemo(() => [
    {
      icon: 'Star',
      gradient: 'from-amber-500 to-orange-600',
      value: 4.8,
      suffix: '/5',
      decimals: 1,
      text: translations?.landing?.valueProposition?.stats?.rating?.title,
      description: translations?.landing?.valueProposition?.stats?.rating?.description || 
        (language === 'sl' ? 'Naše stranke dosegajo višje ocene s pametnim sistemom' : 'Our clients achieve higher ratings with our smart system')
    },
    {
      icon: 'TrendingUp',
      gradient: 'from-blue-600 to-indigo-600',
      value: 127,
      prefix: '+',
      suffix: '%',
      text: translations?.landing?.valueProposition?.stats?.reviews?.title,
      description: translations?.landing?.valueProposition?.stats?.reviews?.description ||
        (language === 'sl' ? 'Povprečno povišanje števila Google ocen v prvem mesecu' : 'Average increase in Google reviews during first month')
    },
    {
      icon: 'Shield',
      gradient: 'from-emerald-500 to-teal-600',
      value: 98,
      suffix: '%',
      text: translations?.landing?.valueProposition?.stats?.prevention?.title,
      description: translations?.landing?.valueProposition?.stats?.prevention?.description ||
        (language === 'sl' ? 'Uspešno prestrežene in interno rešene težave' : 'Issues successfully intercepted and resolved privately')
    },
    {
      icon: 'Users',
      gradient: 'from-purple-500 to-violet-600',
      value: 20,
      suffix: '+',
      text: translations?.landing?.valueProposition?.stats?.customers?.title,
      description: translations?.landing?.valueProposition?.stats?.customers?.description ||
        (language === 'sl' ? 'Podjetja, ki nam zaupajo svoj spletni ugled' : 'Businesses trusting us with their online reputation')
    }
  ], [translations, language]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }
  };

  return {
    ref,
    inView,
    stats,
    translations,
    isClient,
    isInitialRender,
    containerVariants,
    itemVariants
  };
};