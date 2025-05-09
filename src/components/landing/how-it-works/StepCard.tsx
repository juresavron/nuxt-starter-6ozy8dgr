import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
  delay?: number;
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  color,
  index,
  delay = 0
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2 + (index * 0.1) + delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border border-gray-100/80"
    >
      <div className={cn(
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <IconWrapper
            icon={icon}
            gradient={color}
            rotate={index % 2 === 0 ? 'left' : 'right'}
            size={isMobile ? 'mobile-sm' : 'sm'}
          />
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default StepCard;