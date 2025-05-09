import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from '../shared/IconWrapper';
import { useWindowSize } from 'react-use';

interface RewardCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  index: number;
}

const RewardCard: React.FC<RewardCardProps> = ({
  title,
  description,
  features,
  icon: Icon,
  gradient,
  index
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: 0.3 + (index * 0.15),
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-blue-100/40 h-full flex flex-col"
    >
      <div className="flex items-center gap-4 mb-6">
        <IconWrapper 
          icon={Icon}
          size={isMobile ? 'mobile-md' : 'lg'}
          gradient={gradient}
          rotate={index % 2 === 0 ? 'left' : 'right'}
          className="flex-shrink-0"
        />
        <h4 className={cn(
          "font-bold text-lg",
          gradient.includes('blue') ? "text-blue-700" : 
          gradient.includes('purple') ? "text-purple-700" : 
          "text-amber-700"
        )}>
          {index === 0 ? "Kupon za vsako oceno" : "Sistem žrebanja"}
        </h4>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-3 relative z-10 mt-auto">
        {features.map((feature, idx) => (
          <li key={idx} className={cn(
            "flex items-start gap-3 p-2 rounded-lg border border-gray-100/60",
            idx % 2 === 0 ? "bg-gray-50/80" : "bg-blue-50/30"
          )}>
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RewardCard;