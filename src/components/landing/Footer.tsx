import React from 'react';
import { useClientSide } from '../../hooks/useClientSide';
import { useTranslations } from '../../hooks/useTranslations';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import SocialLinks from './footer/SocialLinks';
import QuickLinks from './footer/QuickLinks';
import LegalLinks from './footer/LegalLinks';
import ContactInfo from './footer/ContactInfo';
import FooterCopyright from './footer/FooterCopyright';

const Footer: React.FC = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!isClient) return null;

  // Fallback values for translations
  const appName = translations?.app?.name || 'OcenaGor';
  const appDescription = translations?.app?.description || 'Helping businesses grow through customer feedback';
  const quickLinksTitle = translations?.landing?.footer?.quickLinksTitle || (language === 'en' ? 'Quick Links' : 'Hitre povezave');
  const legalTitle = translations?.landing?.footer?.legalTitle || (language === 'en' ? 'Legal' : 'Pravno');
  const contactTitle = translations?.landing?.footer?.contactTitle || (language === 'en' ? 'Contact' : 'Kontakt');
  const termsText = translations?.landing?.footer?.links?.terms || (language === 'en' ? 'Terms of Service' : 'Pogoji uporabe');
  const privacyText = translations?.landing?.footer?.links?.privacy || (language === 'en' ? 'Privacy Policy' : 'Politika zasebnosti');
  const contactText = translations?.landing?.footer?.links?.contact || (language === 'en' ? 'Contact Us' : 'Kontaktirajte nas');
  const benefitsText = translations?.landing?.navigation?.benefits || (language === 'en' ? 'Benefits' : 'Prednosti');
  const howItWorksText = translations?.landing?.navigation?.howItWorks || (language === 'en' ? 'How It Works' : 'Kako deluje');
  const pricingText = translations?.landing?.navigation?.pricing || (language === 'en' ? 'Pricing' : 'Cenik');
  const copyrightText = translations?.landing?.footer?.copyright?.replace('%s', new Date().getFullYear().toString()) || 
    `© ${new Date().getFullYear()} ${language === 'en' ? 'All rights reserved.' : 'Vse pravice pridržane.'}`;

  // Translated industry titles based on language
  const businessIndustry = language === 'en' ? 'Business Services' : 'Poslovne storitve';
  const beautyIndustry = language === 'en' ? 'Beauty Industry' : 'Lepotna industrija';
  const healthIndustry = language === 'en' ? 'Healthcare Industry' : 'Zdravstvena industrija';
  const hospitalityIndustry = language === 'en' ? 'Hospitality Industry' : 'Gostinska industrija';
  const automotiveIndustry = language === 'en' ? 'Automotive Industry' : 'Avtoservisi';

  return (
    <footer className="relative pt-12 sm:pt-16 pb-6 sm:pb-8 bg-gradient-to-b from-white to-blue-50/50 ios-optimized">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(0,0,255,0.1),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 group transition-all duration-300 z-10 mb-4"
              aria-label="Home"
            >
              <div className="relative">
                <span className="font-bold transition-colors duration-300 bg-clip-text text-transparent bg-gradient-to-r text-xl from-amber-500 to-amber-600">
                  ocenagor
                </span>
                <span className="font-bold transition-colors duration-300 bg-clip-text text-transparent bg-gradient-to-r text-xl from-amber-600 to-amber-500">
                  .si
                </span>
              </div>
            </motion.a>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              {appDescription}
            </p>
            <SocialLinks />
          </motion.div>

          <QuickLinks title={quickLinksTitle} />
          
          <LegalLinks title={legalTitle} />
          
          <ContactInfo title={contactTitle} />
        </motion.div>

        <FooterCopyright 
          copyrightText={copyrightText}
          termsText={termsText}
          privacyText={privacyText}
          contactText={contactText}
        />
      </div>
    </footer>
  );
};

export default React.memo(Footer);
export { Footer };