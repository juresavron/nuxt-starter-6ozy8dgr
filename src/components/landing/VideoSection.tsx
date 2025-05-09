import React from 'react';
import { motion } from 'framer-motion';
import { useVideoSection } from '../../hooks/landing/useVideoSection';
import { ArrowRight } from 'lucide-react';
import { VideoPlayer } from '../video';
import VideoFeatures from './video/VideoFeatures';
import { useWindowSize } from 'react-use';
import { cn } from '../../utils/cn';

// Video header component
const VideoHeader: React.FC = () => {
  const { translations, language } = useVideoSection();
  
  // Get translations with fallbacks
  const title = translations?.landing?.video?.title || (
    language === 'en' ? 'Ocenagor in Action' :
    language === 'it' ? 'Ocenagor in Azione' :
    'Ocenagor v akciji'
  );
  
  const subtitle = translations?.landing?.video?.subtitle || (
    language === 'en' ? 'See how our system works in practice' :
    language === 'it' ? 'Guarda come funziona il nostro sistema in pratica' :
    'Oglejte si, kako deluje naš sistem v praksi'
  );
  
  const badge = translations?.landing?.video?.badge || (
    language === 'en' ? 'Video' :
    language === 'it' ? 'Video' :
    'Video'
  );
  
  return (
    <div className="text-center mb-8 sm:mb-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
          <span className="text-white text-xs">🎬</span>
        </div>
        <span>{badge}</span>
      </motion.div>
      
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

const VideoSection: React.FC = () => {
  const { 
    isClient, 
    videoUrl, 
    videoThumbnail, 
    features, 
    isPlaying,
    setIsPlaying,
    translations
  } = useVideoSection();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  if (!isClient) return null;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden relative z-0">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50/50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-2xl -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-100/20 to-blue-100/20 rounded-full blur-2xl -z-10"></div>
        
        {/* Header */}
        <VideoHeader />
        
        {/* Video player - Full width */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "mb-10 sm:mb-12 mx-auto transition-all duration-500 rounded-xl overflow-hidden shadow-xl relative",
            isMobile ? "max-w-full" : "max-w-5xl"
          )}>
          <VideoPlayer 
            videoUrl={videoUrl}
            thumbnailUrl={videoThumbnail}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={(error) => console.error('Video error:', error)}
          />
        </motion.div>
        
        {/* Features below video */}
        <div className={cn(
          "mx-auto",
          isMobile ? "max-w-full" : "max-w-4xl"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <VideoFeatures features={features} />
          </motion.div>
        </div>
        
        {/* CTA Button - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            Začni zdaj
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
        
        {/* Translation note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {translations?.landing?.video?.note || "Video je na voljo v slovenščini. Za druge jezike so na voljo podnapisi."} 
            <a href="/video-fallback.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
              Težave s predvajanjem? Odpri video v novem zavihku.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;