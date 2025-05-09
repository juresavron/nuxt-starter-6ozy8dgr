import React, { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useHero } from '../../hooks/landing';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import HeroStats from './hero/HeroStats';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useWindowSize } from 'react-use';

const Hero: React.FC = () => {
  // Use the hero hook
  const { translations, heroFeatures, heroStats } = useHero();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isDesktop = width >= 1024;

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden bg-blue-600 py-12 sm:py-16 ios-optimized">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 ios-optimized">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start pt-8">
          {/* LEFT: Text Content - take up more space on desktop */}
          <div className={`${!isDesktop ? 'flex flex-col items-center' : 'lg:col-span-7 flex flex-col items-center lg:items-start'} pt-4 sm:pt-6`}>
            <HeroContent 
              tagline="" /* Empty tagline as per request */
              title={translations?.landing?.hero?.title || 'Pridobite višje ocene na Googlu'}
              highlight={translations?.landing?.hero?.highlight || 'in več strank'}
              subtitle={translations?.landing?.hero?.subtitle || 'Pametno zbiranje ocen s pomočjo umetne inteligence'}
              ctaText={translations?.landing?.hero?.cta || 'Začnite danes'}
              secondaryText={translations?.landing?.howItWorks?.title || 'Kako deluje'}
              features={heroFeatures}
            />
            
            {/* Show stats on mobile */}
            {isMobile && (
              <HeroStats stats={heroStats} />
            )}
          </div>
          
          {/* RIGHT: Stats/Features - take up less space on desktop */}
          <div className="hidden lg:block lg:col-span-5 mt-20"> 
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingSpinner size="lg" color="indigo" />}>
                <HeroStats stats={heroStats} />
              </Suspense>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hero);