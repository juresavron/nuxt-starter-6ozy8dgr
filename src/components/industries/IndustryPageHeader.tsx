import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface IndustryPageHeaderProps {
  title: string;
  subtitle: string;
  tags: string[];
}

const IndustryPageHeader: React.FC<IndustryPageHeaderProps> = ({
  title,
  subtitle,
  tags
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&h=600&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors mb-8 backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
            Nazaj na domačo stran
          </Link>
          
          <motion.h1 
            className="text-3xl sm:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-xl text-white/90 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Začni zdaj
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href="#benefits"
              onClick={(e) => {
                e.preventDefault();
                const benefitsSection = document.getElementById('benefits');
                if (benefitsSection) {
                  benefitsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg text-indigo-100 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
            >
              Več informacij
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndustryPageHeader);