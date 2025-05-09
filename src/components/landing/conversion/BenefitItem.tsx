import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';

interface BenefitItemProps {
  icon: LucideIcon;
  text: string;
  index: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text, index }) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50/50 rounded-xl border border-blue-100/40 transition hover:shadow-md hover:bg-blue-50 ios-optimized"
    >
      <IconWrapper 
        icon={icon}
        size={isMobile ? 'mobile-sm' : 'sm'}
        gradient="from-amber-500 to-amber-600"
        rotate={index % 2 === 0 ? 'left' : 'right'}
      />
      <span className="text-[10px] sm:text-xs md:text-sm text-gray-800">{text}</span>
    </motion.div>
  );
};

export default BenefitItem;