import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'sl' | 'en' | 'it';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Create store with persistence
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'sl',
      setLanguage: (language) => {
        // Validate language is one of the supported languages
        const validLanguage = ['sl', 'en', 'it'].includes(language) ? language : 'sl';
        set({ language: validLanguage as Language });
      }
    }),
    {
      name: 'language-storage',
      // Only use localStorage on the client side
      getStorage: () => {
        return typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {}
        };
      }
    }
  )
);