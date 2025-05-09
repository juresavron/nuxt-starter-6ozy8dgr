import React from 'react';
import { motion } from 'framer-motion';
import SectionBadge from '../shared/SectionBadge';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';
import { cn } from '../../../utils/cn';

interface MotivationHeaderProps {
  translations: any;
}

const MotivationHeader: React.FC<MotivationHeaderProps> = ({ translations }) => {
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Get translated text with fallbacks
  const title = translations?.landing?.motivation?.title || 
    (language === 'en' ? 'Why Our Solution Works' : 
     language === 'it' ? 'Perché La Nostra Soluzione Funziona' : 
     'Zakaj naša rešitev deluje');
     
  const subtitle = translations?.landing?.motivation?.subtitle || 
    (language === 'en' ? 'Understanding customer psychology and Google\'s review guidelines' : 
     language === 'it' ? 'Comprendere la psicologia del cliente e le linee guida di Google per le recensioni' : 
     'Razumevanje psihologije strank in Googlovih smernic za ocene');
     
  const badge = translations?.landing?.motivation?.badge || 
    (language === 'en' ? 'Review Psychology' : 
     language === 'it' ? 'Psicologia delle Recensioni' : 
     'Psihologija ocen');

  return (
    <div className="text-center mb-12 sm:mb-16">
      <SectionBadge
        icon="🧠"
        text={badge}
      />
      
      <motion.h2 
        className={cn(
          "font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4",
          isMobile ? "text-xl sm:text-2xl md:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className={cn(
          "text-gray-600 max-w-3xl mx-auto leading-relaxed",
          isMobile ? "text-xs sm:text-sm md:text-base" : "text-sm sm:text-base md:text-lg lg:text-xl"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default MotivationHeader;