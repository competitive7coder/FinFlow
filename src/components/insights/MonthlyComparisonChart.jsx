import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import useAppStore from '../../context/AppContext';
import { getYearMonth, formatMonthLabel } from '../../utils/dateHelpers';
import { formatCurrency } from '../../utils/formatCurrency';
import { categories } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shadow-xl space-y-1">
        <p className="text-slate-400 text-xs mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-300">{p.name}:</span>
            <span className="text-white font-medium">{formatCurrency(p.value, currency)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MonthlyComparisonChart = () => {
  const transactions = useAppStore((s) => s.transactions);
  const currency = useAppStore((s) => s.currency);

  // Current = Apr 2026, Previous = Mar 2026
  const CURRENT = '2026-04';
  const PREVIOUS = '2026-03';

  const data = useMemo(() => {
    const expCats = categories.filter((c) => !['Salary', 'Freelance', 'Investment'].includes(c));
    return expCats.map((cat) => {
      const curr = transactions
        .filter((t) => getYearMonth(t.date) === CURRENT && t.category === cat && t.type === 'Expense')
        .reduce((s, t) => s + t.amount, 0);
      const prev = transactions
        .filter((t) => getYearMonth(t.date) === PREVIOUS && t.category === cat && t.type === 'Expense')
        .reduce((s, t) => s + t.amount, 0);
      return { category: cat, 'Current Month': curr, 'Previous Month': prev };
    }).filter((d) => d['Current Month'] > 0 || d['Previous Month'] > 0);
  }, [transactions]);

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
      <div className="mb-4">
        <h3 className="text-white font-semibold">Monthly Comparison</h3>
        <p className="text-slate-400 text-xs mt-0.5">Current vs Previous month by category</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} width={44} />
          <Tooltip content={<CustomTooltip currency={currency} />} />
          <Legend formatter={(v) => <span className="text-slate-400 text-xs">{v}</span>} />
          <Bar dataKey="Current Month" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Previous Month" fill="#334155" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyComparisonChart;
