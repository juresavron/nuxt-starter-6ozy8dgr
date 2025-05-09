import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface HowToStartHeaderProps {
  title?: string;
  subtitle?: string;
}

const HowToStartHeader: React.FC<HowToStartHeaderProps> = ({ title, subtitle }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.howToStart;
  
  return (
    <div className="text-center mb-12 sm:mb-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-white rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
      >
        <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white">
          <Rocket className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
        </span>
        <span>{t?.badge || (language === 'en' ? 'Getting Started' : 'Začetek')}</span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
      >
        {title || t?.title || (language === 'en' ? 'How to Start?' : 'Kako začeti?')}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
      >
        {subtitle || t?.subtitle || (language === 'en' 
          ? 'Start collecting reviews and followers today with our simple process'
          : 'Začnite zbirati ocene in sledilce že danes z našim preprostim procesom'
        )}
      </motion.p>
    </div>
  );
};

export default HowToStartHeader;