import React from 'react';
import { motion } from 'framer-motion';
import { Star, Building2 } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '../../../utils/cn';

interface GamificationHeaderProps {
  companyName: string;
  companyLogo?: string | null;
  colorScheme?: string;
  rating: number;
}

const GamificationHeader: React.FC<GamificationHeaderProps> = ({
  companyName,
  companyLogo,
  colorScheme = 'indigo',
  rating
}) => {
  const translations = useTranslations();
  
  // Get title and subtitle based on rating
  const title = rating === 5 
    ? translations?.gamification?.title?.five_stars || 'Thank you for your excellent review!'
    : translations?.gamification?.title?.four_stars || 'Thank you for your positive review!';
    
  const subtitle = rating === 5
    ? translations?.gamification?.subtitle?.five_stars || 'Your 5-star review means a lot to us! If you would like to help us further, we kindly ask you to support us on other platforms as well. As a thank you, we will send you a special gift.'
    : translations?.gamification?.subtitle?.four_stars || 'We appreciate your 4-star review! Please let us know if there\'s anything we could improve to make your next experience even better.';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center mb-6">
        <div className={cn(
          "w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center shadow-md",
          colorScheme === 'amber' ? 'bg-amber-50 border border-amber-100' :
          colorScheme === 'emerald' ? 'bg-emerald-50 border border-emerald-100' :
          colorScheme === 'rose' ? 'bg-rose-50 border border-rose-100' :
          colorScheme === 'bw' ? 'bg-gray-100 border border-gray-200' :
          'bg-indigo-50 border border-indigo-100'
        )}>
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="w-full h-full object-contain p-1"
              loading="eager"
            />
          ) : (
            <Building2 className={cn(
              "h-8 w-8",
              colorScheme === 'amber' ? 'text-amber-600' :
              colorScheme === 'emerald' ? 'text-emerald-600' :
              colorScheme === 'rose' ? 'text-rose-600' :
              colorScheme === 'bw' ? 'text-gray-700' :
              'text-indigo-600'
            )} />
          )}
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-center gap-2 mb-4"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-6 w-6",
              star <= rating 
                ? colorScheme === 'amber' ? 'text-amber-400 fill-amber-400' :
                  colorScheme === 'emerald' ? 'text-emerald-400 fill-emerald-400' :
                  colorScheme === 'rose' ? 'text-rose-400 fill-rose-400' :
                  colorScheme === 'bw' ? 'text-gray-700 fill-gray-700' :
                  'text-indigo-400 fill-indigo-400'
                : 'text-gray-300'
            )}
          />
        ))}
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default GamificationHeader;