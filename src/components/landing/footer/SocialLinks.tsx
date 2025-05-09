import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4">
      <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600 transition-colors group">
        <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
      </a>
      <a href="https://instagram.com" className="text-gray-400 hover:text-pink-600 transition-colors group">
        <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
      </a>
      <a href="https://linkedin.com" className="text-gray-400 hover:text-indigo-600 transition-colors group">
        <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
      </a>
    </div>
  );
};

export default SocialLinks;