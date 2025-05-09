import * as React from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from 'react-use';

interface HeroHeadingProps {
  title: string;
  highlight: string;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ title, highlight }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  return (
    <motion.h1 
      className={`tracking-tight text-white font-heading mt-4 mb-6 ${isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl xl:text-6xl'} max-w-3xl lg:max-w-4xl leading-tight`}
      data-seo="pridobite-visje-ocene-na-googlu"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="relative inline-block mb-2">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90">
          {title}
        </span>
      </div>
      <br />
      <div className="relative overflow-hidden mt-2">
        <span 
          className="relative inline-block transform hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100 text-transparent bg-clip-text font-bold"
          style={{ 
            textShadow: '0 1px 1px rgba(255,255,255,0.1)',
            fontWeight: 700,
            maxWidth: '800px',
            display: 'inline-block'
          }}
        >
          {highlight}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200/70 rounded-full animate-pulse-subtle"></span>
          <span className="absolute bottom-0 left-0 h-1 bg-blue-300/90 rounded-full animate-shimmer-line"></span>
        </span>
      </div>
    </motion.h1>
  );
};

export default React.memo(HeroHeading);