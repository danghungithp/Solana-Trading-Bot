
import React, { useState, useEffect } from 'react';
import { AnalyticsData, Position, LogEntry, LogLevel, PositionStatus, PnlDataPoint } from '../types';
import MetricCard from './MetricCard';
import PnlChart from './PnlChart';
import PositionsTable from './PositionsTable';
import LogViewer from './LogViewer';
import { HELIUS_WEBSOCKET_URL } from '../config';

const initialPnlHistory: PnlDataPoint[] = Array.from({ length: 20 }, (_, i) => ({
  time: new Date(Date.now() - (20 - i) * 60000).toLocaleTimeString(),
  pnl: parseFloat((Math.random() * 200 - 100).toFixed(2)),
}));

const initialAnalytics: AnalyticsData = {
  totalPnl: 1254.32,
  dailyPnl: 157.89,
  winRate: 68.5,
  sharpeRatio: 1.87,
  openPositions: 3,
  pnlHistory: initialPnlHistory,
};

const initialPositions: Position[] = [
  { id: '1', token: 'WIF', entryPrice: 2.5, currentPrice: 2.8, size: 100, pnl: 30, status: PositionStatus.OPEN, entryTime: new Date().toLocaleTimeString() },
  { id: '2', token: 'BONK', entryPrice: 0.00002, currentPrice: 0.000025, size: 1000000, pnl: 5, status: PositionStatus.OPEN, entryTime: new Date().toLocaleTimeString() },
  { id: '3', token: 'JUP', entryPrice: 1.1, currentPrice: 1.05, size: 500, pnl: -25, status: PositionStatus.OPEN, entryTime: new Date().toLocaleTimeString() },
];

const initialLogs: LogEntry[] = [
  { id: 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.INFO, message: 'Connecting to Helius for real-time logs...' },
];

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics);
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

  // Effect for SIMULATED data (P&L, Positions)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate analytics update
      setAnalytics(prev => {
        const pnlChange = Math.random() * 20 - 10;
        const newTotalPnl = parseFloat((prev.totalPnl + pnlChange).toFixed(2));
        const newDailyPnl = parseFloat((prev.dailyPnl + pnlChange).toFixed(2));
        const newPnlPoint = {
          time: new Date().toLocaleTimeString(),
          pnl: newTotalPnl,
        };
        const newPnlHistory = [...prev.pnlHistory.slice(1), newPnlPoint];
        return {
          ...prev,
          totalPnl: newTotalPnl,
          dailyPnl: newDailyPnl,
          pnlHistory: newPnlHistory,
          winRate: parseFloat((prev.winRate + (Math.random() - 0.5) * 0.1).toFixed(2)),
        };
      });

      // Simulate position price changes
      setPositions(prev => prev.map(p => {
        const priceChange = p.currentPrice * (Math.random() - 0.5) * 0.01;
        const newCurrentPrice = p.currentPrice + priceChange;
        const newPnl = (newCurrentPrice - p.entryPrice) * p.size;
        return {
          ...p,
          currentPrice: parseFloat(newCurrentPrice.toPrecision(4)),
          pnl: parseFloat(newPnl.toFixed(2)),
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Effect for REAL-TIME log data from Helius
  useEffect(() => {
    const ws = new WebSocket(HELIUS_WEBSOCKET_URL);

    ws.onopen = () => {
      setLogs(prev => [...prev, { id: prev.length + 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.INFO, message: 'Successfully connected to Helius WebSocket.' }].slice(-100));
      
      // Subscribe to logs mentioning the System Program to get a steady stream of data
      ws.send(JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "logsSubscribe",
          params: [
              { "mentions": ["11111111111111111111111111111111"] }, // Solana System Program
              { "commitment": "processed" }
          ]
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.method === 'logsNotification') {
          const signature = data.params.result.value.signature;
          const message = `New transaction detected: ${signature.slice(0, 10)}...${signature.slice(-10)}`;
          
          setLogs(prev => [
              ...prev,
              {
                  id: prev.length + 1,
                  timestamp: new Date().toLocaleTimeString(),
                  level: LogLevel.DEBUG,
                  message: message,
              }
          ].slice(-100)); // Keep last 100 logs
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setLogs(prev => [...prev, { id: prev.length + 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.ERROR, message: 'WebSocket connection error.' }].slice(-100));
    };

    ws.onclose = () => {
      setLogs(prev => [...prev, { id: prev.length + 1, timestamp: new Date().toLocaleTimeString(), level: LogLevel.WARN, message: 'Disconnected from Helius WebSocket.' }].slice(-100));
    };

    // Cleanup: close the connection when the component unmounts
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total P&L" value={`$${analytics.totalPnl.toFixed(2)}`} change={analytics.dailyPnl} />
        <MetricCard title="Win Rate" value={`${analytics.winRate}%`} />
        <MetricCard title="Sharpe Ratio" value={analytics.sharpeRatio.toString()} />
        <MetricCard title="Open Positions" value={analytics.openPositions.toString()} />
      </div>

      {/* Main Grid with Chart, Positions, Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg h-[400px]">
                <h2 className="text-xl font-semibold mb-4 text-slate-200">P&L Over Time</h2>
                <PnlChart data={analytics.pnlHistory} />
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-slate-200">Active Positions</h2>
                <PositionsTable positions={positions} />
            </div>
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