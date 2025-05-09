import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface PricingCardProps {
  title: string;
  price: string | number;
  yearlyPrice?: string | number;
  description: string;
  features: string[];
  highlight?: boolean;
  isYearly?: boolean;
  colorScheme?: string;
  index: number;
  ctaText?: string;
  onClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  yearlyPrice,
  description,
  features,
  highlight = false,
  isYearly = false,
  colorScheme = 'indigo',
  index,
  ctaText = 'Select Package',
  onClick
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const translations = useTranslations();
  const { language } = useLanguageStore();

  const isCustomPackage = title === 'Po meri' || title === 'Custom' || title === 'Personalizzato';
  const isTextPrice = typeof price === 'string' && (price.includes('Contact') || price.includes('Kontakt') || price.includes('Contatt'));

  const getButtonStyle = () => {
    if (highlight) {
      // For "Grow" package, use a gold gradient on mobile
      if (isMobile) {
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 border-transparent';
      }
      return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800';
    }
    switch (colorScheme) {
      case 'amber':
        return 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50';
      case 'emerald':
        return 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50';
      case 'rose':
        return 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50';
      case 'bw':
        return 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50';
      default:
        return 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50';
    }
  };

  const getCardStyle = () => {
    if (highlight) {
      return 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl border border-blue-200/20';
    }
    return 'bg-white shadow-lg hover:shadow-xl border border-gray-100/80';
  };

  const yearlyText = language === 'sl' ? 'letno' :
                    language === 'it' ? 'annuale' : 'yearly';
  const monthlyText = language === 'sl' ? 'mesečno' :
                     language === 'it' ? 'mensile' : 'monthly';
  const savingsText = language === 'sl' ? 'Prihranite do 20%' :
                     language === 'it' ? 'Risparmia fino al 20%' : 'Save up to 20%';
  const mostPopularText = language === 'sl' ? 'Najbolj priljubljen' :
                         language === 'it' ? 'Più popolare' : 'Most Popular';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 transform hover:scale-[1.02]",
        getCardStyle()
      )}
    >
      {/* Popular badge - repositioned to be fully visible */}
      {highlight && (
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white shadow-md">
            {mostPopularText}
          </div>
        </div>
      )}

      {/* Header */}
      <div className={cn(
        "p-5 sm:p-6 text-center relative",
        highlight && "pt-11" // Add padding for the badge
      )}>
        <h3 className={cn(
          "text-lg sm:text-xl font-bold mb-2 mt-2",
          highlight ? "text-white" : "text-gray-900"
        )}>
          {title}
        </h3>

        {/* Pricing */}
        {isCustomPackage || isTextPrice ? (
          <div className="flex items-baseline justify-center mt-2">
            <span className={cn(
              "text-2xl sm:text-3xl font-bold",
              highlight ? 'text-white' : 'text-gray-900'
            )}>
              {price}
            </span>
          </div>
        ) : (
          <div className="flex items-baseline justify-center gap-1 mt-2">
            <span className={cn(
              "text-2xl sm:text-3xl font-bold",
              highlight ? "text-white" : "text-gray-900"
            )}>
              {isYearly && yearlyPrice ? yearlyPrice : price}
            </span>
            <span className={highlight ? 'text-white/80' : 'text-gray-600'}>€</span>
            <span className={cn(
              "text-xs sm:text-sm",
              highlight ? 'text-white/80' : 'text-gray-500'
            )}>
              /{isYearly ? yearlyText : monthlyText}
            </span>
          </div>
        )}

        {/* Savings */}
        {isYearly && yearlyPrice && !isCustomPackage && !isTextPrice && (
          <div className={cn(
            "mt-1 text-xs font-medium",
            highlight ? "text-green-200" : "text-green-600"
          )}>
            {savingsText}
          </div>
        )}

        <p className={cn(
          "mt-4 text-xs sm:text-sm",
          highlight ? 'text-white/90' : 'text-gray-600'
        )}>
          {description}
        </p>
      </div>

      {/* Features */}
      <div className={cn(
        "p-5 sm:p-6 flex-grow",
        highlight ? "bg-gradient-to-b from-transparent to-black/10" : ""
      )}>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className={cn(
              "flex items-start gap-2",
              highlight ? "text-white/90" : "text-gray-600"
            )}>
              <CheckCircle
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5",
                  highlight ? "text-green-300" : "text-green-500"
                )}
                style={{ fill: highlight ? 'rgba(220, 252, 231, 0.1)' : 'rgba(220, 252, 231, 0.5)' }}
              />
              <span className="text-xs sm:text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="p-5 sm:p-6">
        <button
          onClick={onClick}
          className={cn(
            "w-full py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg",
            getButtonStyle()
          )}
          aria-label={`${title} ${ctaText}`} // accessibility!
        >
          {isCustomPackage ?
            (language === 'sl' ? 'Kontaktirajte nas' :
             language === 'it' ? 'Contattaci' :
             'Contact Us') :
            (isMobile ?
              (language === 'sl' ? 'Izberi' :
               language === 'it' ? 'Seleziona' :
               'Select') :
              ctaText)}
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;