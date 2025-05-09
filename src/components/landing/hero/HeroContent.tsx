import * as React from 'react';
import { motion } from 'framer-motion';
import HeroHeading from './HeroHeading';
import HeroSubtitle from './HeroSubtitle';
import HeroButtons from './HeroButtons';
import HeroFeatures from './HeroFeatures';

interface HeroContentProps {
  tagline: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaText: string;
  secondaryText: string;
  features: {
    text: string;
    label: string;
  }[];
}

const HeroContent: React.FC<HeroContentProps> = ({
  tagline,
  title,
  highlight,
  subtitle,
  ctaText,
  secondaryText,
  features
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            when: "beforeChildren"
          }
        }
      }}
      initial="hidden"
      animate="visible"
      className="text-center lg:text-left px-2 sm:px-0 flex flex-col items-center lg:items-start ios-optimized max-w-full pt-6 sm:pt-8 w-full"
    >
      <HeroHeading title={title} highlight={highlight} />
      <HeroSubtitle subtitle={subtitle} />
      <HeroButtons />
      <HeroFeatures features={features} />
    </motion.div>
  );
};

export default React.memo(HeroContent);