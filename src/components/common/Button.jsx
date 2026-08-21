import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-700/50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary: 'bg-stone-900 border border-stone-900 text-stone-100 hover:bg-stone-800 hover:border-stone-800 focus:ring-stone-900/50 shadow-sm',
    secondary: 'bg-orange-700 border border-orange-700 text-stone-50 hover:bg-orange-850 hover:border-orange-850 focus:ring-orange-700/50 shadow-sm',
    outline: 'bg-transparent border border-stone-300 text-stone-800 hover:bg-stone-50 hover:border-stone-400 focus:ring-stone-200',
    ghost: 'bg-transparent text-stone-700 hover:bg-stone-100 hover:text-stone-900'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs tracking-wider uppercase',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3 text-base tracking-wide',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { y: -2, scale: 1.01 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon && iconPosition === 'left' && <span className="w-4 h-4 flex items-center">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="w-4 h-4 flex items-center">{icon}</span>}
        </span>
      )}
    </motion.button>
  );
};

export default Button;
