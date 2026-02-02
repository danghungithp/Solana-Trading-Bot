
import React from 'react';
import BotIcon from './icons/BotIcon';
import ChartIcon from './icons/ChartIcon';
import SettingsIcon from './icons/SettingsIcon';
import LogsIcon from './icons/LogsIcon';
import TableIcon from './icons/TableIcon';
import DataIcon from './icons/DataIcon';

type View = 'dashboard' | 'settings' | 'positions' | 'logs' | 'datasources';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-sky-500 text-white shadow-lg'
        : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-slate-800 p-6 flex-col hidden md:flex">
      <div className="flex items-center space-x-3 mb-10">
        <BotIcon className="w-10 h-10 text-sky-400" />
        <span className="text-2xl font-bold text-slate-100">SolBot</span>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem
          icon={<ChartIcon className="w-6 h-6" />}
          label="Dashboard"
          isActive={activeView === 'dashboard'}
          onClick={() => setActiveView('dashboard')}
        />
        <NavItem
          icon={<TableIcon className="w-6 h-6" />}
          label="Positions"
          isActive={activeView === 'positions'}
          onClick={() => setActiveView('positions')}
        />
         <NavItem
          icon={<LogsIcon className="w-6 h-6" />}
          label="Logs"
          isActive={activeView === 'logs'}
          onClick={() => setActiveView('logs')}
        />
        <NavItem
          icon={<DataIcon className="w-6 h-6" />}
          label="Data Sources"
          isActive={activeView === 'datasources'}
          onClick={() => setActiveView('datasources')}
        />
        <NavItem
          icon={<SettingsIcon className="w-6 h-6" />}
          label="Settings"
          isActive={activeView === 'settings'}
          onClick={() => setActiveView('settings')}
        />
      </nav>
      <div className="mt-auto text-center text-xs text-slate-500">
        <p>Solana Trading Bot v1.0.0</p>
        <p>&copy; 2024 Enterprise Solutions</p>
      </div>
    </aside>
  );
};

export default Sidebar;
