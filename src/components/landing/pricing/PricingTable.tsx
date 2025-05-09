import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useWindowSize } from 'react-use';
import { cn } from '../../../utils/cn';
import type { PricingFeature, PricingPackage } from '../../../types/pricing';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface PricingTableProps {
  features: PricingFeature[];
  packages: PricingPackage[];
  isYearly: boolean;
  onSelectPackage?: (index: number) => void;
  buttonText?: string;
  className?: string;
}

/**
 * Component for displaying a comparison table of pricing features
 */
const PricingTable: React.FC<PricingTableProps> = ({
  features,
  packages,
  isYearly,
  onSelectPackage,
  buttonText,
  className
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const translations = useTranslations();
  const t = translations?.landing?.pricing;
  const { language } = useLanguageStore();
  
  if (isMobile) {
    return null;
  }

  // Helper function to get the translated value for feature cells
  const getTranslatedFeatureValue = (featureName: string, value: string) => {
    // Normalize checkmarks to always use CheckCircle component
    if (value === '✓' || value === '✔️' || value === '✓'.trim() || value === '✓') {
      return 'check';
    }
    
    // For empty or negative values, return a consistent dash
    if (value === '❌' || value === '—' || value === '' || !value || value === '—') {
      return 'dash';
    }

    // For "Vprašalnik" related text, normalize to consistent values
    if ((featureName.includes('Vprašalnik') || featureName.includes('Questionnaire')) && 
        (value.includes('osnoven') || value.toLowerCase().includes('basic'))) {
      return language === 'en' ? 'Basic questionnaire' : 'Osnoven vprašalnik';
    }
    
    if ((featureName.includes('Vprašalnik') || featureName.includes('Questionnaire')) && 
        (value.includes('po meri') || value.toLowerCase().includes('custom'))) {
      if (value.toLowerCase().includes('vprašalnik po meri') || value.toLowerCase().includes('custom questionnaire')) {
        return language === 'en' ? 'Custom questionnaire' : 'Vprašalnik po meri';  
      }
      return language === 'en' ? 'Custom' : 'Po meri';
    }

    // For specific features, try to use translations
    if (featureName.includes('Team contacts') || featureName.includes('Ekipa kontaktira')) {
      if (value.includes('Our team contacts') || value.includes('Naša ekipa kontaktira')) {
        return t?.teamContactsValue?.basic || value;
      }
      if (value.includes('call report') || value.includes('poročilo')) {
        return t?.teamContactsValue?.advanced || value;
      }
    }
    
    if (featureName.includes('Employee rating') || featureName.includes('Ocenjevanje zaposlenih')) {
      if (value.includes('Averages') || value.includes('Povprečja')) {
        return t?.employeeRatingValue?.basic || value;
      }
      if (value.includes('HR folder') || value.includes('kadrov')) {
        return t?.employeeRatingValue?.advanced || value;
      }
    }
    
    if (featureName.includes('Company results dashboard') || featureName.includes('Dashboard')) {
      if (['Basic', 'Osnovni', 'Osnovno'].includes(value)) {
        return t?.dashboardValue?.basic || value;
      }
      if (['Advanced', 'Napreden', 'Napredno'].includes(value)) {
        return t?.dashboardValue?.advanced || value;
      }
      if (['Customizable', 'Prilagodljiv', 'Prilagodljivo'].includes(value)) {
        return t?.dashboardValue?.custom || value;
      }
    }
    
    // Default: return the original value
    return value;
  };
  
  // Get button text based on package index
  const getButtonText = (index: number) => {
    // For the 4th package (index 3) - Custom/Po meri package
    if (index === 3) {
      return language === 'sl' ? 'Kontaktiraj nas' : 
             language === 'it' ? 'Contattaci' : 
             'Contact Us';
    }
    
    // For all other packages
    return buttonText || t?.selectPlan || 'Select Package';
  };

  const mostPopularText = language === 'sl' ? 'Najbolj priljubljen' :
                         language === 'it' ? 'Più popolare' : 
                         'Most Popular';

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[800px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-blue-50/30">
              <th className="p-4 text-left text-gray-500 text-xs sm:text-sm font-medium">
                {t?.functionality || (language === 'en' ? 'Feature' : 'Funkcionalnost')}
              </th>
              {packages.map((pkg, index) => (
                <th
                  key={index}
                  className={cn(
                    "p-4 text-center align-top", // align top!
                    pkg.highlight ? "text-blue-600 font-bold" : "text-gray-700 font-medium"
                  )}
                >
                  <div className="flex flex-col items-center justify-start min-h-[140px]">
                    {/* Badge above title */}
                    {pkg.highlight && (
                      <span className="mb-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white shadow-md">
                        {mostPopularText}
                      </span>
                    )}
                    
                    {/* Title */}
                    <div className="text-lg font-bold mb-1">
                      {pkg.title}
                    </div>

                    {/* Price and period */}
                    <div className="flex flex-col items-center">
                      {pkg.title === 'Custom' || pkg.title === 'Po meri' || pkg.title === 'Personalizzato' ? (
                        <span className="text-lg font-semibold text-blue-600">
                          {pkg.price}
                        </span>
                      ) : (
                        <>
                          <span className="text-lg font-semibold text-blue-600">
                            {isYearly && pkg.yearlyPrice ? pkg.yearlyPrice : pkg.price}€
                          </span>
                          <span className="text-xs text-gray-500">
                            {isYearly ? (t?.yearly || "LETNO") : (t?.monthly || "MESEČNO")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                <td className="p-4 text-gray-700 text-xs sm:text-sm font-medium border-b border-gray-100">
                  {feature.name}
                </td>
                {feature.values.map((value, valueIndex) => (
                  <td
                    key={valueIndex}
                    className={cn(
                      "p-4 border-b border-gray-100 align-middle text-center",
                      packages[valueIndex]?.highlight ? "text-blue-600" : "text-gray-600"
                    )}
                  >
                    {getTranslatedFeatureValue(feature.name, value) === 'check' ? (
                      <div className="flex justify-center">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
                      </div>
                    ) : getTranslatedFeatureValue(feature.name, value) === 'dash' || value === '—' ? (
                      <div className="text-center text-red-400">—</div>
                    ) : (
                      <div className="text-center text-xs sm:text-sm">{getTranslatedFeatureValue(feature.name, value)}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Action buttons row */}
            {onSelectPackage && (
              <tr className="bg-blue-50/20">
                <td className="p-4"></td>
                {packages.map((pkg, index) => (
                  <td key={index} className="p-4 text-center">
                    <button
                      onClick={() => onSelectPackage(index)}
                      aria-label={`Select ${pkg.title} Package`}
                      className={cn(
                        "w-full py-2.5 sm:py-3 px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105",
                        "md:min-w-[140px] lg:min-w-none lg:w-full",
                        pkg.highlight
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:shadow-lg"
                          : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
                      )}
                    >
                      {getButtonText(index)}
                    </button>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;