import React from 'react';
import ErrorAlert from '../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';
import { Save } from 'lucide-react';

interface StatusMessagesProps {
  error: string | null;
  success: boolean;
  onDismiss: () => void;
}

/**
 * Component for displaying status messages
 */
const StatusMessages: React.FC<StatusMessagesProps> = ({
  error,
  success,
  onDismiss
}) => {
  return (
    <>
      {error && (
        <ErrorAlert 
          message={error} 
          severity={ErrorSeverity.ERROR}
          onDismiss={onDismiss}
        />
      )}
      
      {success && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-green-700 flex items-center gap-2">
          <Save className="h-5 w-5" />
          <span>Company assignments saved successfully!</span>
        </div>
      )}
    </>
  );
};

export default React.memo(StatusMessages);