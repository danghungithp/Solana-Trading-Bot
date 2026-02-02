
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-slate-200">Solana Trading Bot</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm text-green-400 font-medium">Bot Running</span>
        </div>
        <WalletMultiButton />
      </div>
    </header>
  );
};

export default Header;
