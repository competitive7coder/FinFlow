import React, { useEffect } from 'react';
import useAppStore from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import ToastContainer from './components/ui/Toast';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import Settings from './pages/Settings';

const pageConfig = {
  dashboard: { component: Dashboard, title: 'Dashboard' },
  transactions: { component: Transactions, title: 'Transactions' },
  insights: { component: Insights, title: 'Insights' },
  settings: { component: Settings, title: 'Settings' },
};

function App() {
  const { theme, activePage, sidebarCollapsed, setLoading } = useAppStore();

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const { component: PageComponent, title } = pageConfig[activePage] || pageConfig.dashboard;
  const mainOffset = sidebarCollapsed ? 'md:ml-16' : 'md:ml-60';

  return (
    <div className="min-h-screen bg-theme-page text-theme-primary transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <Sidebar />
      <Header title={title} />

      <main
        className={`relative transition-all duration-300 pt-[68px] pb-[72px] md:pb-6 px-4 md:px-6 min-h-screen ${mainOffset}`}
      >
        <div className="py-5 max-w-7xl mx-auto">
          <PageComponent />
        </div>
      </main>

      <BottomNav />
      <ToastContainer />
    </div>
  );
}

export default App;
