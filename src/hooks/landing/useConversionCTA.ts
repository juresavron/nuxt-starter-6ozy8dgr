import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { Zap, Shield, Gift, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface BenefitItem {
  icon: LucideIcon;
  text: string;
}

/**
 * Hook for conversion CTA section
 * @returns Conversion CTA section data
 */
export const useConversionCTA = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get translations
  const t = translations?.landing?.cta;
  
  // Define benefits with icons for better visual appeal
  const benefitItems = useMemo<BenefitItem[]>(() => {
    // Get feature texts from translations or use defaults
    const featureTexts = t?.features || [
      'Immediate Setup',
      'No Contract',
      'Free Trial Period',
      'Technical Support',
      'Free Delivery'
    ];
    
    // Map icons to features
    const icons = [Zap, Shield, Gift, CheckCircle2, Gift];
    
    return featureTexts.map((text, index) => ({
      icon: icons[index % icons.length],
      text
    }));
  }, [t]);

  // Get appropriate button text based on language
  const startNowText = language === 'en' ? 'Start Now' : 
                      language === 'it' ? 'Inizia Ora' : 
                      'Začni zdaj';
  
  // Get view packages text based on language
  const viewPackagesText = language === 'en' ? 'View Packages' : 
                           language === 'it' ? 'Visualizza Pacchetti' : 
                           'Oglej si pakete';
  
  // Get title with fallback
  const title = t?.title || (
    language === 'en' ? 'Start Collecting Reviews and Followers Today' :
    language === 'it' ? 'Inizia a Raccogliere Recensioni e Follower Oggi' :
    'Začnite zbirati ocene in sledilce že danes'
  );
  
  // Get subtitle with fallback
  const subtitle = t?.subtitle || (
    language === 'en' ? 'Setup takes less than 5 minutes. Immediately after registration, you receive access to the system and your first NFC card.' :
    language === 'it' ? 'La configurazione richiede meno di 5 minuti. Subito dopo la registrazione, ricevi accesso al sistema e la tua prima carta NFC.' :
    'Nastavitev traja manj kot 5 minut. Takoj po registraciji prejmete dostop do sistema in vašo prvo NFC kartico.'
  );
  
  // Get setup description with fallback
  const setupDescription = t?.setupDescription || (
    language === 'en' ? 'Setup takes less than 5 minutes. Immediately after registration, you receive access to the system and your first NFC card.' :
    language === 'it' ? 'La configurazione richiede meno di 5 minuti. Subito dopo la registrazione, ricevi accesso al sistema e la tua prima carta NFC.' :
    'Nastavitev traja manj kot 5 minut. Takoj po registraciji prejmete dostop do sistema in vašo prvo NFC kartico.'
  );

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
    benefitItems,
    containerVariants,
    itemVariants,
    language,
    startNowText,
    viewPackagesText,
    title,
    subtitle,
    setupDescription
  };
};