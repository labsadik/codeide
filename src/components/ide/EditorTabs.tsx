import React from 'react';
import { X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileNode } from '@/lib/db';
import { FileIcon } from '@/lib/fileIcons';

interface EditorTabsProps {
  tabs: FileNode[];
  activeTabId: string | null;
  unsavedFiles: Set<string>;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onSplitRight?: (id: string) => void;
}

export function EditorTabs({
  tabs,
  activeTabId,
  unsavedFiles,
  onTabClick,
  onTabClose,
  onSplitRight,
}: EditorTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center bg-tab-inactive border-b border-border overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        const isUnsaved = unsavedFiles.has(tab.id);

        return (
          <div
            key={tab.id}
            className={cn(
              'group flex items-center gap-2 px-3 py-2 border-r border-border cursor-pointer transition-smooth min-w-[120px] max-w-[200px]',
              isActive
                ? 'bg-tab-active text-foreground border-t-2 border-t-primary'
                : 'bg-tab-inactive text-muted-foreground hover:bg-tab-hover border-t-2 border-t-transparent'
            )}
            onClick={() => onTabClick(tab.id)}
            onDoubleClick={() => onSplitRight?.(tab.id)}
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onTabClick(tab.id);
              if (e.key === 'Delete' || (e.key === 'w' && (e.metaKey || e.ctrlKey))) {
                e.preventDefault();
                onTabClose(tab.id);
              }
            }}
          >
            {/* File icon */}
            <FileIcon filename={tab.name} type="file" className="w-4 h-4 flex-shrink-0" />

            {/* File name */}
            <span className="flex-1 truncate text-sm">{tab.name}</span>

            {/* Unsaved indicator / Close button */}
            <button
              className={cn(
                'w-4 h-4 flex items-center justify-center rounded-sm transition-smooth',
                'hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring',
                isUnsaved ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              )}
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              title={isUnsaved ? 'Unsaved changes - Click to close' : 'Close'}
            >
              {isUnsaved ? (
                <Circle className="w-2 h-2 fill-status-modified text-status-modified" />
              ) : (
                <X className="w-3 h-3" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
