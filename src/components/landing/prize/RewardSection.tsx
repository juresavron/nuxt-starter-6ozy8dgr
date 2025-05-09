import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import RewardOptions from './RewardOptions';
import ProtectionNote from './ProtectionNote';
import { cn } from '../../../utils/cn';

const RewardSection: React.FC = () => {
  const { language } = useLanguageStore();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={cn(
        "bg-gradient-to-br from-white to-blue-50/30 p-8 sm:p-10 rounded-2xl shadow-xl",
        "border border-blue-100/40 mb-12 relative overflow-hidden"
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl"></div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-8"
      >
        {language === 'en' ? 'Flexible Reward Options' : 
         language === 'it' ? 'Opzioni di Ricompensa Flessibili' : 
         'Prilagodljive možnosti nagrad'}
      </motion.h3>
      
      <RewardOptions />
      
      <div className="mt-10">
        <ProtectionNote />
      </div>
    </motion.div>
  );
};

export default RewardSection;