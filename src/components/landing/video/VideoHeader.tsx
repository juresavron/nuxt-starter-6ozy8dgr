import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import SectionBadge from '../shared/SectionBadge';

const VideoHeader: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get translations with fallbacks
  const title = translations?.landing?.video?.title || (
    language === 'en' ? 'Ocenagor in Action' :
    language === 'it' ? 'Ocenagor in Azione' :
    'Ocenagor v akciji'
  );
  
  const subtitle = translations?.landing?.video?.subtitle || (
    language === 'en' ? 'See how our system works in practice' :
    language === 'it' ? 'Guarda come funziona il nostro sistema in pratica' :
    'Oglejte si, kako deluje naš sistem v praksi'
  );
  
  const badge = translations?.landing?.video?.badge || (
    language === 'en' ? 'Video' :
    language === 'it' ? 'Video' :
    'Video'
  );
  
  return (
    <div className="text-center mb-8 sm:mb-12">
      <SectionBadge
        icon="🎬"
        text={badge}
      />
      
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
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

export default React.memo(VideoHeader);