import React from 'react';
import { motion } from 'framer-motion';
import { User, LogIn, ChevronRight, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface MobileMenuAuthProps {
  isAuthenticated: boolean;
  userEmail: string | null;
  onClose: () => void;
}

const MobileMenuAuth: React.FC<MobileMenuAuthProps> = ({
  isAuthenticated,
  userEmail,
  onClose
}) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  const loginText = translations?.landing?.navigation?.login || 
                    (language === 'en' ? 'Login' : 'Prijava');
  const dashboardText = translations?.landing?.navigation?.dashboard || 
                       (language === 'en' ? 'Dashboard' : 'Nadzorna plošča');
  const loggedInText = translations?.app?.loggedIn || 
                      (language === 'en' ? 'You are logged in' : 'Prijavljeni ste');
  
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      {isAuthenticated ? (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{userEmail}</p>
              <p className="text-xs text-gray-500">{loggedInText}</p>
            </div>
          </div>
          
          <Link
            to="/admin"
            className="flex items-center justify-between w-full p-4 text-base font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5" /> 
              <span className="text-base md:text-lg">{dashboardText}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-blue-400" />
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/login"
            className="flex items-center justify-between w-full p-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <LogIn className="h-5 w-5 text-white" />
              <span className="text-base md:text-lg">{loginText}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-white/70" />
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenuAuth;