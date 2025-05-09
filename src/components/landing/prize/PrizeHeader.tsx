import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface PrizeHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

const PrizeHeader: React.FC<PrizeHeaderProps> = ({
  badge,
  title,
  subtitle
}) => {
  return (
    <div className="text-center mb-12 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
          <Gift className="h-3.5 w-3.5 text-white" />
        </div>
        <span>{badge}</span>
      </motion.div>
      
      <motion.h2 
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
      
      {/* Decorative divider */}
      <motion.div 
        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-6"
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: 96 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </div>
  );
};

export default PrizeHeader;