import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../hooks/useTranslations';
import { useClientSide } from '../../hooks/useClientSide';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import SectionBadge from './shared/SectionBadge';
import FeatureList from './dashboard/FeatureList';
import DashboardInsights from './dashboard/DashboardInsights';

interface DashboardFeedbackProps {
  id?: string;
}

const DashboardFeedback: React.FC<DashboardFeedbackProps> = ({ id = "dashboard" }) => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.dashboard;
  
  if (!isClient) return null;
  
  return (
    <section id={id} className="py-14 sm:py-20 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mr-20 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl -z-10"></div>
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <SectionBadge
            icon="📊"
            text={t?.badge || "Dashboard & Analytics"}
          />
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t?.title || "Customizable Dashboard & Feedback"}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t?.subtitle || "Customize feedback options and get detailed insights in your professional dashboard"}
          </motion.p>
        </div>
        
        {/* Dashboard Insights Section */}
        <DashboardInsights />
        
        {/* Feature list */}
        <FeatureList />
      </div>
    </section>
  );
};

export default DashboardFeedback;