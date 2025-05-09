import React from 'react';
import { cn } from '../../utils/cn';
import { useTranslations } from '../../hooks/useTranslations';
import { motion } from 'framer-motion';

interface CompletedTasksMessageProps {
  colorScheme?: string;
  className?: string;
}

/**
 * Component to display a "All tasks completed" message with the same design as gift description
 */
const CompletedTasksMessage: React.FC<CompletedTasksMessageProps> = ({
  colorScheme = 'indigo',
  className = ''
}) => {
  const translations = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-md w-full justify-center",
        "hover:shadow-lg transition-all duration-300 group transform hover:scale-105",
        colorScheme === 'amber' ? 'bg-amber-50 border border-amber-100' :
        colorScheme === 'emerald' ? 'bg-emerald-50 border border-emerald-100' :
        colorScheme === 'rose' ? 'bg-rose-50 border border-rose-100' :
        colorScheme === 'bw' ? 'bg-gray-50 border border-gray-200' :
        'bg-indigo-50 border border-indigo-100',
        className
      )}>
        <span className="text-xl group-hover:scale-125 transition-transform duration-300">🎉</span>
        <span className={cn(
          "group-hover:font-medium transition-all duration-300",
          colorScheme === 'amber' ? 'text-amber-700 group-hover:text-amber-800' :
          colorScheme === 'emerald' ? 'text-emerald-700 group-hover:text-emerald-800' :
          colorScheme === 'rose' ? 'text-rose-700 group-hover:text-rose-800' :
          colorScheme === 'bw' ? 'text-gray-700 group-hover:text-gray-900' :
          'text-indigo-700 group-hover:text-indigo-800'
        )}>
          <span className="text-sm sm:text-base">{translations?.gamification?.tasks?.completed_all || 'All tasks completed! Great job!'}</span>
        </span>
      </div>
    </motion.div>
  );
};

export default CompletedTasksMessage;