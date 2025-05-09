import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, TrendingUp } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  text: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, text, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{value}</p>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  </motion.div>
);

const ConversionStats: React.FC = () => {
  const stats = [
    { icon: Star, value: '4.9/5', text: 'Povprečna ocena strank', delay: 0 },
    { icon: TrendingUp, value: '+127%', text: 'Več Google ocen', delay: 0.1 },
    { icon: Users, value: '20+', text: 'Zadovoljnih podjetij', delay: 0.2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatItem 
          key={index}
          icon={stat.icon}
          value={stat.value}
          text={stat.text}
          delay={stat.delay}
        />
      ))}
    </div>
  );
};

export default ConversionStats;