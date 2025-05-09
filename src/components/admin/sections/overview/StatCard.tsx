import * as React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Card from '../../../shared/Card';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  decimals?: number;
  suffix?: string;
  description?: string;
  colorScheme?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  decimals = 0,
  suffix = '',
  description,
  colorScheme = 'indigo',
  delay = 0
}) => {
  // Get gradient class based on color scheme
  const getGradient = (scheme: string) => {
    switch (scheme) {
      case 'amber': return 'from-amber-500 to-orange-500';
      case 'emerald': return 'from-emerald-500 to-teal-500';
      case 'rose': return 'from-rose-500 to-pink-500';
      case 'gray': return 'from-gray-600 to-gray-700';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'purple': return 'from-purple-500 to-indigo-600';
      default: return 'from-indigo-500 to-purple-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${getGradient(colorScheme)} text-white shadow-md transform hover:scale-105 transition-all duration-300`}>
            <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">
              <CountUp 
                end={value} 
                duration={1.5} 
                decimals={decimals} 
                suffix={suffix}
              />
            </p>
            {description && (
              <p className="text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;