import React from 'react';
import useAppStore from '../context/AppContext';
import { Sun, Moon, Shield, Eye, Download, IndianRupee, DollarSign, Euro } from 'lucide-react';
import { exportToCSV, exportToJSON } from '../utils/exportCSV';

const SettingRow = ({ label, description, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-700/30 last:border-0">
    <div>
      <p className="text-white text-sm font-medium">{label}</p>
      {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
    </div>
    <div>{children}</div>
  </div>
);

const Settings = () => {
  const { role, setRole, theme, setTheme, currency, setCurrency, transactions, addToast } = useAppStore();

  const handleExportCSV = () => {
    exportToCSV(transactions, 'finance-dashboard-export.csv');
    addToast('CSV exported successfully!', 'success');
  };

  const handleExportJSON = () => {
    exportToJSON(transactions, 'finance-dashboard-export.json');
    addToast('JSON exported successfully!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
        <h2 className="text-white font-semibold mb-1">Account</h2>
        <p className="text-slate-400 text-xs mb-4">Manage your role and access level</p>

        <SettingRow label="Role" description="Switch between Admin (full access) and Viewer (read-only)">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRole('viewer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                ${role === 'viewer'
                  ? 'bg-slate-700 border-slate-500 text-slate-200'
                  : 'border-slate-700 text-slate-500 hover:text-slate-300'}`}
            >
              <Eye size={12} /> Viewer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                ${role === 'admin'
                  ? 'bg-violet-600 border-violet-500 text-white'
                  : 'border-slate-700 text-slate-500 hover:text-slate-300'}`}
            >
              <Shield size={12} /> Admin
            </button>
          </div>
        </SettingRow>
      </div>

      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
        <h2 className="text-white font-semibold mb-1">Appearance</h2>
        <p className="text-slate-400 text-xs mb-4">Customize the look and feel</p>

        <SettingRow label="Theme" description="Toggle between dark and light mode">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                ${theme === 'dark'
                  ? 'bg-slate-700 border-slate-500 text-slate-200'
                  : 'border-slate-700 text-slate-500 hover:text-slate-300'}`}
            >
              <Moon size={12} /> Dark
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                ${theme === 'light'
                  ? 'bg-amber-500 border-amber-400 text-white'
                  : 'border-slate-700 text-slate-500 hover:text-slate-300'}`}
            >
              <Sun size={12} /> Light
            </button>
          </div>
        </SettingRow>
      </div>

      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
        <h2 className="text-white font-semibold mb-1">Currency</h2>
        <p className="text-slate-400 text-xs mb-4">Choose your preferred currency format</p>

        <SettingRow label="Display Currency" description="Affects how amounts are formatted">
          <div className="flex items-center gap-2">
            {[
              { code: 'INR', icon: IndianRupee, label: '₹ INR' },
              { code: 'USD', icon: DollarSign, label: '$ USD' },
              { code: 'EUR', icon: Euro, label: '€ EUR' },
            ].map(({ code, icon: Icon, label }) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                  ${currency === code
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'border-slate-700 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon size={11} /> {label}
              </button>
            ))}
          </div>
        </SettingRow>
      </div>

      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5">
        <h2 className="text-white font-semibold mb-1">Data Export</h2>
        <p className="text-slate-400 text-xs mb-4">Download your transaction data</p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-all shadow-lg shadow-emerald-500/20"
          >
            <Download size={15} /> Export CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium border border-slate-600 transition-all"
          >
            <Download size={15} /> Export JSON
          </button>
        </div>
        <p className="text-slate-600 text-xs mt-3">
          Exports all {transactions.length} transactions as a downloadable file.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/30 p-4 text-center">
        <p className="text-slate-600 text-xs">Finance Dashboard UI · v1.0.0 · Built with React + Tailwind + Recharts</p>
      </div>
    </div>
  );
};

export default Settings;
