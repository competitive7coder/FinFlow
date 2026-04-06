import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, FileText } from 'lucide-react';
import useAppStore from '../../context/AppContext';
import TransactionRow from './TransactionRow';
import Button from '../ui/Button';

const PAGE_SIZE = 10;

const TransactionTable = ({ onAdd, onEdit, onDelete }) => {
  const { role, getFilteredTransactions } = useAppStore();
  const [page, setPage] = useState(1);
  const filtered = getFilteredTransactions();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePage = (p) => setPage(Math.min(Math.max(p, 1), totalPages));

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
        <div>
          <h3 className="text-white font-semibold">All Transactions</h3>
          <p className="text-slate-400 text-xs mt-0.5">{filtered.length} records found</p>
        </div>
        {role === 'admin' && (
          <Button variant="primary" size="sm" onClick={onAdd}>
            <Plus size={14} /> Add Transaction
          </Button>
        )}
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <FileText size={40} className="text-slate-600 mb-3" />
            <p className="text-slate-400 font-medium">No transactions found</p>
            <p className="text-slate-600 text-sm mt-1">Try changing your search or filters</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                {['Date', 'Description', 'Category', 'Type', 'Amount', 'Status', ...(role === 'admin' ? ['Actions'] : [])].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((txn) => (
                <TransactionRow key={txn.id} txn={txn} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-700/50">
          <span className="text-slate-400 text-xs">
            Page {page} of {totalPages} · {filtered.length} total
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pg = i + 1;
              return (
                <button
                  key={pg}
                  onClick={() => handlePage(pg)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all
                    ${page === pg ? 'bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white'}`}
                >
                  {pg}
                </button>
              );
            })}
            <button
              onClick={() => handlePage(page + 1)}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
