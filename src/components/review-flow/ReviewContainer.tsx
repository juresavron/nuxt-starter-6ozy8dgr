import * as React from 'react';
import { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useTranslations } from '../../hooks/useTranslations';
import { getColorScheme } from '../../utils/colors';
import { motion } from 'framer-motion';

interface ReviewContainerProps {
  children: React.ReactNode;
  error?: string;
  companyId?: string | null;
  loading?: boolean;
  className?: string;
  colorScheme?: string;
}

const ReviewContainer: React.FC<ReviewContainerProps> = ({
  children, 
  error, 
  companyId, 
  loading, 
  className = '',
  colorScheme = 'indigo'
}) => {
  const translations = useTranslations();

  const scheme = getColorScheme(colorScheme);

  if (loading) {
    return (
      <div className="relative max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 ios-optimized">
          <Loader2 className={`h-8 w-8 animate-spin mb-4 ios-optimized ${
            cn(`text-${colorScheme}-600`)
          }`} />
          <p className="text-gray-600">Nalaganje...</p>
        </div>
      </div>
    );
  }

  if (!companyId || error) {
    return (
      <div className="relative max-w-2xl mx-auto">
        <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-red-100 ios-optimized">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full transform scale-150"></div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-xl transform rotate-3 transition-transform hover:rotate-6 shadow-lg">
                <AlertCircle className="h-8 w-8 text-white" /> 
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || translations.app.companyIdNotFound}
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              {translations.app.companyIdNotFoundMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      {children}
    </div>
  );
};

export default React.memo(ReviewContainer);