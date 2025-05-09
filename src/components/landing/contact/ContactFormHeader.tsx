import * as React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface ContactFormHeaderProps {
  title?: string;
  subtitle?: string;
}

const ContactFormHeader: React.FC<ContactFormHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <motion.div 
        className="section-badge"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Mail className="h-5 w-5 text-blue-500" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
        <span className="font-medium tracking-wide">Kontaktirajte nas</span>
      </motion.div>
      
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default React.memo(ContactFormHeader);