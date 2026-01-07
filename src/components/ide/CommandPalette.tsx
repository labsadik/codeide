import React, { useState, useEffect, useMemo } from 'react';
import { Search, File, Folder, Command } from 'lucide-react';
import { FileNode } from '@/lib/db';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getFileIcon } from '@/lib/fileUtils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  files: FileNode[];
  onFileSelect: (id: string) => void;
  onCommand?: (command: string) => void;
}

interface CommandAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  files,
  onFileSelect,
  onCommand,
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');

  // Reset search when closing
  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  // Build file path map
  const filePathMap = useMemo(() => {
    const pathMap = new Map<string, string>();

    const buildPath = (file: FileNode): string => {
      if (pathMap.has(file.id)) {
        return pathMap.get(file.id)!;
      }

      if (file.parentId === null) {
        pathMap.set(file.id, file.name);
        return file.name;
      }

      const parent = files.find((f) => f.id === file.parentId);
      if (parent) {
        const parentPath = buildPath(parent);
        const fullPath = `${parentPath}/${file.name}`;
        pathMap.set(file.id, fullPath);
        return fullPath;
      }

      pathMap.set(file.id, file.name);
      return file.name;
    };

    files.forEach(buildPath);
    return pathMap;
  }, [files]);

  // Filter files
  const filteredFiles = useMemo(() => {
    if (!search) {
      return files.filter((f) => f.type === 'file').slice(0, 10);
    }

    const query = search.toLowerCase();
    return files
      .filter((f) => f.type === 'file')
      .filter((f) => {
        const path = filePathMap.get(f.id) || f.name;
        return path.toLowerCase().includes(query);
      })
      .slice(0, 20);
  }, [files, search, filePathMap]);

  // Commands
  const commands: CommandAction[] = useMemo(
    () => [
      {
        id: 'settings',
        label: 'Open Settings',
        icon: <Command className="w-4 h-4" />,
        action: () => onCommand?.('settings'),
      },
      {
        id: 'shortcuts',
        label: 'Keyboard Shortcuts',
        icon: <Command className="w-4 h-4" />,
        action: () => onCommand?.('shortcuts'),
      },
      {
        id: 'preview',
        label: 'Toggle Live Preview',
        icon: <Command className="w-4 h-4" />,
        action: () => onCommand?.('preview'),
      },
      {
        id: 'terminal',
        label: 'Toggle Terminal',
        icon: <Command className="w-4 h-4" />,
        action: () => onCommand?.('terminal'),
      },
    ],
    [onCommand]
  );

  const handleSelect = (fileId: string) => {
    onFileSelect(fileId);
    onOpenChange(false);
  };

  const handleCommand = (command: CommandAction) => {
    command.action();
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search files or type a command..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {search.startsWith('>') ? (
          <CommandGroup heading="Commands">
            {commands
              .filter((c) =>
                c.label.toLowerCase().includes(search.slice(1).toLowerCase())
              )
              .map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => handleCommand(command)}
                  className="flex items-center gap-2"
                >
                  {command.icon}
                  <span>{command.label}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        ) : (
          <>
            <CommandGroup heading="Files">
              {filteredFiles.map((file) => (
                <CommandItem
                  key={file.id}
                  onSelect={() => handleSelect(file.id)}
                  className="flex items-center gap-2"
                >
                  <span className="text-base">{getFileIcon(file.name, 'file')}</span>
                  <span className="flex-1 truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {filePathMap.get(file.id)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            {!search && (
              <CommandGroup heading="Commands">
                <CommandItem
                  onSelect={() => setSearch('>')}
                  className="text-muted-foreground"
                >
                  <Command className="w-4 h-4 mr-2" />
                  Type {'>'} for commands
                </CommandItem>
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
