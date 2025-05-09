import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../useLanguageStore';
import { getPackages, getAddOns } from '../../data/pricing';
import type { PricingFeature } from '../../types/pricing';
import { useTranslations } from '../useTranslations';
import { useClientSide } from '../useClientSide';

export const usePricing = () => {
  const [isYearly, setIsYearly] = useState(true); // Changed default to true for yearly billing
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const navigate = useNavigate();

  const packages = useMemo(() => getPackages(language), [language]);
  const addOns = useMemo(() => getAddOns(language), [language]);

  const pricingFeatures: PricingFeature[] = useMemo(() => {
    // Use language-specific values
    if (language === 'en') {
      return [
        // Text-based features
        { name: translations?.landing?.pricing?.numLocations || 'Number of unique codes for multiple users or departments (at one location)', values: ['Up to 3', 'Up to 5'] },
        { name: translations?.landing?.pricing?.nfcEquipment || 'Included NFC equipment', values: ['Up to 5x cards/stickers/stands', 'Up to 10x cards/stickers/stands'] },
        { name: translations?.landing?.pricing?.rewardType || 'Reward type', values: ['Coupon for each review, lottery, or no rewards', 'Coupon for each review, lottery, or no rewards'] },
        { name: translations?.landing?.pricing?.companyDashboard || 'Company results dashboard', values: ['Basic', 'Advanced'] },
        { name: translations?.landing?.pricing?.reportsDataExport || 'Reports and data export (CSV)', values: ['Included', 'Included'] },
        { name: translations?.landing?.pricing?.analytics || 'Analytics (responsiveness, trends)', values: ['Advanced', 'Advanced'] },
        { name: translations?.landing?.pricing?.questionnaire || 'Questionnaire about reasons for dissatisfaction', values: ['Industry-specific questionnaire', 'Custom questionnaire'] },
        { name: translations?.landing?.pricing?.onboardingSystem || 'System onboarding', values: ['Guided setup', '+ consulting'] },
        { name: translations?.landing?.pricing?.support || 'Support', values: ['Basic', 'Priority'] },
        // Features with "Included" text
        { name: translations?.landing?.pricing?.customReviewPage || 'Customized review page', values: ['✓', '✓'] },
        { name: translations?.landing?.pricing?.gamification || 'Gamification', values: ['✓', '✓'] },
        { name: translations?.landing?.pricing?.emailPhoneCapture || 'Email / phone capture', values: ['✓', '✓'] },
        { name: translations?.landing?.pricing?.whiteLabel || 'White-label (no ocenagor.si logo)', values: ['—', 'Included'] },
        { name: 'Personalized design of physical components', values: ['—', 'Included'] },
        { name: translations?.landing?.pricing?.teamContacts || 'Team contacts dissatisfied customers', values: ['—', 'Our team contacts'] }
      ];
    } else if (language === 'it') {
      return [
        // Text-based features
        { name: '🏢 Numero di sedi', values: ['Fino a 3', 'Fino a 5'] },
        { name: '📱 Attrezzatura NFC inclusa', values: ['Fino a 5x carte/adesivi/supporti', 'Fino a 10x carte/adesivi/supporti'] },
        { name: 'Tipo di premio', values: ['Coupon per ogni recensione, lotteria, o nessun premio', 'Coupon per ogni recensione, lotteria, o nessun premio'] },
        { name: '📊 Dashboard risultati aziendali', values: ['Base', 'Avanzato'] },
        { name: '📈 Report ed esportazione dati (CSV)', values: ['Incluso', 'Incluso'] },
        { name: '📊 Analisi (reattività, tendenze)', values: ['Avanzata', 'Avanzata'] },
        { name: '🗣️ Questionario sui motivi dell\'insoddisfazione', values: ['Personalizzato', 'Questionario personalizzato'] },
        { name: '🚀 Onboarding del sistema', values: ['Configurazione guidata', '+ consulenza'] },
        { name: '🛟 Supporto', values: ['Base', 'Prioritario'] },
        // Features with "Incluso" text
        { name: '🎨 Pagina recensioni personalizzata', values: ['✓', '✓'] },
        { name: '🎮 Gamification', values: ['✓', '✓'] },
        { name: '📧 Acquisizione email / telefono', values: ['✓', '✓'] },
        { name: '🎯 White-label (nessun logo ocenagor.si)', values: ['—', 'Incluso'] },
        { name: 'Design personalizzato dei componenti fisici', values: ['—', 'Incluso'] },
        { name: '📞 Il team contatta i clienti insoddisfatti', values: ['—', 'Il nostro team contatta clienti'] }
      ];
    } else {
      // Slovenian translations
      return [
        // Text-based features
        { name: '🏢 Število Unikatnih kod za več delavnih točk ali oddelkov na eni lokaciji', values: ['Do 3', 'Do 5'] },
        { name: '📱 Vključena NFC oprema', values: ['Do 5x kartic/nalepk/stojal', 'Do 10x kartic/nalepk/stojal'] },
        { name: '🎁 Vrsta nagrade', values: ['Kupon za vsako oceno, žrebanje ali brez nagrad', 'Kupon za vsako oceno, žrebanje ali brez nagrad'] },
        { name: '📊 Dashboard z rezultati podjetja', values: ['Osnovni', 'Napreden'] },
        { name: '📈 Poročila in izvoz podatkov (CSV)', values: ['Vključeno', 'Vključeno'] },
        { name: '📊 Analitika (odzivnost, trendi)', values: ['Osnovna', 'Napredna'] },
        { name: '🗣️ Vprašalnik o razlogih za nezadovoljstvo', values: ['Vprašalnik prilagojen vaši industriji', 'Vprašalnik po meri'] },
        { name: '🚀 Onboarding sistema', values: ['Vodena nastavitev', '+ svetovanje'] },
        { name: '🛟 Podpora', values: ['Osnovna', 'Prednostna'] },
        // Features with "Vključeno" text
        { name: '🎨 Prilagojena ocenjevalna stran', values: ['Vključeno', 'Vključeno'] },
        { name: '🎮 Gejmifikacija', values: ['Vključeno', 'Vključeno'] },
        { name: '📧 Zajem emaila / telefona', values: ['Vključeno', 'Vključeno'] },
        { name: '🎯 White-label (brez logotipa ocenagor.si)', values: ['—', 'Vključeno'] },
        { name: '🎨 Personaliziran dizajn fizičnih komponent', values: ['—', 'Vključeno'] },
        { name: '📞 Ekipa kontaktira nezadovoljne stranke', values: ['—', 'Naša ekipa kontaktira'] }
      ];
    }
  }, [translations, language]);

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

  const handleSelectPackage = useCallback((index: number) => {
    const selectedPackage = packages[index];
    if (!selectedPackage) return;

    // Navigate to checkout with yearly flag if the yearly option is selected
    const checkoutPath = isYearly 
      ? `/checkout/${selectedPackage.id}-yearly` 
      : `/checkout/${selectedPackage.id}`;
    
    if (index === 1) {
      navigate('/contact');
    } else {
      navigate(checkoutPath);
    }
  }, [navigate, packages, isYearly]);

  const handleToggle = useCallback((yearly: boolean) => {
    setIsYearly(yearly);
  }, []);

  return {
    isYearly,
    packages,
    addOns,
    pricingFeatures,
    translations,
    containerVariants,
    itemVariants,
    handleSelectPackage,
    handleToggle,
    isClient
  };
};