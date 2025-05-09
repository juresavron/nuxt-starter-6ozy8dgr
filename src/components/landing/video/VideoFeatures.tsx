import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { cn } from '../../../utils/cn';
import VideoFeatureItem from './VideoFeatureItem';
import type { VideoFeature } from '../../../types/video';

interface VideoFeaturesProps {
  features: VideoFeature[];
}

/**
 * Component to display video features
 */
const VideoFeatures: React.FC<VideoFeaturesProps> = ({ features }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get translation with fallback
  const featuresTitle = (
    language === 'en' ? 'What you will see in the video:' :
    language === 'it' ? 'Cosa vedrai nel video:' :
    'Kaj boste videli v videu:'
  );
  
  return (
    <div className="mb-6 sm:mb-8">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center"
      >
        {featuresTitle}
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0">
        {features.map((feature, index) => (
          <VideoFeatureItem
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color || "from-blue-500 to-indigo-600"}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(VideoFeatures);