import React from 'react';
import { cn } from '../../utils/cn';

interface GiftNoteMessageProps {
  message: string;
  colorScheme?: string;
}

const GiftNoteMessage: React.FC<GiftNoteMessageProps> = ({
  message,
  colorScheme = 'indigo'
}) => {
  return (
    <div className={cn(
      "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-md w-full justify-center",
      "hover:shadow-lg transition-all duration-300 group transform hover:scale-105",
      "bg-yellow-50 border-2",
      colorScheme === 'amber' ? "border-amber-500" :
      colorScheme === 'emerald' ? "border-emerald-500" :
      colorScheme === 'rose' ? "border-rose-500" :
      colorScheme === 'bw' ? "border-gray-500" :
      "border-indigo-500",
      "ios-optimized"
    )}>
      <span className="text-lg group-hover:scale-125 transition-transform duration-300">ℹ️</span>
      <span className={cn(
        "transition-all duration-300",
        colorScheme === 'amber' ? "text-amber-700 group-hover:text-amber-800" :
        colorScheme === 'emerald' ? "text-emerald-700 group-hover:text-emerald-800" :
        colorScheme === 'rose' ? "text-rose-700 group-hover:text-rose-800" :
        colorScheme === 'bw' ? "text-gray-700 group-hover:text-gray-900" :
        "text-indigo-700 group-hover:text-indigo-800"
      )}>
        <span className="text-xs sm:text-sm">{message}</span>
      </span>
    </div>
  );
};

export default GiftNoteMessage;