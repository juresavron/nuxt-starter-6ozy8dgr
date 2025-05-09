import React from 'react';
import { Mail, Shield, Users, Trash2, XCircle, UserCog } from 'lucide-react';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import { useTranslations } from '../../../../hooks/useTranslations';

interface AdminUser {
  id: string;
  email: string;
  is_superadmin: boolean;
  created_at: string;
}

interface AdminUsersListProps {
  adminUsers: AdminUser[];
  loading: boolean;
  onDelete: (admin: AdminUser) => void;
  onToggleSuperadmin: (admin: AdminUser) => void;
  onAssignCompanies: (admin: AdminUser) => void;
}

/**
 * Component to display the list of admin users
 */
const AdminUsersList: React.FC<AdminUsersListProps> = ({
  adminUsers,
  loading,
  onDelete,
  onToggleSuperadmin,
  onAssignCompanies
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admins || {};
  
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.email || 'E-pošta'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.role || 'Vloga'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.created || 'Ustvarjeno'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.actions || 'Dejanja'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adminUsers.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{admin.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {admin.is_superadmin ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {t?.superadmin || 'Superadmin'}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {t?.admin || 'Admin'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(admin.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleSuperadmin(admin)}
                      aria-label={admin.is_superadmin ? "Remove superadmin" : "Make superadmin"}
                      title={admin.is_superadmin ? "Remove superadmin" : "Make superadmin"}
                      leftIcon={admin.is_superadmin ? 
                        <XCircle className="h-5 w-5 text-purple-600" /> : 
                        <Shield className="h-5 w-5 text-blue-600" />
                      }
                    >
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAssignCompanies(admin)}
                      aria-label="Assign companies"
                      title="Assign companies"
                      leftIcon={<Users className="h-5 w-5 text-emerald-600" />}
                    >
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(admin)}
                      aria-label="Delete admin"
                      title="Delete admin"
                      leftIcon={<Trash2 className="h-5 w-5 text-red-600" />}
                    >
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {adminUsers.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  {t?.noAdminsFound || 'Ni najdenih admin uporabnikov'}
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  {t?.loading || 'Nalaganje...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default React.memo(AdminUsersList);