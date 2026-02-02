
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Header from './components/Header';
import WalletContextProvider from './components/WalletContextProvider';
import DataSources from './components/DataSources';

type View = 'dashboard' | 'settings' | 'positions' | 'logs' | 'datasources';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return <Settings />;
      case 'datasources':
        return <DataSources />;
      // In a real app, these would be separate components.
      // For this example, we'll just show the main dashboard content.
      case 'positions':
        return <Dashboard />;
      case 'logs':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <WalletContextProvider>
      <div className="flex h-screen bg-slate-900 text-slate-50 font-sans">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-4 md:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </WalletContextProvider>
  );
};

export default App;
