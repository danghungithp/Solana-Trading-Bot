
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-slate-100">{value}</p>
        {change !== undefined && (
          <span className={`flex items-center text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
             {isPositive ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            ${change.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
