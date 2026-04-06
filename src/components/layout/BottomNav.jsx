import React from 'react';
import { LayoutDashboard, ArrowLeftRight, BarChart3, Settings } from 'lucide-react';
import useAppStore from '../../context/AppContext';

const navItems = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'transactions', label: 'Txns', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const BottomNav = () => {
  const { activePage, setActivePage } = useAppStore();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 flex">
      {navItems.map(({ id, label, icon: Icon }) => {
        const active = activePage === id;
        return (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all duration-200
              ${active ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
            {active && <span className="absolute bottom-1 w-4 h-0.5 rounded-full bg-emerald-400" />}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
