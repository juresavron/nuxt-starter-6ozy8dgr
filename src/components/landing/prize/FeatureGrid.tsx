import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { cn } from '../../../utils/cn';

interface FeatureGridProps {
  features: Array<{
    icon: React.ElementType;
    title: string;
    description: string;
  }>;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative mb-16",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/20 before:via-transparent before:to-indigo-50/20 before:rounded-xl before:-z-10 before:transform before:-rotate-1"
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-2">
        {features.map((feature, index) => (
          <FeatureCard
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

export default FeatureGrid;