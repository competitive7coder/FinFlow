import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import useAppStore from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateHelpers';
import { categoryColors } from '../../data/mockData';

const RecentTransactions = () => {
  const transactions = useAppStore((s) => s.transactions);
  const currency = useAppStore((s) => s.currency);
  const setActivePage = useAppStore((s) => s.setActivePage);

  const recent = useMemo(() =>
    [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5),
    [transactions]
  );

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">Recent Transactions</h3>
          <p className="text-slate-400 text-xs mt-0.5">Last 5 transactions</p>
        </div>
        <button
          onClick={() => setActivePage('transactions')}
          className="text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-colors"
        >
          View all →
        </button>
      </div>

      <div className="space-y-1">
        {recent.map((t) => {
          const isIncome = t.type === 'Income';
          const dotColor = categoryColors[t.category] || '#6366f1';
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/40 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${dotColor}20` }}
              >
                {isIncome
                  ? <ArrowUpRight size={16} style={{ color: dotColor }} />
                  : <ArrowDownRight size={16} style={{ color: dotColor }} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm font-medium truncate">{t.description}</p>
                <p className="text-slate-500 text-xs">{formatDate(t.date)} · {t.category}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isIncome ? '+' : '-'}{formatCurrency(t.amount, currency)}
                </p>
                <p className={`text-xs ${
                  t.status === 'Completed' ? 'text-emerald-500' :
                  t.status === 'Pending' ? 'text-amber-500' : 'text-rose-500'
                }`}>{t.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;
