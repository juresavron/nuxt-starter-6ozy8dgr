import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface IndustryHeroProps {
  title: string;
  subtitle: string;
  image?: string;
  tags?: string[];
}

const IndustryHero: React.FC<IndustryHeroProps> = ({
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2000&h=1000&q=80",
  tags = []
}) => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-blue-900/85" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
          width={2000}
          height={1000}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => navigate('/contact')}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-xl",
                "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
                "hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl",
                "transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={() => navigate('/pricing')}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-xl",
                "bg-white/20 backdrop-blur-sm text-white border border-white/30",
                "hover:bg-white/30 transition-all duration-300"
              )}
            >
              <span>View Pricing</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndustryHero;