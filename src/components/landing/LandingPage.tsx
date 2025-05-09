import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLandingPage } from '../../hooks/landing/useLandingPage';
import Header from './Navigation';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import HowToStart from './HowToStart';
import NFCShowcase from './NFCShowcase';
import Gamification from './Gamification';
import Industries from './Industries';
import ReviewMotivation from './ReviewMotivation';
import SocialProof from './conversion/SocialProof';
import FAQ from './FAQ';
import SimplePricing from './pricing/SimplePricing';
import Blog from './Blog';
import ContactForm from './ContactForm';
import Footer from './Footer';
import CommunityCreation from './CommunityCreation';
import VideoSection from './VideoSection';
import DashboardFeedback from './DashboardFeedback';
import PrizeExplanation from './PrizeExplanation';

/**
 * Main landing page component
 * Combines all section components with proper navigation and animations
 */
const LandingPage: React.FC = () => {
  const {
    isClient,
    isScrolled,
    activeSection,
    scrollToSection,
    isNavVisible,
    isAuthenticated,
    userEmail
  } = useLandingPage();

  // Server-side rendering placeholder
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Pridobite višje ocene na Googlu | ocenagor.si</title>
        <meta name="description" content="Pridobite višje ocene na Googlu s pametnim sistemom za zbiranje ocen. Povečajte svojo spletno prepoznavnost in pridobite več strank." />
        <meta name="keywords" content="Pridobite višje ocene na Googlu, Google ocene, višje ocene, spletni ugled, zbiranje ocen" />
        <link rel="canonical" href="https://ocenagor.si" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Pridobite višje ocene na Googlu | ocenagor.si",
            "url": "https://ocenagor.si",
            "description": "Pridobite višje ocene na Googlu s pametnim sistemom za zbiranje ocen. Povečajte svoj spletni ugled in pridobite več strank.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://ocenagor.si/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Kako pridobiti višje ocene na Googlu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Naš sistem pametno usmerja zadovoljne stranke na Google za oddajo, medtem ko nezadovoljne stranke usmerja v interno podajanje povratnih informacij."
                }
              },
              {
                "@type": "Question",
                "name": "Koliko višje ocene na Googlu lahko pričakujem?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Naše stranke v povprečju dosežejo 127% višje število Google ocen v prvem mesecu in povprečna ocena se poviša na 4.8/5 zvezdic."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Navigation */}
      <Header
        isScrolled={isScrolled}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isNavVisible={isNavVisible}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
      />

      {/* Hero Section */}
      <main id="home">
        <Hero />
        <VideoSection />
        <HowItWorks id="how-it-works" />
        <NFCShowcase id="nfc-showcase" />
        <CommunityCreation id="community" />
        <DashboardFeedback id="dashboard" />
        <ReviewMotivation id="motivation" />
        <Industries id="industries" />
        <SocialProof id="social-proof" />
        <HowToStart />
        <Gamification />
        <PrizeExplanation />
        <SimplePricing id="pricing" />
        <FAQ />
        <Blog id="blog" />
        <ContactForm id="contact" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;