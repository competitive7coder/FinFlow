import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

let toastId = 0;

const useAppStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      
      role: 'admin',
      theme: 'dark',
      activePage: 'dashboard',
      
      filters: {
        search: '',
        category: 'All',
        type: 'All',
        status: 'All',
        dateFrom: '',
        dateTo: '',
        sortBy: 'date',
        sortOrder: 'desc',
      },

      currency: 'INR',

      toasts: [],

      sidebarCollapsed: false,

      isLoading: true,

      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      setActivePage: (page) => set({ activePage: page }),
      setCurrency: (currency) => set({ currency }),
      setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),
      setLoading: (val) => set({ isLoading: val }),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () =>
        set({
          filters: {
            search: '',
            category: 'All',
            type: 'All',
            status: 'All',
            dateFrom: '',
            dateTo: '',
            sortBy: 'date',
            sortOrder: 'desc',
          },
        }),

      addTransaction: (txn) => {
        const newTxn = { ...txn, id: `txn${Date.now()}` };
        set((state) => ({ transactions: [newTxn, ...state.transactions] }));
        get().addToast('Transaction added successfully!', 'success');
      },

      editTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
        get().addToast('Transaction updated successfully!', 'success');
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
        get().addToast('Transaction deleted.', 'warning');
      },

      addToast: (message, type = 'info') => {
        const id = ++toastId;
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => {
          get().removeToast(id);
        }, 4000);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },

      // Derived: get filtered + sorted transactions
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }
        if (filters.category !== 'All') {
          result = result.filter((t) => t.category === filters.category);
        }
        if (filters.type !== 'All') {
          result = result.filter((t) => t.type === filters.type);
        }
        if (filters.status !== 'All') {
          result = result.filter((t) => t.status === filters.status);
        }
        if (filters.dateFrom) {
          result = result.filter((t) => t.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
          result = result.filter((t) => t.date <= filters.dateTo);
        }

        result.sort((a, b) => {
          if (filters.sortBy === 'date') {
            return filters.sortOrder === 'desc'
              ? new Date(b.date) - new Date(a.date)
              : new Date(a.date) - new Date(b.date);
          }
          if (filters.sortBy === 'amount') {
            return filters.sortOrder === 'desc'
              ? b.amount - a.amount
              : a.amount - b.amount;
          }
          return 0;
        });

        return result;
      },
    }),
    {
      name: 'finance-dashboard-store',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
        currency: state.currency,
      }),
    }
  )
);

export default useAppStore;
