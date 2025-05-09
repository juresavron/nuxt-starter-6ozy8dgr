import { useState, useEffect, useCallback, useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useLanguageStore } from '../useLanguageStore';
import { getTranslations } from '../useTranslations';
import { supabase } from '../../lib/supabase';

export const useNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const isClient = useClientSide();
  const language = useLanguageStore(state => state.language);
  const translations = useMemo(() => getTranslations(language), [language]);

  // Check authentication status
  useEffect(() => {
    if (!isClient) return;

    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setUserEmail(data.session?.user?.email || null);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isClient]);

  // Navigation tabs with translations
  const tabs = useMemo(() => {
    const navTranslations = translations?.landing?.navigation || {};
    
    return [
      { id: 'nfc-showcase', label: navTranslations.nfc || 'NFC Cards' },
      { id: 'industries', label: navTranslations.industries || 'Industries' },
      { id: 'social-proof', label: 'References' },
      { id: 'how-it-works', label: navTranslations.howItWorks || 'How It Works' },
      { id: 'blog', label: navTranslations.blog || 'Blog' },
      { id: 'pricing', label: navTranslations.pricing || 'Pricing' },
      { id: 'contact', label: navTranslations.contact || 'Contact' }
    ];
  }, [translations]);

  // Handle mobile touch events
  useEffect(() => {
    if (!isClient) return;

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      if (diff > 50) {
        setIsNavVisible(false);
      } else if (diff < -50) {
        setIsNavVisible(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [touchStartY, isClient]);

  // Handle scroll and section detection
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY && currentScrollY > 150 && currentScrollY - lastScrollY > 10) {
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 150) {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);

      const scrollY = currentScrollY + 150;

      document.querySelectorAll('section[id]').forEach(section => {
        if (!(section instanceof HTMLElement)) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (!sectionId) return;

        if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isClient]);

  // Toggle menu function - ensure it works consistently
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Scroll to section function
  const scrollToSection = useCallback((sectionId: string) => {
    if (!isClient) return;

    const section = document.getElementById(sectionId);
    if (section) {
      setActiveSection(sectionId);
      setIsMenuOpen(false); // Always close menu when navigating

      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 300);
    }
  }, [isClient]);

  return {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    isScrolled,
    activeSection,
    scrollToSection,
    isNavVisible,
    isClient,
    translations,
    tabs,
    isAuthenticated,
    userEmail
  };
};