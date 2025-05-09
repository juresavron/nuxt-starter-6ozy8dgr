import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';

/**
 * Footer component for the Gamification section with CTA and key features
 */
const GamificationFooter: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Get appropriate button text based on language
  const startNowText = language === 'en' ? 'Start Now' : 
                      language === 'it' ? 'Inizia Ora' : 
                      'Začni zdaj';
  
  // Handler for smooth scrolling to pricing section
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get translations for key features
  const getFeatureText = (index: number) => {
    const keyFeatures = [
      // Feature 1: Choose social media platforms
      {
        en: 'You choose which social media you want customers to follow',
        it: 'Scegli quali social media vuoi che i clienti seguano',
        sl: 'Sami izberete družbena omrežja za sledenje'
      },
      // Feature 2: Determine rewards
      {
        en: 'You determine rewards for customers',
        it: 'Determini i premi per i clienti',
        sl: 'Sami določite nagrade za stranke'
      },
      // Feature 3: Simple for customers
      {
        en: 'Simple to use for customers',
        it: 'Semplice da usare per i clienti',
        sl: 'Preprosta uporaba za stranke'
      },
      // Feature 4: Measurable results
      {
        en: 'Measurable results in the first month',
        it: 'Risultati misurabili nel primo mese',
        sl: 'Merljivi rezultati v prvem mesecu'
      }
    ];
    
    const feature = keyFeatures[index];
    if (language === 'en') return feature.en;
    if (language === 'it') return feature.it;
    return feature.sl;
  };

  // CTA main title and description
  const ctaTitle = language === 'en' 
    ? 'Start with Gamification Today' 
    : language === 'it' 
      ? 'Inizia con la Gamification Oggi' 
      : 'Začni z gejmifikacijo danes';
      
  const ctaDescription = language === 'en' 
    ? 'Gamification is a key element of our system that customers love and brings measurable results. The average company using our system gains 35% more followers on social media and 127% more Google reviews in the first month.'
    : language === 'it' 
      ? 'La gamification è un elemento chiave del nostro sistema che i clienti adorano e porta risultati misurabili. L\'azienda media che utilizza il nostro sistema ottiene il 35% di follower in più sui social media e il 127% di recensioni Google in più nel primo mese.'
      : 'Gejmifikacija je ključni element našega sistema, ki ga stranke obožujejo in prinaša merljive rezultate. Povprečno podjetje z našim sistemom pridobi 35% več sledilcev na družbenih omrežjih in 127% več Google ocen v prvem mesecu.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="text-center bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-blue-100/80 shadow-lg mt-10 sm:mt-16 ios-optimized transform hover:scale-[1.01] transition-all duration-500"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100/20 rounded-full blur-3xl"></div>
      
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-4 sm:mb-6">
        {ctaTitle}
      </h3>
      
      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
        {ctaDescription}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 sm:mb-10">
        {/* Feature list rendering */}
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]">
            <CheckCircle className={cn(
              "text-green-500 flex-shrink-0 mt-0.5",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} style={{ fill: 'rgba(220, 252, 231, 0.6)' }} />
            <span className="text-xs sm:text-sm text-gray-700 text-left font-medium">{getFeatureText(index)}</span>
          </div>
        ))}
      </div>
      
      <a
        href="#pricing"
        onClick={scrollToPricing}
        className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.05] active:scale-[0.98]"
      >
        <span>{startNowText}</span>
        <ArrowRight className={cn(
          "transition-transform duration-500 group-hover:translate-x-2",
          isMobile ? "h-4 w-4" : "h-5 w-5"
        )} />
      </a>
    </motion.div>
  );
};

export default React.memo(GamificationFooter);