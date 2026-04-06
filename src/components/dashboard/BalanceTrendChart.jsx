import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import useAppStore from '../../context/AppContext';
import { getLastNMonths, formatMonthLabel, getYearMonth } from '../../utils/dateHelpers';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        <p className="text-white font-semibold text-sm">{formatCurrency(payload[0].value, currency)}</p>
      </div>
    );
  }
  return null;
};

const BalanceTrendChart = () => {
  const transactions = useAppStore((s) => s.transactions);
  const currency = useAppStore((s) => s.currency);
  const months = getLastNMonths(6);

  const data = useMemo(() => {
    let runningBalance = 150000; // Starting balance
    return months.map((ym) => {
      const monthly = transactions.filter((t) => getYearMonth(t.date) === ym);
      const income = monthly.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
      const expense = monthly.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
      runningBalance += income - expense;
      return {
        month: formatMonthLabel(ym),
        balance: runningBalance,
      };
    });
  }, [transactions]);

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">Balance Trend</h3>
          <p className="text-slate-400 text-xs mt-0.5">Last 6 months</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-emerald-400 rounded-full inline-block" />
          <span className="text-slate-400 text-xs">Balance</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            width={48}
          />
          <Tooltip content={<CustomTooltip currency={currency} />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#balanceGradient)"
            dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#10b981' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
