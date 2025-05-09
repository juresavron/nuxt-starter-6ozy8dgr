import React from 'react';
import { motion } from 'framer-motion';
import { Package, UserPlus, Truck, Settings, Star, ArrowRight } from 'lucide-react';
import { useHowToStart } from '../../hooks/landing/useHowToStart';
import { useTranslations } from '../../hooks/useTranslations';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import SectionBadge from './shared/SectionBadge';
import { cn } from '../../utils/cn';
import IconWrapper from './shared/IconWrapper';

const HowToStart: React.FC<{ id?: string }> = ({ id = 'how-to-start' }) => {
  const { steps, containerVariants, itemVariants, isClient } = useHowToStart();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  if (!isClient) return null;

  return (
    <section 
      id={id} 
      className="py-12 sm:py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <SectionBadge
            icon="🚀"
            text={translations?.landing?.howToStart?.badge || (language === 'en' ? 'Getting Started' : 'Začetek')}
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
          >
            {translations?.landing?.howToStart?.title || (language === 'en' ? 'How to Start?' : 'Kako začeti?')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {translations?.landing?.howToStart?.subtitle || (language === 'en' 
              ? 'Start collecting reviews and followers today with our simple process'
              : 'Začnite zbirati ocene in sledilce že danes z našim preprostim procesom'
            )}
          </motion.p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Central line for desktop */}
          <div className="absolute left-[16px] sm:left-[32px] md:left-1/2 md:-ml-0.5 top-8 bottom-8 w-0.5 sm:w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-500 hidden sm:block"></div>
          
          <div className="space-y-6 sm:space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`md:grid md:grid-cols-2 md:gap-6 lg:gap-8 relative md:items-center ${isEven ? '' : 'md:mt-24'}`}
                >
                  {/* Step content - layout changes based on even/odd index on desktop */}
                  <div className={`${isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16 md:col-start-2'} mb-6 sm:mb-0`}>
                    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-gray-100/80 h-full">
                      <div className="flex items-start gap-4">
                        {/* Mobile step indicator */}
                        <div className="flex-shrink-0 sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md">
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <IconWrapper
                            icon={Icon}
                            gradient={step.gradient}
                            rotate={index % 2 === 0 ? 'left' : 'right'}
                            className="mb-3 sm:mb-4"
                          />
                          <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-3">{step.title}</h3>
                          <p className="text-xs sm:text-base text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step number indicator for desktop - centered on the timeline */}
                  <div className={cn(
                    "absolute hidden sm:flex items-center justify-center",
                    isEven ? "left-0" : "right-0",
                    "md:left-1/2 md:-translate-x-1/2 top-5 md:top-1/2 md:-translate-y-1/2 z-10"
                  )}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-white border-4 border-amber-100 shadow-lg flex items-center justify-center">
                      <span className="text-sm sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-10 sm:mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Začni zdaj</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToStart;