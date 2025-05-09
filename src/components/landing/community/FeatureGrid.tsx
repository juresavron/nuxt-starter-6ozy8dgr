import React from 'react';
import FeatureCard from './FeatureCard';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface FeatureGridProps {
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  }>;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div className="relative mb-12 sm:mb-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/20 rounded-xl -z-10 transform -rotate-1"></div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6",
          "p-6 sm:p-8 rounded-xl"
        )}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FeatureGrid;