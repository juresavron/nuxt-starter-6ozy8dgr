import { Smartphone, Star, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import type { FlowStep } from './types';

export const getHighRatingFlowSteps = (language: string): FlowStep[] => {
  if (language === 'en') {
    return [
      {
        icon: Smartphone,
        title: 'NFC Scanning',
        description: 'Customer scans NFC card or QR code at your location.',
        color: 'from-purple-500 to-indigo-600'
      },
      {
        icon: Star,
        title: 'Rating',
        description: 'Customer selects the number of stars (4-5). The system recognizes customer satisfaction.',
        color: 'from-amber-500 to-orange-600'
      },
      {
        icon: Send,
        title: 'Redirection',
        description: 'Satisfied customer is redirected to Google where they can submit their review.',
        color: 'from-emerald-500 to-teal-600'
      },
      {
        icon: CheckCircle,
        title: 'Gamification',
        description: 'Customer gets additional tasks to follow on social media and receive rewards.',
        color: 'from-rose-500 to-pink-600'
      }
    ];
  } else if (language === 'it') {
    return [
      {
        icon: Smartphone,
        title: 'Scansione NFC',
        description: 'Il cliente scansiona la carta NFC o il codice QR presso la tua sede.',
        color: 'from-purple-500 to-indigo-600'
      },
      {
        icon: Star,
        title: 'Valutazione',
        description: 'Il cliente seleziona il numero di stelle (4-5). Il sistema riconosce la soddisfazione del cliente.',
        color: 'from-amber-500 to-orange-600'
      },
      {
        icon: Send,
        title: 'Reindirizzamento',
        description: 'Il cliente soddisfatto viene reindirizzato su Google dove può inviare la sua recensione.',
        color: 'from-emerald-500 to-teal-600'
      },
      {
        icon: CheckCircle,
        title: 'Gamification',
        description: 'Il cliente ottiene ulteriori compiti da seguire sui social media e riceve premi.',
        color: 'from-rose-500 to-pink-600'
      }
    ];
  }
  
  // Default Slovenian
  return [
    {
      icon: Smartphone,
      title: 'Skeniranje NFC',
      description: 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Star,
      title: 'Ocenjevanje',
      description: 'Stranka izbere število zvezdic (4-5). Sistem prepozna zadovoljstvo stranke.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Send,
      title: 'Preusmeritev',
      description: 'Zadovoljna stranka je preusmerjena na Google, kjer lahko odda svojo oceno.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: CheckCircle,
      title: 'Gejmifikacija',
      description: 'Stranka dobi dodatne naloge za sledenje na družbenih omrežjih in prejme nagrade.',
      color: 'from-rose-500 to-pink-600'
    }
  ];
};

export const getLowRatingFlowSteps = (language: string): FlowStep[] => {
  if (language === 'en') {
    return [
      {
        icon: Smartphone,
        title: 'NFC Scanning',
        description: 'Customer scans NFC card or QR code at your location.',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        icon: Star,
        title: 'Rating',
        description: 'Customer selects the number of stars (1-3). The system recognizes customer dissatisfaction.',
        color: 'from-red-500 to-orange-600'
      },
      {
        icon: MessageSquare,
        title: 'Information Collection',
        description: 'Dissatisfied customer provides more detailed feedback for improvements.',
        color: 'from-amber-500 to-yellow-600'
      }
    ];
  } else if (language === 'it') {
    return [
      {
        icon: Smartphone,
        title: 'Scansione NFC',
        description: 'Il cliente scansiona la carta NFC o il codice QR presso la tua sede.',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        icon: Star,
        title: 'Valutazione',
        description: 'Il cliente seleziona il numero di stelle (1-3). Il sistema riconosce l\'insoddisfazione del cliente.',
        color: 'from-red-500 to-orange-600'
      },
      {
        icon: MessageSquare,
        title: 'Raccolta informazioni',
        description: 'Il cliente insoddisfatto fornisce un feedback più dettagliato per i miglioramenti.',
        color: 'from-amber-500 to-yellow-600'
      }
    ];
  }
  
  // Default Slovenian
  return [
    {
      icon: Smartphone,
      title: 'Skeniranje NFC',
      description: 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Star,
      title: 'Ocenjevanje',
      description: 'Stranka izbere število zvezdic (1-3). Sistem prepozna nezadovoljstvo stranke.',
      color: 'from-red-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: 'Zajem informacij',
      description: 'Nezadovoljna stranka poda podrobnejše povratne informacije za izboljšave.',
      color: 'from-amber-500 to-yellow-600'
    }
  ];
};