import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, CheckCircle } from 'lucide-react';
import Card from '../../../shared/Card';
import { formatDate } from '../../../../utils/date';
import ContactInfo from './ContactInfo';
import ContactMessage from './ContactMessage';
import ContactActions from './ContactActions';
import type { ContactRequest } from './types';
import { useTranslations } from '../../../../hooks/useTranslations';

interface ContactItemProps {
  contact: ContactRequest;
  onDelete: (id: string) => Promise<void>;
  onMarkAsHandled: (id: string) => Promise<void>;
  index: number;
}

/**
 * Component for displaying a single contact request
 */
const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onDelete,
  onMarkAsHandled,
  index
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.contacts || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-600" style={{ fill: 'rgba(237, 233, 254, 0.5)' }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" style={{ fill: 'rgba(229, 231, 235, 0.5)' }} />
                  {formatDate(contact.created_at)}
                  {contact.status === 'handled' && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
                      Handled
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <ContactActions 
              contact={contact}
              onDelete={onDelete}
              onMarkAsHandled={onMarkAsHandled}
            />
          </div>
          
          <ContactInfo contact={contact} />
          <ContactMessage message={contact.message} />
        </div>
      </Card>
    </motion.div>
  );
};

export default React.memo(ContactItem);