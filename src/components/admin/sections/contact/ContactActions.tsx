import React from 'react';
import { ExternalLink, CheckCircle, Trash2 } from 'lucide-react';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { ContactRequest } from './types';

interface ContactActionsProps {
  contact: ContactRequest;
  onDelete: (id: string) => Promise<void>;
  onMarkAsHandled: (id: string) => Promise<void>;
}

/**
 * Component for contact request actions
 */
const ContactActions: React.FC<ContactActionsProps> = ({
  contact,
  onDelete,
  onMarkAsHandled
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.contacts || {};

  return (
    <div className="flex gap-2">
      <Button
        as="a"
        href={`mailto:${contact.email}`}
        variant="secondary"
        size="sm"
        leftIcon={<ExternalLink className="h-4 w-4" style={{ fill: 'rgba(229, 231, 235, 0.3)' }} />}
      >
        {t?.reply || 'Reply'}
      </Button>
      
      {contact.status !== 'handled' && (
        <Button
          onClick={() => onMarkAsHandled(contact.id)}
          variant="secondary"
          size="sm"
          leftIcon={<CheckCircle className="h-4 w-4 text-emerald-600" style={{ fill: 'rgba(209, 250, 229, 0.5)' }} />}
        >
          {t?.markAsHandled || 'Mark as Handled'}
        </Button>
      )}
      
      <Button
        onClick={() => onDelete(contact.id)}
        variant="danger"
        size="sm"
        leftIcon={<Trash2 className="h-4 w-4" style={{ fill: 'rgba(254, 226, 226, 0.5)' }} />}
      >
        {t?.delete || 'Delete'}
      </Button>
    </div>
  );
};

export default React.memo(ContactActions);