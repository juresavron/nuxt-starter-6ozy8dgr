import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import IconWrapper from './shared/IconWrapper';
import { useWindowSize } from 'react-use';
import IconWrapper from './shared/IconWrapper';
import SectionBadge from './shared/SectionBadge';
import { useValueProposition } from '../../hooks/landing/useValueProposition';
import { useWindowSize } from 'react-use';

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  text: string;
  description: string;
  index: number;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  text,
  description,
  index,
  gradient
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const { width } = useWindowSize();
  const isMobile = width < 640;

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
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-gray-100/80 ios-optimized h-full"
    >
      <div className="flex items-start gap-5 mb-4">
        <IconWrapper
          icon={Icon}
          gradient={gradient}
          rotate="left"
          className="mb-3 sm:mb-4"
          size={isMobile ? 'mobile-md' : 'lg'}
        />
        
        <div>
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-1">{value}</div>
          <p className="text-sm text-gray-700 font-medium">{text}</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

const ValueProposition: React.FC = () => {
  const { 
    stats, 
    translations, 
    isClient, 
    isInitialRender
  } = useValueProposition();

  if (!isClient) return null;

  // During initial render on iOS, use a minimal opacity/transform to avoid flickering
  const initialStyle = isInitialRender ? {
    opacity: 0.01,
    transform: 'translateY(0.1px)'
  } : {};

  return (
    <section id="results" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl"></div>
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 ios-optimized"
          style={initialStyle}
        >
          <SectionBadge
            icon="📈"
            text={translations?.landing?.valueProposition?.badge || 'Dokazani rezultati'}
          />
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {translations?.landing?.valueProposition?.title || 'Results We Achieve for Our Clients'}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {translations?.landing?.valueProposition?.subtitle || 'With our system, clients achieve exceptional results in collecting reviews and improving online reputation'}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            // Map the icon string to the actual component
            let IconComponent;
            switch (stat.icon) {
              case 'Star': IconComponent = Star; break;
              case 'TrendingUp': IconComponent = TrendingUp; break;
              case 'Shield': IconComponent = Shield; break;
              case 'Users': IconComponent = Users; break;
              default: IconComponent = Star;
            }
            
            // Format the value with prefix and suffix
            const formattedValue = 
              (stat.prefix || '') + 
              (typeof stat.value === 'number' && stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value) + 
              (stat.suffix || '');
            
            // Define gradient based on index
            const gradients = [
              'from-amber-500 to-orange-600',
              'from-blue-500 to-indigo-600',
              'from-emerald-500 to-teal-600',
              'from-purple-500 to-violet-600'
            ];

            return (
              <StatCard 
                key={index}
                icon={IconComponent}
                value={formattedValue}
                text={stat.text || ''}
                description={stat.description || ''}
                index={index}
                gradient={gradients[index % gradients.length]}
              />
            );
          })}
        </div>
        
        {/* Start Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-14"
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Začni zdaj
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;