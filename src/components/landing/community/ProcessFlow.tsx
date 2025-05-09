import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { ArrowRight } from 'lucide-react';
import ProcessStep from './ProcessStep';

interface ProcessFlowProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-xl p-6 sm:p-8 border border-blue-100/60 mb-12 sm:mb-16 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>
      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-blue-100/20 blur-2xl"></div>
      <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-indigo-100/20 blur-2xl"></div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 sm:mb-8 text-center"
      >
        {translations?.landing?.community?.process?.title || 
         (language === 'en' ? 'How Community Building Works' : 
          language === 'it' ? 'Come Funziona la Creazione della Comunità' : 
          'Kako deluje gradnja skupnosti')}
      </motion.h3>

      {/* Process steps - vertical layout */}
      <div className="space-y-6 sm:space-y-8 mt-8 relative max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4 + (index * 0.2),
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="bg-gradient-to-br from-white to-blue-50/50 p-6 rounded-xl border border-blue-100/50 relative shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Step number */}
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              {index + 1}
            </div>
            
            <div className="pt-5">
              <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 mb-3">{step.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Additional decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
    </motion.div>
  );
};

export default ProcessFlow;