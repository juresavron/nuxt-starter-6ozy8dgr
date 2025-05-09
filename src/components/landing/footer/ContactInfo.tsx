import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface ContactInfoProps {
  title: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ title }) => {
  return (
    <div className="mt-6 md:mt-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{title}</h3>
      <ul className="space-y-2 sm:space-y-3">
        <li>
          <a href="tel:+38640202488" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-green-600 transition-colors group">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            +386 40 202 488
          </a>
        </li>
        <li>
          <a href="mailto:info@ocenagor.si" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors group">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            info@ocenagor.si
          </a>
        </li>
        <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
          <span>
            Ferrarska ulica 30,<br />
            6000 Koper - Capodistria
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;