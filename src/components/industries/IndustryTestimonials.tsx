import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  index: number;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  company,
  location,
  rating,
  index
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-blue-100/40 h-full"
  >
    <div className="flex items-center gap-2 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
        />
      ))}
    </div>
    
    <div className="relative">
      <Quote className="absolute -top-2 -left-3 h-8 w-8 text-blue-100/50 rotate-180" />
      <p className="text-xs sm:text-sm text-gray-700 italic mb-5 relative z-10">
        "{quote}"
      </p>
    </div>
    
    <div className="flex items-center gap-3 mt-auto">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md",
        "bg-gradient-to-br from-blue-600 to-indigo-600"
      )}>
        <span className="font-semibold text-xs">{author[0]}</span>
      </div>
      <div>
        <p className="font-medium text-gray-900 text-sm">{author}</p>
        <p className="text-xs text-gray-500">{role}, {company}</p>
        <p className="text-xs text-gray-400">{location}</p>
      </div>
    </div>
  </motion.div>
);

interface IndustryTestimonialsProps {
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    location: string;
    rating: number;
  }>;
}

const IndustryTestimonials: React.FC<IndustryTestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Kaj pravijo naše stranke
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Preverite izkušnje strank iz vaše panoge
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              location={testimonial.location}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndustryTestimonials);