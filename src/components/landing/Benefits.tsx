import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useBenefits } from '../../hooks/landing/useBenefits';
import type { LucideIcon } from 'lucide-react';
import IconWrapper from './shared/IconWrapper';
import SectionBadge from './shared/SectionBadge';
import { useWindowSize } from 'react-use';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  colorGradient: string;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
  features,
  colorGradient,
  index
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-blue-100/40 h-full ios-optimized"
      style={{ 
        willChange: 'transform, opacity',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden'
      }}
    >
      <IconWrapper 
        icon={icon} 
        gradient={colorGradient} 
        rotate={index % 2 === 0 ? 'left' : 'right'}
        size={isMobile ? 'mobile-md' : 'lg'}
        className="mb-5"
      />
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" 
              style={{ fill: 'rgba(220, 252, 231, 0.5)' }}
            />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Benefits: React.FC = () => {
  const { isClient, translations, benefitsData, containerVariants, itemVariants, isInitialRender } = useBenefits();

  if (!isClient) return null;

  // During initial render on iOS, use a minimal opacity/transform to avoid flickering
  // but still maintain the correct layout
  const initialStyle = isInitialRender ? {
    opacity: 0.01,
    transform: 'translateY(0.1px)'
  } : {};
  
  return (
    <section id="benefits" className="py-20 sm:py-28 overflow-hidden relative bg-gradient-to-br from-blue-50/90 via-white to-blue-50/90">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20 ios-optimized"
          style={initialStyle}
        >
          <SectionBadge
            icon="🎯"
            text={translations?.landing?.benefits?.badge || 'Prednosti sistema'}
          />
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {translations?.landing?.benefits?.title || 'Kako vam pomagamo pridobiti višje ocene na Googlu'}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {translations?.landing?.benefits?.subtitle || 'Naš sistem uporablja umetno inteligenco in pametno usmerjanje strank za izboljšanje vašega spletnega ugleda'}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              features={benefit.features}
              colorGradient={index === 0 ? "from-amber-500 to-orange-600" : 
                          index === 1 ? "from-blue-500 to-blue-600" : 
                          "from-emerald-500 to-teal-600"}
              index={index}
            />
          ))}
        </div>
        
        {/* Start Now Button */}
        <div className="flex justify-center mt-14">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Začni zdaj
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;