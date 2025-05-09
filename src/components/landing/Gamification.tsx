import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Settings, Star, CheckCircle2 } from 'lucide-react';
import { useGamification } from '../../hooks/landing/useGamification';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import { useTranslations } from '../../hooks/useTranslations';
import SectionBadge from './shared/SectionBadge';
import GamificationStatistics from './gamification/GamificationStatistics';
import GamificationExample from './gamification/GamificationExample';
import GamificationFeaturesDetail from './gamification/GamificationFeaturesDetail';
import SocialPlatforms from './gamification/SocialPlatforms';
import ReviewPlatforms from './gamification/ReviewPlatforms';
import GamificationFooter from './gamification/GamificationFooter';
import { cn } from '../../utils/cn';
import { useWindowSize } from 'react-use';

const Gamification: React.FC = () => {
  const { 
    isClient,
    features, 
    benefits,
    containerVariants, 
    itemVariants 
  } = useGamification();
  const { language } = useLanguageStore();
  const translations = useTranslations();
  const t = translations?.landing?.gamification;
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Don't render on server side
  if (!isClient) return null;
  
  // Get translated text for "Test the Application" button
  const testAppButtonText = t?.testApplication || 
    (language === 'en' ? 'Test the Application' : 
     language === 'it' ? 'Prova l\'Applicazione' : 
     'Preizkusite aplikacijo');

  return (
    <section id="gamification" className="py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/90">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 sm:w-80 h-64 sm:h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <SectionBadge
            icon="🎮"
            text={t?.badge || "Gamification"}
          />
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t?.title || "Pridobite nove sledilce z gejmifikacijo"}
          </motion.h2>
          
          <motion.p 
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t?.subtitle || "Naš sistem gejmifikacije omogoča pridobivanje novih sledilcev na družbenih omrežjih in kontaktnih podatkov"}
          </motion.p>
        </div>

        {/* Key statistics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <GamificationStatistics />
        </motion.div>
        
        {/* Centered example on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12 sm:mb-16 md:mb-20"
        >
          <GamificationExample />
        </motion.div>
        
        {/* Detailed features explanation */}
        <GamificationFeaturesDetail />
        
        {/* Social and review platforms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          <SocialPlatforms className="mb-0" />
          <ReviewPlatforms className="mb-0" />
        </div>
        
        {/* Benefits section with cards */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <motion.h3 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-6 sm:mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {language === 'en' ? 'Benefits of Gamification' : 
             language === 'it' ? 'Vantaggi della Gamification' : 
             'Prednosti gejmifikacije'}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              // Define icons based on index if not provided
              const IconComponent = benefit.icon;
              
              // Define gradient colors based on index
              const gradientClass = index === 0 ? "from-blue-500 to-indigo-600" :
                                     index === 1 ? "from-amber-500 to-orange-600" :
                                     "from-emerald-500 to-teal-600";
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 25px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)'
                  }}
                  className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-[1.03] border-2 border-blue-100/40 h-full ios-optimized"
                >
                  <div className="flex flex-col h-full relative z-10">
                    {/* Icon container with proper mobile sizing */}
                    <div className={cn(
                      "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-500 ios-optimized bg-gradient-to-br",
                      gradientClass
                    )}>
                      <IconComponent className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8 sm:h-10 sm:w-10'} text-white`} />
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 flex-grow leading-relaxed">{benefit.description}</p>
                  </div>
                  
                  {/* Decorative background elements */}
                  <div className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-full bg-gradient-to-br from-transparent to-blue-50/30 -z-0"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 rounded-br-full bg-gradient-to-tl from-transparent to-blue-50/20 -z-0"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Call to action */}
        <GamificationFooter />
      </div>
    </section>
  );
};

export default React.memo(Gamification);