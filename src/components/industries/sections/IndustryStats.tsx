import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { cn } from '../../../utils/cn';
import type { IndustryStatistic } from '../../../types/industries';

interface IndustryStatsProps {
  stats: IndustryStatistic[];
}

const IndustryStats: React.FC<IndustryStatsProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl -z-5"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl -z-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Proven Results
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the impact our system has had for businesses in your industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            // Get the icon component
            const IconComponent = typeof stat.icon === 'string' ? null : stat.icon;
            
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
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300",
                    "bg-gradient-to-br from-blue-500 to-indigo-600"
                  )}>
                    {IconComponent ? (
                      <IconComponent className="h-8 w-8 text-white" />
                    ) : (
                      <span className="text-2xl text-white">{stat.icon}</span>
                    )}
                  </div>

                  {/* Value with CountUp animation */}
                  <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                    <CountUp 
                      end={parseInt(stat.value.replace(/[^0-9]/g, '')) || 0} 
                      suffix={stat.value.includes('%') ? '%' : ''} 
                      prefix={stat.value.includes('+') ? '+' : ''}
                      duration={2.5}
                      enableScrollSpy={true}
                      scrollSpyDelay={200}
                    />
                  </div>

                  {/* Text */}
                  <p className="text-gray-600">{stat.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryStats;