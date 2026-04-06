import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import useAppStore from '../../context/AppContext';
import { categories, statusOptions } from '../../data/mockData';
import Button from '../ui/Button';

const FilterBar = () => {
  const { filters, setFilter, resetFilters } = useAppStore();

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-4 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
          {filters.search && (
            <button onClick={() => setFilter('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X size={13} />
            </button>
          )}
        </div>

        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
          className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value)}
          className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
        >
          <option value="All">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilter('status', e.target.value)}
          className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
        >
          <option value="All">All Status</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            setFilter('sortBy', sortBy);
            setFilter('sortOrder', sortOrder);
          }}
          className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
        >
          <option value="date-desc">Date ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="amount-desc">Amount ↓</option>
          <option value="amount-asc">Amount ↑</option>
        </select>

        <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5">
          <RotateCcw size={13} /> Reset
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-slate-500 text-xs">Date range:</span>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter('dateFrom', e.target.value)}
          className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
        />
        <span className="text-slate-500 text-xs">to</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter('dateTo', e.target.value)}
          className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
        />
      </div>
    </div>
  );
};

export default FilterBar;
