import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface HowItWorksFooterProps {
  ctaText?: string;
}

const HowItWorksFooter: React.FC<HowItWorksFooterProps> = ({ ctaText }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get appropriate button text based on language
  const startNowText = language === 'en' ? 'Start Now' : 
                      language === 'it' ? 'Inizia Ora' : 
                      'Začni zdaj';
  
  // Handler for smooth scrolling to pricing section
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex justify-center mt-12"
    >
      <a
        href="#pricing"
        onClick={scrollToPricing}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-300 group"
      >
        {ctaText || translations?.landing?.howItWorks?.ctaText || startNowText}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
};

export default React.memo(HowItWorksFooter);