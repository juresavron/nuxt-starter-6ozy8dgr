import { hero } from './hero';
import { valueProposition } from './valueProposition';
import { benefits } from './benefits';
import { howItWorks } from './howItWorks';
import { howToStart } from './howToStart';
import { nfc } from './nfc';
import { gamification } from './gamification';
import { prize } from './prize';
import { industries } from './industries';
import { socialProof } from './socialProof';
import { pricing } from './pricing';
import { blog } from './blog';
import { contact } from './contact';
import { community } from './community';
import { dashboard } from './dashboard';
import { motivation } from './motivation';

export const landing = {
  // Base sections
  hero,
  valueProposition,
  benefits,
  nfc,
  howItWorks,
  howToStart,
  gamification,
  prize,
  dashboard,
  
  // Feature sections
  community,
  motivation,
  industries,
  socialProof,
  
  // Marketing and contact sections
  pricing,
  blog,
  contact,
  
  // Navigation
  navigation: {
    home: 'Home',
    benefits: 'Benefici',
    howItWorks: 'Come Funziona',
    nfc: 'NFC',
    pricing: 'Prezzi',
    industries: 'Industrie',
    blog: 'Blog',
    contact: 'Contatti',
    login: 'Accedi',
    dashboard: 'Dashboard',
    more: 'Altro'
  }
};