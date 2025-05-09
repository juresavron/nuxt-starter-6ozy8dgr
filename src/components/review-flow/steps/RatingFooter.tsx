import * as React from 'react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { motion } from 'framer-motion';
import { Copyright } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RatingFooterProps { 
  colorScheme?: string;
  className?: string;
}

const RatingFooter: React.FC<RatingFooterProps> = ({ colorScheme = 'indigo', className = '' }) => {
  const translations = useTranslations();
  
  // Ensure translations exist and provide fallbacks
  const quickProcessText = translations?.review?.quickProcess ?? 'Vse skupaj vzame manj kot minuto';

  return (
    <div className={cn("text-center max-w-2xl mx-auto space-y-4", className)}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className={cn(
          "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-md w-full justify-center",
          "hover:shadow-lg transition-all duration-300 group transform hover:scale-105",
          colorScheme === 'amber' ? 'bg-amber-50 border border-amber-100' :
          colorScheme === 'emerald' ? 'bg-emerald-50 border border-emerald-100' :
          colorScheme === 'rose' ? 'bg-rose-50 border border-rose-100' :
          colorScheme === 'bw' ? 'bg-gray-50 border border-gray-200' :
          'bg-indigo-50 border border-indigo-100'
        )}
      >
        <span className="text-lg group-hover:scale-125 transition-transform duration-300">⏱️</span>
        <span className={cn(
          "transition-all duration-300",
          colorScheme === 'amber' ? 'text-amber-700 group-hover:text-amber-800' :
          colorScheme === 'emerald' ? 'text-emerald-700 group-hover:text-emerald-800' :
          colorScheme === 'rose' ? 'text-rose-700 group-hover:text-rose-800' :
          colorScheme === 'bw' ? 'text-gray-700 group-hover:text-gray-900' :
          'text-indigo-700 group-hover:text-indigo-800'
        )}
        >
          <span className="text-sm sm:text-base">{quickProcessText}</span>
        </span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link 
          to="/"
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium hover:underline",
            colorScheme === 'amber' ? 'text-amber-600 hover:text-amber-800' :
            colorScheme === 'emerald' ? 'text-emerald-600 hover:text-emerald-800' :
            colorScheme === 'rose' ? 'text-rose-600 hover:text-rose-800' :
            colorScheme === 'bw' ? 'text-gray-700 hover:text-gray-900' :
            'text-indigo-600 hover:text-indigo-800'
          )}
        >
          <Copyright className="h-3.5 w-3.5" />
          <span>{new Date().getFullYear()} ocenagor.si</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default React.memo(RatingFooter);