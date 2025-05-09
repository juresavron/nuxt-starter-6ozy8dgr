import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import SectionBadge from '../shared/SectionBadge';

interface NFCHeaderProps {
  title?: string;
  subtitle?: string;
}

const NFCHeader: React.FC<NFCHeaderProps> = ({ title, subtitle }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.nfc;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <SectionBadge
        icon="📱"
        text={t?.badge || (language === 'it' ? "Tecnologia NFC" : "NFC Technology")}
      />
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 sm:mb-6"
      >
        {title || t?.title || (language === 'it' 
          ? "Raccolta Semplice di Recensioni con Un Tocco" 
          : "Simple Review Collection with One Touch")}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        {subtitle || t?.subtitle || (language === 'it'
          ? "Le nostre carte e adesivi NFC permettono ai clienti di inviare una recensione in soli 30 secondi"
          : "Our NFC cards and stickers allow customers to submit a review in just 30 seconds")}
      </motion.p>
    </motion.div>
  );
};

export default React.memo(NFCHeader);