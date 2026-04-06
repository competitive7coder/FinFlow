import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    danger: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    violet: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
    admin: 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20',
    viewer: 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
