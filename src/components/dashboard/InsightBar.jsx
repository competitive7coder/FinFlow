import React, { useMemo } from 'react';
import { Zap, Trophy } from 'lucide-react';
import useAppStore from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';

const InsightBar = () => {
  const transactions = useAppStore((s) => s.transactions);
  const currency = useAppStore((s) => s.currency);

  const { topCategory, biggestTxn } = useMemo(() => {
    // Top spending category
    const categoryMap = {};
    transactions.filter((t) => t.type === 'Expense').forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    const topCat = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

    // Biggest single transaction
    const biggest = [...transactions].sort((a, b) => b.amount - a.amount)[0];

    return {
      topCategory: topCat ? { name: topCat[0], amount: topCat[1] } : null,
      biggestTxn: biggest,
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex items-center gap-3 rounded-xl bg-violet-500/10 border border-violet-500/20 px-4 py-3">
        <div className="p-2 rounded-lg bg-violet-500/20">
          <Zap size={15} className="text-violet-400" />
        </div>
        <div>
          <p className="text-slate-400 text-xs">Top Spending Category</p>
          <p className="text-white text-sm font-semibold">
            {topCategory ? `${topCategory.name} · ${formatCurrency(topCategory.amount, currency)}` : '—'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3">
        <div className="p-2 rounded-lg bg-amber-500/20">
          <Trophy size={15} className="text-amber-400" />
        </div>
        <div>
          <p className="text-slate-400 text-xs">Biggest Transaction</p>
          <p className="text-white text-sm font-semibold">
            {biggestTxn ? `${biggestTxn.description.substring(0, 20)}... · ${formatCurrency(biggestTxn.amount, currency)}` : '—'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightBar;
