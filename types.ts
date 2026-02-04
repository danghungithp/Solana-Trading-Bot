
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export interface LogEntry {
  id: number;
  timestamp: string;
  level: LogLevel;
  message: string;
}

// Replaced trading 'Position' with wallet 'Holding'
export interface Holding {
  id: string; // mint address
  name: string;
  symbol: string;
  balance: number;
  price: number;
  value: number;
  logo: string;
}

// Data for the portfolio allocation pie chart
export interface AllocationDataPoint {
  name: string; // symbol
  value: number; // USD value
}

// Revamped analytics data structure for portfolio view
export interface PortfolioAnalytics {
  totalValue: number;
  tokenCount: number;
  largestHoldingValue: number;
  largestHoldingSymbol: string;
  allocation: AllocationDataPoint[];
}
