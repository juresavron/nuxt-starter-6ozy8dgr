import React from 'react';
import { motion } from 'framer-motion';
import { Share } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslations } from '../../hooks/useTranslations';

interface ThankYouShareButtonProps {
  colorScheme?: string;
  translations?: any;
}

const ThankYouShareButton: React.FC<ThankYouShareButtonProps> = ({
  colorScheme = 'indigo',
  translations
}) => {
  const t = translations?.thankYou;
  const shareButtonText = t?.shareButton || 'Deli s prijatelji';

  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title: 'Delite svoje mnenje',
            text: 'Pravkar sem oddal/a oceno. Preverite tudi vi to storitev!',
            url: window.location.origin
          }).catch(err => {});
        } else {
          // Fallback for browsers that don't support Web Share API
          const url = window.location.origin;
          const textarea = document.createElement('textarea');
          textarea.value = url;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          alert('URL kopiran v odložišče!');
        }
      }}
      className={cn(
        "px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-white w-full max-w-md mx-auto",
        colorScheme === 'amber' ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800" :
        colorScheme === 'emerald' ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800" :
        colorScheme === 'rose' ? "bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800" :
        colorScheme === 'bw' ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900" :
        "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
      )}
      aria-label={shareButtonText}
    >
      <Share className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300" />
      <span>{shareButtonText}</span>
    </motion.button>
  );
};

export default ThankYouShareButton;