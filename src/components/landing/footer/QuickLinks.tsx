import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface QuickLinksProps {
  title: string;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ title }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Translated industry titles based on language
  const businessIndustry = language === 'en' ? "Business Services" : "Poslovne storitve";
  const beautyIndustry = language === 'en' ? "Beauty Industry" : "Lepotna industrija";
  const healthIndustry = language === 'en' ? "Healthcare Industry" : "Zdravstvena industrija";
  const hospitalityIndustry = language === 'en' ? "Hospitality Industry" : "Gostinska industrija";
  const automotiveIndustry = language === 'en' ? "Automotive Industry" : "Avtoservisi";
  
  // Navigation links
  const benefitsText = translations?.landing?.navigation?.benefits || (language === 'en' ? 'Benefits' : 'Prednosti');
  const howItWorksText = translations?.landing?.navigation?.howItWorks || (language === 'en' ? 'How It Works' : 'Kako deluje');
  const pricingText = translations?.landing?.navigation?.pricing || (language === 'en' ? 'Pricing' : 'Cenik');
  const contactText = translations?.landing?.footer?.links?.contact || (language === 'en' ? 'Contact Us' : 'Kontaktirajte nas');
  
  return (
    <div className="mt-6 md:mt-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{title}</h3>
      <ul className="space-y-2 sm:space-y-3">
        <li>
          <Link to="/industrije/poslovne" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {businessIndustry}
          </Link>
        </li>
        <li>
          <Link to="/industrije/lepota" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {beautyIndustry}
          </Link>
        </li>
        <li>
          <Link to="/industrije/zdravje" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {healthIndustry}
          </Link>
        </li>
        <li>
          <Link to="/industrije/gostinstvo" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {hospitalityIndustry}
          </Link>
        </li>
        <li>
          <Link to="/industrije/avtoservisi" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {automotiveIndustry}
          </Link>
        </li>
        <li>
          <a href="#benefits" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {benefitsText}
          </a>
        </li>
        <li>
          <a href="#how-it-works" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {howItWorksText}
          </a>
        </li>
        <li>
          <a href="#pricing" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {pricingText}
          </a>
        </li>
        <li>
          <a href="#contact" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {contactText}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;