import * as React from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from 'react-use';

interface HeroSubtitleProps {
  subtitle: string;
}

const HeroSubtitle: React.FC<HeroSubtitleProps> = ({ subtitle }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  return (
    <motion.p 
      className={`text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 ${isMobile ? 'text-sm sm:text-base' : 'text-lg xl:text-xl'} leading-relaxed`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {subtitle}
    </motion.p>
  );
};

export default React.memo(HeroSubtitle);