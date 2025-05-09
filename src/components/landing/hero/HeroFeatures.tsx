import * as React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';

interface HeroFeaturesProps {
  features: {
    text: string;
    label: string;
  }[];
}

const HeroFeatures: React.FC<HeroFeaturesProps> = ({ features }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <motion.div 
      className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 mt-3 sm:mt-4 ios-optimized"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {features.filter(feature => feature.text !== 'trial').map((feature, index) => (
        <div 
          key={index} 
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-blue-900/50 backdrop-blur-sm rounded-full border border-blue-500/20 group ios-optimized"
        >
          <IconWrapper
            icon={CheckCircle2}
            size={isMobile ? 'mobile-sm' : 'sm'}
            gradient={
              index === 0 ? 'from-green-500 to-emerald-500' :
              index === 1 ? 'from-amber-500 to-orange-500' :
              'from-blue-500 to-indigo-500'
            }
            rotate="none"
          />
          <span className="font-medium whitespace-nowrap text-xs">
            {feature.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default React.memo(HeroFeatures);