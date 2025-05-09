import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Gift, Users } from 'lucide-react';
import type { Language } from '../../../hooks/useLanguageStore';
import { useTranslations } from '../../../hooks/useTranslations';

interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  title,
  description,
  color
}) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 transform hover:scale-[1.02] h-full"
    whileHover={{ y: -5 }}
  >
    <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-6 shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

interface GamificationBenefitsProps {
  benefits: Array<{
    title: string;
    description: string;
    icon?: any;
  }>;
  language: Language;
}

const GamificationBenefits: React.FC<GamificationBenefitsProps> = ({ benefits, language }) => {
  const translations = useTranslations();
  
  const benefitIcons = [Share2, Gift, Users];
  const benefitColors = [
    'from-blue-500 to-indigo-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600'
  ];
  
  const enhancedBenefits = benefits.map((benefit, index) => ({
    ...benefit,
    icon: benefitIcons[index % benefitIcons.length],
    color: benefitColors[index % benefitColors.length]
  }));

  return (
    <div className="mt-16 sm:mt-20">
      <motion.h3 
        className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {language === 'en' 
          ? 'Benefits of Gamification' 
          : language === 'it' 
            ? 'Vantaggi della gamification'
            : 'Prednosti gejmifikacije'}
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {enhancedBenefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BenefitCard
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              color={benefit.color}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(GamificationBenefits);