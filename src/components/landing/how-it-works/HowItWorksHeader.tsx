import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import SectionBadge from '../shared/SectionBadge';
import { useWindowSize } from 'react-use';

interface HowItWorksHeaderProps {
  title?: string;
  subtitle?: string;
}

const HowItWorksHeader: React.FC<HowItWorksHeaderProps> = ({ title, subtitle }) => {
  const translations = useTranslations();
  const t = translations?.landing?.howItWorks;
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  return (
    <div className="text-center mb-12 sm:mb-16 relative">
      {/* Background decoration */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
      
      <SectionBadge
        icon="🔄"
        text={t?.badge || "Proces"}
        className="mb-6 sm:mb-8"
      />
      
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title || t?.title || "Kako deluje?"}
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {subtitle || t?.subtitle || "Naš sistem pametno usmerja stranke glede na njihovo zadovoljstvo in uporablja AI za povečanje števila ocen"}
      </motion.p>
    </div>
  );
};

export default HowItWorksHeader;