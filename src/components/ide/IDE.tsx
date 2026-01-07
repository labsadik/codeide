import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, Code2, Play, Settings, SplitSquareVertical, Keyboard } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { EditorTabs } from './EditorTabs';
import { CodeEditor } from './CodeEditor';
import { StatusBar } from './StatusBar';
import { Terminal } from './Terminal';
import { LivePreview } from './LivePreview';
import { SettingsPanel } from './SettingsPanel';
import { CommandPalette } from './CommandPalette';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { SplitEditor } from './SplitEditor';
import { useFileSystem } from '@/hooks/useFileSystem';
import { useSettings } from '@/hooks/useSettings';
import { FileNode, getAllFiles } from '@/lib/db';
import { exportAsZip, importZip } from '@/lib/fileUtils';
import { runCode } from '@/lib/codeRunner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface LogEntry {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: Date;
}

export function IDE() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFile, setActiveFile] = useState<FileNode | null>(null);
  const [fileContents, setFileContents] = useState<Map<string, string>>(new Map());
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [splitFileId, setSplitFileId] = useState<string | null>(null);
  const [splitFile, setSplitFile] = useState<FileNode | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { toast } = useToast();
  const { settings, updateSettings, resetSettings } = useSettings();

  const {
    files,
    fileTree,
    openTabs,
    activeTabId,
    expandedFolders,
    unsavedFiles,
    isLoading,
    createNewFile,
    renameFile,
    deleteFile,
    openFile,
    closeTab,
    updateFileContent,
    saveFile,
    toggleFolder,
    getFileById,
    importFolder,
    clearAllFiles,
    loadFiles,
    moveFile,
  } = useFileSystem();

  // Load active file content from database
  useEffect(() => {
    async function loadActiveFile() {
      if (activeTabId) {
        const file = await getFileById(activeTabId);
        if (file) {
          setActiveFile(file);
          // Always update cache with latest content from DB
          if (file.content !== undefined) {
            setFileContents((prev) => {
              const newMap = new Map(prev);
              // Only update if not already in cache (to preserve unsaved edits)
              if (!newMap.has(file.id)) {
                newMap.set(file.id, file.content!);
              }
              return newMap;
            });
          }
        }
      } else {
        setActiveFile(null);
      }
    }
    loadActiveFile();
  }, [activeTabId, getFileById]);

  // Load split file
  useEffect(() => {
    async function loadSplitFile() {
      if (splitFileId) {
        const file = await getFileById(splitFileId);
        if (file) {
          setSplitFile(file);
          if (!fileContents.has(file.id) && file.content !== undefined) {
            setFileContents((prev) => new Map(prev).set(file.id, file.content!));
          }
        }
      } else {
        setSplitFile(null);
      }
    }
    loadSplitFile();
  }, [splitFileId, getFileById]);

  // Get tab data
  const tabData = useMemo(() => {
    return openTabs
      .map((id) => files.find((f) => f.id === id))
      .filter((f): f is FileNode => f !== undefined);
  }, [openTabs, files]);

  // Handle content change
  const handleContentChange = useCallback(
    (id: string, content: string) => {
      setFileContents((prev) => new Map(prev).set(id, content));
      updateFileContent(id, content, false);
    },
    [updateFileContent]
  );

  // Handle save
  const handleSave = useCallback(
    async (id: string, content: string) => {
      await saveFile(id, content);
      setFileContents((prev) => new Map(prev).set(id, content));
      toast({
        title: 'File saved',
        description: 'Your changes have been saved.',
      });
    },
    [saveFile, toast]
  );

  // Handle export
  const handleExport = useCallback(async () => {
    try {
      const allFiles = await getAllFiles();
      await exportAsZip(allFiles);
      toast({
        title: 'Export complete',
        description: 'Your project has been exported as a ZIP file.',
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your project.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Handle ZIP import
  const handleImportZip = useCallback(
    async (file: File) => {
      try {
        await clearAllFiles();
        await importZip(file, loadFiles);
        toast({
          title: 'Import complete',
          description: 'Your project has been imported.',
        });
      } catch (error) {
        toast({
          title: 'Import failed',
          description: 'There was an error importing the ZIP file.',
          variant: 'destructive',
        });
      }
    },
    [loadFiles, clearAllFiles, toast]
  );

  // Handle folder import (clear existing files first)
  const handleImportFolder = useCallback(async () => {
    await clearAllFiles();
    await importFolder();
  }, [clearAllFiles, importFolder]);

  // Handle clear all
  const handleClearAll = useCallback(async () => {
    await clearAllFiles();
    setFileContents(new Map());
    setActiveFile(null);
    setSplitFile(null);
    setSplitFileId(null);
    toast({
      title: 'All files deleted',
      description: 'Your workspace has been cleared.',
    });
  }, [clearAllFiles, toast]);

  // Add log entry
  const handleLog = useCallback((type: LogEntry['type'], message: string) => {
    setLogs((prev) => [
      ...prev,
      { id: uuidv4(), type, message, timestamp: new Date() },
    ]);
  }, []);

  // Clear logs
  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // Handle run code from editor context menu
  const handleRunCode = useCallback((code: string, language: string) => {
    // Open terminal to show output
    setTerminalOpen(true);
    
    // Add execution start log
    handleLog('info', `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    
    // Run the code and get outputs
    const outputs = runCode(code, language);
    
    // Add each output to logs
    outputs.forEach(output => {
      handleLog(output.type, output.message);
    });
    
    handleLog('info', `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  }, [handleLog]);

  // Handle command from palette
  const handleCommand = useCallback((command: string) => {
    switch (command) {
      case 'settings':
        setSettingsOpen(true);
        break;
      case 'shortcuts':
        setShortcutsOpen(true);
        break;
      case 'preview':
        setPreviewOpen((prev) => !prev);
        break;
      case 'terminal':
        setTerminalOpen((prev) => !prev);
        break;
    }
  }, []);

  // Handle split right
  const handleSplitRight = useCallback((id: string) => {
    if (splitFileId === id) {
      setSplitFileId(null);
    } else {
      setSplitFileId(id);
    }
  }, [splitFileId]);

  // Keyboard shortcuts
  useEffect(() => {
    let waitingForSecondKey = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K Ctrl+S for shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        waitingForSecondKey = true;
        setTimeout(() => {
          waitingForSecondKey = false;
        }, 1000);
        return;
      }

      if (waitingForSecondKey && (e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        waitingForSecondKey = false;
        setShortcutsOpen(true);
        return;
      }

      // Toggle sidebar: Ctrl/Cmd + B
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
        return;
      }

      // Command palette: Ctrl/Cmd + P
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }

      // Settings: Ctrl/Cmd + ,
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setSettingsOpen(true);
        return;
      }

      // Toggle preview: Ctrl/Cmd + Shift + P
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setPreviewOpen((prev) => !prev);
        return;
      }

      // Toggle terminal: Ctrl/Cmd + `
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }

      // Split editor: Ctrl/Cmd + \
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        if (activeTabId) {
          handleSplitRight(activeTabId);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTabId, handleSplitRight]);

  // Get current file content for editor
  const currentFileWithContent = useMemo(() => {
    if (!activeFile) return null;
    const cachedContent = fileContents.get(activeFile.id);
    // Use cached content if available, otherwise use content from activeFile (loaded from DB)
    const content = cachedContent !== undefined ? cachedContent : (activeFile.content || '');
    return { ...activeFile, content };
  }, [activeFile, fileContents]);

  // Get split file with content
  const splitFileWithContent = useMemo(() => {
    if (!splitFile) return null;
    const cachedContent = fileContents.get(splitFile.id);
    const content = cachedContent !== undefined ? cachedContent : (splitFile.content || '');
    return { ...splitFile, content };
  }, [splitFile, fileContents]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-10 bg-card border-b border-border flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hidden lg:flex"
            onClick={() => setSidebarOpen((prev) => !prev)}
            title="Toggle Sidebar (Ctrl+B)"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm hidden sm:inline">Code IDE</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant={previewOpen ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setPreviewOpen((prev) => !prev)}
            title="Toggle Live Preview (Ctrl+Shift+P)"
          >
            <Play className="w-4 h-4" />
          </Button>
          <Button
            variant={splitFileId ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => activeTabId && handleSplitRight(activeTabId)}
            title="Split Editor (Ctrl+\)"
          >
            <SplitSquareVertical className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setShortcutsOpen(true)}
            title="Keyboard Shortcuts (Ctrl+K Ctrl+S)"
          >
            <Keyboard className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSettingsOpen(true)}
            title="Settings (Ctrl+,)"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(false)}
          tree={fileTree}
          expandedFolders={expandedFolders}
          activeFileId={activeTabId}
          unsavedFiles={unsavedFiles}
          onFileClick={openFile}
          onFolderToggle={toggleFolder}
          onCreateFile={(name, parentId) => createNewFile(name, parentId, 'file')}
          onCreateFolder={(name, parentId) => createNewFile(name, parentId, 'folder')}
          onRename={renameFile}
          onDelete={deleteFile}
          onImportFolder={handleImportFolder}
          onImportZip={handleImportZip}
          onExport={handleExport}
          onClearAll={handleClearAll}
          onMoveFile={moveFile}
        />

        {/* Editor + Preview Area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={previewOpen ? 50 : 100} minSize={30}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Tabs */}
              <EditorTabs
                tabs={tabData}
                activeTabId={activeTabId}
                unsavedFiles={unsavedFiles}
                onTabClick={openFile}
                onTabClose={closeTab}
                onSplitRight={handleSplitRight}
              />

              {/* Editor(s) */}
              <div className="flex-1 overflow-hidden">
                <SplitEditor
                  leftFile={currentFileWithContent}
                  rightFile={splitFileWithContent}
                  settings={settings}
                  onContentChange={handleContentChange}
                  onSave={handleSave}
                  onRunCode={handleRunCode}
                />
              </div>

              {/* Terminal */}
              <Terminal
                logs={logs}
                onClear={handleClearLogs}
                isOpen={terminalOpen}
                onToggle={() => setTerminalOpen((prev) => !prev)}
              />
            </div>
          </ResizablePanel>

          {previewOpen && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={20}>
                <LivePreview
                  files={files}
                  onLog={handleLog}
                  isOpen={previewOpen}
                  onClose={() => setPreviewOpen(false)}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <StatusBar
        activeFile={activeFile}
        totalFiles={files.filter((f) => f.type === 'file').length}
        isUnsaved={activeTabId ? unsavedFiles.has(activeTabId) : false}
      />

      {/* Dialogs */}
      <SettingsPanel
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSettings={resetSettings}
      />

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        files={files}
        onFileSelect={openFile}
        onCommand={handleCommand}
      />

      <KeyboardShortcuts open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </div>
  );
}
