import React from 'react';
import { Shield, User } from 'lucide-react';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useAdminStore } from '../../../hooks/admin/store';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '../../../utils/cn';

interface AdminUserProfileProps {
  isCollapsed?: boolean;
}

/**
 * User profile component for the admin sidebar
 */
const AdminUserProfile: React.FC<AdminUserProfileProps> = ({
  isCollapsed = false
}) => {
  const { user } = useAuth();
  const { isSuperAdmin } = useAdminStore();
  const translations = useTranslations();
  const t = translations?.app?.admin || {};

  if (!user) return null;

  // Get user initials for the avatar
  const getInitials = () => {
    if (!user.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className={cn(
      "flex items-center",
      isCollapsed ? "flex-col space-y-2" : "space-x-3"
    )}>
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0 flex items-center justify-center text-blue-700 font-medium">
        {getInitials()}
      </div>
      
      {/* User info - only shown when not collapsed */}
      {!isCollapsed && (
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-700 truncate">
            {user.email}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {isSuperAdmin ? (
              <>
                <Shield className="h-3 w-3 text-purple-500" />
                <span>{t?.superadmin || 'Superadmin'}</span>
              </>
            ) : (
              <>
                <User className="h-3 w-3 text-blue-500" />
                <span>{t?.admin || 'Admin'}</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminUserProfile;