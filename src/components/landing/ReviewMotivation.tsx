import React from 'react';
import { motion } from 'framer-motion';
import { useReviewMotivation } from '../../hooks/landing/useReviewMotivation';
import SectionBadge from './shared/SectionBadge';
import MotivationHeader from './motivation/MotivationHeader';
import MotivationContent from './motivation/MotivationContent';
import MotivationCTA from './motivation/MotivationCTA';
import ComplianceNote from './motivation/ComplianceNote';

const ReviewMotivation: React.FC<{ id?: string }> = ({ id = 'motivation' }) => {
  const { 
    isClient, 
    translations, 
    containerVariants, 
    itemVariants 
  } = useReviewMotivation();
  
  if (!isClient) return null;

  return (
    <section id={id} className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <MotivationHeader translations={translations} />
        
        {/* Main content */}
        <MotivationContent translations={translations} />
        
        {/* Compliance note */}
        <ComplianceNote translations={translations} />
        
        {/* CTA */}
        <MotivationCTA translations={translations} />
      </div>
    </section>
  );
};

export default ReviewMotivation;