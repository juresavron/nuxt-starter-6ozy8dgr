// Import from modular translations
import { translations as enTranslations } from './en';
import { translations as slTranslations } from './sl';
import { translations as itTranslations } from './it';

// Export translations as both named and default export
export { translations as enTranslations } from './en';
export { translations as slTranslations } from './sl';
export { translations as itTranslations } from './it';

// Combined translations object
export const translations = {
  en: enTranslations,
  sl: slTranslations,
  it: itTranslations
};

export default translations;