import React from 'react';
import PricingCard from './PricingCard';

interface PricingCardsProps {
  packages: any[];
  isYearly: boolean;
  onSelectPackage: (index: number) => void;
  translations?: any;
}

/**
 * Grid of pricing cards for mobile views
 */
const PricingCards: React.FC<PricingCardsProps> = ({
  packages,
  isYearly,
  onSelectPackage,
  translations
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8">
      {packages.map((pkg, index) => (
        <PricingCard
          key={index}
          title={pkg.title}
          price={isYearly && pkg.yearlyPrice ? pkg.yearlyPrice : pkg.price}
          yearlyPrice={pkg.yearlyPrice}
          description={pkg.description}
          features={pkg.features}
          highlight={pkg.highlight}
          isYearly={isYearly}
          index={index}
          ctaText={translations?.landing?.pricing?.selectPlan || 'Select Package'}
          onClick={() => onSelectPackage(index)}
        />
      ))}
    </div>
  );
};

export default PricingCards;