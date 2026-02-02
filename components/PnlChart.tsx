
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Defs, Gradient, Stop } from 'recharts';
import { PnlDataPoint } from '../types';

interface PnlChartProps {
  data: PnlDataPoint[];
}

const PnlChart: React.FC<PnlChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="time" tick={{ fill: '#94a3b8' }} fontSize={12} />
        <YAxis tick={{ fill: '#94a3b8' }} fontSize={12} domain={['auto', 'auto']} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)', // slate-900 with opacity
            borderColor: '#334155', // slate-700
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#f1f5f9' }} // slate-100
        />
        <Area type="monotone" dataKey="pnl" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorPnl)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PnlChart;
