import React from 'react';
import { Users } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  is_superadmin: boolean;
  created_at: string;
}

interface AdminSelectionProps {
  admins: AdminUser[];
  selectedAdmin: string;
  handleAdminChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
}

/**
 * Component for selecting an admin user
 */
const AdminSelection: React.FC<AdminSelectionProps> = ({
  admins,
  selectedAdmin,
  handleAdminChange,
  loading
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span>Select Admin User</span>
        </div>
      </label>
      <select
        value={selectedAdmin}
        onChange={handleAdminChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        disabled={loading}
      >
        <option value="">-- Select Admin --</option>
        {admins.map(admin => (
          <option key={admin.id} value={admin.id} disabled={admin.is_superadmin}>
            {admin.email} {admin.is_superadmin ? '(Superadmin)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(AdminSelection);