import { cn } from './cn';

export const buttonBaseStyles = 'flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

export const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
  secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
  danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border border-transparent',
  link: 'bg-transparent text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline p-0 h-auto',
};

// Color scheme definitions for components 
export const getColorScheme = (scheme: string) => {
  const schemes = {
    blue: {
      gradient: 'from-blue-50/30 to-blue-50/50',
      border: 'border-blue-100/40',
      primary: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      focus: 'focus:ring-blue-500',
      shadow: 'shadow-blue-100/40'
    },
    indigo: {
      gradient: 'from-indigo-50/30 to-indigo-50/50',
      border: 'border-indigo-100/40',
      primary: 'bg-indigo-600',
      hover: 'hover:bg-indigo-700',
      text: 'text-indigo-600',
      focus: 'focus:ring-indigo-500',
      shadow: 'shadow-indigo-100/40'
    },
    emerald: {
      gradient: 'from-emerald-50/30 to-emerald-50/50',
      border: 'border-emerald-100/40',
      primary: 'bg-emerald-600',
      hover: 'hover:bg-emerald-700',
      text: 'text-emerald-600',
      focus: 'focus:ring-emerald-500',
      shadow: 'shadow-emerald-100/40'
    },
    amber: {
      gradient: 'from-amber-50/30 to-amber-50/50',
      border: 'border-amber-100/40',
      primary: 'bg-amber-600',
      hover: 'hover:bg-amber-700',
      text: 'text-amber-600',
      focus: 'focus:ring-amber-500',
      shadow: 'shadow-amber-100/40'
    },
    rose: {
      gradient: 'from-rose-50/30 to-rose-50/50',
      border: 'border-rose-100/40',
      primary: 'bg-rose-600',
      hover: 'hover:bg-rose-700',
      text: 'text-rose-600',
      focus: 'focus:ring-rose-500',
      shadow: 'shadow-rose-100/40'
    },
    gray: {
      gradient: 'from-gray-100 to-gray-50',
      border: 'border-gray-200',
      primary: 'bg-gray-800',
      hover: 'hover:bg-gray-900',
      text: 'text-gray-700',
      focus: 'focus:ring-gray-500',
      shadow: 'shadow-gray-100/40'
    }
  };

  return schemes[scheme as keyof typeof schemes] || schemes.blue;
};

// Get text color based on color scheme
export const getTextColor = (colorScheme: string): string => {
  switch (colorScheme) {
    case 'amber':
      return 'text-amber-700';
    case 'emerald':
      return 'text-emerald-700';
    case 'rose':
      return 'text-rose-700';
    case 'bw':
    case 'gray':
      return 'text-gray-700';
    case 'blue':
      return 'text-blue-700';
    default:
      return 'text-blue-700';  // Changed from indigo to blue
  }
};