import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { Smartphone, TrendingUp, Wifi, CreditCard, Table, Sticker } from 'lucide-react';

/**
 * Hook for NFC showcase section
 * @returns NFC showcase section data
 */
export const useNFCShowcase = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Define products with their details
  const products = useMemo(() => [
    {
      key: 'card',
      title: language === 'it' ? 'Carta NFC' : 'NFC Card',
      icon: CreditCard,
      description: language === 'it' 
        ? 'Elegante carta per tavolo o reception. Ideale per ristoranti e hotel.' 
        : 'Elegant card for table or reception. Ideal for restaurants and hotels.',
      image: 'https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//assets-task_01jqxxpekdf3qtjdep1n0kn828-img_1.webp'
    },
    {
      key: 'stand',
      title: language === 'it' ? 'Supporto da Tavolo' : 'Table Stand',
      icon: Table,
      description: language === 'it'
        ? 'Supporto professionale per il tavolo. Perfetto per bar e ristoranti.'
        : 'Professional stand for the table. Perfect for bars and restaurants.',
      image: 'https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//assets-task_01jqxtzm98ed68wtb9f943tmwv-img_0-3.webp'
    },
    {
      key: 'sticker',
      title: language === 'it' ? 'Adesivo da Bar' : 'Bar Sticker',
      icon: Sticker,
      description: language === 'it'
        ? 'Adesivo impermeabile per bar o tavolo. Ideale per bar e caffè.'
        : 'Waterproof sticker for bar or table. Ideal for bars and cafes.',
      image: 'https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//assets-task_01jqxydy13f1p94qnjhskk1rze-img_0.webp'
    }
  ], [language]);

  // Define features with their icons and descriptions
  const features = useMemo(() => [
    {
      key: 'easyUse',
      icon: Smartphone,
      title: language === 'it' ? 'Facile da Usare' : 'Easy to Use',
      description: language === 'it'
        ? 'Un solo tocco per avviare il processo di valutazione. Niente codici QR o digitazione.'
        : 'One touch to start the rating process. No QR codes or typing.',
      colorGradient: 'from-blue-500 to-blue-600'
    },
    {
      key: 'conversion',
      icon: TrendingUp,
      title: language === 'it' ? 'Conversione Più Alta' : 'Higher Conversion',
      description: language === 'it'
        ? 'Fino a 3 volte più recensioni grazie al processo di valutazione semplice.'
        : 'Up to 3x more reviews due to the simple rating process.',
      colorGradient: 'from-amber-500 to-orange-500'
    },
    {
      key: 'compatibility',
      icon: Wifi,
      title: language === 'it' ? 'Funziona Ovunque' : 'Works Everywhere',
      description: language === 'it'
        ? 'Compatibile con tutti i telefoni moderni (iPhone e Android).'
        : 'Compatible with all modern phones (iPhone and Android).',
      colorGradient: 'from-emerald-500 to-teal-500'
    }
  ], [language]);

  return {
    isClient,
    translations,
    products,
    features
  };
};

export default useNFCShowcase;