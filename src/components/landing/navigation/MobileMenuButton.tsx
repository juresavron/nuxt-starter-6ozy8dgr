import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { motion } from 'framer-motion';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isScrolled: boolean;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
  isScrolled
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        e.preventDefault(); // Prevent default behavior
        onClick();
      }}
      className={cn(
        "p-3 rounded-full transition-all duration-300 shadow-md z-[60] h-11 w-11 flex items-center justify-center",
        isScrolled
          ? "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white/95 border border-white/20"
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      role="button"
      tabIndex={0}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {isOpen ? (
        <X className="w-5 h-5" />
      ) : (
        <Menu className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default MobileMenuButton;