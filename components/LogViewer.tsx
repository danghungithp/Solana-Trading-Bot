
import React, { useRef, useEffect } from 'react';
import { LogEntry, LogLevel } from '../types';

interface LogViewerProps {
  logs: LogEntry[];
}

const getLogLevelColor = (level: LogLevel) => {
  switch (level) {
    case LogLevel.INFO:
      return 'text-sky-400';
    case LogLevel.WARN:
      return 'text-yellow-400';
    case LogLevel.ERROR:
      return 'text-red-400';
    case LogLevel.DEBUG:
      return 'text-gray-500';
    default:
      return 'text-slate-400';
  }
};

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
    const endOfLogsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfLogsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

  return (
    <div className="h-[calc(100vh-18rem)] overflow-y-auto bg-slate-900 p-3 rounded-lg font-mono text-xs">
      {logs.map((log) => (
        <div key={log.id} className="flex">
          <span className="text-slate-500 mr-2">{log.timestamp}</span>
          <span className={`${getLogLevelColor(log.level)} font-bold mr-2`}>[{log.level}]</span>
          <span className="text-slate-300 flex-1">{log.message}</span>
        </div>
      ))}
      <div ref={endOfLogsRef} />
    </div>
  );
};

export default LogViewer;
