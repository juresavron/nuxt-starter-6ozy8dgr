import * as React from 'react';
import { Mail } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';

interface ContactStatsProps {
  withEmail: number;
  withPhone: number;
  contactRate: number;
}

const ContactStats: React.FC<ContactStatsProps> = ({
  withEmail,
  withPhone,
  contactRate
}) => {
  const translations = useTranslations();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.withEmail || 'Z e-pošto'}</span>
        <span className="font-semibold text-blue-600">{withEmail}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.withPhone || 'S telefonom'}</span>
        <span className="font-semibold text-blue-600">{withPhone}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.contactRate || 'Stopnja kontaktov'}</span>
        <span className="font-semibold text-blue-600">{contactRate.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default ContactStats;