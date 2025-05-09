import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import StepCard from './StepCard';
import { Smartphone, Star, MessageSquare, Award, CheckCircle } from 'lucide-react';

const MidRatingFlow: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.howItWorks;

  // Define steps for 4-star flow
  const midRatingSteps = [
    {
      icon: Smartphone,
      title: language === 'en' ? 'NFC Scanning' : language === 'it' ? 'Scansione NFC' : 'Skeniranje NFC',
      description: language === 'en' 
        ? 'Customer scans NFC card or QR code at your location.' 
        : language === 'it'
          ? 'Il cliente scansiona la carta NFC o il codice QR presso la tua sede.'
          : 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Star,
      title: language === 'en' ? 'Mid-Rating (4 Stars)' : language === 'it' ? 'Valutazione Media (4 Stelle)' : 'Srednja ocena (4 zvezdice)',
      description: language === 'en'
        ? 'Customer gives a 4-star rating. The system recognizes it as positive but with room for improvement.'
        : language === 'it'
          ? 'Il cliente dà una valutazione di 4 stelle. Il sistema la riconosce come positiva ma con margini di miglioramento.'
          : 'Stranka da 4-zvezdično oceno. Sistem jo prepozna kot pozitivno, a z možnostmi za izboljšave.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: language === 'en' ? 'Feedback Collection' : language === 'it' ? 'Raccolta Feedback' : 'Zbiranje povratnih informacij',
      description: language === 'en'
        ? 'Customer provides specific feedback about areas for improvement while still being mostly satisfied.'
        : language === 'it'
          ? 'Il cliente fornisce feedback specifici sulle aree di miglioramento pur essendo complessivamente soddisfatto.'
          : 'Stranka poda specifične povratne informacije o področjih za izboljšave, čeprav je večinoma zadovoljna.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Award,
      title: language === 'en' ? 'Gamification' : language === 'it' ? 'Gamification' : 'Gejmifikacija',
      description: language === 'en'
        ? 'Customer is directed to gamification to follow on social media and receives rewards.'
        : language === 'it'
          ? 'Il cliente viene indirizzato alla gamification per seguire sui social media e riceve premi.'
          : 'Stranka je usmerjena na gejmifikacijo za sledenje na družbenih omrežjih in prejme nagrade.',
      color: 'from-rose-500 to-pink-600'
    },
    {
      icon: CheckCircle,
      title: language === 'en' ? 'AI Follow-up' : language === 'it' ? 'Follow-up con AI' : 'AI sledenje',
      description: language === 'en'
        ? 'AI generates personalized messages to acknowledge feedback and encourage Google review completion.'
        : language === 'it'
          ? 'L\'AI genera messaggi personalizzati per riconoscere il feedback e incoraggiare il completamento della recensione su Google.'
          : 'AI ustvari personalizirana sporočila za potrditev povratnih informacij in spodbudi k dokončanju Google ocene.',
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <div className="mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 mb-3">
          {language === 'en' 
            ? 'Process for Mid-Range Customers (4 stars)' 
            : language === 'it' 
              ? 'Processo per Clienti con Valutazione Media (4 stelle)'
              : 'Proces za stranke s srednjo oceno (4 zvezdice)'}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          {language === 'en'
            ? 'When a customer is mostly satisfied but has minor concerns, we collect their feedback and direct them to gamification'
            : language === 'it'
              ? 'Quando un cliente è principalmente soddisfatto ma ha piccole preoccupazioni, raccogliamo il suo feedback e lo indirizziamo alla gamification'
              : 'Ko je stranka večinoma zadovoljna, a ima manjše pomisleke, zberemo njihove povratne informacije in jo usmerimo na gejmifikacijo'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {midRatingSteps.map((step, index) => (
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
  );
};

export default MidRatingFlow;