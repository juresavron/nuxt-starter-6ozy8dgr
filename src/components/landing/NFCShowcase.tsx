import React from 'react';
import { useNFCShowcase } from '../../hooks/landing/useNFCShowcase';
import { useTranslations } from '../../hooks/useTranslations';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import NFCHeader from './nfc-showcase/NFCHeader';
import ProductsGrid from './nfc-showcase/ProductsGrid';
import FeaturesGrid from './nfc-showcase/FeaturesGrid';

/**
 * NFC Showcase section component
 * Displays NFC products and features
 */
const NFCShowcase: React.FC<{ id?: string }> = ({ id = 'nfc-showcase' }) => {
  const { isClient, products, features } = useNFCShowcase();
  const translations = useTranslations();
  
  // Don't render on server side
  if (!isClient) return null;

  return (
    <section id={id} className="py-20 sm:py-28 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(60,100,255,0.05)_0%,transparent_60%)]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(60,100,255,0.05)_0%,transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <NFCHeader 
          title={translations?.landing?.nfc?.title || "Simple Review Collection with One Touch"}
          subtitle={translations?.landing?.nfc?.subtitle || "Our NFC cards and stickers allow customers to submit a review in just 30 seconds"}
        />

        {/* Product Cards */}
        <ProductsGrid products={products} />

        {/* Features */}
        <FeaturesGrid features={features} />
        
        {/* Start Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-14"
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Začni zdaj
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NFCShowcase;