import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BenefitProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const Benefit: React.FC<BenefitProps> = ({ icon: Icon, title, description, features, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] border border-blue-100/40"
    >
      <div className={cn(
        "w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center mb-5 shadow-md",
        "transform -rotate-6 hover:rotate-0 transition-transform duration-300",
        index % 3 === 0 ? "from-blue-500 to-indigo-600" :
        index % 3 === 1 ? "from-amber-500 to-orange-600" :
        "from-emerald-500 to-teal-600"
      )}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

interface IndustryBenefitsProps {
  benefits: Array<{
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
  }>;
}

const IndustryBenefits: React.FC<IndustryBenefitsProps> = ({ benefits }) => {
  return (
    <div id="benefits" className="py-16 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Prednosti za vašo industrijo
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Naš sistem je posebej prilagojen za potrebe vaše panoge
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Benefit
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              features={benefit.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndustryBenefits);