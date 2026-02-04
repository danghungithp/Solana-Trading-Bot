
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PortfolioAnalytics, Holding, LogEntry, LogLevel } from '../types';
import MetricCard from './MetricCard';
import PortfolioPieChart from './PortfolioPieChart';
import PositionsTable from './PositionsTable';
import LogViewer from './LogViewer';
import { HELIUS_RPC_URL, HELIUS_WEBSOCKET_URL } from '../config';

const Dashboard: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.INFO, message: 'Dashboard initialized. Waiting for wallet connection...' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!publicKey) return;

      setLoading(true);
      setError(null);
      setAnalytics(null);
      setHoldings([]);

      try {
        const response = await fetch(HELIUS_RPC_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetsByOwner',
            params: {
              ownerAddress: publicKey.toBase58(),
              page: 1,
              limit: 1000,
              displayOptions: { showFungible: true },
            },
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch assets from Helius');
        const data = await response.json();
        
        const assets = data.result.items.filter((item: any) => 
            (item.interface === 'FungibleToken' || item.interface === 'FungibleAsset') && 
            item.token_info?.balance > 0 &&
            !item.compression?.compressed
        );

        if (assets.length === 0) {
            setAnalytics({ totalValue: 0, tokenCount: 0, largestHoldingValue: 0, largestHoldingSymbol: 'N/A', allocation: [] });
            setHoldings([]);
            setLoading(false);
            return;
        }

        const mints = assets.map((asset: any) => asset.id).join(',');
        const priceResponse = await fetch(`https://price.jup.ag/v4/price?ids=${mints}`);
        if (!priceResponse.ok) console.error('Could not fetch prices from Jupiter, some values may be incorrect.');
        const priceData = await priceResponse.json();
        
        const newHoldings: Holding[] = assets.map((asset: any) => {
            const price = priceData.data[asset.id]?.price || 0;
            const balance = asset.token_info.balance / Math.pow(10, asset.token_info.decimals);
            const value = balance * price;

            return {
                id: asset.id,
                name: asset.content?.metadata?.name || 'Unknown Token',
                symbol: asset.content?.metadata?.symbol || 'N/A',
                balance,
                price,
                value,
                logo: asset.content?.links?.image || 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
            };
        }).sort((a, b) => b.value - a.value);

        const totalValue = newHoldings.reduce((sum, h) => sum + h.value, 0);
        const allocation = newHoldings
            .filter(h => h.value > 0.01 * totalValue) // Group small balances into "Others"
            .map(h => ({ name: h.symbol, value: h.value }));
        
        const otherValue = newHoldings
            .filter(h => h.value <= 0.01 * totalValue)
            .reduce((sum, h) => sum + h.value, 0);
            
        if (otherValue > 0) {
            allocation.push({ name: 'Others', value: otherValue });
        }
        
        const largestHolding = newHoldings[0] || { value: 0, symbol: 'N/A' };
        
        setHoldings(newHoldings);
        setAnalytics({
            totalValue,
            tokenCount: newHoldings.length,
            largestHoldingValue: largestHolding.value,
            largestHoldingSymbol: largestHolding.symbol,
            allocation,
        });

      } catch (e: any) {
        console.error("Error fetching wallet data:", e);
        setError(e.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (connected && publicKey) {
      fetchWalletData();
    } else {
      setAnalytics(null);
      setHoldings([]);
      setError(null);
    }
  }, [publicKey, connected]);

  useEffect(() => {
    const ws = new WebSocket(HELIUS_WEBSOCKET_URL);
    ws.onopen = () => {
      setLogs(prev => [...prev, { id: prev.length + 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.INFO, message: 'Connected to Helius WebSocket (Devnet).' }].slice(-100));
      ws.send(JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "logsSubscribe",
          params: [ { "mentions": ["11111111111111111111111111111111"] }, { "commitment": "processed" } ]
      }));
    };
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'logsNotification') {
          const signature = data.params.result.value.signature;
          const message = `Transaction detected: ${signature.slice(0, 10)}...`;
          setLogs(prev => [ ...prev, { id: prev.length + 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.DEBUG, message } ].slice(-100));
        }
    };
    ws.onerror = () => setLogs(prev => [...prev, { id: prev.length + 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.ERROR, message: 'WebSocket connection error.' }].slice(-100));
    ws.onclose = () => setLogs(prev => [...prev, { id: prev.length + 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.WARN, message: 'Disconnected from Helius WebSocket.' }].slice(-100));
    return () => { if (ws.readyState === WebSocket.OPEN) ws.close(); };
  }, []);

  const renderLeftPanelContent = () => {
    if (!connected) {
      return (
        <div className="flex col-span-full items-center justify-center min-h-[400px] bg-slate-800/50 rounded-xl">
          <p className="text-xl text-slate-400">Please connect your wallet to view your portfolio.</p>
        </div>
      );
    }
    if (loading) {
      return (
        <div className="flex col-span-full items-center justify-center min-h-[400px]">
           <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl text-slate-400">Loading portfolio data...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex col-span-full items-center justify-center min-h-[400px] bg-red-900/30 border border-red-700 rounded-xl p-4">
          <p className="text-xl text-red-300 text-center">Error: {error}</p>
        </div>
      );
    }
    if (!analytics || holdings.length === 0) {
      return (
        <div className="flex col-span-full items-center justify-center min-h-[400px] bg-slate-800/50 rounded-xl">
          <p className="text-xl text-slate-400">No token holdings found in this wallet.</p>
        </div>
      );
    }
    return (
      <>
        <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg h-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-slate-200">Portfolio Allocation</h2>
            <PortfolioPieChart data={analytics.allocation} />
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-200">Holdings</h2>
            <PositionsTable holdings={holdings} />
        </div>
      </>
    );
  };

  return (
    <div className="space-y-8">
      {connected && !loading && !error && analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard title="Total Portfolio Value" value={`$${analytics.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          <MetricCard title="Tokens Held" value={analytics.tokenCount.toString()} />
          <MetricCard title="Largest Position" value={`$${analytics.largestHoldingValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} subValue={analytics.largestHoldingSymbol} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {renderLeftPanelContent()}
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-200">Live Logs</h2>
            <LogViewer logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
