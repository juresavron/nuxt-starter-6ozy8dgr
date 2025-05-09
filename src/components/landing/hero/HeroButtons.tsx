import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
  
const HeroButtons: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Handler for smooth scrolling to pricing section
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get translated text
  const startNowText = translations?.landing?.hero?.cta || 
                      (language === 'en' ? 'START NOW' : 
                       language === 'it' ? 'INIZIA ORA' : 
                       'ZAČNI ZDAJ');

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-4 sm:mt-6 ios-optimized w-full sm:w-auto"
    >
      <a
        href="#pricing"
        onClick={scrollToPricing}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center ios-optimized"
      >
        {startNowText}
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
};

export default React.memo(HeroButtons);