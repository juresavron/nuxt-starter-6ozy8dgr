import { useState, useEffect } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { Smartphone, Star, Shield, CheckCircle2 } from 'lucide-react';
import type { VideoFeature } from '../../types/video';

/**
 * Hook for video section
 * @returns Video section data and state
 */
export const useVideoSection = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Video URL from Backblaze B2
  const videoUrl = "https://ocenagor.s3.eu-central-003.backblazeb2.com/0508(5).mov";
  
  // Thumbnail URL - using a frame from the video
  const videoThumbnail = "https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//Screenshot%202025-05-08%20at%2018.19.36.png";
  
  // Video features
  const features: VideoFeature[] = [
    {
      title: translations?.landing?.video?.features?.[0]?.title || 'Simple NFC Card Usage',
      description: translations?.landing?.video?.features?.[0]?.description || 'How customers can leave a review with one touch',
      icon: Smartphone,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: translations?.landing?.video?.features?.[1]?.title || 'Smart Review Routing',
      description: translations?.landing?.video?.features?.[1]?.description || 'How the system directs satisfied customers to Google',
      icon: Star,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: translations?.landing?.video?.features?.[2]?.title || 'Gamification for Followers',
      description: translations?.landing?.video?.features?.[2]?.description || 'How to gain more followers on social media',
      icon: Shield,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: translations?.landing?.video?.features?.[3]?.title || 'Online Reputation Protection',
      description: translations?.landing?.video?.features?.[3]?.description || 'How the system prevents public negative reviews',
      icon: CheckCircle2,
      color: 'from-purple-500 to-violet-600'
    }
  ];

  return {
    isClient,
    translations,
    videoUrl,
    videoThumbnail,
    features,
    isPlaying,
    setIsPlaying,
    language
  };
};

export default useVideoSection;