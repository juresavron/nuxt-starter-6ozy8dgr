import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import StepCard from './StepCard';
import type { FlowStep } from './types';

interface HighRatingFlowProps {
  steps: FlowStep[];
}

const HighRatingFlow: React.FC<HighRatingFlowProps> = ({ steps }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.howItWorks;

  return (
    <div className="mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
          {t?.highRating?.title || 'Process for Satisfied Customers (5 stars)'}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          {t?.highRating?.description || 'When a customer is highly satisfied, we direct them straight to gamification where they can follow your social media and receive rewards'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            color={step.color}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HighRatingFlow;