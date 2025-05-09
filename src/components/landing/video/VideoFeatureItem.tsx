import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface VideoFeatureItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  index: number;
}

/**
 * Individual feature item for the video section
 */
const VideoFeatureItem: React.FC<VideoFeatureItemProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color,
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
      className={cn(
        "flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-transparent",
        "hover:border-blue-100/50 hover:shadow-sm transition-all duration-300 transform hover:scale-[1.02]",
        index % 2 === 0 ? "bg-blue-50/50" : "bg-white"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center",
        "bg-gradient-to-br shadow-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300",
        color
      )}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm sm:text-base font-semibold text-gray-900">{title}</h4>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </motion.div>
  );
};

export default React.memo(VideoFeatureItem);