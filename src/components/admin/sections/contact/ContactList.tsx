import React from 'react';
import { motion } from 'framer-motion';
import ContactItem from './ContactItem';
import type { ContactRequest } from './types';

interface ContactListProps {
  contacts: ContactRequest[];
  onDelete: (id: string) => Promise<void>;
  onMarkAsHandled: (id: string) => Promise<void>;
}

/**
 * Component for displaying a list of contact requests
 */
const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onDelete,
  onMarkAsHandled
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {contacts.map((contact, index) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onMarkAsHandled={onMarkAsHandled}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default React.memo(ContactList);