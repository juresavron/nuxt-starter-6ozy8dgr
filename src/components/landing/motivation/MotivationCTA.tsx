import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';
import { cn } from '../../../utils/cn';

interface MotivationCTAProps {
  translations: any;
}

const MotivationCTA: React.FC<MotivationCTAProps> = ({ translations }) => {
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Handler for smooth scrolling to pricing section
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Get appropriate button text based on language
  const startNowText = language === 'en' ? 'Start Now' : 
                      language === 'it' ? 'Inizia Ora' : 
                      'Začni zdaj';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="flex justify-center"
    >
      <a
        href="#pricing"
        onClick={scrollToPricing}
        className={cn(
          "inline-flex items-center justify-center gap-2 text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
          isMobile ? "px-6 py-3 text-sm" : "px-8 py-4 text-base"
        )}
      >
        {startNowText}
        <ArrowRight className={cn("transition-transform duration-300 group-hover:translate-x-1", isMobile ? "h-4 w-4" : "h-5 w-5")} />
      </a>
    </motion.div>
  );
};

export default MotivationCTA;