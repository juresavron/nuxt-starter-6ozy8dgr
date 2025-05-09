import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';

interface LotteryConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  isProcessing: boolean;
  type: 'warning' | 'success' | 'error';
}

/**
 * Modal for confirming lottery-related actions
 */
const LotteryConfirmActionModal: React.FC<LotteryConfirmActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = 'Cancel',
  isProcessing,
  type = 'warning'
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};

  const getIconByType = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'warning':
      default:
        return <AlertTriangle className="h-6 w-6 text-amber-500" />;
    }
  };

  const getColorByType = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      case 'warning':
      default:
        return 'bg-amber-50 border-amber-100';
    }
  };

  const getTextColorByType = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
      default:
        return 'text-amber-800';
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isProcessing}>
            {cancelText}
          </Button>
          <Button 
            variant={type === 'error' ? 'danger' : 'primary'} 
            onClick={onConfirm}
            isLoading={isProcessing}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className={`p-5 ${getColorByType()} rounded-lg flex items-start gap-3 mb-4`}>
        {getIconByType()}
        <div>
          <p className={`font-medium ${getTextColorByType()}`}>
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LotteryConfirmActionModal;