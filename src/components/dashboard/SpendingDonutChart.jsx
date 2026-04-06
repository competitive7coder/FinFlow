import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useAppStore from '../../context/AppContext';
import { categoryColors } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{name}</p>
        <p className="text-white font-semibold text-sm">{formatCurrency(value, currency)}</p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SpendingDonutChart = () => {
  const transactions = useAppStore((s) => s.transactions);
  const currency = useAppStore((s) => s.currency);

  const data = useMemo(() => {
    const expenseMap = {};
    transactions
      .filter((t) => t.type === 'Expense')
      .forEach((t) => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
      });
    return Object.entries(expenseMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
      <div className="mb-4">
        <h3 className="text-white font-semibold">Spending Breakdown</h3>
        <p className="text-slate-400 text-xs mt-0.5">By category (all time)</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            strokeWidth={2}
            stroke="#1e293b"
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={categoryColors[entry.name] || '#6366f1'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip currency={currency} />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-slate-400 text-xs">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingDonutChart;
