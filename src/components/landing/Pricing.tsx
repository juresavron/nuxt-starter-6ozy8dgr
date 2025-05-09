import React from 'react';
import { motion } from 'framer-motion';
import { usePricing } from '../../hooks/landing/usePricing';
import SectionBadge from './shared/SectionBadge';
import PricingToggle from './pricing/PricingToggle';
import PricingCards from './pricing/PricingCards';
import PricingTable from './pricing/PricingTable';

const Pricing: React.FC = () => {
  const {
    isYearly,
    packages,
    pricingFeatures,
    translations,
    containerVariants,
    itemVariants,
    handleSelectPackage,
    handleToggle,
    isClient
  } = usePricing();
  
  // Don't render on server side
  if (!isClient) return null;

  return (
    <section id="pricing" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionBadge
            icon="💰"
            text={translations?.landing?.pricing?.badge || "Transparentni paketi"}
          />
          
          <motion.h2 
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {translations?.landing?.pricing?.title || "Preprosti, transparentni paketi"}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {translations?.landing?.pricing?.subtitle || "Izberite paket, ki najbolj ustreza vašim potrebam"}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <PricingToggle 
              isYearly={isYearly} 
              onToggle={handleToggle}
              monthlyText={translations?.landing?.pricing?.monthly || "Mesečno"}
              yearlyText={translations?.landing?.pricing?.yearly || "Letno"}
              savingsText={translations?.landing?.pricing?.yearlySavings || "Prihranite do 20%"}
            />
          </motion.div>
        </div>
        
        {/* Mobile View */}
        <div className="block md:hidden mb-16">
          <PricingCards 
            packages={packages} 
            isYearly={isYearly} 
            onSelectPackage={handleSelectPackage} 
            translations={translations}
          />
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              {translations?.landing?.pricing?.compareFeatures || "Primerjava funkcionalnosti"}
            </h3>
            
            <PricingTable 
              features={pricingFeatures} 
              packages={packages} 
              onSelectPackage={handleSelectPackage}
              isYearly={isYearly}
              buttonText={translations?.landing?.pricing?.selectPlan || "Izberi paket"}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;