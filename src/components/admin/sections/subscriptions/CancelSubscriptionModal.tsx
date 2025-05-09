import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import ErrorAlert from '../../../shared/ErrorAlert'; 
import { ErrorSeverity } from '../../../../utils/errorHandler'; 

interface CancelSubscriptionModalProps {
  showModal: boolean;
  onClose: () => void;
  cancelReason: string;
  onCancelReasonChange: (reason: string) => void;
  onConfirmCancel: () => void;
  isCancelling: boolean;
  error: string | null;
  cancelImmediately?: boolean;
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  showModal,
  onClose,
  cancelReason,
  onCancelReasonChange,
  onConfirmCancel,
  isCancelling,
  error,
  cancelImmediately = false
}) => {
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;

  return (
    <Modal
      title={cancelImmediately ? (t?.cancelImmediate || "Takojšnji preklic naročnine") : (t?.cancel || "Preklic naročnine")}
      isOpen={showModal}
      onClose={onClose}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isCancelling}>
            {t?.keepSubscription || "Ohrani naročnino"}
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirmCancel}
            isLoading={isCancelling}
          >
            {isCancelling ? (t?.cancelling || 'Preklicevanje...') : (t?.confirmCancellation || 'Potrdi preklic')}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-700">
          {cancelImmediately 
            ? (t?.cancelImmediateWarning?.message || "Ta dejanje bo takoj preklicalo naročnino. Uporabnik bo izgubil dostop do vseh premium funkcij.")
            : (t?.cancelWarning?.message || "Naročnina bo ostala aktivna do konca trenutnega obračunskega obdobja, nato bo preklicana.")}
        </p>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t?.cancelReason || "Razlog za preklic (neobvezno)"}
          </label>
          <textarea
            value={cancelReason}
            onChange={(e) => onCancelReasonChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder={t?.cancelReasonPlaceholder || "Prosimo, povejte nam, zakaj preklicujete..."}
          />
        </div>
        
        {error && (
          <ErrorAlert message={error} severity={ErrorSeverity.ERROR} />
        )}
        
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-700 text-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            {cancelImmediately ? (
              <div>
                <p className="font-medium">{t?.cancelImmediateWarning?.title || "Opozorilo: Takojšnji preklic"}</p>
                <p className="mt-1">{t?.cancelImmediateWarning?.message || "To dejanje ne more biti razveljavljeno. Uporabnik bo takoj izgubil dostop in povračilo ne bo izdano."}</p>
              </div>
            ) : (
              <div>
                <p className="font-medium">{t?.cancelWarning?.title || "Pomembne informacije"}</p>
                <p className="mt-1">{t?.cancelWarning?.message || "Dostop do vseh funkcij se bo nadaljeval do konca trenutnega obračunskega obdobja."}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CancelSubscriptionModal;