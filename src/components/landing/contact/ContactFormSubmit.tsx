import * as React from 'react';
import { useEffect } from 'react';
import ErrorAlert from '../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormSubmitProps {
  isSubmitting: boolean;
  error: string | null;
  submitText?: string;
  sendingText?: string;
}

const ContactFormSubmit: React.FC<ContactFormSubmitProps> = ({
  isSubmitting,
  error,
  submitText = 'Submit',
  sendingText = 'Sending...'
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full sm:w-auto btn-cta py-2.5 sm:py-3 text-sm sm:text-base group"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin text-white/90" />
          <span>{sendingText}</span>
        </>
      ) : (
        <>
          <Send className="btn-cta-icon h-4 w-4 sm:h-5 sm:w-5" />
          <span>{submitText}</span>
        </>
      )}
    </button>
  );
};

export default React.memo(ContactFormSubmit);