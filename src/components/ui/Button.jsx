import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-500/20',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-500 shadow-lg shadow-rose-500/20',
    ghost: 'bg-transparent hover:bg-white/10 text-slate-300 hover:text-white focus:ring-slate-500',
    outline: 'border border-slate-600 hover:border-slate-400 bg-transparent text-slate-300 hover:text-white focus:ring-slate-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
