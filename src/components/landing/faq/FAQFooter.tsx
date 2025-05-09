import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface FAQFooterProps {
  contactText: string;
  contactButtonText: string;
}

const FAQFooter: React.FC<FAQFooterProps> = ({
  contactText,
  contactButtonText
}) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get translated text with fallbacks
  const stillHaveQuestionsText = translations?.landing?.faq?.contactText || 
    (language === 'en' ? 'Still have questions? We\'re here to help.' : 
     language === 'it' ? 'Hai ancora domande? Siamo qui per aiutarti.' : 
     'Imate še vprašanja? Tukaj smo, da vam pomagamo.');
     
  const contactUsText = translations?.landing?.faq?.contactButton || 
    (language === 'en' ? 'Contact Us' : 
     language === 'it' ? 'Contattaci' : 
     'Kontaktirajte nas');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-16 text-center"
    >
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-2xl p-[3px] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="bg-white rounded-xl p-8 sm:p-10">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 shadow-inner">
            <MessageCircle className="h-8 w-8" />
          </div>
          
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            {stillHaveQuestionsText.split('?')[0]}?
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            {stillHaveQuestionsText.split('?')[1] || contactText}
          </p>
          
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>{contactUsText}</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQFooter;