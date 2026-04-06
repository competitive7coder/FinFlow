import React, { useMemo } from 'react';
import useAppStore from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { categoryColors } from '../../data/mockData';

const CategoryProgressBar = () => {
  const transactions = useAppStore((s) => s.transactions);
  const currency = useAppStore((s) => s.currency);

  const topCategories = useMemo(() => {
    const map = {};
    transactions.filter((t) => t.type === 'Expense').forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const max = sorted[0]?.[1] || 1;
    return sorted.map(([cat, amount]) => ({ cat, amount, pct: (amount / max) * 100 }));
  }, [transactions]);

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
      <div className="mb-4">
        <h3 className="text-white font-semibold">Top Spending Categories</h3>
        <p className="text-slate-400 text-xs mt-0.5">Highest expense categories</p>
      </div>
      <div className="space-y-4">
        {topCategories.map(({ cat, amount, pct }, i) => {
          const color = categoryColors[cat] || '#6366f1';
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs font-medium">#{i + 1}</span>
                  <span className="text-white text-sm font-medium">{cat}</span>
                </div>
                <span className="text-slate-300 text-sm font-semibold">{formatCurrency(amount, currency)}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryProgressBar;
