import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';
import { cn } from '../../../utils/cn';

interface ComplianceNoteProps {
  translations: any;
}

const ComplianceNote: React.FC<ComplianceNoteProps> = ({ translations }) => {
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Get translated text with fallbacks
  const complianceTitle = translations?.landing?.motivation?.complianceTitle || 
    (language === 'en' ? 'Fully Compliant with Google\'s Terms of Service' : 
     language === 'it' ? 'Pienamente Conforme ai Termini di Servizio di Google' : 
     'Popolnoma skladno z Googlovimi pogoji uporabe');
     
  const complianceText = translations?.landing?.motivation?.complianceText || 
    (language === 'en' ? 'Our system is designed to be 100% compliant with Google\'s terms of service. We never directly incentivize Google reviews, but instead reward customers for providing internal feedback. The follow-up messages encouraging Google reviews are sent separately and do not mention any rewards, ensuring full compliance with Google\'s guidelines.' : 
     language === 'it' ? 'Il nostro sistema è progettato per essere conforme al 100% con i termini di servizio di Google. Non incentiviamo mai direttamente le recensioni su Google, ma premiamo i clienti per aver fornito feedback interno. I messaggi di follow-up che incoraggiano le recensioni su Google vengono inviati separatamente e non menzionano alcun premio, garantendo la piena conformità con le linee guida di Google.' : 
     'Naš sistem je zasnovan tako, da je 100% skladen z Googlovimi pogoji uporabe. Nikoli neposredno ne spodbujamo Google ocen z nagradami, temveč nagrajujemo stranke za podajanje internih povratnih informacij. Sledilna sporočila, ki spodbujajo Google ocene, so poslana ločeno in ne omenjajo nobenih nagrad, kar zagotavlja popolno skladnost z Googlovimi smernicami.');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gradient-to-br from-blue-50 to-blue-50/50 p-6 sm:p-8 rounded-xl border border-blue-100 shadow-md mb-12 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100/20 rounded-full blur-2xl"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-100/20 rounded-full blur-2xl"></div>
      
      <div className="flex items-start gap-5 relative">
        <div className={cn(
          "flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mt-1",
          isMobile ? "w-10 h-10" : "w-12 h-12"
        )}>
          <Shield className={cn("text-white", isMobile ? "h-5 w-5" : "h-6 w-6")} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-700 mb-3">
            {complianceTitle}
          </h3>
          
          <p className="text-sm text-blue-600 leading-relaxed">
            {complianceText}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ComplianceNote;