import React from 'react';
import { motion } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';

interface VideoPlayButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

/**
 * Play button component with loading state
 */
const VideoPlayButton: React.FC<VideoPlayButtonProps> = ({
  isLoading,
  onClick
}) => {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        onClick();
      }}
      className="w-16 h-16 sm:w-24 sm:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {isLoading ? (
        <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 animate-spin" />
      ) : (
        <Play className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 ml-1 sm:ml-2" />
      )}
    </motion.button>
  );
};

export default VideoPlayButton;