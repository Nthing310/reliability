
import React from 'react';
import { Activity, LayoutDashboard, Database, BarChart3, Settings, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'analysis', label: 'Reliability Analysis', icon: BarChart3 },
    { id: 'settings', label: 'Model Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Activity size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">ReliabilityPro</span>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <HelpCircle size={16} />
              <span className="text-xs font-semibold uppercase">Quick Tip</span>
            </div>
            <p className="text-xs text-slate-400">
              The NTDS dataset is loaded by default for baseline comparisons.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <header className="sticky top-0 z-10 glass-panel h-16 flex items-center justify-between px-8 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            {menuItems.find(m => m.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              System: Online
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
