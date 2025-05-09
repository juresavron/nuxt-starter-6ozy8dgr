import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import PricingFeature from './pricing/PricingFeature';
import { useTranslations } from '../../hooks/useTranslations';
import { useWindowSize } from 'react-use';

interface PricingCardProps {
  title: string;
  price: string | number;
  monthlyFee?: string | number;
  yearlyPrice?: string | number;
  description: string;
  features: string[];
  highlight?: boolean;
  isYearly?: boolean;
  colorScheme?: string;
  index?: number;
  ctaText?: string;
  ctaLink?: string;
  onSelect?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  monthlyFee,
  yearlyPrice,
  description,
  features,
  highlight = false,
  isYearly = false,
  colorScheme = 'blue',
  index = 0,
  ctaText,
  ctaLink,
  onSelect
}) => {
  const translations = useTranslations();
  const t = translations?.landing?.pricing;
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Default text values with translations
  const selectPlanText = ctaText || t?.selectPlan || 'Izberi paket';
  const mostPopularText = t?.mostPopular || 'Najbolj priljubljen';
  const savingsText = t?.yearlySavings || 'Prihranite do 20%';
  const monthlyText = t?.monthly || 'mesečno';
  const yearlyText = t?.yearly || 'letno';
  
  // Get button style based on color scheme and highlight status
  const getButtonStyle = () => {
    if (highlight) {
      return 'bg-white text-blue-600 hover:bg-gray-50 hover:shadow-lg border border-white/20';
    }
    
    return colorScheme === 'amber' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:shadow-lg' :
           colorScheme === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg' :
           colorScheme === 'rose' ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 hover:shadow-lg' :
           colorScheme === 'bw' ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-gray-950 hover:shadow-lg' :
           'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg';
  };
  
  // Get card style based on highlight status
  const getCardStyle = () => {
    if (highlight) {
      return colorScheme === 'amber' ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-xl hover:shadow-2xl border border-amber-200/20' :
             colorScheme === 'emerald' ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xl hover:shadow-2xl border border-emerald-200/20' :
             colorScheme === 'rose' ? 'bg-gradient-to-br from-rose-600 to-pink-600 text-white shadow-xl hover:shadow-2xl border border-rose-200/20' :
             colorScheme === 'bw' ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-xl hover:shadow-2xl border border-gray-200/20' :
             'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl border border-blue-200/20';
    }
    
    return 'bg-white shadow-lg hover:shadow-xl border border-gray-100/80';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative rounded-2xl p-6 sm:p-8 group hover:scale-[1.02] transition-all duration-300",
        getCardStyle()
      )}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-sm font-medium text-white shadow-lg group-hover:scale-105 transition-transform z-10 whitespace-nowrap">
          {mostPopularText}
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className={cn(
          "text-xl sm:text-2xl font-bold mb-2",
          highlight ? 'text-white' : 'text-gray-900'
        )}>
          {title}
        </h3>
        
        {/* Custom package - price only without monthly/yearly indicator */}
        {title === 'Custom' || title === 'Po meri' || title === 'Personalizzato' ? (
          <div className="flex items-baseline justify-center">
            <span className={cn(
              "text-3xl font-bold",
              highlight ? 'text-white' : 'text-gray-900'
            )}>
              {price}
            </span>
          </div>
        ) : (
          <div className="flex items-baseline justify-center gap-2">
            <span className={cn(
              "text-3xl font-bold",
              highlight ? 'text-white' : 'text-gray-900'
            )}>
              {price}
            </span>
            <span className={highlight ? 'text-white' : 'text-gray-500'}>€</span>
            {!isMobile && (
              <span className={cn(
                "text-sm",
                highlight ? 'text-white' : 'text-gray-500'
              )}>
                {isYearly ? yearlyText : monthlyText}
              </span>
            )}
          </div>
        )}
        
        {/* Yearly savings badge - only for yearly pricing and non-custom packages */}
        {isYearly && yearlyPrice && title !== 'Custom' && title !== 'Po meri' && title !== 'Personalizzato' && (
          <div className={cn(
            "mt-1 text-sm",
            highlight ? 'text-white' : 'text-gray-500'
          )}>
            <div className="text-xs mt-1 font-medium" style={highlight ? {color: 'rgb(167, 243, 208)'} : {color: 'rgb(5, 150, 105)'}}>
              {savingsText}
            </div>
          </div>
        )}
        
        <p className={cn(
          "mt-4 text-sm",
          highlight ? 'text-white' : 'text-gray-600'
        )}>
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, featureIndex) => (
          <PricingFeature 
            key={featureIndex}
            feature={feature}
            className={cn(
              highlight ? 'text-white' : 'text-gray-600'
            )}
          />
        ))}
      </ul>

      {ctaLink ? (
        <Link
          to={ctaLink}
          className={cn(
            "w-full py-3 px-6 rounded-lg text-sm font-medium transition-all flex items-center justify-center",
            getButtonStyle()
          )}
        >
          {isMobile ? (t?.selectPlanMobile || "Izberi") : selectPlanText}
        </Link>
      ) : (
        <button
          onClick={onSelect}
          className={cn(
            "w-full py-3 px-6 rounded-lg text-sm font-medium transition-all flex items-center justify-center",
            getButtonStyle()
          )}
        >
          {isMobile ? (t?.selectPlanMobile || "Izberi") : selectPlanText}
        </button>
      )}
    </motion.div>
  );
};

export default PricingCard;