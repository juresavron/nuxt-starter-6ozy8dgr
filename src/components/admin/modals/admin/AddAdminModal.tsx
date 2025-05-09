import React, { useState } from 'react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import ErrorAlert from '../../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../../utils/errorHandler';
import { Mail, UserPlus } from 'lucide-react';
import { useAddAdmin } from '../../../../hooks/admin/useAddAdmin';
import { useTranslations } from '../../../../hooks/useTranslations';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal for adding a new admin user
 */
const AddAdminModal: React.FC<AddAdminModalProps> = ({ isOpen, onClose }) => {
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const { addAdmin, isSubmitting, error, setError } = useAddAdmin(onClose);
  const translations = useTranslations();
  const t = translations?.app?.admin?.admins || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdmin(newAdminEmail);
    if (!error) {
      setNewAdminEmail('');
    }
  };

  return (
    <Modal
      title={t?.addAdmin || "Add New Admin"}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {translations?.app?.admin?.company?.form?.cancel || "Cancel"}
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            isLoading={isSubmitting}
            leftIcon={<UserPlus className="h-4 w-4" />}
          >
            {t?.addAdmin || "Add Admin"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-500" />
              <span>{t?.emailLabel || "Admin Email"}</span>
            </div>
          </label>
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="input-field"
            placeholder={t?.emailPlaceholder || "admin@example.com"}
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            {t?.emailHelp || "The user must already have an account in the system."}
          </p>
        </div>
        
        {error && (
          <ErrorAlert 
            message={error} 
            severity={ErrorSeverity.ERROR}
            onDismiss={() => setError(null)}
          />
        )}
      </form>
    </Modal>
  );
};

export default React.memo(AddAdminModal);