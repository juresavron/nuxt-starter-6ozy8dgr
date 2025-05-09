import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface CTACardProps {
  title: string;
  description: string;
  startNowText: string;
  viewPackagesText: string;
  onScrollToPricing: (e: React.MouseEvent) => void;
}

const CTACard: React.FC<CTACardProps> = ({
  title,
  description,
  startNowText,
  viewPackagesText,
  onScrollToPricing
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 rounded-xl text-white shadow-xl"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-6">
        {title}
      </h3>
      
      <div className="space-y-4 mb-8">
        <p className="text-xs sm:text-sm text-blue-50">
          {description}
        </p>
      </div>
      
      <div className="flex flex-col gap-3">
        <a
          href="#pricing"
          onClick={onScrollToPricing}
          className={cn(
            "w-full py-3 px-6 flex items-center justify-center gap-2 bg-gradient-to-r",
            "from-amber-500 to-amber-600 text-white font-medium rounded-lg shadow-lg",
            "transition-all duration-300 group hover:scale-[1.03]",
            "border border-white/10 hover:shadow-xl"
          )}
        >
          {startNowText}
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        
        <a
          href="#pricing"
          onClick={onScrollToPricing}
          className="w-full py-3 px-6 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-white border border-white/10 font-medium rounded-lg transition-all duration-300"
        >
          {viewPackagesText}
        </a>
      </div>
    </motion.div>
  );
};

export default CTACard;