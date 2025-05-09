import React, { useState, useEffect, useCallback } from 'react';
import { useAdminStore } from '../../../hooks/admin/store';
import { useTranslations } from '../../../hooks/useTranslations';
import { UserPlus, Shield } from 'lucide-react';
import Button from '../../shared/Button';
import ErrorAlert from '../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';
import AdminList from './admins/AdminList';
import AddAdminModal from '../modals/admin/AddAdminModal';
import AssignCompaniesModal from './admin-management/AssignCompaniesModal';
import { useAdminManagement } from '../../../hooks/admin/useAdminManagement';

/**
 * Admin management section of the admin panel
 * Only visible to superadmins
 */
const AdminManagement: React.FC = () => {
  const { isSuperAdmin } = useAdminStore();
  const translations = useTranslations();
  
  const {
    adminUsers,
    loading,
    error,
    setError,
    showAddModal,
    setShowAddModal,
    selectedAdmin,
    setSelectedAdmin,
    showAssignModal,
    setShowAssignModal,
    handleDeleteAdmin,
    handleToggleSuperadmin,
    handleAssignCompanies,
    fetchAdminUsers
  } = useAdminManagement();

  // If not a superadmin, don't show this section
  if (!isSuperAdmin) {
    return null;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span>{translations?.app?.admin?.admins?.title || 'Admin Management'}</span>
        </h2>
        <Button
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="sm"
          leftIcon={<UserPlus className="h-4 w-4" />}
        >
          {translations?.app?.admin?.admins?.addAdmin || 'Add Admin'}
        </Button>
      </div>

      {error && (
        <ErrorAlert
          message={error}
          severity={ErrorSeverity.ERROR}
          onDismiss={() => setError(null)}
        />
      )}

      <AdminList 
        adminUsers={adminUsers}
        loading={loading}
        onDelete={handleDeleteAdmin}
        onToggleSuperadmin={handleToggleSuperadmin}
        onAssignCompanies={handleAssignCompanies}
      />

      {/* Modals */}
      <AddAdminModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {selectedAdmin && (
        <AssignCompaniesModal
          isOpen={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          admin={selectedAdmin}
        />
      )}
    </div>
  );
};

export default React.memo(AdminManagement);