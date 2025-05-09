import * as React from 'react';
import { cn } from '../../../utils/cn';

interface ContactFormHeaderProps {
  title: string;
  colorScheme?: string;
}

/**
 * Header component for the contact form section
 */
const ContactFormHeader: React.FC<ContactFormHeaderProps> = ({
  title,
  colorScheme = 'indigo'
}) => {
  return (
    <div className="col-span-1 sm:col-span-2 text-center mb-4">
      <div className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-md w-full justify-center",
        "hover:shadow-lg transition-all duration-300 group transform hover:scale-105",
        colorScheme === 'amber' ? "bg-amber-50 border border-amber-100" :
        colorScheme === 'emerald' ? "bg-emerald-50 border border-emerald-100" :
        colorScheme === 'rose' ? "bg-rose-50 border border-rose-100" :
        colorScheme === 'bw' ? "bg-gray-50 border border-gray-200" :
        "bg-indigo-50 border border-indigo-100"
      )}>
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">📝</span>
        <span className={cn(
          "transition-all duration-300",
          colorScheme === 'amber' ? 'text-amber-700 group-hover:text-amber-800' :
          colorScheme === 'emerald' ? 'text-emerald-700 group-hover:text-emerald-800' :
          colorScheme === 'rose' ? 'text-rose-700 group-hover:text-rose-800' :
          colorScheme === 'bw' ? 'text-gray-700 group-hover:text-gray-900' :
          'text-indigo-700 group-hover:text-indigo-800'
        )}>
          <span className="text-sm sm:text-base">{title}</span>
        </span>
      </div>
    </div>
  );
};

export default React.memo(ContactFormHeader);