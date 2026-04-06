import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import useAppStore from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateHelpers';
import { categoryColors } from '../../data/mockData';

const statusStyles = {
  Completed: 'bg-emerald-500/15 text-emerald-400',
  Pending: 'bg-amber-500/15 text-amber-400',
  Failed: 'bg-rose-500/15 text-rose-400',
};

const TransactionRow = ({ txn, onEdit, onDelete }) => {
  const role = useAppStore((s) => s.role);
  const currency = useAppStore((s) => s.currency);
  const isIncome = txn.type === 'Income';
  const dotColor = categoryColors[txn.category] || '#6366f1';

  return (
    <tr className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors group">
      <td className="px-4 py-3 text-slate-400 text-sm whitespace-nowrap">{formatDate(txn.date)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
            style={{ backgroundColor: `${dotColor}20` }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
          </div>
          <span className="text-slate-200 text-sm font-medium truncate max-w-[200px]">{txn.description}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ color: dotColor, backgroundColor: `${dotColor}20` }}
        >
          {txn.category}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
          ${isIncome ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}
        >
          {txn.type}
        </span>
      </td>
      <td className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
        {isIncome ? '+' : '-'}{formatCurrency(txn.amount, currency)}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[txn.status] || ''}`}>
          {txn.status}
        </span>
      </td>
      {role === 'admin' && (
        <td className="px-4 py-3">
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(txn)}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition-all"
              title="Edit"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete(txn)}
              className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 hover:text-rose-300 transition-all"
              title="Delete"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default TransactionRow;
