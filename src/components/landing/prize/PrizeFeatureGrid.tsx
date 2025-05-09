import React from 'react';
import { motion } from 'framer-motion';
import PrizeFeature from './PrizeFeature';
import { cn } from '../../../utils/cn';

interface PrizeFeatureGridProps {
  features: Array<{
    icon: React.ElementType;
    title: string;
    description: string;
  }>;
}

const PrizeFeatureGrid: React.FC<PrizeFeatureGridProps> = ({ features }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-16"
    >
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8",
        "relative p-2",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/20 before:via-transparent before:to-indigo-50/20 before:rounded-xl before:-z-10 before:transform before:-rotate-1"
      )}>
        {features.map((feature, index) => (
          <PrizeFeature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PrizeFeatureGrid;