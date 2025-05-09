// Import modular translation files
import { app } from './app';
import { cta } from './cta';
import { nfc } from './nfc';
import { hero } from './hero';
import { blog } from './blog';
import { video } from './video';
import { prize } from './prize';
import { auth } from './auth';
import { review } from './review';
import { footer } from './footer';
import { contact } from './contact';
import { landing } from './landing';
import { pricing } from './pricing';
import { benefits } from './benefits';
import { thankYou } from './thankYou';
import { howItWorks } from './howItWorks';
import { howToStart } from './howToStart';
import { industries } from './industries';
import { navigation } from './navigation';
import { motivation } from './motivation';
import { community } from './community';
import { socialProof } from './socialProof';
import { valueProposition } from './valueProposition';
import { gamification } from './gamification';
import { feedbackOptions } from './feedbackOptions';
import { feedbackOptionsMidRating } from './feedbackOptionsMidRating';
import { feedbackOptionsLowRating } from './feedbackOptionsLowRating';
import { dashboard } from './dashboard';

export const translations = {
  app,
  blog,
  cta,
  auth,
  contact,
  gamification,
  hero,
  nfc,
  prize,
  review,
  footer,
  landing,
  pricing,
  benefits,
  thankYou,
  howItWorks,
  howToStart,
  motivation,
  industries,
  navigation,
  community,
  socialProof,
  valueProposition,
  video,
  dashboard,
  translation: {
    // Add any additional translations here
    industries: industries,
    feedbackOptions: feedbackOptions,
    feedbackOptionsMidRating: feedbackOptionsMidRating,
    feedbackOptionsLowRating: feedbackOptionsLowRating
  }
};

// Export individual modules for direct access if needed
export * from './app';
export * from './navigation';
export * from './hero';
export * from './auth';
export * from './benefits';
export * from './valueProposition';
export * from './nfc';
export * from './howItWorks';
export * from './howToStart';
export * from './gamification';
export * from './motivation';
export * from './industries';
export * from './socialProof';
export * from './pricing';
export * from './blog';
export * from './contact';
export * from './cta';
export * from './footer';
export * from './review';
export * from './thankYou';
export * from './prize';
export * from './translation';
export * from './feedbackOptions';
export * from './feedbackOptionsMidRating';
export * from './feedbackOptionsLowRating';
export * from './dashboard';