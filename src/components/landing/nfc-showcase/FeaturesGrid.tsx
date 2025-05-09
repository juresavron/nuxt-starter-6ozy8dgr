import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import FeatureItem from './FeatureItem';

interface FeaturesGridProps {
  features: Array<{
    key?: string;
    icon: React.ElementType;
    title: string;
    description: string;
    colorGradient: string;
  }>;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features }) => {
  const translations = useTranslations();
  const t = translations?.landing?.nfc;
  
  // Map feature keys to their translated values
  const getFeatureData = (feature: any, index: number) => {
    const key = feature.key || `feature${index}`;
    
    return {
      icon: feature.icon,
      title: t?.features?.[key]?.title || feature.title,
      description: t?.features?.[key]?.description || feature.description,
      colorGradient: feature.colorGradient,
      index
    };
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
    >
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          {...getFeatureData(feature, index)}
        />
      ))}
    </motion.div>
  );
};

export default React.memo(FeaturesGrid);