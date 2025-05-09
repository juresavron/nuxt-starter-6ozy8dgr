import React from 'react';
import { Play, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoPlayButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const VideoPlayButton: React.FC<VideoPlayButtonProps> = ({
  onClick,
  isLoading
}) => {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300"
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
        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 animate-spin" />
      ) : (
        <Play className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 ml-1 sm:ml-2" />
      )}
    </motion.button>
  );
};

export default VideoPlayButton;