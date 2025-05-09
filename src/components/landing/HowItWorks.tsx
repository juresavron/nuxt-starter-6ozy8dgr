import React from 'react';
import { useHowItWorks } from '../../hooks/landing/useHowItWorks';
import { ArrowRight } from 'lucide-react';
import HowItWorksHeader from './how-it-works/HowItWorksHeader';
import { motion } from 'framer-motion';
import ProcessFlow from './how-it-works/ProcessFlow';
import AIFollowUp from './how-it-works/AIFollowUp';
import { useTranslations } from '../../hooks/useTranslations';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';
import { cn } from '../../utils/cn';

const HowItWorks: React.FC<{ id?: string }> = ({ id = 'how-it-works' }) => {
  const { highRatingFlow, midRatingFlow, lowRatingFlow, isClient } = useHowItWorks();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  if (!isClient) return null;

  return (
    <section id={id} className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90 -z-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50/50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <HowItWorksHeader 
          title={translations?.landing?.howItWorks?.title || "Kako deluje?"}
          subtitle={translations?.landing?.howItWorks?.subtitle || "Naš sistem pametno usmerja stranke glede na njihovo zadovoljstvo in uporablja AI za povečanje števila ocen"}
        />
        
        {/* Processes Container */}
        <div className="space-y-16 sm:space-y-24">
          {/* High Rating Flow (5 stars) */}
          <ProcessFlow 
            steps={highRatingFlow}
            title={translations?.landing?.howItWorks?.highRating?.title || "Proces za zadovoljne stranke (5 zvezdic)"}
            description={translations?.landing?.howItWorks?.highRating?.description || "Ko je stranka zelo zadovoljna, gre direktno na gejmifikacijo, kjer lahko sledi vašim družbenim omrežjem in prejme nagrade"}
            accentColor="emerald"
            gradientClass="from-green-600 to-emerald-600"
          />
          
          {/* Divider */}
          <div className="flex items-center gap-4 justify-center">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent max-w-xs"></div>
            <div className="px-4 py-1 bg-white rounded-full shadow-sm border border-gray-100 text-sm text-gray-500">
              {language === 'en' ? 'or' : language === 'it' ? 'o' : 'ali'}
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent max-w-xs"></div>
          </div>
          
          {/* Mid Rating Flow (4 stars) */}
          <ProcessFlow 
            steps={midRatingFlow}
            title={translations?.landing?.howItWorks?.midRating?.title || "Proces za stranke s srednjo oceno (4 zvezdice)"}
            description={translations?.landing?.howItWorks?.midRating?.description || "Ko je stranka večinoma zadovoljna, a ima manjše pomisleke, zberemo njihove povratne informacije in jo usmerimo na gejmifikacijo"}
            accentColor="amber"
            gradientClass="from-amber-600 to-amber-500"
          />
          
          {/* Divider */}
          <div className="flex items-center gap-4 justify-center">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent max-w-xs"></div>
            <div className="px-4 py-1 bg-white rounded-full shadow-sm border border-gray-100 text-sm text-gray-500">
              {language === 'en' ? 'or' : language === 'it' ? 'o' : 'ali'}
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent max-w-xs"></div>
          </div>
          
          {/* Low Rating Flow (1-3 stars) */}
          <ProcessFlow 
            steps={lowRatingFlow}
            title={translations?.landing?.howItWorks?.lowRating?.title || "Proces za nezadovoljne stranke (1-3 zvezdice)"}
            description={translations?.landing?.howItWorks?.lowRating?.description || "Ko je stranka nezadovoljna, zberemo njene podrobne povratne informacije, da lahko izboljšate svoje storitve"}
            accentColor="red"
            gradientClass="from-red-500 to-orange-600"
          />

          {/* AI Follow-up Messages Section */}
          <AIFollowUp />
        </div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <a
            href="#pricing"
            className={cn(
              "inline-flex items-center justify-center gap-2 text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
              isMobile ? "px-6 py-3 text-sm" : "px-8 py-4 text-base"
            )}
          >
            Začni zdaj
            <ArrowRight className={cn("transition-transform duration-300 group-hover:translate-x-1", isMobile ? "h-4 w-4" : "h-5 w-5")} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;