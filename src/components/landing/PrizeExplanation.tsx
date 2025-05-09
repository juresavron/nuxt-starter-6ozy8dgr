import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePrizeExplanation } from '../../hooks/landing/usePrizeExplanation';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import PrizeHeader from './prize/PrizeHeader';
import PrizeFeatureGrid from './prize/PrizeFeatureGrid';
import RewardSection from './prize/RewardSection';

const PrizeExplanation: React.FC = () => {
  const { features, badge, title, subtitle } = usePrizeExplanation();
  const { language } = useLanguageStore();
  
  // Handler for smooth scrolling to pricing section
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Get appropriate button text based on language
  const startNowText = language === 'en' ? 'Start Now' : 
                      language === 'it' ? 'Inizia Ora' : 
                      'Začni zdaj';
  
  return (
    <section id="rewards" className="py-20 sm:py-28 bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Component */}
        <PrizeHeader 
          badge={badge}
          title={title}
          subtitle={subtitle}
        />
        
        {/* Features Grid Component */}
        <PrizeFeatureGrid features={features} />

        {/* Reward Options Section Component */}
        <RewardSection />
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {startNowText}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PrizeExplanation;