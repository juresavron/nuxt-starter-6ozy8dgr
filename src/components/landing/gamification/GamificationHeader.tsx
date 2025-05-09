import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import SectionBadge from '../shared/SectionBadge';

interface GamificationHeaderProps {
  containerVariants: any;
  itemVariants: any;
}

/**
 * Header component for the Gamification section
 */
const GamificationHeader: React.FC<GamificationHeaderProps> = ({
  containerVariants,
  itemVariants
}) => {
  const translations = useTranslations();
  const t = translations?.landing?.gamification;

  return (
    <motion.div 
      className="text-center mb-16 sm:mb-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionBadge
        icon="🎮"
        text={t?.badge || 'Gamification'}
      />
      
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
        variants={itemVariants}
      >
        {t?.title || 'Gain New Followers with Gamification'}
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        {t?.subtitle || 'Our gamification system enables gaining new followers on social media and contact information'}
      </motion.p>
    </motion.div>
  );
};

export default React.memo(GamificationHeader);