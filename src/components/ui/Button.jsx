import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'px-6 py-3 text-slate-600 hover:bg-slate-100 font-semibold rounded-xl transition-all',
    danger: 'px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-all',
  };

  return (
    <button 
      className={cn(variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};
