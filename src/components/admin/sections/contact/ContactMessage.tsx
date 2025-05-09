import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ContactMessageProps {
  message: string;
}

/**
 * Component to display contact message
 */
const ContactMessage: React.FC<ContactMessageProps> = ({ message }) => {
  return (
    <div className="border-t border-gray-100 pt-4 mt-4">
      <div className="flex items-start gap-2">
        <MessageSquare className="h-5 w-5 text-rose-500 mt-0.5" style={{ fill: 'rgba(254, 226, 226, 0.5)' }} />
        <div>
          <p className="text-sm font-medium text-gray-500">Message</p>
          <p className="text-gray-900 whitespace-pre-line">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactMessage);