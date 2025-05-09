import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';
import IconWrapper from '../shared/IconWrapper';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-gray-100/80 h-full"
    >
      <div className="flex items-start gap-4">
        <IconWrapper
          icon={Icon}
          size={isMobile ? 'mobile-xs' : 'sm'}
          gradient={
            index === 0 ? "from-blue-500 to-blue-600" :
            index === 1 ? "from-amber-500 to-amber-600" :
            "from-emerald-500 to-emerald-600"
          }
          rotate="left"
        />
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h4>
          <p className="text-xs sm:text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;