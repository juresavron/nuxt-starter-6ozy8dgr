import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

/**
 * Feature item component for the Gamification section
 */
const FeatureItem: React.FC<FeatureItemProps> = ({
  icon: Icon,
  title,
  description,
  color
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default React.memo(FeatureItem);