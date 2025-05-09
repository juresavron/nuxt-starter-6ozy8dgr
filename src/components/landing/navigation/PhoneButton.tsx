import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface PhoneButtonProps {
  isScrolled?: boolean;
  className?: string;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({ isScrolled = false, className = '' }) => {
  return (
    <motion.a
      href="tel:+38640202488"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
        isScrolled
          ? "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100 shadow-sm"
          : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20",
        className
      )}
      aria-label="Call us"
    >
      <Phone className="h-4 w-4" />
      <span className="whitespace-nowrap">+386 40 202 488</span>
    </motion.a>
  );
};

export default PhoneButton;