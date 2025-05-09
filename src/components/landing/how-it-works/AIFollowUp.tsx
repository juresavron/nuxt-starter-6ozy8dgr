import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Users, Database, Gift, MessageSquare, Zap, Clock, CheckCircle } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';

const AIFollowUp: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-blue-50/90 to-indigo-50/80 p-6 sm:p-8 rounded-xl border border-blue-100 shadow-lg relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      
      <div className="relative">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg transform -rotate-6 hover:rotate-0 transition-all duration-300"
          >
            <MessageSquare className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {language === 'en' ? 'AI-powered Follow-up Messages' : 
             language === 'it' ? 'Messaggi di follow-up basati su AI' : 
             'AI sporočila'}
          </motion.h3>
          
          <motion.p 
            className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {language === 'en' 
              ? 'For all ratings, our system uses AI to automatically generate personalized follow-up messages via email and SMS. These messages are sent to all users who leave a review, encouraging them to share their experience on Google, significantly increasing your review count.'
              : language === 'it' 
                ? 'Per tutte le valutazioni, il nostro sistema utilizza l\'AI per generare automaticamente messaggi di follow-up personalizzati via email e SMS. Questi messaggi vengono inviati a tutti gli utenti che lasciano una recensione, incoraggiandoli a condividere la loro esperienza su Google, aumentando significativamente il numero delle tue recensioni.'
                : 'Pri vseh ocenah naš sistem uporablja umetno inteligenco za samodejno generiranje personaliziranih sledilnih sporočil prek e-pošte in SMS-a. Ta sporočila se pošljejo vsem uporabnikom, ki oddajo oceno, in spodbujajo, da delijo svojo izkušnjo na Googlu, kar bistveno poveča število vaših ocen.'}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50 transform hover:scale-[1.01]"
          >
            <div className="flex items-start gap-5">
              <div className={cn(
                "flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md transform -rotate-3 hover:rotate-0 transition-all duration-300",
                isMobile ? "w-10 h-10" : "w-12 h-12"
              )}>
                <Mail className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                  {language === 'en' ? 'Email Follow-ups' : 
                   language === 'it' ? 'Follow-up via email' : 
                   'E-poštna sporočila'}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Clock className="h-3 w-3 mr-1" /> 24h
                  </span>
                </h4>
                
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'AI crafts personalized email content based on customer\'s specific feedback and rating, with higher open rates than generic templates.'
                    : language === 'it'
                      ? 'L\'AI crea contenuti email personalizzati basati sul feedback e sulla valutazione specifica del cliente, con tassi di apertura più elevati rispetto ai modelli generici.'
                      : 'AI ustvari personalizirano vsebino e-pošte na podlagi specifičnih povratnih informacij stranke in ocene, z višjimi stopnjami odpiranja kot generične predloge.'}
                </p>
                
                <ul className="space-y-1">
                  {[
                    language === 'en' ? 'Personalized content' : language === 'it' ? 'Contenuto personalizzato' : 'Personalizirana vsebina',
                    language === 'en' ? '80% higher open rates' : language === 'it' ? '80% di tasso di apertura più alto' : '80% višje stopnje odpiranja',
                    language === 'en' ? 'Automatic sending' : language === 'it' ? 'Invio automatico' : 'Samodejno pošiljanje'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className={cn("text-green-500 mt-0.5 flex-shrink-0", isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50 transform hover:scale-[1.01]"
          >
            <div className="flex items-start gap-5">
              <div className={cn(
                "rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md transform rotate-3 hover:rotate-0 transition-all duration-300",
                isMobile ? "w-10 h-10" : "w-12 h-12"
              )}>
                <Phone className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                  {language === 'en' ? 'SMS Reminders' : 
                   language === 'it' ? 'Promemoria via SMS' : 
                   'SMS sporočila'}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Clock className="h-3 w-3 mr-1" /> 1h
                  </span>
                </h4>
                
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en'
                    ? 'Sent to all customers who provide phone numbers, our AI generates concise, personalized SMS messages with high conversion rates.'
                    : language === 'it'
                      ? 'Inviati a tutti i clienti che forniscono numeri di telefono, la nostra AI genera messaggi SMS concisi e personalizzati con alti tassi di conversione.'
                      : 'Poslani vsem strankam, ki navedejo telefonske številke, naša AI ustvari jedrnata, personalizirana SMS sporočila z visokimi stopnjami konverzije.'}
                </p>
                
                <ul className="space-y-1">
                  {[
                    language === 'en' ? 'Sent to all reviewers' : language === 'it' ? 'Inviato a tutti i recensori' : 'Poslano vsem ocenjevalcem',
                    language === 'en' ? '98% read rate' : language === 'it' ? '98% tasso di lettura' : '98% stopnja branja',
                    language === 'en' ? 'Immediate impact' : language === 'it' ? 'Impatto immediato' : 'Takojšen učinek'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className={cn("text-green-500 mt-0.5 flex-shrink-0", isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Key metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: '127%', label: language === 'en' ? 'more Google reviews' : language === 'it' ? 'più recensioni Google' : 'več Google ocen' },
            { value: '92%', label: language === 'en' ? 'open rate' : language === 'it' ? 'tasso di apertura' : 'stopnja odpiranja' },
            { value: '100%', label: language === 'en' ? 'automated process' : language === 'it' ? 'processo automatizzato' : 'avtomatiziran proces' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white/50 backdrop-blur-sm rounded-lg border border-blue-100/30 text-center hover:shadow-md transition-all duration-300",
                isMobile ? "p-2" : "p-3"
              )}
            >
              <div className={cn(
                "font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600",
                isMobile ? "text-lg" : "text-xl sm:text-2xl"
              )}>{stat.value}</div>
              <div className={cn(
                "text-gray-500",
                isMobile ? "text-xs" : "text-xs sm:text-sm"
              )}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Customization hint */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 p-4 bg-blue-50/60 rounded-lg border border-blue-100/40 text-center"
        >
          <p className="text-sm text-blue-700 font-medium">
            {language === 'en' 
              ? 'You can set when SMS and email messages are sent in your dashboard'
              : language === 'it'
                ? 'Puoi impostare quando i messaggi SMS ed email vengono inviati nella tua dashboard'
                : 'V nadzorni plošči lahko nastavite, kdaj se pošiljajo SMS in e-poštna sporočila'}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AIFollowUp;