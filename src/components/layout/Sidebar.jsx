import React from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Settings,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from 'lucide-react';
import useAppStore from '../../context/AppContext';
import Badge from '../ui/Badge';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const { activePage, setActivePage, role, sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  return (
    <aside
      className={`hidden md:flex flex-col fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out
        bg-theme-sidebar backdrop-blur-xl border-r border-theme
        ${sidebarCollapsed ? 'w-16' : 'w-60'}`}
    >
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-theme min-h-[68px] ${sidebarCollapsed ? 'justify-center' : ''}`}>
        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 flex-shrink-0">
          <Wallet size={18} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <span className="block text-white font-bold text-base leading-none">FinFlow</span>
            <span className="block text-slate-400 text-xs mt-0.5">Dashboard</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${active
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-hover'
                }
                ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? label : ''}
            >
              <Icon size={18} className={`flex-shrink-0 ${active ? 'text-emerald-400' : 'group-hover:text-slate-200'}`} />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
              {!sidebarCollapsed && active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </nav>

      {!sidebarCollapsed && (
        <div className="px-4 py-3 border-t border-theme">
          <Badge variant={role === 'admin' ? 'admin' : 'viewer'}>
            {role === 'admin' ? '👑 Admin' : '👁 Viewer'}
          </Badge>
        </div>
      )}

      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-20 bg-theme-elevated border border-theme p-1 rounded-full text-theme-secondary hover:text-theme-primary hover:bg-theme-muted transition-all shadow-lg"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
};

export default Sidebar;
