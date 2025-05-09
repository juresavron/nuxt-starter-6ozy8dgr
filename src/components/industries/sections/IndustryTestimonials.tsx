import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { IndustryTestimonial } from '../../../types/industries';

interface IndustryTestimonialsProps {
  testimonials: IndustryTestimonial[];
}

const IndustryTestimonials: React.FC<IndustryTestimonialsProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,255,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50">
            <span className="text-lg">💬</span>
            <span>Success Stories</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            What Our Clients Say
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from businesses in your industry who have transformed their online reputation
          </p>
        </motion.div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-blue-100 overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full opacity-70"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-full opacity-70"></div>
            
            <div className="relative z-10">
              {/* Rating stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-6 w-6 sm:h-7 sm:w-7",
                      i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-gray-700 italic leading-relaxed mb-8 text-center">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              {/* Author info */}
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-bold text-gray-900">{testimonials[activeIndex].author}</h3>
                <p className="text-blue-600 font-medium">{testimonials[activeIndex].role}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>{testimonials[activeIndex].company}</span>
                  <span>•</span>
                  <span>{testimonials[activeIndex].location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 text-gray-700 hover:text-blue-600"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex 
                    ? "bg-blue-600 scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 text-gray-700 hover:text-blue-600"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default IndustryTestimonials;