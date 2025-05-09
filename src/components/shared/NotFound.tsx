import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import { useTranslations } from '../../hooks/useTranslations';

const NotFound: React.FC = () => {
  const translations = useTranslations();
  const t = translations?.app?.notFound || {
    title: 'Page Not Found',
    message: "Sorry, we couldn't find the page you're looking for.",
    backHome: 'Back to Home',
    tryAgain: 'Try Again'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-50 rounded-full">
            <FileQuestion className="h-8 w-8 text-blue-500" style={{ strokeWidth: 1.5 }} />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {t.title}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {t.message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              as={Link}
              to="/"
              variant="primary"
              leftIcon={<ArrowLeft className="h-5 w-5" />}
              className="bg-gradient-to-r from-blue-600 to-blue-700"
            >
              {t.backHome}
            </Button>
            
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
            >
              {t.tryAgain}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;