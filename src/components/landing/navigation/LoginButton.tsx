import React from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface LoginButtonProps {
  isScrolled?: boolean;
  isMobile?: boolean;
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  isScrolled = false,
  isMobile = false,
  className = ''
}) => {
  const navigate = useNavigate();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  const loginText = translations?.landing?.navigation?.login || 
                    (language === 'en' ? 'Login' : 'Prijava');

  const handleLogin = () => {
    navigate('/login');
  };

  if (isMobile) {
    return (
      <button
        onClick={handleLogin}
        className={cn(
          "flex items-center justify-center w-full gap-2 py-3 px-4 text-sm font-medium",
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg",
          "hover:shadow-md transition-all duration-300",
          className
        )}
      >
        <LogIn className="h-4 w-4" />
        <span>{loginText}</span>
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogin}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
        isScrolled
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm hover:shadow-md"
          : "bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30",
        className
      )}
      aria-label="Login"
    >
      <LogIn className="h-4 w-4" />
      <span>{loginText}</span>
    </motion.button>
  );
};

export default LoginButton;