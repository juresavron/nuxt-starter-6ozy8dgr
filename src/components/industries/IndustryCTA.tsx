import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface IndustryCTAProps {
  features: string[];
  image: string;
}

const IndustryCTA: React.FC<IndustryCTAProps> = ({ features, image }) => {
  const navigate = useNavigate();

  return (
    <div id="contact" className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6">
                Začnite zbirati ocene in sledilce že danes
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nastavitev traja manj kot 5 minut. Takoj po registraciji prejmete dostop do sistema in vašo prvo NFC kartico.
              </p>
              
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"> 
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/', { replace: false });
                    setTimeout(() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
                    "text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
                    "shadow-md hover:shadow-lg transition-all duration-300 group transform hover:scale-[1.02]"
                  )}
                >
                  Začni zdaj
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/', { replace: false });
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  Kontaktirajte nas
                </a>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={image}
                alt="Industry showcase"
                className="rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute -bottom-3 -right-3 bg-white rounded-lg p-3 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span className="text-sm font-medium">4.9/5 zadovoljstvo strank</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(IndustryCTA);