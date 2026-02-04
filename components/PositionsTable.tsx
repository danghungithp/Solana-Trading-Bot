
import React from 'react';
import { Holding } from '../types';

interface PositionsTableProps {
  holdings: Holding[];
}

const PositionsTable: React.FC<PositionsTableProps> = ({ holdings }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3">Asset</th>
            <th scope="col" className="px-6 py-3 text-right">Balance</th>
            <th scope="col" className="px-6 py-3 text-right">Price</th>
            <th scope="col" className="px-6 py-3 text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.id} className="border-b border-slate-700 hover:bg-slate-700/30">
              <th scope="row" className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap flex items-center gap-3">
                <img src={holding.logo} alt={holding.name} className="w-8 h-8 rounded-full bg-slate-700" />
                <div>
                    <div>{holding.name}</div>
                    <div className="text-xs text-slate-500 font-normal">{holding.symbol}</div>
                </div>
              </th>
              <td className="px-6 py-4 text-right">{holding.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</td>
              <td className="px-6 py-4 text-right">${holding.price > 0.01 ? holding.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : holding.price.toExponential(2)}</td>
              <td className="px-6 py-4 font-semibold text-right text-slate-200">
                ${holding.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
