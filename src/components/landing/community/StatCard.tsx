import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Users } from 'lucide-react';
import CountUp from 'react-countup';
import { cn } from '../../../utils/cn';

interface StatCardProps {
  value: string;
  text: string;
  index: number;
  icon: 'chart' | 'trend' | 'users';
}

const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  text, 
  index, 
  icon 
}) => {
  // Parse the percentage value
  const numericValue = parseInt(value.replace('%', ''), 10);

  // Get icon component based on type
  const IconComponent = icon === 'trend' ? TrendingUp : 
                        icon === 'users' ? Users : 
                        BarChart;

  // Get gradient colors based on index
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600'
  ];
  
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 15, mass: .8, delay: 0.2 + (index * 0.15) }}
      whileHover={{ y: -5, scale: 1.03 }}
      className={cn(
        "relative overflow-hidden rounded-xl border shadow-md p-6 sm:p-7 text-center",
        "transform transition-all duration-300 bg-white",
        "hover:shadow-xl border-blue-100/60"
      )}
    >
      {/* Background gradient accent */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r",
        gradient
      )}></div>
      
      {/* Icon with enhanced styling */}
      <div className={cn(
        "mb-4 sm:mb-5 mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center",
        "transform -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-md",
        "bg-gradient-to-br", gradient
      )}>
        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
      </div>

      {/* Animated counter */}
      <div className="relative mb-3 sm:mb-4">
        <CountUp 
          end={numericValue} 
          suffix="%" 
          duration={3}
          enableScrollSpy={true}
          scrollSpyDelay={200}
          className={cn(
            "text-2xl sm:text-3xl font-bold bg-clip-text text-transparent",
            "bg-gradient-to-r", gradient
          )}
        />
      </div>

      {/* Stat description */}
      <p className="text-xs sm:text-sm text-gray-700 font-medium">{text}</p>
      
      {/* Subtle decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-50/30 to-transparent"></div>
    </motion.div>
  );
};

export default StatCard;