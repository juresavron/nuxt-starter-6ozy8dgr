import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Loader2 } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
  colorScheme?: string;
  buttonText?: string;
  loadingText?: string;
}

/**
 * Submit button component for feedback form
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  disabled = false,
  colorScheme = 'indigo',
  buttonText,
  loadingText
}) => {
  const translations = useTranslations();
  
  // Use provided text or fallback to translations
  const submitText = buttonText || translations?.review?.form?.submitButton || 'Pošlji povratne informacije';
  const loadingSubmitText = loadingText || translations?.review?.form?.sending || 'Pošiljanje...';

  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className={cn(
        "w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        colorScheme === 'amber' ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' :
        colorScheme === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' :
        colorScheme === 'rose' ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700' :
        colorScheme === 'bw' ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950' :
        'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
        "ios-optimized"
      )}
    >
      <div className="flex items-center gap-2">
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-white/70" />
            <span className="text-sm sm:text-base">{loadingSubmitText}</span>
          </>
        ) : (
          <span className="text-sm sm:text-base">{submitText}</span>
        )}
      </div>
    </button>
  );
};

export default React.memo(SubmitButton);