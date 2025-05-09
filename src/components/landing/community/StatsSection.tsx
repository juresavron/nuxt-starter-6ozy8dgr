import React from 'react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore'; 

interface StatsSectionProps {
  stats: Array<{
    value: string;
    text: string;
  }>;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Define icons for stats
  const icons = ['chart', 'trend', 'users'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="mb-8 sm:mb-10 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30 rounded-xl -z-10"></div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg sm:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-6 sm:mb-8 pt-6"
        >
          {translations?.landing?.community?.stats?.title || 
           (language === 'en' ? 'Proven Community Results' : 
            language === 'it' ? 'Risultati Comprovati della Comunità' : 
            'Dokazani rezultati skupnosti')}
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-6 pb-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              text={stat.text}
              index={index}
              icon={icons[index % icons.length] as 'chart' | 'trend' | 'users'}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSection;