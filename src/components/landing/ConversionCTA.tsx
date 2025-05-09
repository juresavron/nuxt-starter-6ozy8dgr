import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../hooks/useTranslations';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import { cn } from '../../utils/cn';
import { useWindowSize } from 'react-use';
import { Zap, Shield, Gift, CheckCircle2 } from 'lucide-react';
import IconWrapper from './shared/IconWrapper';

const ConversionCTA: React.FC = () => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const translations = useTranslations();
  const { language } = useLanguageStore();

  // Scroll to pricing section
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startNowText =
    language === 'en'
      ? 'Start Now'
      : language === 'it'
      ? 'Inizia Ora'
      : 'Začni zdaj';

  const viewPackagesText =
    language === 'en'
      ? 'View Packages'
      : language === 'it'
      ? 'Visualizza Pacchetti'
      : 'Oglej si pakete';

  const benefits = [
    { icon: Zap, text: translations?.landing?.cta?.features?.[0] || 'Takojšnja namestitev' },
    { icon: Shield, text: translations?.landing?.cta?.features?.[1] || 'Brez vezave' },
    { icon: Gift, text: translations?.landing?.cta?.features?.[2] || '14-dnevno testno obdobje' },
    { icon: CheckCircle2, text: translations?.landing?.cta?.features?.[3] || 'Tehnična podpora' },
    { icon: Gift, text: translations?.landing?.cta?.features?.[4] || 'Brezplačna dostava' },
  ];

  return (
    <section id="start" className="py-16 sm:py-24 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/90"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-12 lg:p-16 border border-blue-100/40 overflow-hidden relative ios-optimized"
        >
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Heading & Subtitle */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-3 sm:mb-4 leading-tight"
              >
                {translations?.landing?.cta?.title || 'Začnite zbirati ocene in sledilce že danes'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg text-gray-700"
              >
                {translations?.landing?.cta?.subtitle || 'Nastavitev traja manj kot 5 minut. Takoj po registraciji prejmete dostop do sistema in vašo prvo NFC kartico.'}
              </motion.p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Benefits */}
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <IconWrapper 
                        icon={benefit.icon}
                        size={isMobile ? 'mobile-sm' : 'sm'}
                        gradient="from-amber-500 to-amber-600"
                        rotate={index % 2 === 0 ? 'left' : 'right'}
                      />
                      <span className="text-xs sm:text-sm text-gray-800 text-mobile-xs">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="lg:col-span-2 text-center lg:text-left space-y-4">
                <motion.button
                  onClick={scrollToPricing}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full lg:w-auto inline-flex justify-center items-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md hover:shadow-lg transition duration-200"
                >
                  {startNowText}
                </motion.button>

                <motion.button
                  onClick={scrollToPricing}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="w-full lg:w-auto inline-flex justify-center items-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-xl border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 shadow-sm hover:shadow transition duration-200"
                >
                  {viewPackagesText}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionCTA;