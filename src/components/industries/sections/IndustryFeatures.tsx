import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Star, Shield, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface IndustryFeaturesProps {
  features?: Feature[];
}

const IndustryFeatures: React.FC<IndustryFeaturesProps> = ({ features }) => {
  // Default features if none provided
  const defaultFeatures: Feature[] = [
    {
      icon: Smartphone,
      title: 'Simple NFC Technology',
      description: 'Our NFC cards and stickers allow customers to submit a review in just 30 seconds with a single tap of their phone.'
    },
    {
      icon: Star,
      title: 'Smart Review Routing',
      description: 'Our system intelligently directs satisfied customers to Google while collecting feedback from dissatisfied customers internally.'
    },
    {
      icon: Shield,
      title: 'Reputation Protection',
      description: 'Prevent negative public reviews by intercepting dissatisfied customers and resolving issues privately before they go public.'
    },
    {
      icon: Users,
      title: 'Follower Acquisition',
      description: 'Turn happy customers into social media followers with our gamification system that rewards engagement.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track your performance with detailed analytics on review trends, customer satisfaction, and social media growth.'
    },
    {
      icon: CheckCircle2,
      title: 'GDPR Compliant',
      description: 'Our system is fully GDPR compliant, ensuring that all customer data is collected and processed legally and securely.'
    }
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/90 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50">
            <span className="text-lg">🔍</span>
            <span>Key Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Powerful Features for Your Business
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive solution provides everything you need to improve your online reputation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            // Define gradient colors based on index
            const gradients = [
              'from-blue-500 to-indigo-600',
              'from-amber-500 to-orange-600',
              'from-emerald-500 to-teal-600',
              'from-purple-500 to-pink-600',
              'from-rose-500 to-red-600',
              'from-cyan-500 to-blue-600'
            ];
            
            const gradient = gradients[index % gradients.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-gray-100/80 h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300",
                    "bg-gradient-to-br", gradient
                  )}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-sm text-gray-600 ml-16">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryFeatures;