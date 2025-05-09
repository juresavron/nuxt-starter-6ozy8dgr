import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

/**
 * Benefit card component for the Gamification section
 */
const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  title,
  description,
  color
}) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 transform hover:scale-[1.02] h-full"
      whileHover={{ y: -5 }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-6 shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default React.memo(BenefitCard);