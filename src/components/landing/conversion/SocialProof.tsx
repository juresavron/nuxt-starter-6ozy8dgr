import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSocialProof } from '../../../hooks/landing/useSocialProof';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import SectionBadge from '../shared/SectionBadge';

const SocialProof: React.FC<{ id?: string }> = ({ id = 'social-proof' }) => {
  const { testimonials, activeIndex, setActiveIndex, isClient } = useSocialProof();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.socialProof;

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
  
  // Get appropriate CTA text based on language
  const wantMoreReviewsText = language === 'en' ? 'I Want More Reviews and Followers' : 
                             language === 'it' ? 'Voglio Più Recensioni e Follower' :
                             'Želim več ocen in sledilcev';

  if (!isClient) return null;

  return (
    <div id={id} className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(0,0,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,255,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionBadge
            icon="💬"
            text={t?.badge || 'Customer Testimonials'}
          />
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t?.title || 'What Our Clients Say'}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-2 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t?.subtitle || 'Check out what companies already using our system think about it'}
          </motion.p>
          
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-blue-100 overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full opacity-70"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-full opacity-70"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-lg relative">
                      <span className="text-blue-600 font-bold text-lg">{testimonials[activeIndex].name.charAt(0)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{testimonials[activeIndex].name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{testimonials[activeIndex].role}</p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                    <span>{testimonials[activeIndex].company}</span>
                    <span>•</span>
                    <span>{testimonials[activeIndex].location}</span>
                  </div>
                </div>
              </div>
              
              <blockquote className="text-base sm:text-xl text-gray-700 italic leading-relaxed">
                {testimonials[activeIndex].content}
              </blockquote>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 group cursor-pointer ${
                activeIndex === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Začni zdaj</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SocialProof);