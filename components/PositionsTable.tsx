
import React from 'react';
import { Position } from '../types';

interface PositionsTableProps {
  positions: Position[];
}

const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3">Token</th>
            <th scope="col" className="px-6 py-3">Entry Price</th>
            <th scope="col" className="px-6 py-3">Current Price</th>
            <th scope="col" className="px-6 py-3">Size</th>
            <th scope="col" className="px-6 py-3">P&L</th>
            <th scope="col" className="px-6 py-3">Entry Time</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.id} className="border-b border-slate-700 hover:bg-slate-700/30">
              <th scope="row" className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap">
                {pos.token}
              </th>
              <td className="px-6 py-4">${pos.entryPrice}</td>
              <td className="px-6 py-4">${pos.currentPrice}</td>
              <td className="px-6 py-4">{pos.size}</td>
              <td className={`px-6 py-4 font-semibold ${pos.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${pos.pnl.toFixed(2)}
              </td>
              <td className="px-6 py-4">{pos.entryTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
