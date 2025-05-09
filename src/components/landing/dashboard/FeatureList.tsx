import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { BarChart, TrendingUp, Users, MessageSquare, CheckSquare, Settings, LineChart, PieChart, AreaChart } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

const FeatureList: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Features for customizable feedback options
  const feedbackFeatures = [
    { 
      icon: CheckSquare,
      title: language === 'en' ? 'Industry-specific feedback options' : 
             language === 'it' ? 'Opzioni di feedback specifiche per settore' : 
             'Možnosti povratnih informacij specifične za industrijo',
      index: 0 
    },
    { 
      icon: MessageSquare,
      title: language === 'en' ? 'Different options for low and mid ratings' : 
             language === 'it' ? 'Opzioni diverse per valutazioni basse e medie' : 
             'Različne možnosti za nizke in srednje ocene',
      index: 1 
    },
    { 
      icon: Users,
      title: language === 'en' ? 'Customize which social media platforms to include' : 
             language === 'it' ? 'Personalizza quali piattaforme social includere' : 
             'Prilagoditev katere platforme družbenih omrežij vključiti',
      index: 2 
    }
  ];
  
  // Features for dashboard
  const dashboardFeatures = [
    { 
      icon: LineChart,
      title: language === 'en' ? 'Trend analysis and performance tracking' : 
             language === 'it' ? 'Analisi delle tendenze e monitoraggio delle prestazioni' : 
             'Analiza trendov in spremljanje uspešnosti',
      index: 0 
    },
    { 
      icon: PieChart,
      title: language === 'en' ? 'Sentiment analysis and feedback categorization' : 
             language === 'it' ? 'Analisi del sentiment e categorizzazione del feedback' : 
             'Analiza razpoloženja in kategorizacija povratnih informacij',
      index: 1 
    },
    { 
      icon: AreaChart,
      title: language === 'en' ? 'Actionable insights and improvement recommendations' : 
             language === 'it' ? 'Approfondimenti attuabili e raccomandazioni di miglioramento' : 
             'Uporabni vpogledi in priporočila za izboljšave',
      index: 2 
    }
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left side - Customization Features */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100/40">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Settings className="h-6 w-6 text-blue-500 mr-2" />
            {language === 'en' ? 'Customizable Feedback Options' : 
             language === 'it' ? 'Opzioni di Feedback Personalizzabili' : 
             'Prilagodljive možnosti povratnih informacij'}
          </h3>
          <p className="text-gray-600 mb-5">
            {language === 'en' ? 'Each company can customize which feedback options to show based on their industry and specific needs:' : 
             language === 'it' ? 'Ogni azienda può personalizzare quali opzioni di feedback mostrare in base al proprio settore e alle esigenze specifiche:' : 
             'Vsako podjetje lahko prilagodi, katere možnosti povratnih informacij želi prikazati glede na svojo panogo in specifične potrebe:'}
          </p>
          
          <div className="space-y-3">
            {feedbackFeatures.map(feature => (
              <div key={feature.index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Right side - Dashboard Features */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100/40">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BarChart className="h-6 w-6 text-blue-500 mr-2" />
            {language === 'en' ? 'Professional Dashboard' : 
             language === 'it' ? 'Dashboard Professionale' : 
             'Profesionalna nadzorna plošča'}
          </h3>
          <p className="text-gray-600 mb-5">
            {language === 'en' ? 'Access detailed analytics and feedback in your personalized dashboard:' : 
             language === 'it' ? 'Accedi ad analisi dettagliate e feedback nella tua dashboard personalizzata:' : 
             'Dostopajte do podrobne analitike in povratnih informacij v svoji personalizirani nadzorni plošči:'}
          </p>
          
          <div className="space-y-3">
            {dashboardFeatures.map(feature => (
              <div key={feature.index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureList;