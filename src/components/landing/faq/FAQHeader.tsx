import React from 'react';
import { motion } from 'framer-motion';
import SectionBadge from '../shared/SectionBadge';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface FAQHeaderProps {
  title: string;
  subtitle: string;
  badgeText: string;
}

const FAQHeader: React.FC<FAQHeaderProps> = ({ 
  title, 
  subtitle, 
  badgeText 
}) => {
  const { language } = useLanguageStore();
  
  // Fallback translations if props are not provided
  const defaultTitle = language === 'en' ? 'Frequently Asked Questions' :
                      language === 'it' ? 'Domande Frequenti' :
                      'Pogosta vprašanja';
                      
  const defaultSubtitle = language === 'en' ? 'Find answers to the most common questions about our service' :
                         language === 'it' ? 'Trova risposte alle domande più comuni sul nostro servizio' :
                         'Najdite odgovore na najpogostejša vprašanja o naši storitvi';
                         
  const defaultBadge = language === 'en' ? 'FAQ' :
                      language === 'it' ? 'FAQ' :
                      'FAQ';
  
  return (
    <div className="text-center mb-10 sm:mb-16">
      <SectionBadge 
        icon="❓" 
        text={badgeText || defaultBadge} 
        className="shadow-blue-100/50"
      />
      
      <motion.h2 
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-3 sm:mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title || defaultTitle}
      </motion.h2>
      
      <motion.p 
        className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle || defaultSubtitle}
      </motion.p>
    </div>
  );
};

export default FAQHeader;