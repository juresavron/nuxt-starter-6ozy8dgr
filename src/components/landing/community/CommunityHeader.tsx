import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import SectionBadge from '../shared/SectionBadge';

interface CommunityHeaderProps {
  title?: string;
  subtitle?: string;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ title, subtitle }) => {
  const translations = useTranslations();
  const t = translations?.landing?.community;
  
  return (
    <div className="text-center mb-10 sm:mb-16">
      <SectionBadge
        icon="👥"
        text={t?.badge || "Community Building"}
      />
      
      <motion.h2 
        className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title || t?.title || "Build Your Customer Community"}
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {subtitle || t?.subtitle || "Collect valuable customer information while gathering reviews and build a loyal community that returns to your business"}
      </motion.p>
    </div>
  );
};

export default CommunityHeader;