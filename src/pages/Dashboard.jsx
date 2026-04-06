import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import useAppStore from '../context/AppContext';
import SummaryCard from '../components/dashboard/SummaryCard';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingDonutChart from '../components/dashboard/SpendingDonutChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import InsightBar from '../components/dashboard/InsightBar';
import { SkeletonCard, SkeletonChart } from '../components/ui/Skeleton';
import { getYearMonth } from '../utils/dateHelpers';

const Dashboard = () => {
  const { transactions, isLoading } = useAppStore();

  const stats = useMemo(() => {
    const CURRENT = '2026-04';
    const thisMonth = transactions.filter((t) => getYearMonth(t.date) === CURRENT);
    const income = thisMonth.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
    const expense = thisMonth.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
    const totalBalance = transactions.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0)
      - transactions.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0) + 150000;
    const savingsRate = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
    return { income, expense, totalBalance, savingsRate };
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><SkeletonChart /></div>
          <SkeletonChart />
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Balance',
      value: stats.totalBalance,
      icon: Wallet,
      colorClass: 'bg-emerald-500',
      trend: 'up',
      trendValue: '+12.5%',
      subtitle: 'All time net balance',
    },
    {
      title: 'Income This Month',
      value: stats.income,
      icon: TrendingUp,
      colorClass: 'bg-blue-500',
      trend: 'up',
      trendValue: '+8.2%',
      subtitle: 'vs last month',
    },
    {
      title: 'Expenses This Month',
      value: stats.expense,
      icon: TrendingDown,
      colorClass: 'bg-rose-500',
      trend: 'down',
      trendValue: '-3.1%',
      subtitle: 'vs last month',
    },
    {
      title: 'Savings Rate',
      value: stats.savingsRate,
      icon: PiggyBank,
      colorClass: 'bg-violet-500',
      trend: stats.savingsRate >= 20 ? 'up' : 'down',
      trendValue: `${stats.savingsRate}%`,
      subtitle: 'of monthly income',
      isCurrency: false,
      suffix: '%',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => <SummaryCard key={c.title} {...c} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <SpendingDonutChart />
      </div>

      <InsightBar />

      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
