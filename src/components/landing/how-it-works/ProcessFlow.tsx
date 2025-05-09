import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { FlowStep } from './types';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';

interface ProcessFlowProps {
  steps: FlowStep[];
  title: string;
  description: string;
  accentColor: string;
  gradientClass: string;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({
  steps,
  title,
  description,
  accentColor,
  gradientClass
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  return (
    <div className="mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className={cn(
          "text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r",
          gradientClass,
          "mb-3"
        )}>
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 max-w-5xl">
          {description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {steps.map((step, index) => (
          <ProcessCard
            key={index}
            step={step}
            index={index}
            accentColor={accentColor}
            total={steps.length}
          />
        ))}
      </div>
    </div>
  );
};

interface ProcessCardProps {
  step: FlowStep;
  index: number;
  accentColor: string;
  total: number;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  step,
  index,
  accentColor,
  total
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const Icon = step.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2 + (index * 0.1),
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className="bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border border-gray-100/80 h-full flex flex-col"
    >
      {/* Colored accent bar at top */}
      <div className={cn(
        "h-1.5 w-full",
        `bg-${accentColor}-500`
      )}></div>
      
      <div className="p-6 flex flex-col h-full">
        {/* Step number badge */}
        <div className="mb-4 relative">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold",
            `bg-${accentColor}-500`
          )}>
            {index + 1}
          </div>
          
          {/* Connector line if not last step */}
          {index < total - 1 && (
            <div className={cn(
              "hidden lg:block absolute top-4 left-8 w-[calc(100%+1.5rem)] h-0.5",
              `bg-${accentColor}-200`
            )}></div>
          )}
        </div>
        
        {/* Icon with consistent styling */}
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-md transition-transform duration-300 group",
          `bg-gradient-to-br ${step.color}`,
          "transform -rotate-6 group-hover:rotate-0",
          isMobile && "w-12 h-12"
        )}>
          <Icon className={cn("text-white", isMobile ? "h-6 w-6" : "h-8 w-8")} />
        </div>
        
        {/* Content */}
        <div className="flex-grow flex flex-col">
          <h4 className={cn("font-bold text-gray-900 mb-3", isMobile ? "text-base" : "text-lg")}>{step.title}</h4>
          <p className={cn("text-gray-600 flex-grow", isMobile ? "text-xs" : "text-sm")}>{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessFlow;