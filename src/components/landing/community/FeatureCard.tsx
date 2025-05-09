import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  color,
  index 
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.15), 0 10px 15px -5px rgba(59, 130, 246, 0.1)"
      }}
      className={cn(
        "bg-white p-6 sm:p-7 rounded-xl shadow-md transition-all duration-300",
        "transform border border-blue-100/50 relative overflow-hidden"
      )}
    >
      {/* Subtle gradient accent at the top */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
        index === 0 ? "from-blue-500 to-indigo-600" :
        index === 1 ? "from-amber-500 to-orange-600" :
        "from-emerald-500 to-teal-600"
      )}></div>
      
      <div className="flex flex-col md:flex-row items-start gap-5 relative z-10">
        <IconWrapper 
          icon={icon}
          gradient={color}
          rotate={index % 2 === 0 ? 'left' : 'right'}
          className="mb-4 md:mb-0 flex-shrink-0"
          size={isMobile ? 'mobile-sm' : 'lg'}
        />
        <div className="flex-1">
          <h3 className={cn(
            "text-lg sm:text-xl font-bold mb-3",
            "text-transparent bg-clip-text bg-gradient-to-r",
            index === 0 ? "from-blue-600 to-indigo-700" :
            index === 1 ? "from-amber-600 to-orange-700" :
            "from-emerald-600 to-teal-700"
          )}>{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          
          {/* Subtle checkmark decoration */}
          <div className="mt-4 flex items-center">
            <CheckCircle2 className={cn(
              "h-4 w-4 mr-2",
              index === 0 ? "text-blue-500" :
              index === 1 ? "text-amber-500" :
              "text-emerald-500"
            )} />
            <span className="text-xs font-medium text-gray-500">Included in all packages</span>
          </div>
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-gradient-to-br from-transparent to-blue-50/50 -z-0"></div>
    </motion.div>
  );
};

export default FeatureCard;