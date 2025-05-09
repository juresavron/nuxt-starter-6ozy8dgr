import React from 'react';
import { motion } from 'framer-motion';
import { useFAQ } from '../../hooks/landing/useFAQ';
import FAQHeader from './faq/FAQHeader';
import FAQList from './faq/FAQList';
import FAQFooter from './faq/FAQFooter';
import { useLanguageStore } from '../../hooks/useLanguageStore';

const FAQ: React.FC = () => {
  const { 
    openIndex, 
    setOpenIndex, 
    translations, 
    faqItems,
    isClient
  } = useFAQ();
  const { language } = useLanguageStore();
  
  if (!isClient) return null;
  
  // Fallback translations
  const title = translations?.landing?.faq?.title || 
               (language === 'en' ? 'Frequently Asked Questions' : 
                language === 'it' ? 'Domande Frequenti' : 
                'Pogosta vprašanja');
               
  const subtitle = translations?.landing?.faq?.subtitle || 
                  (language === 'en' ? 'Find answers to the most common questions about our service' : 
                   language === 'it' ? 'Trova risposte alle domande più comuni sul nostro servizio' : 
                   'Najdite odgovore na najpogostejša vprašanja o naši storitvi');
                   
  const badgeText = translations?.landing?.faq?.badge || 'FAQ';
  
  const contactText = translations?.landing?.faq?.contactText || 
                     (language === 'en' ? 'Still have questions? We\'re here to help.' : 
                      language === 'it' ? 'Hai ancora domande? Siamo qui per aiutarti.' : 
                      'Imate še vprašanja? Tukaj smo, da vam pomagamo.');
                      
  const contactButtonText = translations?.landing?.faq?.contactButton || 
                           (language === 'en' ? 'Contact Us' : 
                            language === 'it' ? 'Contattaci' : 
                            'Kontaktirajte nas');

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(60,100,255,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(60,100,255,0.1)_0%,transparent_70%)]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-40 h-40 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FAQHeader 
          title={title}
          subtitle={subtitle}
          badgeText={badgeText}
        />
        
        <FAQList 
          items={faqItems}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
        
        <FAQFooter 
          contactText={contactText}
          contactButtonText={contactButtonText}
        />
      </div>
    </section>
  );
};

export default FAQ;