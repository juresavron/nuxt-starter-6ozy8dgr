import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import StepCard from './StepCard';
import type { FlowStep } from './types';

interface LowRatingFlowProps {
  steps: FlowStep[];
}

const LowRatingFlow: React.FC<LowRatingFlowProps> = ({ steps }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.howItWorks;

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-3">
          {t?.lowRating?.title || 'Process for Dissatisfied Customers (1-3 stars)'}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          {t?.lowRating?.description || 'When a customer is dissatisfied, we collect their feedback internally so you can resolve the issue'}
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
            delay={0.2}
          />
        ))}
      </div>
    </div>
  );
};

export default LowRatingFlow;