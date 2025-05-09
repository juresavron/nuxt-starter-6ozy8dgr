import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from '../shared/IconWrapper';

interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  icon,
  title,
  description,
  image,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15 
      }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-blue-100/40 h-full flex flex-col"
    >
      <IconWrapper 
        icon={icon} 
        size="lg"
        gradient={index === 0 
          ? "from-blue-500 to-indigo-600" 
          : index === 1 
            ? "from-purple-500 to-indigo-600" 
            : "from-amber-500 to-orange-600"
        }
        rotate={index === 1 ? 'right' : 'left'}
        className="mb-5"
      />

      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      
      <div className="mt-auto rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover" 
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);