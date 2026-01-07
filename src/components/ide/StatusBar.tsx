import React from 'react';
import { FileNode } from '@/lib/db';
import { getLanguageFromExtension } from '@/lib/fileUtils';
import { FileIcon } from '@/lib/fileIcons';
import { Circle, GitBranch, CheckCircle } from 'lucide-react';

interface StatusBarProps {
  activeFile: FileNode | null;
  totalFiles: number;
  isUnsaved: boolean;
  cursorPosition?: { line: number; column: number };
}

export function StatusBar({ activeFile, totalFiles, isUnsaved, cursorPosition }: StatusBarProps) {
  const language = activeFile ? getLanguageFromExtension(activeFile.name) : 'plaintext';

  return (
    <footer className="h-6 bg-primary text-primary-foreground flex items-center justify-between px-3 text-xs font-medium">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5" />
          <span>main</span>
        </div>
        
        {isUnsaved ? (
          <div className="flex items-center gap-1.5 text-status-modified">
            <Circle className="w-2.5 h-2.5 fill-current" />
            <span>Unsaved</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-status-added">
            <CheckCircle className="w-3 h-3" />
            <span>Saved</span>
          </div>
        )}
      </div>

      {/* Center section */}
      <div className="hidden sm:flex items-center gap-4">
        <span>{totalFiles} files</span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {cursorPosition && (
          <span>
            Ln {cursorPosition.line}, Col {cursorPosition.column}
          </span>
        )}
        
        {activeFile && (
          <>
            <span className="hidden sm:inline">UTF-8</span>
            <span className="flex items-center gap-1">
              <FileIcon filename={activeFile.name} type="file" className="w-3 h-3" />
              <span className="capitalize">{language}</span>
            </span>
          </>
        )}
      </div>
    </footer>
  );
}
