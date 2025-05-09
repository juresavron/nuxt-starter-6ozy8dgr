import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import type { VideoTestimonial as VideoTestimonialType } from '../../../types/video';

interface VideoTestimonialProps {
  testimonial: VideoTestimonialType;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({ testimonial }) => {
  const { language } = useLanguageStore();
  
  if (!testimonial) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/40 transform hover:scale-[1.02] max-w-2xl mx-auto"
    >
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 sm:h-5 sm:w-5 ${i <= testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
          />
        ))}
      </div>
      
      {/* Quote */}
      <div className="relative mb-5">
        <Quote className="absolute -top-1 -left-1 h-6 w-6 sm:h-7 sm:w-7 text-blue-100 rotate-180" />
        <p className="text-sm sm:text-base text-gray-700 italic pl-5 sm:pl-6 leading-relaxed text-center">
          "{testimonial.quote}"
        </p>
      </div>
      
      {/* Author */}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {testimonial.image ? (
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm"
            loading="lazy"
          />
        ) : (
          <div className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white",
            "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm"
          )}>
            <span className="font-semibold text-sm sm:text-base">{testimonial.name[0]}</span>
          </div>
        )}
        
        <div>
          <p className="font-medium text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
          <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(VideoTestimonial);