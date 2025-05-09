import React from 'react';
import Button from '../../shared/Button';

interface ActionButtonsProps {
  onClose?: () => void;
  handleSaveAssignments: () => void;
  loading: boolean;
  selectedAdmin: string;
}

/**
 * Component for action buttons (save/cancel)
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onClose,
  handleSaveAssignments,
  loading,
  selectedAdmin
}) => {
  return (
    <div className="flex justify-end gap-2 mt-6">
      {onClose && (
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      )}
      <Button 
        variant="primary" 
        onClick={handleSaveAssignments}
        isLoading={loading}
        disabled={!selectedAdmin}
      >
        {loading ? 'Saving...' : 'Save Assignments'}
      </Button>
    </div>
  );
};

export default React.memo(ActionButtons);