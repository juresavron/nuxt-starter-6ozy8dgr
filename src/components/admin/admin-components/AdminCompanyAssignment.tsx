import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAdminStore } from '../../../hooks/admin/store';
import { UserPlus } from 'lucide-react';
import Button from '../../shared/Button';

// Import smaller component chunks
import AdminSelection from './AdminCompanySelection';
import CompanyFilter from './CompanyFilter';
import CompanyList from './CompanyList';
import SelectionControls from './SelectionControls';
import ActionButtons from './ActionButtons';
import StatusMessages from './StatusMessages';

interface AdminCompanyAssignmentProps {
  adminId?: string;
  onClose?: () => void;
}

/**
 * Main component for assigning companies to admin users
 */
const AdminCompanyAssignment: React.FC<AdminCompanyAssignmentProps> = ({
  adminId,
  onClose
}) => {
  const [showModal, setShowModal] = useState(adminId ? true : false);
  const [admins, setAdmins] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<string>(adminId || '');
  const [companyAssignments, setCompanyAssignments] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { companies, saveCompanyAssignments } = useAdminStore();

  // Fetch admin users and assignments when component mounts or adminId changes
  useEffect(() => {
    if (showModal || adminId) {
      fetchAdmins();
      if (adminId) {
        setSelectedAdmin(adminId);
        fetchCompanyAssignments(adminId);
      }
    }
  }, [showModal, adminId]);

  // Fetch admin users
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, is_superadmin')
        .order('email');
        
      if (error) throw error;
      
      setAdmins(data || []);
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  // Handle admin selection
  const handleAdminChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const adminId = e.target.value;
    setSelectedAdmin(adminId);
    setCompanyAssignments({});
    
    if (adminId) {
      fetchCompanyAssignments(adminId);
    }
  };

  // Fetch company assignments for selected admin
  const fetchCompanyAssignments = async (adminId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('company_admins')
        .select('company_id')
        .eq('admin_id', adminId);
        
      if (fetchError) throw fetchError;
      
      const assignments: Record<string, boolean> = {};
      (data || []).forEach(assignment => {
        assignments[assignment.company_id] = true;
      });
      
      setCompanyAssignments(assignments);
    } catch (err) {
      console.error('Error fetching company assignments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch company assignments');
    } finally {
      setLoading(false);
    }
  };

  // Toggle company assignment
  const handleCompanyToggle = (companyId: string) => {
    setCompanyAssignments(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  // Set all filtered companies to selected
  const handleSelectAll = (newAssignments: Record<string, boolean>) => {
    setCompanyAssignments(prev => ({
      ...prev,
      ...newAssignments
    }));
  };

  // Clear selection for filtered companies
  const handleClearSelection = () => {
    const newAssignments: Record<string, boolean> = {};
    filteredCompanies.forEach(company => {
      newAssignments[company.id] = false;
    });
    setCompanyAssignments(prev => ({
      ...prev,
      ...newAssignments
    }));
  };

  // Save company assignments
  const handleSaveAssignments = async () => {
    if (!selectedAdmin) {
      setError('Please select an admin user');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await saveCompanyAssignments(selectedAdmin, companyAssignments);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // If onClose is provided, call it after successful save
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('Error saving company assignments:', err);
      setError(err instanceof Error ? err.message : 'Failed to save company assignments');
    } finally {
      setLoading(false);
    }
  };

  // Filter companies by search term
  const filteredCompanies = React.useMemo(() => {
    const safeCompanies = companies ?? [];
    if (!searchTerm) return safeCompanies;
    
    const term = searchTerm.toLowerCase();
    return safeCompanies.filter(company => 
      company.name.toLowerCase().includes(term)
    );
  }, [companies, searchTerm]);

  // Count assigned companies
  const assignedCount = Object.values(companyAssignments).filter(Boolean).length;
  
  // Standalone button for opening the modal
  if (!showModal && !adminId) {
    return (
      <Button
        variant="primary"
        size="sm"
        leftIcon={<UserPlus className="h-4 w-4" />}
        onClick={() => setShowModal(true)}
      >
        Manage Admins
      </Button>
    );
  }
  
  // Content for the modal or inline usage
  return (
    <div>
      <div className="space-y-6">
        {/* Admin selection - only show if adminId is not provided */}
        {!adminId && (
          <AdminSelection 
            admins={admins} 
            selectedAdmin={selectedAdmin} 
            handleAdminChange={handleAdminChange} 
            loading={loading}
          />
        )}
        
        {selectedAdmin && (
          <>
            {/* Company filter */}
            <CompanyFilter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              loading={loading}
              filteredCompaniesLength={filteredCompanies.length}
              assignedCount={assignedCount}
            />
            
            {/* Company list */}
            <CompanyList 
              filteredCompanies={filteredCompanies}
              companyAssignments={companyAssignments}
              handleCompanyToggle={handleCompanyToggle}
              loading={loading}
            />
            
            {/* Select all/none buttons */}
            <SelectionControls 
              filteredCompanies={filteredCompanies}
              setSelectAll={handleSelectAll}
              clearSelection={handleClearSelection}
              loading={loading}
            />
          </>
        )}

        {/* Action buttons */}
        <ActionButtons 
          onClose={onClose}
          handleSaveAssignments={handleSaveAssignments}
          loading={loading}
          selectedAdmin={selectedAdmin}
        />
        
        {/* Status messages */}
        <StatusMessages 
          error={error}
          success={success}
          onDismiss={() => setError(null)}
        />
      </div>
    </div>
  );
};

export default AdminCompanyAssignment;