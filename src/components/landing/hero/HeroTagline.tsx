import * as React from 'react';
import { useEffect } from 'react';
import { Sparkles } from 'lucide-react'; 
import { motion } from 'framer-motion';

interface HeroTaglineProps {
  tagline: string;
}

const HeroTagline: React.FC<HeroTaglineProps> = ({ tagline }) => {
  return (
    <motion.span 
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
      }} 
      className="inline-flex items-center gap-2 px-3 sm:px-6 py-1.5 sm:py-3 bg-blue-600/40 backdrop-blur-sm text-white rounded-full shadow-xl mb-10 sm:mb-14 mt-8 sm:mt-12 transform hover:scale-105 transition-all duration-300 group cursor-default text-xs sm:text-sm border border-blue-500/40" 
    >
      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" style={{ fill: 'rgba(253, 224, 71, 0.5)' }} />
      <span className="font-medium tracking-wide">{tagline}</span>
    </motion.span>
  );
};

export default React.memo(HeroTagline);