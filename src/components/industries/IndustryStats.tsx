import React from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from 'react-use';

interface IndustryStatsProps {
  stats: Array<{
    icon: React.ElementType;
    value: string;
    text: string;
  }>;
}

const IndustryStats: React.FC<IndustryStatsProps> = ({ stats }) => {
  const { width } = useWindowSize();
  const isMobileOrTablet = width < 1024; // Show on all screens, not just large ones

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon as React.ElementType;
        
        return (
          <motion.div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-blue-50 rounded-full">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.value}</h3>
            <p className="text-sm sm:text-base text-gray-600">{stat.text}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default IndustryStats;