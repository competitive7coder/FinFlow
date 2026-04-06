import React, { useState } from 'react';
import { Sun, Moon, User, ChevronDown, Bell, Eye, Shield } from 'lucide-react';
import useAppStore from '../../context/AppContext';
import Badge from '../ui/Badge';

const Header = ({ title }) => {
  const { theme, setTheme, role, setRole, sidebarCollapsed } = useAppStore();
  const [roleOpen, setRoleOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setRoleOpen(false);
  };

  const offset = sidebarCollapsed ? 'md:left-16' : 'md:left-60';

  return (
    <header
      className={`fixed top-0 right-0 ${offset} left-0 z-30 transition-all duration-300
        flex items-center justify-between px-4 md:px-6 h-[68px]
        bg-theme-header backdrop-blur-xl border-b border-theme`}
    >
      <div className="flex items-center gap-3">
        <div className="md:hidden w-8" /> {/* spacer for mobile */}
        <h1 className="text-white font-semibold text-base md:text-lg capitalize">{title}</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden sm:block">
          <Badge variant={role === 'admin' ? 'admin' : 'viewer'}>
            {role === 'admin' ? (
              <><Shield size={11} /> Admin</>
            ) : (
              <><Eye size={11} /> Read-only</>
            )}
          </Badge>
        </div>

        <div className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
          >
            <User size={13} />
            <span className="hidden sm:inline capitalize">{role}</span>
            <ChevronDown size={12} className={`transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
          </button>
          {roleOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
              <button
                onClick={() => handleRoleChange('admin')}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors
                  ${role === 'admin' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
              >
                <Shield size={13} /> Admin
              </button>
              <button
                onClick={() => handleRoleChange('viewer')}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors
                  ${role === 'viewer' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
              >
                <Eye size={13} /> Viewer
              </button>
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-all relative">
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-violet-500/20 cursor-pointer">
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
