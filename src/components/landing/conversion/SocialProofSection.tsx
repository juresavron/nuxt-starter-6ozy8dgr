import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';

const SocialProofSection: React.FC = () => {
  const translations = useTranslations();
  const t = translations?.landing?.cta;
  
  return (
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
          {t?.customerRating || "povprečna ocena strank"}
        </span>
      </div>
      
      <div className="text-center sm:text-left">
        <span className="text-sm text-gray-600">
          {t?.joinText || "Pridružite se več kot"} <span className="font-semibold text-amber-600">20</span> {t?.companiesText || "podjetjem"}
        </span>
        <br className="hidden sm:block" />
        <span className="text-sm text-gray-600">
          {t?.alreadyUsingText || "ki že uporabljajo naš sistem"}
        </span>
      </div>
    </motion.div>
  );
};

export default SocialProofSection;