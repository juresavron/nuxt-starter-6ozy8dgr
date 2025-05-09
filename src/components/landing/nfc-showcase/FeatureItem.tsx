import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorGradient: string;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  colorGradient,
  index
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.3 + index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.01] border border-gray-100/80 h-full"
    >
      <div className="flex items-center gap-4 mb-4">
        <IconWrapper 
          icon={icon} 
          size={isMobile ? 'mobile-sm' : 'sm'}
          gradient={colorGradient}
          rotate={index % 2 === 0 ? 'left' : 'right'}
        />
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

export default React.memo(FeatureItem);