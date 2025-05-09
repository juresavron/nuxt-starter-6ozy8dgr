import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../useLanguageStore';
import { getPackages, getAddOns } from '../data/pricing';
import type { PricingFeature } from '../types/pricing';
import { useTranslations } from '../useTranslations';
import { useClientSide } from '../useClientSide';

export const usePricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const navigate = useNavigate();

  const packages = useMemo(() => getPackages(language), [language]);
  const addOns = useMemo(() => getAddOns(language), [language]);

  const pricingFeatures: PricingFeature[] = useMemo(() => [
    { name: '🏢 Število lokacij', values: ['1', 'Do 3', 'Do 5', 'Neomejeno'] },
    { name: '📱 Vključena NFC oprema', values: ['1x kartica ali stojalo', 'Do 5x kartic/nalepk/stojal', 'Do 10x kartic/nalepk/stojal', 'Po meri'] },
    { name: '🎨 Prilagojena ocenjevalna stran', values: ['✔️', '✔️', '✔️', '✔️'] },
    { name: '🎮 Gejmifikacija', values: ['✔️', '✔️', '✔️', '✔️'] },
    { name: '📧 Zajem emaila / telefona', values: ['✔️', '✔️', '✔️', '✔️'] },
    { name: '📞 Ekipa kontaktira nezadovoljne stranke', values: ['❌', '❌', '✔️ Naša ekipa kontaktira', '✔️ + poročilo po klicu'] },
    { name: '🧑‍💼 Ocenjevanje zaposlenih (unikaten URL)', values: ['❌', '❌', '✔️ Povprečja po zaposlenih', '✔️ + povezava s kadrovsko mapo'] },
    { name: '📊 Dashboard z rezultati podjetja', values: ['❌', '✔️ Osnovni', '✔️ Napreden', '✔️ Prilagodljiv'] },
    { name: '📩 Tedensko poročilo direktorju', values: ['❌', '✔️ Povzetek', '✔️ + opozorila', '✔️ Nastavljivo'] },
    { name: '📈 Poročila in izvoz podatkov (CSV)', values: ['❌', '✔️ Mesečno', '✔️ + CSV', '✔️ + segmentacija'] },
    { name: '📊 Analitika (odzivnost, trendi)', values: ['Osnovna', 'Napredna', 'Napredna', 'Po meri'] },
    { name: '🎯 White-label (brez logotipa ocenagor.si)', values: ['❌', '❌', '✔️', '✔️'] },
    { name: '🔄 Integracije (CRM, Mailchimp, Zapier)', values: ['❌', '❌', '✔️', '✔️'] },
    { name: '🚀 Onboarding sistema', values: ['❌', '✔️ Vodena nastavitev', '✔️ + svetovanje', '✔️ Strategija po meri'] },
    { name: '🛟 Podpora', values: ['Osnovna', 'Osnovna', 'Prednostna', 'Namenska svetovalna podpora'] }
  ], []);

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
    
    if (index === 0) {
      navigate(checkoutPath);
    } else if (index === 1) {
      navigate(checkoutPath);
    } else if (index === 2) {
      navigate(checkoutPath);
    } else {
      navigate('/contact');
    }
  }, [navigate, packages, isYearly]);

  const handleToggle = useCallback(() => {
    setIsYearly(prev => !prev);
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