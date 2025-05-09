import { useState, useEffect } from 'react';
import { useClientSide } from '../../hooks/useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { Mail, TrendingUp, Users, Database, Gift } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  text: string;
}

export const useCommunityCreation = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.community;

  // Map icon strings to components
  const getIconComponent = (iconName: string): LucideIcon => {
    switch(iconName) {
      case 'mail': return Mail;
      case 'trending-up': return TrendingUp;
      case 'users': return Users;
      case 'database': return Database;
      case 'gift': return Gift;
      default: return Users;
    }
  };

  // Features with their icons and descriptions
  const features = t?.features ? t.features.map((feature: any, index: number) => ({
    icon: getIconComponent(feature.icon || 'users'),
    title: feature.title,
    description: feature.description,
    color: index === 0 ? 'from-blue-500 to-indigo-600' : 
           index === 1 ? 'from-amber-500 to-orange-600' : 
           'from-emerald-500 to-teal-600'
  })) : [
      {
        icon: Mail,
        title: language === 'en' ? 'Gather Contact Information' : 
               language === 'it' ? 'Raccogli Informazioni di Contatto' : 
               'Zbirajte kontaktne podatke',
        description: language === 'en' ? 'Collect emails and phone numbers from your satisfied customers who want to stay updated with your latest offers' :
                     language === 'it' ? 'Raccogli email e numeri di telefono dai tuoi clienti soddisfatti che vogliono rimanere aggiornati con le tue ultime offerte' :
                     'Zbirajte e-poštne naslove in telefonske številke zadovoljnih strank, ki želijo biti obveščene o vaših najnovejših ponudbah',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        icon: Gift,
        title: language === 'en' ? 'Reward Your Customers' : 
               language === 'it' ? 'Premia i Tuoi Clienti' : 
               'Nagradite svoje stranke',
        description: language === 'en' ? 'Offer special incentives like discounts, free products, or exclusive offers to customers who join your community' :
                     language === 'it' ? 'Offri incentivi speciali come sconti, prodotti gratuiti o offerte esclusive ai clienti che si uniscono alla tua comunità' :
                     'Ponudite posebne nagrade kot so popusti, brezplačni izdelki ali ekskluzivne ponudbe strankam, ki se pridružijo vaši skupnosti',
        color: 'from-amber-500 to-orange-600'
      },
      {
        icon: Database,
        title: language === 'en' ? 'Build a Customer Database' : 
               language === 'it' ? 'Costruisci un Database Clienti' : 
               'Ustvarite bazo strank',
        description: language === 'en' ? 'Develop a powerful database of loyal customers segmented by preferences, visit frequency and purchase history' :
                     language === 'it' ? 'Sviluppa un potente database di clienti fedeli segmentato per preferenze, frequenza di visita e cronologia degli acquisti' :
                     'Razvijte zmogljivo bazo zvestih strank, razvrščeno po željah, pogostosti obiskov in zgodovini nakupov',
        color: 'from-emerald-500 to-teal-600'
      }
    ];

  // Process steps
  const process = t?.process?.steps ? t.process.steps.map((step: any) => ({
    title: step.title,
    description: step.description
  })) : [
      {
        title: language === 'en' ? 'Customer Provides Feedback and Contact Info' : 
               language === 'it' ? 'Il cliente fornisce feedback e informazioni di contatto' : 
               'Stranka poda povratne informacije in kontaktne podatke',
        description: language === 'en' ? 'After leaving a review, customers are offered a personalized reward in exchange for their contact information, building your database with every interaction' :
                     language === 'it' ? 'Dopo aver lasciato una recensione, ai clienti viene offerto un premio personalizzato in cambio delle loro informazioni di contatto, costruendo il tuo database con ogni interazione' :
                     'Po oddaji ocene strankam ponudimo prilagojeno nagrado v zameno za njihove kontaktne podatke, s čimer ob vsaki interakciji gradimo vašo bazo'
      },
      {
        title: language === 'en' ? 'Data is Securely Stored in Your Dashboard' : 
               language === 'it' ? 'I dati vengono archiviati in modo sicuro nella tua dashboard' : 
               'Podatki so varno shranjeni v vaši nadzorni plošči',
        description: language === 'en' ? 'All contact details are securely stored in your customer database, with full GDPR compliance and easy export options' :
                     language === 'it' ? 'Tutti i dettagli di contatto sono archiviati in modo sicuro nel tuo database clienti, con piena conformità GDPR e facili opzioni di esportazione' :
                     'Vsi kontaktni podatki so varno shranjeni v vaši bazi strank, s popolno skladnostjo z GDPR in enostavnimi možnostmi izvoza'
      },
      {
        title: language === 'en' ? 'Send Targeted Communications' : 
               language === 'it' ? 'Invia comunicazioni mirate' : 
               'Pošiljajte ciljana sporočila',
        description: language === 'en' ? 'Use the gathered information to send targeted promotions, event invitations, and special offers to your community' :
                     language === 'it' ? 'Utilizza le informazioni raccolte per inviare promozioni mirate, inviti a eventi e offerte speciali alla tua comunità' :
                     'Uporabite zbrane podatke za pošiljanje ciljanih promocij, vabil na dogodke in posebnih ponudb vaši skupnosti'
      }
    ];

  // Stats
  const stats = t?.stats?.items ? t.stats.items.map((stat: any) => ({
    value: stat.value,
    text: stat.text
  })) : [
      {
        value: "95%",
        text: language === 'en' ? 'of customers provide contact information' : 
              language === 'it' ? 'dei clienti forniscono informazioni di contatto' : 
              'strank posreduje kontaktne podatke'
      },
      {
        value: "84%",
        text: language === 'en' ? 'open rate for special offers' : 
              language === 'it' ? 'tasso di apertura per offerte speciali' : 
              'stopnja odpiranja za posebne ponudbe'
      },
      {
        value: "41%",
        text: language === 'en' ? 'increase in repeat business' : 
              language === 'it' ? 'aumento del business ripetuto' : 
              'povečanje ponovnega obiska'
      }
    ];

  return {
    isClient,
    features,
    process,
    stats,
    translations
  };
};