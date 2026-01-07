import React from 'react';
import { Keyboard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KeyboardShortcutsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ShortcutCategory {
  name: string;
  shortcuts: { keys: string[]; description: string }[];
}

const SHORTCUTS: ShortcutCategory[] = [
  {
    name: 'General',
    shortcuts: [
      { keys: ['Ctrl', 'P'], description: 'Quick Open / Command Palette' },
      { keys: ['Ctrl', 'B'], description: 'Toggle Sidebar' },
      { keys: ['Ctrl', 'K', 'Ctrl', 'S'], description: 'Keyboard Shortcuts' },
      { keys: ['Ctrl', ','], description: 'Open Settings' },
    ],
  },
  {
    name: 'Editor',
    shortcuts: [
      { keys: ['Ctrl', 'S'], description: 'Save File' },
      { keys: ['Ctrl', 'F'], description: 'Find' },
      { keys: ['Ctrl', 'H'], description: 'Find and Replace' },
      { keys: ['Ctrl', 'Z'], description: 'Undo' },
      { keys: ['Ctrl', 'Shift', 'Z'], description: 'Redo' },
      { keys: ['Ctrl', '/'], description: 'Toggle Line Comment' },
      { keys: ['Ctrl', 'D'], description: 'Select Next Occurrence' },
      { keys: ['Alt', '↑/↓'], description: 'Move Line Up/Down' },
      { keys: ['Ctrl', 'Shift', 'K'], description: 'Delete Line' },
    ],
  },
  {
    name: 'Navigation',
    shortcuts: [
      { keys: ['Ctrl', 'G'], description: 'Go to Line' },
      { keys: ['Ctrl', 'Shift', 'O'], description: 'Go to Symbol' },
      { keys: ['F12'], description: 'Go to Definition' },
      { keys: ['Ctrl', 'Tab'], description: 'Switch Editor Tab' },
    ],
  },
  {
    name: 'View',
    shortcuts: [
      { keys: ['Ctrl', 'Shift', 'P'], description: 'Toggle Preview' },
      { keys: ['Ctrl', '`'], description: 'Toggle Terminal' },
      { keys: ['Ctrl', '\\'], description: 'Split Editor' },
    ],
  },
];

export function KeyboardShortcuts({ open, onOpenChange }: KeyboardShortcutsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Quick reference for all available keyboard shortcuts
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {SHORTCUTS.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <React.Fragment key={i}>
                            <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border font-mono">
                              {key}
                            </kbd>
                            {i < shortcut.keys.length - 1 && (
                              <span className="text-muted-foreground text-xs">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
