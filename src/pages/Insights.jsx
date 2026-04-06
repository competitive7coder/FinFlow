import React, { useMemo } from 'react';
import useAppStore from '../context/AppContext';
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart';
import CategoryProgressBar from '../components/insights/CategoryProgressBar';
import HealthScoreCard from '../components/insights/HealthScoreCard';
import { formatCurrency } from '../utils/formatCurrency';
import { getYearMonth } from '../utils/dateHelpers';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const MetricCard = ({ title, value, sub, icon: Icon, color }) => (
  <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
    <div className="flex items-start justify-between mb-3">
      <p className="text-slate-400 text-xs font-medium">{title}</p>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={14} className="text-white" />
      </div>
    </div>
    <p className="text-xl font-bold text-white">{value}</p>
    {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
  </div>
);

const Insights = () => {
  const { transactions, currency } = useAppStore();

  const metrics = useMemo(() => {
    const CURRENT = '2026-04';
    const PREVIOUS = '2026-03';

    const curr = transactions.filter((t) => getYearMonth(t.date) === CURRENT);
    const prev = transactions.filter((t) => getYearMonth(t.date) === PREVIOUS);

    const currIncome = curr.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
    const prevIncome = prev.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
    const currExp = curr.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
    const prevExp = prev.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);

    const incomeChange = prevIncome > 0 ? (((currIncome - prevIncome) / prevIncome) * 100).toFixed(1) : 0;
    const expChange = prevExp > 0 ? (((currExp - prevExp) / prevExp) * 100).toFixed(1) : 0;

    // Biggest income source
    const incomeMap = {};
    transactions.filter((t) => t.type === 'Income').forEach((t) => {
      incomeMap[t.category] = (incomeMap[t.category] || 0) + t.amount;
    });
    const topIncome = Object.entries(incomeMap).sort((a, b) => b[1] - a[1])[0];

    // Daily avg spend (this month, days elapsed = 6)
    const daysElapsed = 6;
    const dailyAvg = currExp / daysElapsed;

    return { currIncome, prevIncome, currExp, prevExp, incomeChange, expChange, topIncome, dailyAvg };
  }, [transactions, currency]);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Income (This Month)"
          value={formatCurrency(metrics.currIncome, currency)}
          sub={`${metrics.incomeChange >= 0 ? '+' : ''}${metrics.incomeChange}% vs last month`}
          icon={TrendingUp}
          color="bg-emerald-500"
        />
        <MetricCard
          title="Expenses (This Month)"
          value={formatCurrency(metrics.currExp, currency)}
          sub={`${metrics.expChange >= 0 ? '+' : ''}${metrics.expChange}% vs last month`}
          icon={TrendingDown}
          color="bg-rose-500"
        />
        <MetricCard
          title="Biggest Income Source"
          value={metrics.topIncome ? metrics.topIncome[0] : '—'}
          sub={metrics.topIncome ? formatCurrency(metrics.topIncome[1], currency) : ''}
          icon={DollarSign}
          color="bg-blue-500"
        />
        <MetricCard
          title="Daily Avg Spend"
          value={formatCurrency(Math.round(metrics.dailyAvg), currency)}
          sub="This month so far"
          icon={Activity}
          color="bg-violet-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthlyComparisonChart />
        <HealthScoreCard />
      </div>

      <CategoryProgressBar />
    </div>
  );
};

export default Insights;
