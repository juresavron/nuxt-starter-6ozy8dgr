import React from 'react';
import { motion } from 'framer-motion';
import { usePricing } from '../../../hooks/landing/usePricing';
import SectionBadge from '../shared/SectionBadge';
import PricingToggle from './PricingToggle';
import PricingCards from './PricingCards';
import PricingTable from './PricingTable';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface SimplePricingProps {
  id?: string;
}

const SimplePricing: React.FC<SimplePricingProps> = ({ id = 'pricing' }) => {
  const {
    isYearly,
    packages,
    pricingFeatures,
    translations,
    handleSelectPackage,
    handleToggle,
    isClient
  } = usePricing();
  
  const { language } = useLanguageStore();
  
  // Don't render on server side
  if (!isClient) return null;

  return (
    <section id={id} className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <SectionBadge
            icon="💰"
            text={translations?.landing?.pricing?.badge || "Transparentni paketi"}
          />
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {translations?.landing?.pricing?.title || "Preprosti, transparentni paketi"}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed"
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
            className="mb-10 sm:mb-12"
          >
            <PricingToggle 
              isYearly={isYearly} 
              onToggle={handleToggle}
              monthlyText={translations?.landing?.pricing?.monthly || 
                (language === 'sl' ? "MESEČNO" : 
                 language === 'it' ? "MENSILE" : 
                 "MONTHLY")}
              yearlyText={translations?.landing?.pricing?.yearly || 
                (language === 'sl' ? "LETNO" : 
                 language === 'it' ? "ANNUALE" : 
                 "YEARLY")}
              savingsText={translations?.landing?.pricing?.yearlySavings || 
                (language === 'sl' ? "Prihranite do 20%" : 
                 language === 'it' ? "Risparmia fino al 20%" : 
                 "Save up to 20%")}
            />
          </motion.div>
        </div>
        
        {/* Mobile View */}
        <div className="block md:hidden mb-10 sm:mb-16">
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
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
              {translations?.landing?.pricing?.compareFeatures || "Primerjava funkcionalnosti"}
            </h3>
            
            <PricingTable 
              features={pricingFeatures} 
              packages={packages} 
              onSelectPackage={handleSelectPackage}
              isYearly={isYearly}
              buttonText={translations?.landing?.pricing?.selectPlan || 
                (language === 'sl' ? "Izberi paket" : 
                 language === 'it' ? "Seleziona pacchetto" : 
                 "Select Package")}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Customization note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center max-w-3xl mx-auto bg-blue-50/60 p-6 rounded-xl border border-blue-100/40"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {language === 'en' ? 'Need a custom solution?' : 
             language === 'it' ? 'Hai bisogno di una soluzione personalizzata?' : 
             'Potrebujete prilagojeno rešitev?'}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {language === 'en' ? 'We can provide additional customizations of packages to fit your specific needs.' : 
             language === 'it' ? 'Possiamo fornire personalizzazioni aggiuntive dei pacchetti per adattarli alle tue esigenze specifiche.' : 
             'Ponujamo dodatne prilagoditve paketov, ki ustrezajo vašim specifičnim potrebam.'}
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {language === 'en' ? 'Contact Us' : 
             language === 'it' ? 'Contattaci' : 
             'Kontaktirajte nas'}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SimplePricing;