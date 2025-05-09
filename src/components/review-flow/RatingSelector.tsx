import React from 'react';
import { Star, Building2 } from 'lucide-react';
import { useTranslations } from '../../hooks/useTranslations';
import { cn } from '../../utils/cn';

interface RatingSelectorProps {
  companyName: string;
  rating: number;
  onRating: (value: number) => void;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({ companyName, rating, onRating }) => {
  const translations = useTranslations();

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-6">
          <Building2 className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {companyName}
          </h1>
          <h2 className="text-lg sm:text-xl text-gray-600">
            {translations?.review?.title || 'Kakšna je bila vaša izkušnja?'}
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {translations?.review?.subtitle || 'Vaše povratne informacije nam pomagajo izboljšati našo storitev!'}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => onRating(value)}
            className={cn(
              'p-2 sm:p-3 rounded-full',
              value <= rating ? 'text-yellow-500' : 'text-gray-300'
            )}
          >
            <Star className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />
          </button>
        ))}
      </div>
    </>
  );
};

export default RatingSelector;