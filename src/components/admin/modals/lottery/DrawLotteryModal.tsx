import React, { useState } from 'react';
import Modal from '../../../shared/Modal';
import ErrorAlert from '../../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../../utils/errorHandler';
import { useTranslations } from '../../../../hooks/useTranslations';

// Import modular components
import { 
  LotteryModalHeader,
  LotteryModalContent,
  LotteryModalFooter,
  LotteryWarningMessage,
  LotteryLoadingIndicator
} from './';

interface DrawLotteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (companyId: string) => Promise<void>;
  companyId: string;
  companyName: string;
  isDrawing: boolean;
}

/**
 * Modal for confirming lottery drawing
 */
const DrawLotteryModal: React.FC<DrawLotteryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  companyId,
  companyName,
  isDrawing
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      setError(null);
      console.log('Confirming draw for company:', companyId);
      await onConfirm(companyId);
      onClose();
    } catch (err) {
      console.error('Error drawing lottery winner:', err);
      setError(err instanceof Error ? err.message : 'Failed to draw winner');
    }
  };

  return (
    <Modal
      title={t?.drawWinner || 'Draw Lottery Winner'}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      footer={
        <LotteryModalFooter
          onCancel={onClose}
          onConfirm={handleConfirm}
          cancelText={t?.cancel || 'Cancel'}
          confirmText={t?.confirmDraw || 'Confirm Drawing'}
          isLoading={isDrawing}
          loadingText={t?.drawing || 'Drawing...'}
        />
      }
    >
      <LotteryModalContent>
        <LotteryModalHeader
          title={t?.drawForCompany || 'Draw Winner for Company'}
          description={companyName}
        />

        <LotteryWarningMessage
          title={t?.drawWinnerWarning?.title || 'Important Information'}
          message={t?.drawWinnerWarning?.message || 'This action will randomly select a winner from all eligible entries for this company. This action cannot be undone.'}
        />

        {error && (
          <ErrorAlert 
            message={error} 
            severity={ErrorSeverity.ERROR}
            onDismiss={() => setError(null)}
          />
        )}

        {isDrawing && (
          <LotteryLoadingIndicator 
            message={t?.drawingInProgress || 'Drawing in progress...'}
          />
        )}
      </LotteryModalContent>
    </Modal>
  );
};

export default DrawLotteryModal;