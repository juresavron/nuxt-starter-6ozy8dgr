import React from 'react';
import { Mail, Building2, Phone } from 'lucide-react';
import type { ContactRequest } from './types';

interface ContactInfoProps {
  contact: ContactRequest;
}

/**
 * Component to display contact information
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="flex items-start gap-2">
        <Mail className="h-5 w-5 text-purple-500 mt-0.5" style={{ fill: 'rgba(237, 233, 254, 0.5)' }} />
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-gray-900">{contact.email}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <Building2 className="h-5 w-5 text-blue-500 mt-0.5" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
        <div>
          <p className="text-sm font-medium text-gray-500">Company</p>
          <p className="text-gray-900">{contact.company}</p>
        </div>
      </div>
      
      {contact.phone && (
        <div className="flex items-start gap-2">
          <Phone className="h-5 w-5 text-amber-500 mt-0.5" style={{ fill: 'rgba(254, 243, 199, 0.5)' }} />
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-gray-900">{contact.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ContactInfo);