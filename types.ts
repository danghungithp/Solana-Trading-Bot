
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

export enum PositionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface Position {
  id: string;
  token: string;
  entryPrice: number;
  currentPrice: number;
  size: number;
  pnl: number;
  status: PositionStatus;
  entryTime: string;
}

export interface PnlDataPoint {
  time: string;
  pnl: number;
}

export interface AnalyticsData {
  totalPnl: number;
  dailyPnl: number;
  winRate: number;
  sharpeRatio: number;
  openPositions: number;
  pnlHistory: PnlDataPoint[];
}
