import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Users, Database, Gift, ArrowRight } from 'lucide-react';
import { useTranslations } from '../../hooks/useTranslations';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import { useCommunityCreation } from '../../hooks/landing/useCommunityCreation';
import SectionBadge from './shared/SectionBadge';
import CommunityHeader from './community/CommunityHeader';
import FeatureGrid from './community/FeatureGrid';
import ProcessFlow from './community/ProcessFlow';
import StatsSection from './community/StatsSection';

const CommunityCreation: React.FC<{ id?: string }> = ({ id = 'community' }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const { 
    isClient, 
    features, 
    process, 
    stats,
  } = useCommunityCreation();
  
  if (!isClient) return null;

  return (
    <section id={id} className="py-14 sm:py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/90"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionBadge
            icon="👥"
            text={translations?.landing?.community?.badge || "Community Building"}
          />
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {translations?.landing?.community?.title || "Build Your Customer Community"}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {translations?.landing?.community?.subtitle || "Collect valuable customer information while gathering reviews and build a loyal community that returns to your business"}
          </motion.p>
        </motion.div>
        
        {/* Features grid */}
        <FeatureGrid features={features} />
        
        {/* Process flow */}
        <ProcessFlow steps={process} />
        
        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <StatsSection stats={stats} />
        </motion.div>
        
        {/* Start Now Button */}
        <div className="flex justify-center mt-8">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Začni zdaj
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CommunityCreation);