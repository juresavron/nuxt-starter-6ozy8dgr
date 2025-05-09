import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { CheckCircle2 } from 'lucide-react';
import { useWindowSize } from 'react-use';

interface RewardOptionProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
  index: number;
}

const RewardOption: React.FC<RewardOptionProps> = ({
  title,
  description,
  features,
  icon,
  gradient,
  index
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

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
        y: -10, 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      className={cn(
        "p-5 sm:p-6 rounded-xl border-2 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all duration-300 relative z-10 backdrop-blur-sm overflow-hidden w-full bg-white",
        "border-gray-100",
        gradient.includes('blue') ? "text-blue-700" :
        gradient.includes('purple') ? "text-purple-700" :
        "text-amber-700"
      )}
    >
      <div className={cn(
        "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 shadow-md transform hover:scale-110 transition-all duration-300 animate-pulse-subtle",
        gradient.includes('blue') ? "bg-gradient-to-br from-blue-400 to-blue-500" :
        gradient.includes('purple') ? "bg-gradient-to-br from-purple-400 to-purple-500" :
        "bg-gradient-to-br from-amber-400 to-amber-500"
      )}>
        <span className={cn("text-3xl text-white", isMobile && "text-xl")}>{icon}</span>
      </div>

      <div>
        <h4 className={cn(
          "font-bold text-lg",
          gradient.includes('blue') ? "text-blue-700" : 
          gradient.includes('purple') ? "text-purple-700" : 
          "text-amber-700"
        )}>
          {title}
        </h4>
      </div>
      
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      <ul className="space-y-3 relative z-10">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 bg-gray-50/80 p-2 rounded-lg border border-gray-100/60">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Decorative background elements */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-gray-50/80 to-transparent rounded-full -z-0"></div>
      <div className="absolute top-10 left-0 w-24 h-24 bg-gradient-to-br from-gray-50/80 to-transparent rounded-full -z-0"></div>
    </motion.div>
  );
};

export default RewardOption;