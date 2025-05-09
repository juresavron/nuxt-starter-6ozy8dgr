import React, { useState } from 'react';
import { Building2, BarChart3, Menu, X, BookOpen, Users, Mail, Shield, CreditCard, Ticket } from 'lucide-react';
import { translations } from '@/translations/sl';
import { useAdminStore } from "../../hooks/admin/store";
import { cn } from '@/utils/cn';
import { useTranslations } from '@/hooks/useTranslations';
import AdminNavigation from './navigation/AdminNavigation';

interface AdminHeaderProps {
  activeTab: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions' | 'coupons';
  onTabChange: (tab: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions' | 'coupons') => void;
  onSignOut: () => void;
}

interface TabItem {
  id: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions' | 'coupons';
  icon: React.ElementType;
  label: string;
}

/**
 * Header component for the admin panel
 * Uses the modular navigation components
 */
const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onTabChange,
  onSignOut,
}) => {
  const { isSuperAdmin } = useAdminStore();

  return (
    <AdminNavigation
      activeTab={activeTab}
      onTabChange={onTabChange}
      onSignOut={onSignOut}
      isSuperAdmin={isSuperAdmin}
    />
  );
};

export default React.memo(AdminHeader);