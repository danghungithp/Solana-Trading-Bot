
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-slate-100">{value}</p>
        {subValue && (
            <p className="text-sm font-semibold text-slate-300 bg-slate-700 px-2 py-1 rounded">{subValue}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
