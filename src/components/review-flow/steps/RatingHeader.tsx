import * as React from 'react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { getTextColor, getColorScheme } from '../../../utils/colors';
import { Building2 } from 'lucide-react';

interface RatingHeaderProps {
  colorScheme?: string;
  companyName: string;
  companyLogo?: string;
}

const RatingHeader: React.FC<RatingHeaderProps> = ({ companyName, companyLogo, colorScheme }) => {
  const translations = useTranslations();
  const scheme = getColorScheme(colorScheme);
  
  // Ensure translations exist and provide fallbacks
  const titleText = translations?.review?.title ?? 'Kakšna je bila vaša izkušnja?';
  const subtitleText = translations?.review?.subtitle ?? 'Vaše povratne informacije nam pomagajo izboljšati našo storitev!';
  
  return (
    <div className="text-center mb-8 max-w-2xl mx-auto">
      <div
        className="flex items-center justify-center gap-3 mb-6"
      >
          <div className={cn(
            "w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shadow-md transform hover:scale-105 transition-all duration-300 ios-optimized",
            colorScheme === 'amber' ? 'bg-amber-50 border border-amber-100' :
            colorScheme === 'emerald' ? 'bg-emerald-50 border border-emerald-100' :
            colorScheme === 'rose' ? 'bg-rose-50 border border-rose-100' :
            colorScheme === 'bw' ? 'bg-gray-100 border border-gray-200' :
            'bg-indigo-50 border border-indigo-100'
          )}> 
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={`${companyName} logo`}
                className="w-full h-full object-contain p-1"
                loading="eager"
                decoding="async"
                style={{
                  aspectRatio: '1/1', 
                  objectFit: 'contain', 
                  transform: 'translateZ(0)' 
                }}
              />
            ) : (
              <Building2 className={cn(
                "h-7 w-7",
                colorScheme === 'amber' ? 'text-amber-600' :
                colorScheme === 'emerald' ? 'text-emerald-600' :
                colorScheme === 'rose' ? 'text-rose-600' :
                colorScheme === 'bw' ? 'text-gray-700' :
                'text-indigo-600'
              )} />
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {companyName}
          </h2>
        </div>
        
        <div
          className="text-xl sm:text-2xl font-bold mb-4 text-gray-800"
        >
          {titleText}
        </div>
        
        <p
          className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed mb-6"
        >
          {subtitleText}
        </p>
        
    </div>
  );
};

export default React.memo(RatingHeader);