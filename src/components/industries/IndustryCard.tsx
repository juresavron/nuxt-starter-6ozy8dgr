import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  slug: string;
  index: number;
}

const IndustryCard: React.FC<IndustryCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  slug,
  index
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.1
          }
        }
      }}
      className={cn(
        "bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300",
        "transform hover:scale-[1.02] border border-gray-100/80 h-full"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md",
        "transform -rotate-6 hover:rotate-0 transition-transform duration-300",
        "bg-gradient-to-br", color
      )}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      
      <Link
        to={`/industrije/${slug}`}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium",
          "hover:underline transition-colors",
          color.includes("blue") ? "text-blue-600 hover:text-blue-700" :
          color.includes("amber") ? "text-amber-600 hover:text-amber-700" :
          color.includes("emerald") ? "text-emerald-600 hover:text-emerald-700" :
          color.includes("purple") ? "text-purple-600 hover:text-purple-700" :
          "text-indigo-600 hover:text-indigo-700"
        )}
      >
        <span>Več informacij</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
};

export default React.memo(IndustryCard);