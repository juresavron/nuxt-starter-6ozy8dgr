import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface FooterCopyrightProps {
  copyrightText: string;
  termsText: string;
  privacyText: string;
  contactText: string;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  copyrightText,
  termsText,
  privacyText,
  contactText
}) => {
  return (
    <motion.div 
      className="border-t border-gray-200 pt-4 sm:pt-6"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <motion.p 
          className="text-xs text-gray-600 text-center sm:text-left order-2 sm:order-1"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {copyrightText}
        </motion.p>
        
        <motion.div 
          className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <a href="/terms" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">
            {termsText}
          </a>
          <a href="/privacy" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">
            {privacyText}
          </a>
          <a href="/contact" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">
            {contactText}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FooterCopyright;