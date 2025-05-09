import React from 'react';
import { motion } from 'framer-motion';
import { useIndustries } from '../../hooks/landing/useIndustries';
import IndustryCard from "../industries/IndustryCard";
import { Users } from 'lucide-react';

const Industries: React.FC<{ id?: string }> = ({ id = 'industries' }) => {
  const { 
    isClient, 
    translations, 
    industries,
    containerVariants,
    itemVariants
  } = useIndustries();
  
  if (!isClient) return null;

  return (
    <section id={id || 'industries'} className="py-16 sm:py-20 section-bg">
      <div className="section-bg-gradient"></div>
      <div className="section-bg-radial-tl"></div>
      <div className="section-bg-radial-br"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg transform hover:scale-105 transition-all duration-300 border border-blue-50/80 ios-optimized"
          >
            <span className="text-base sm:text-xl ios-optimized">🏭</span>
            <span className="text-blue-700">{translations?.landing?.industries?.badge || "Industrije"}</span>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {translations?.landing?.industries?.title || "Rešitve prilagojene različnim panogam"}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {translations?.landing?.industries?.subtitle || "Naš sistem je prilagojen specifičnim potrebam različnih panog"}
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              icon={industry.icon}
              title={industry.title}
              description={industry.description}
              color={industry.color}
              slug={industry.slug}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-600 text-xs sm:text-sm shadow-lg border border-gray-100"
            variants={itemVariants}
          >
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mr-2" />
            {translations?.landing?.industries?.companiesCount || "20+ podjetij že uporablja naš sistem"}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;