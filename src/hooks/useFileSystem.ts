import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  db,
  FileNode,
  getAllFiles,
  getFile,
  createFile,
  updateFile,
  deleteFile as deleteFileFromDB,
  getEditorState,
  saveEditorState,
  initializeDefaultFiles,
} from '@/lib/db';

export interface FileTreeNode extends FileNode {
  children?: FileTreeNode[];
}

export function useFileSystem() {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [fileTree, setFileTree] = useState<FileTreeNode[]>([]);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [unsavedFiles, setUnsavedFiles] = useState<Set<string>>(new Set());

  // Build tree structure from flat file list
  const buildTree = useCallback((files: FileNode[]): FileTreeNode[] => {
    const fileMap = new Map<string, FileTreeNode>();
    const rootNodes: FileTreeNode[] = [];

    // First pass: create all nodes
    files.forEach((file) => {
      fileMap.set(file.id, { ...file, children: file.type === 'folder' ? [] : undefined });
    });

    // Second pass: build tree structure
    files.forEach((file) => {
      const node = fileMap.get(file.id)!;
      if (file.parentId === null) {
        rootNodes.push(node);
      } else {
        const parent = fileMap.get(file.parentId);
        if (parent && parent.children) {
          parent.children.push(node);
        }
      }
    });

    // Sort: folders first, then alphabetically
    const sortNodes = (nodes: FileTreeNode[]): FileTreeNode[] => {
      return nodes.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      }).map((node) => ({
        ...node,
        children: node.children ? sortNodes(node.children) : undefined,
      }));
    };

    return sortNodes(rootNodes);
  }, []);

  // Load files and editor state
  const loadFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      await initializeDefaultFiles();
      const allFiles = await getAllFiles();
      setFiles(allFiles);
      setFileTree(buildTree(allFiles));

      const state = await getEditorState();
      if (state) {
        setOpenTabs(state.openTabs || []);
        setActiveTabId(state.activeTabId);
        setExpandedFolders(new Set(state.expandedFolders || []));
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setIsLoading(false);
    }
  }, [buildTree]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  // Save editor state whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveEditorState({
        openTabs,
        activeTabId,
        expandedFolders: Array.from(expandedFolders),
      });
    }
  }, [openTabs, activeTabId, expandedFolders, isLoading]);

  // Create new file
  const createNewFile = useCallback(async (name: string, parentId: string | null, type: 'file' | 'folder') => {
    const now = Date.now();
    const newFile: FileNode = {
      id: uuidv4(),
      name,
      type,
      parentId,
      content: type === 'file' ? '' : undefined,
      createdAt: now,
      updatedAt: now,
    };

    await createFile(newFile);
    const allFiles = await getAllFiles();
    setFiles(allFiles);
    setFileTree(buildTree(allFiles));

    if (type === 'file') {
      openFile(newFile.id);
    }

    return newFile.id;
  }, [buildTree]);

  // Rename file
  const renameFile = useCallback(async (id: string, newName: string) => {
    await updateFile(id, { name: newName });
    const allFiles = await getAllFiles();
    setFiles(allFiles);
    setFileTree(buildTree(allFiles));
  }, [buildTree]);

  // Delete file
  const deleteFileAction = useCallback(async (id: string) => {
    await deleteFileFromDB(id);
    
    // Close tab if open
    setOpenTabs((prev) => prev.filter((tabId) => tabId !== id));
    if (activeTabId === id) {
      setActiveTabId(openTabs.find((tabId) => tabId !== id) || null);
    }

    const allFiles = await getAllFiles();
    setFiles(allFiles);
    setFileTree(buildTree(allFiles));
  }, [buildTree, activeTabId, openTabs]);

  // Open file in editor
  const openFile = useCallback((id: string) => {
    if (!openTabs.includes(id)) {
      setOpenTabs((prev) => [...prev, id]);
    }
    setActiveTabId(id);
  }, [openTabs]);

  // Close tab
  const closeTab = useCallback((id: string) => {
    setOpenTabs((prev) => prev.filter((tabId) => tabId !== id));
    if (activeTabId === id) {
      const remaining = openTabs.filter((tabId) => tabId !== id);
      setActiveTabId(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
    setUnsavedFiles((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, [activeTabId, openTabs]);

  // Update file content
  const updateFileContent = useCallback(async (id: string, content: string, shouldSave = false) => {
    if (shouldSave) {
      await updateFile(id, { content });
      setUnsavedFiles((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setUnsavedFiles((prev) => new Set(prev).add(id));
    }
  }, []);

  // Save file
  const saveFile = useCallback(async (id: string, content: string) => {
    await updateFile(id, { content });
    setUnsavedFiles((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Toggle folder expansion
  const toggleFolder = useCallback((id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Get file by ID
  const getFileById = useCallback(async (id: string) => {
    return await getFile(id);
  }, []);

  // Import files from File System Access API
  const importFolder = useCallback(async () => {
    try {
      // @ts-ignore - File System Access API
      const dirHandle = await window.showDirectoryPicker();
      
      const processEntry = async (handle: FileSystemHandle, parentId: string | null): Promise<void> => {
        const now = Date.now();
        const id = uuidv4();

        if (handle.kind === 'file') {
          const fileHandle = handle as FileSystemFileHandle;
          const file = await fileHandle.getFile();
          const content = await file.text();
          
          await createFile({
            id,
            name: handle.name,
            type: 'file',
            parentId,
            content,
            createdAt: now,
            updatedAt: now,
          });
        } else {
          const dirHandle = handle as FileSystemDirectoryHandle;
          
          await createFile({
            id,
            name: handle.name,
            type: 'folder',
            parentId,
            createdAt: now,
            updatedAt: now,
          });

          // @ts-ignore
          for await (const entry of dirHandle.values()) {
            await processEntry(entry, id);
          }
        }
      };

      await processEntry(dirHandle, null);
      await loadFiles();
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to import folder:', error);
      }
    }
  }, [loadFiles]);

  // Clear all files
  const clearAllFiles = useCallback(async () => {
    await db.files.clear();
    await db.editorState.clear();
    setFiles([]);
    setFileTree([]);
    setOpenTabs([]);
    setActiveTabId(null);
    setExpandedFolders(new Set());
  }, []);

  // Move file to a different folder
  const moveFile = useCallback(async (fileId: string, newParentId: string | null) => {
    await updateFile(fileId, { parentId: newParentId });
    const allFiles = await getAllFiles();
    setFiles(allFiles);
    setFileTree(buildTree(allFiles));
  }, [buildTree]);

  return {
    files,
    fileTree,
    openTabs,
    activeTabId,
    expandedFolders,
    unsavedFiles,
    isLoading,
    createNewFile,
    renameFile,
    deleteFile: deleteFileAction,
    openFile,
    closeTab,
    updateFileContent,
    saveFile,
    toggleFolder,
    getFileById,
    importFolder,
    clearAllFiles,
    setActiveTabId,
    loadFiles,
    moveFile,
  };
}
