import * as React from 'react';
import { useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactFormSuccessProps {
  title?: string;
  message?: string;
}

const ContactFormSuccess: React.FC<ContactFormSuccessProps> = ({ title, message }) => {
  return (
    <motion.div 
      className="text-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -10, 10, -5, 5, 0] }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg"
      >
        <CheckCircle2 className="h-10 w-10 text-white" />
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-semibold text-gray-900 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
      
      <motion.a
        href="/"
        className="btn-cta py-3 px-6 text-base group"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Nazaj na domačo stran
        <ArrowRight className="btn-cta-icon" />
      </motion.a>
    </motion.div>
  );
};

export default React.memo(ContactFormSuccess);