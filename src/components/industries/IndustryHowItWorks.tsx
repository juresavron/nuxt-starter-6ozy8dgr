import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Star, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from '../../hooks/useTranslations';
import { useLanguageStore } from '../../hooks/useLanguageStore';

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2 + (index * 0.1),
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border border-gray-100/80"
    >
      <div className={cn(
        "h-1.5 sm:h-2 w-full bg-gradient-to-r",
        color
      )} />
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-md",
            "transform transition-transform duration-300",
            index % 2 === 0 ? "-rotate-6 hover:rotate-0" : "rotate-6 hover:rotate-0",
            "bg-gradient-to-br", color
          )}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const IndustryHowItWorks: React.FC = () => {
  const navigate = useNavigate();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.howItWorks;
  
  // High rating flow steps
  const highRatingSteps = [
    {
      icon: Smartphone,
      title: language === 'en' ? 'NFC Scanning' : 'Skeniranje NFC',
      description: language === 'en' 
        ? 'Customer scans NFC card or QR code at your location.' 
        : 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Star,
      title: language === 'en' ? 'Rating' : 'Ocenjevanje',
      description: language === 'en'
        ? 'Customer selects the number of stars (4-5). The system recognizes customer satisfaction.'
        : 'Stranka izbere število zvezdic (4-5). Sistem prepozna zadovoljstvo stranke.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Send,
      title: language === 'en' ? 'Redirection' : 'Preusmeritev',
      description: language === 'en'
        ? 'Satisfied customer is redirected to Google where they can submit their review.'
        : 'Zadovoljna stranka je preusmerjena na Google, kjer lahko odda svojo oceno.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: CheckCircle,
      title: language === 'en' ? 'Gamification' : 'Gejmifikacija',
      description: language === 'en'
        ? 'Customer gets additional tasks to follow on social media and receive rewards.'
        : 'Stranka dobi dodatne naloge za sledenje na družbenih omrežjih in prejme nagrade.',
      color: 'from-rose-500 to-pink-600'
    }
  ];
  
  // Low rating flow steps
  const lowRatingSteps = [
    {
      icon: Smartphone,
      title: language === 'en' ? 'NFC Scanning' : 'Skeniranje NFC',
      description: language === 'en'
        ? 'Customer scans NFC card or QR code at your location.'
        : 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Star,
      title: language === 'en' ? 'Rating' : 'Ocenjevanje',
      description: language === 'en'
        ? 'Customer selects the number of stars (1-3). The system recognizes customer dissatisfaction.'
        : 'Stranka izbere število zvezdic (1-3). Sistem prepozna nezadovoljstvo stranke.',
      color: 'from-red-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: language === 'en' ? 'Information Collection' : 'Zajem informacij',
      description: language === 'en'
        ? 'Dissatisfied customer provides more detailed feedback for improvements.'
        : 'Nezadovoljna stranka poda podrobnejše povratne informacije za izboljšave.',
      color: 'from-amber-500 to-yellow-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg transform hover:scale-105 transition-all duration-300 border border-blue-50/80"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm">🔄</span>
            <span>{t?.badge || "Process"}</span>
          </motion.div>
          
          <motion.h2 
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t?.title || "How Does It Work?"}
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t?.subtitle || "Our system intelligently directs customers based on their satisfaction"}
          </motion.p>
        </div>
        
        {/* Processes Container */}
        <div className="space-y-12 sm:space-y-20">
          {/* High Rating Flow */}
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
                {t?.highRating?.title || 'Process for Satisfied Customers (4-5 stars)'}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t?.highRating?.description || 'When a customer is satisfied, we direct them to Google where they can share their positive experience'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highRatingSteps.map((step, index) => (
                <StepCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  color={step.color}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white px-4 text-xs sm:text-sm text-gray-500">
                {language === 'en' ? 'or' : language === 'it' ? 'o' : 'ali'}
              </div>
            </div>
          </div>
          
          {/* Low Rating Flow */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-3">
                {t?.lowRating?.title || 'Process for Dissatisfied Customers (1-3 stars)'}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t?.lowRating?.description || 'When a customer is dissatisfied, we collect their feedback internally so you can resolve the issue'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lowRatingSteps.map((step, index) => (
                <StepCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  color={step.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <a
            href="#pricing"
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
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            {language === 'en' 
              ? "Start Getting Higher Google Ratings Today" 
              : language === 'it'
                ? "Inizia a ottenere valutazioni più alte su Google oggi" 
                : "Začnite pridobivati višje ocene na Googlu danes"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(IndustryHowItWorks);