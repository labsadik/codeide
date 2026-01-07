import React, { useState, useRef } from 'react';
import {
  FilePlus,
  FolderPlus,
  Download,
  Upload,
  Trash2,
  Menu,
  X,
  Package,
  Settings,
  Info,
} from 'lucide-react';
import { FileExplorer } from './FileExplorer';
import { FileTreeNode } from '@/hooks/useFileSystem';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  tree: FileTreeNode[];
  expandedFolders: Set<string>;
  activeFileId: string | null;
  unsavedFiles: Set<string>;
  onFileClick: (id: string) => void;
  onFolderToggle: (id: string) => void;
  onCreateFile: (name: string, parentId: string | null) => void;
  onCreateFolder: (name: string, parentId: string | null) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onImportFolder: () => void;
  onImportZip: (file: File) => void;
  onExport: () => void;
  onClearAll: () => void;
  onMoveFile?: (fileId: string, newParentId: string | null) => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  tree,
  expandedFolders,
  activeFileId,
  unsavedFiles,
  onFileClick,
  onFolderToggle,
  onCreateFile,
  onCreateFolder,
  onRename,
  onDelete,
  onImportFolder,
  onImportZip,
  onExport,
  onClearAll,
  onMoveFile,
}: SidebarProps) {
  const [newFileDialogOpen, setNewFileDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateFile = () => {
    if (newItemName.trim()) {
      onCreateFile(newItemName.trim(), null);
      setNewItemName('');
      setNewFileDialogOpen(false);
    }
  };

  const handleCreateFolder = () => {
    if (newItemName.trim()) {
      onCreateFolder(newItemName.trim(), null);
      setNewItemName('');
      setNewFolderDialogOpen(false);
    }
  };

  const handleZipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.zip')) {
      onImportZip(file);
    }
    e.target.value = '';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:relative z-50 lg:z-auto h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-200 overflow-hidden',
          isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-0 lg:translate-x-0 lg:border-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm text-foreground">Explorer</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setNewFileDialogOpen(true)}
              title="New File"
            >
              <FilePlus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setNewFolderDialogOpen(true)}
              title="New Folder"
            >
              <FolderPlus className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onImportFolder}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Folder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import ZIP
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export as ZIP
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setClearDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Files
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 lg:hidden"
              onClick={onToggle}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* File Tree */}
        <FileExplorer
          tree={tree}
          expandedFolders={expandedFolders}
          activeFileId={activeFileId}
          unsavedFiles={unsavedFiles}
          onFileClick={onFileClick}
          onFolderToggle={onFolderToggle}
          onCreateFile={onCreateFile}
          onCreateFolder={onCreateFolder}
          onRename={onRename}
          onDelete={onDelete}
          onMoveFile={onMoveFile}
        />

        {/* Footer */}
        <div className="mt-auto p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5" />
            <span>All files saved locally</span>
          </div>
        </div>

        {/* Hidden file input for ZIP import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={handleZipUpload}
        />
      </aside>

      {/* New File Dialog */}
      <Dialog open={newFileDialogOpen} onOpenChange={setNewFileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Enter a name for your new file. Include the extension (e.g., .ts, .js).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="filename">File name</Label>
              <Input
                id="filename"
                placeholder="example.ts"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFileDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFile}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Enter a name for your new folder.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="foldername">Folder name</Label>
              <Input
                id="foldername"
                placeholder="my-folder"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear All Confirmation Dialog */}
      <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear All Files?</DialogTitle>
            <DialogDescription>
              This will permanently delete all files and folders. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onClearAll();
                setClearDialogOpen(false);
              }}
            >
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
