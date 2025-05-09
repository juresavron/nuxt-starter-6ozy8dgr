import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Star, Shield, Zap, Gift } from 'lucide-react';
import { useConversionCTA } from '../../../hooks/landing/useConversionCTA';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { cn } from '../../../utils/cn';
import IconWrapper from '../shared/IconWrapper';

const ConversionCTA: React.FC = () => {
  const { isClient, benefitItems, containerVariants, itemVariants } = useConversionCTA();
  const translations = useTranslations();
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
  
  // Get view packages text based on language
  const viewPackagesText = language === 'en' ? 'View Packages' : 
                           language === 'it' ? 'Visualizza Pacchetti' : 
                           'Oglej si pakete';

  return (
    <section id="start" className="py-16 sm:py-24 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/90"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 lg:p-16 border border-blue-100/40 overflow-hidden relative ios-optimized"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-3 sm:mb-4 leading-tight"
              >
                {translations?.landing?.cta?.title || 'Začnite zbirati ocene in sledilce že danes'}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed"
              >
                {translations?.landing?.cta?.subtitle || 'Nastavitev traja manj kot 5 minut. Takoj po registraciji prejmete dostop do sistema in vašo prvo NFC kartico.'}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                {/* Benefits List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: Zap, text: translations?.landing?.cta?.features?.[0] || "Takojšnja namestitev" },
                    { icon: Shield, text: translations?.landing?.cta?.features?.[1] || "Brez vezave" },
                    { icon: Gift, text: translations?.landing?.cta?.features?.[2] || "14-dnevno testno obdobje" },
                    { icon: CheckCircle2, text: translations?.landing?.cta?.features?.[3] || "Tehnična podpora" },
                    { icon: Gift, text: translations?.landing?.cta?.features?.[4] || "Brezplačna dostava" }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/40 transition hover:shadow-md hover:bg-blue-50 ios-optimized"
                    >
                      <div className={cn(
                        "flex-shrink-0 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md",
                        "w-10 h-10 sm:w-12 sm:h-12"
                      )}>
                        <benefit.icon className={cn('h-5 w-5 sm:h-6 sm:w-6')} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-800 text-mobile-xs">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-center justify-center md:justify-start mt-6"
                >
                  <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-100">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-gray-800">4.9/5</span>
                    <span className="text-sm text-gray-600 hidden sm:inline">
                      {translations?.landing?.cta?.customerRating || "povprečna ocena strank"}
                    </span>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <span className="text-sm text-gray-600">
                      {translations?.landing?.cta?.joinText || "Pridružite se več kot"} <span className="font-semibold text-amber-600">20</span> {translations?.landing?.cta?.companiesText || "podjetjem"}
                    </span>
                    <br className="hidden sm:block" />
                    <span className="text-sm text-gray-600">
                      {translations?.landing?.cta?.alreadyUsingText || "ki že uporabljajo naš sistem"}
                    </span>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 rounded-xl text-white shadow-xl"
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-6">
                    {translations?.landing?.cta?.startToday || "Začnite danes"}
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <p className="text-xs sm:text-sm text-blue-50">
                      {translations?.landing?.cta?.setupDescription || "Nastavitev traja manj kot 5 minut. Takoj po registraciji prejmete dostop do sistema in vašo prvo NFC kartico."}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <a
                      href="#pricing"
                      onClick={scrollToPricing}
                      className={cn(
                        "w-full py-3 px-6 flex items-center justify-center gap-2 bg-gradient-to-r",
                        "from-amber-500 to-amber-600 text-white font-medium rounded-lg shadow-lg",
                        "transition-all duration-300 group hover:scale-[1.03]",
                        "border border-white/10 hover:shadow-xl"
                      )}
                    >
                      {startNowText}
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    
                    <a
                      href="#pricing"
                      onClick={scrollToPricing}
                      className="w-full py-3 px-6 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-white border border-white/10 font-medium rounded-lg transition-all duration-300"
                    >
                      {viewPackagesText}
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ConversionCTA);