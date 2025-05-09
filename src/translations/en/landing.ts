// Import from modular translations
import { app } from './app';
import { navigation } from './navigation';
import { hero } from './hero';
import { benefits } from './benefits';
import { valueProposition } from './valueProposition';
import { howItWorks } from './howItWorks';
import { video as videoSection } from './video';
import { howToStart } from './howToStart';
import { motivation } from './motivation';
import { cta } from './cta';
import { community } from './community';
// Rename the import to avoid duplicate identifier
import { nfc as nfcTranslation } from './nfc';
import { gamification } from './gamification';
import { prize } from './prize';
import { industries } from './industries';
import { socialProof } from './socialProof';
import { pricing } from './pricing';
import { blog } from './blog';
import { contact } from './contact';
import { dashboard } from './dashboard';

export const landing = {
  hero,
  valueProposition,
  benefits,
  howItWorks,
  video: videoSection,
  howToStart,
  motivation,
  cta,
  community,
  nfc: nfcTranslation,
  gamification,
  dashboard,
  prize,
  industries,
  socialProof,
  pricing,
  blog,
  contact,
  navigation
};