
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AllocationDataPoint } from '../types';

interface PortfolioPieChartProps {
  data: AllocationDataPoint[];
}

const COLORS = ['#0ea5e9', '#34d399', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b', '#f43f5e'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percent = payload[0].percent;
    return (
      <div className="bg-slate-900/80 p-3 border border-slate-700 rounded-md shadow-lg text-sm">
        <p className="text-slate-200 font-bold">{`${data.name}: $${data.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
        <p className="text-slate-400">{`(${(percent * 100).toFixed(2)}%)`}</p>
      </div>
    );
  }
  return null;
};

const PortfolioPieChart: React.FC<PortfolioPieChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-slate-500">No allocation data available.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
            iconType="circle" 
            wrapperStyle={{ fontSize: '14px', color: '#94a3b8', paddingTop: '20px' }} 
            formatter={(value) => <span className="text-slate-300">{value}</span>}
        />
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PortfolioPieChart;
