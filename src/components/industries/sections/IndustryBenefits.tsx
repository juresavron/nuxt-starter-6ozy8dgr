import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { IndustryBenefit } from '../../../types/industries';

interface IndustryBenefitsProps {
  benefits: IndustryBenefit[];
}

const IndustryBenefits: React.FC<IndustryBenefitsProps> = ({ benefits }) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(60,100,255,0.05)_0%,transparent_60%)]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(60,100,255,0.05)_0%,transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50">
            <span className="text-lg">✨</span>
            <span>Key Benefits</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            How We Help Your {benefits[0]?.title.split(' ')[0] || ''} Business
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our system is specifically designed to address the unique challenges and opportunities in your industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            // Get the icon component
            const IconComponent = typeof benefit.icon === 'string' ? null : benefit.icon;
            
            // Define gradient colors based on index
            const gradients = [
              'from-blue-500 to-indigo-600',
              'from-amber-500 to-orange-600',
              'from-emerald-500 to-teal-600'
            ];
            
            const gradient = gradients[index % gradients.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-blue-100/40 h-full"
              >
                {/* Icon */}
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300",
                  "bg-gradient-to-br", gradient
                )}>
                  {IconComponent ? (
                    <IconComponent className="h-8 w-8 text-white" />
                  ) : (
                    <span className="text-2xl text-white">{benefit.icon}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-6">{benefit.description}</p>
                
                {/* Features */}
                <ul className="space-y-3">
                  {benefit.features.map((feature, idx) => (
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
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryBenefits;