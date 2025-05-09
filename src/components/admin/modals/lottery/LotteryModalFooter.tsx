import React from 'react';
import { Trophy } from 'lucide-react';
import Button from '../../../shared/Button';
import type { ModalFooterProps } from './types';

/**
 * Footer component for lottery modals with action buttons
 */
const LotteryModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  isLoading,
  loadingText = 'Drawing...'
}) => {
  return (
    <div className="flex justify-end gap-3">
      <Button 
        variant="secondary" 
        onClick={onCancel} 
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button 
        variant="primary" 
        onClick={onConfirm}
        isLoading={isLoading}
        leftIcon={!isLoading && <Trophy className="h-4 w-4" />}
      >
        {isLoading ? loadingText : confirmText}
      </Button>
    </div>
  );
};

export default LotteryModalFooter;