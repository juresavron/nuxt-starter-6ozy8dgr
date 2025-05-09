import React from 'react';
import Modal from '../../../shared/Modal';
import AdminCompanyAssignment from '../../admin-components/AdminCompanyAssignment';
import { Building2 } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  is_superadmin: boolean;
  created_at: string;
}

interface AssignCompaniesModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: AdminUser;
}

/**
 * Modal for assigning companies to an admin
 */
const AssignCompaniesModal: React.FC<AssignCompaniesModalProps> = ({
  isOpen,
  onClose,
  admin
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          <span>Assign Companies to {admin.email}</span>
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <AdminCompanyAssignment 
        adminId={admin.id}
        onClose={onClose}
      />
    </Modal>
  );
};

export default React.memo(AssignCompaniesModal);