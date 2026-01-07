import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: Date;
}

interface TerminalProps {
  logs: LogEntry[];
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Terminal({ logs, onClear, isOpen, onToggle }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'warn':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div
      className={cn(
        'border-t border-border bg-card transition-all duration-200',
        isOpen ? 'h-48' : 'h-8'
      )}
    >
      {/* Header */}
      <div
        className="h-8 flex items-center justify-between px-3 cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium">Output</span>
          {logs.length > 0 && (
            <span className="text-xs text-muted-foreground">({logs.length})</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            title="Clear"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Log Content */}
      {isOpen && (
        <div ref={scrollRef} className="h-[calc(100%-2rem)] overflow-auto p-2 font-mono text-xs">
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-center py-4">
              Console output will appear here when running code preview
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className={cn('py-0.5 flex gap-2', getLogColor(log.type))}>
                <span className="text-muted-foreground opacity-60">
                  [{log.timestamp.toLocaleTimeString()}]
                </span>
                <span className="flex-1 break-all whitespace-pre-wrap">{log.message}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
