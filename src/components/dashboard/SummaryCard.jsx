import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import useAppStore from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';

const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);
  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);
  return value;
};

const SummaryCard = ({ title, value, subtitle, trend, trendValue, icon: Icon, colorClass, isCurrency = true, suffix = '' }) => {
  const currency = useAppStore((s) => s.currency);
  const animatedValue = useCountUp(value);
  const isPositive = trend === 'up';

  const displayValue = isCurrency
    ? formatCurrency(animatedValue, currency)
    : `${animatedValue}${suffix}`;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 hover:border-slate-600/70 transition-all duration-300 group hover:shadow-xl hover:shadow-black/20">
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl ${colorClass} group-hover:opacity-20 transition-opacity`} />
      
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${colorClass} bg-opacity-15`}>
          <Icon size={18} className={colorClass.replace('bg-', 'text-')} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
            ${isPositive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}
          >
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trendValue}
          </div>
        )}
      </div>

      <p className="text-slate-400 text-xs font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-white tracking-tight">{displayValue}</p>
      {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );
};

export default SummaryCard;
