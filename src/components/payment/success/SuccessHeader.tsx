import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SuccessHeaderProps {
  title: string;
  message: string;
  sessionId: string | null;
  referenceLabel: string;
}

/**
 * Header component for the success page
 * Shows success message and order reference
 */
const SuccessHeader: React.FC<SuccessHeaderProps> = ({
  title,
  message,
  sessionId,
  referenceLabel
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (sessionId) {
      navigator.clipboard.writeText(sessionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}
        className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
      >
        <CheckCircle className="h-12 w-12 text-white" style={{ fill: 'rgba(255, 255, 255, 0.3)' }} />
      </motion.div>
      
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">{title}</h1>
      <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">{message}</p>
      
      {sessionId && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full text-blue-700",
            "text-sm font-medium mb-8 shadow-sm border border-blue-100 cursor-pointer",
            "hover:shadow-md transition-all duration-300 group"
          )}
        >
          <span>{referenceLabel}:</span>
          <span className="font-mono">{sessionId.substring(0, 12)}...</span>
          <button 
            className="ml-1 p-1 rounded-full group-hover:bg-blue-100 transition-colors"
            aria-label="Copy reference ID"
          >
            {copied ? 
              <Check className="h-4 w-4 text-green-600" /> : 
              <Copy className="h-4 w-4 text-blue-600" />
            }
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SuccessHeader;