import * as React from 'react';
import { cn } from '../../utils/cn';
import { buttonVariants, buttonBaseStyles } from '../../utils/colors';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: React.ElementType;
  to?: string;
  href?: string;
  colorScheme?: string;
}

/**
 * Reusable button component with consistent styling
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    as: Component = 'button',
    to,
    href,
    colorScheme,
    ...props 
  }, ref) => {
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    // Get color scheme classes if provided
    const getColorSchemeClasses = () => {
      if (!colorScheme || variant !== 'primary') return '';
      
      switch (colorScheme) {
        case 'amber':
          return 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700';
        case 'emerald':
          return 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700';
        case 'rose':
          return 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700';
        case 'bw':
          return 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950';
        case 'blue':
          return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
        default:
          return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      }
    };

    // If using as Link from react-router-dom
    if (Component === Link) {
      return (
        <Link
          to={to || ''}
          className={cn(
            buttonBaseStyles,
            colorScheme && variant === 'primary' ? getColorSchemeClasses() : buttonVariants[variant],
            sizeClasses[size],
            isLoading && 'opacity-70 cursor-not-allowed',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
        </Link>
      );
    }

    // If using as an anchor tag
    if (Component === 'a') {
      return (
        <a
          href={href}
          className={cn(
            buttonBaseStyles,
            colorScheme && variant === 'primary' ? getColorSchemeClasses() : buttonVariants[variant],
            sizeClasses[size],
            isLoading && 'opacity-70 cursor-not-allowed',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <Component
        ref={ref}
        className={cn(
          buttonBaseStyles,
          colorScheme && variant === 'primary' ? getColorSchemeClasses() : buttonVariants[variant],
          sizeClasses[size],
          isLoading && 'opacity-70 cursor-not-allowed',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;