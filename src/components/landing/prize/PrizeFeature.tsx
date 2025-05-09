import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';

interface PrizeFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const PrizeFeature: React.FC<PrizeFeatureProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  // Enhanced gradient colors with more vibrant options
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-purple-500 to-violet-600'
  ];
  
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2 + index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100/80 h-full relative overflow-hidden"
    >
      <div className="flex flex-col items-center text-center mb-4 relative z-10">
        <IconWrapper
          icon={Icon}
          size={isMobile ? 'mobile-md' : 'lg'}
          gradient={gradient}
          rotate="left"
          className="mb-4"
        />
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full bg-gradient-to-br from-transparent to-blue-50/30 -z-0"></div>
      <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full bg-gradient-to-tl from-transparent to-blue-50/20 -z-0"></div>
    </motion.div>
  );
};

export default PrizeFeature;