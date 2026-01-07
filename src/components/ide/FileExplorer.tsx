import React, { useState, useRef, useEffect, DragEvent } from 'react';
import { ChevronRight, ChevronDown, FilePlus, FolderPlus, Edit2, Trash2 } from 'lucide-react';
import { FileTreeNode } from '@/hooks/useFileSystem';
import { getVSCodeIcon } from '@/lib/vsCodeIcons';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/lib/utils';

interface FileExplorerProps {
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
  onMoveFile?: (fileId: string, newParentId: string | null) => void;
}

interface FileItemProps {
  node: FileTreeNode;
  depth: number;
  expandedFolders: Set<string>;
  activeFileId: string | null;
  unsavedFiles: Set<string>;
  onFileClick: (id: string) => void;
  onFolderToggle: (id: string) => void;
  onCreateFile: (name: string, parentId: string | null) => void;
  onCreateFolder: (name: string, parentId: string | null) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onMoveFile?: (fileId: string, newParentId: string | null) => void;
  draggedItemId: string | null;
  setDraggedItemId: (id: string | null) => void;
  dropTargetId: string | null;
  setDropTargetId: (id: string | null) => void;
}

function FileItem({
  node,
  depth,
  expandedFolders,
  activeFileId,
  unsavedFiles,
  onFileClick,
  onFolderToggle,
  onCreateFile,
  onCreateFolder,
  onRename,
  onDelete,
  onMoveFile,
  draggedItemId,
  setDraggedItemId,
  dropTargetId,
  setDropTargetId,
}: FileItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const isExpanded = expandedFolders.has(node.id);
  const isActive = activeFileId === node.id;
  const isUnsaved = unsavedFiles.has(node.id);
  const isDragging = draggedItemId === node.id;
  const isDropTarget = dropTargetId === node.id && node.type === 'folder';

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (node.type === 'folder') {
      onFolderToggle(node.id);
    } else {
      onFileClick(node.id);
    }
  };

  const handleRename = () => {
    if (editName.trim() && editName !== node.name) {
      onRename(node.id, editName.trim());
    }
    setIsEditing(false);
    setEditName(node.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditName(node.name);
    }
  };

  // Drag handlers
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedItemId(node.id);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDropTargetId(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (node.type === 'folder' && draggedItemId !== node.id) {
      e.dataTransfer.dropEffect = 'move';
      setDropTargetId(node.id);
    }
  };

  const handleDragLeave = () => {
    setDropTargetId(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId && draggedId !== node.id && node.type === 'folder' && onMoveFile) {
      onMoveFile(draggedId, node.id);
    }
    setDraggedItemId(null);
    setDropTargetId(null);
  };

  const contextMenuItems = (
    <>
      {node.type === 'folder' && (
        <>
          <ContextMenuItem onClick={() => {
            const name = prompt('Enter file name:');
            if (name) onCreateFile(name, node.id);
          }}>
            <FilePlus className="w-4 h-4 mr-2" />
            New File
          </ContextMenuItem>
          <ContextMenuItem onClick={() => {
            const name = prompt('Enter folder name:');
            if (name) onCreateFolder(name, node.id);
          }}>
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </ContextMenuItem>
          <ContextMenuSeparator />
        </>
      )}
      <ContextMenuItem onClick={() => setIsEditing(true)}>
        <Edit2 className="w-4 h-4 mr-2" />
        Rename
      </ContextMenuItem>
      <ContextMenuItem 
        onClick={() => {
          if (confirm(`Delete "${node.name}"?`)) {
            onDelete(node.id);
          }
        }}
        className="text-destructive focus:text-destructive"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </ContextMenuItem>
    </>
  );

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={cn(
              'group flex items-center gap-1 px-2 py-1 cursor-pointer select-none transition-smooth text-sm',
              'hover:bg-explorer-hover rounded-sm',
              isActive && 'bg-explorer-selected text-foreground',
              isDragging && 'opacity-50',
              isDropTarget && 'bg-primary/20 ring-1 ring-primary'
            )}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            draggable={!isEditing}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Expand/Collapse Arrow */}
            {node.type === 'folder' ? (
              <span className="w-4 h-4 flex items-center justify-center text-muted-foreground">
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </span>
            ) : (
              <span className="w-4 h-4" />
            )}

            {/* File Icon */}
            <span className="flex-shrink-0">
              {getVSCodeIcon(node.name, node.type, isExpanded)}
            </span>

            {/* Name */}
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-input border border-ring rounded px-1 py-0.5 text-sm outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="flex-1 truncate text-sidebar-foreground">
                {node.name}
              </span>
            )}

            {/* Unsaved indicator */}
            {isUnsaved && (
              <span className="w-2 h-2 rounded-full bg-status-modified" title="Unsaved changes" />
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          {contextMenuItems}
        </ContextMenuContent>
      </ContextMenu>

      {/* Children */}
      {node.type === 'folder' && isExpanded && node.children && (
        <div className="tree-expand">
          {node.children.map((child) => (
            <FileItem
              key={child.id}
              node={child}
              depth={depth + 1}
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
              draggedItemId={draggedItemId}
              setDraggedItemId={setDraggedItemId}
              dropTargetId={dropTargetId}
              setDropTargetId={setDropTargetId}
            />
          ))}
        </div>
      )}
    </>
  );
}

export function FileExplorer({
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
  onMoveFile,
}: FileExplorerProps) {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  // Handle drop on root (move to root level)
  const handleRootDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId && onMoveFile) {
      onMoveFile(draggedId, null);
    }
    setDraggedItemId(null);
    setDropTargetId(null);
  };

  const handleRootDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div 
      className="flex-1 overflow-auto py-2"
      onDrop={handleRootDrop}
      onDragOver={handleRootDragOver}
    >
      {tree.length === 0 ? (
        <div className="px-4 py-8 text-center text-muted-foreground text-sm">
          <div className="w-12 h-12 mx-auto mb-3 opacity-50 flex items-center justify-center">
            <span className="scale-[2.5]">{getVSCodeIcon('folder', 'folder')}</span>
          </div>
          <p>No files yet</p>
          <p className="text-xs mt-1">Create a file or import a project</p>
        </div>
      ) : (
        tree.map((node) => (
          <FileItem
            key={node.id}
            node={node}
            depth={0}
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
            draggedItemId={draggedItemId}
            setDraggedItemId={setDraggedItemId}
            dropTargetId={dropTargetId}
            setDropTargetId={setDropTargetId}
          />
        ))
      )}
    </div>
  );
}