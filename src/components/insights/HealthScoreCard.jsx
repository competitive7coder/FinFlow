import React, { useMemo } from 'react';
import {
  RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis
} from 'recharts';
import useAppStore from '../../context/AppContext';
import { getYearMonth } from '../../utils/dateHelpers';

const HealthScoreCard = () => {
  const transactions = useAppStore((s) => s.transactions);

  const { score, label, description, metrics } = useMemo(() => {
    const CURRENT = '2026-04';
    const monthly = transactions.filter((t) => getYearMonth(t.date) === CURRENT);
    const income = monthly.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
    const expense = monthly.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
    const savings = income > 0 ? ((income - expense) / income) * 100 : 0;

    // Score calc: savings rate (50pts) + spending ratio (30pts) + no failed (20pts)
    const failed = transactions.filter((t) => t.status === 'Failed').length;
    let sc = 0;
    sc += Math.min(50, savings * 0.7);
    sc += expense <= income ? 30 : Math.max(0, 30 - (expense - income) / 1000);
    sc += Math.max(0, 20 - failed * 5);
    sc = Math.round(Math.min(100, Math.max(0, sc)));

    const label = sc >= 80 ? 'Excellent' : sc >= 60 ? 'Good' : sc >= 40 ? 'Fair' : 'Needs Work';
    const description = sc >= 80
      ? 'Great savings discipline and spending control.'
      : sc >= 60
      ? 'On track. Consider increasing your savings.'
      : sc >= 40
      ? 'Expenses are high. Review your budget.'
      : 'Spending exceeds income. Time to act.';

    return {
      score: sc,
      label,
      description,
      metrics: [
        { label: 'Savings Rate', value: `${savings.toFixed(1)}%` },
        { label: 'Monthly Income', value: income },
        { label: 'Monthly Expense', value: expense },
      ],
    };
  }, [transactions]);

  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : score >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
      <div className="mb-4">
        <h3 className="text-white font-semibold">Financial Health Score</h3>
        <p className="text-slate-400 text-xs mt-0.5">Based on current month data</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 flex-shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="60%"
              outerRadius="100%"
              data={[{ value: score }]}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                fill={color}
                background={{ fill: '#1e293b' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className="text-2xl font-bold text-white">{score}</span>
            <span className="text-xs font-medium" style={{ color }}>{label}</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between">
              <span className="text-slate-500 text-xs">{m.label}</span>
              <span className="text-slate-200 text-xs font-semibold">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;
