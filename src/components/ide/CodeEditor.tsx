import React, { useRef, useEffect, useCallback } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import { FileNode } from '@/lib/db';
import { getLanguageFromExtension } from '@/lib/fileUtils';
import { EditorSettings } from '@/hooks/useSettings';
import { Loader2 } from 'lucide-react';
import { isRunnableLanguage, getLanguageFromFileName } from '@/lib/codeRunner';

interface CodeEditorProps {
  file: FileNode | null;
  settings?: EditorSettings;
  onContentChange: (id: string, content: string) => void;
  onSave: (id: string, content: string) => void;
  onRunCode?: (code: string, language: string) => void;
}

export function CodeEditor({ file, settings, onContentChange, onSave, onRunCode }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Default settings
  const editorSettings = settings || {
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'off' as const,
    minimap: true,
    theme: 'dark' as const,
    lineNumbers: 'on' as const,
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Configure dark theme
    monaco.editor.defineTheme('code-ide-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff7b72' },
        { token: 'string', foreground: 'a5d6ff' },
        { token: 'number', foreground: '79c0ff' },
        { token: 'type', foreground: 'ffa657' },
        { token: 'function', foreground: 'd2a8ff' },
        { token: 'variable', foreground: 'c9d1d9' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#c9d1d9',
        'editor.lineHighlightBackground': '#161b22',
        'editor.selectionBackground': '#3b82f640',
        'editorCursor.foreground': '#3b82f6',
        'editorLineNumber.foreground': '#484f58',
        'editorLineNumber.activeForeground': '#8b949e',
        'editor.inactiveSelectionBackground': '#3b82f620',
        'editorIndentGuide.background': '#21262d',
        'editorIndentGuide.activeBackground': '#30363d',
        'editorWidget.background': '#161b22',
        'editorWidget.border': '#30363d',
        'editorSuggestWidget.background': '#161b22',
        'editorSuggestWidget.border': '#30363d',
        'editorSuggestWidget.selectedBackground': '#3b82f640',
        'scrollbar.shadow': '#0000',
        'scrollbarSlider.background': '#484f5833',
        'scrollbarSlider.hoverBackground': '#484f5866',
        'scrollbarSlider.activeBackground': '#484f5899',
      },
    });

    // Configure light theme
    monaco.editor.defineTheme('code-ide-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'd73a49' },
        { token: 'string', foreground: '032f62' },
        { token: 'number', foreground: '005cc5' },
        { token: 'type', foreground: 'e36209' },
        { token: 'function', foreground: '6f42c1' },
        { token: 'variable', foreground: '24292e' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#24292e',
        'editor.lineHighlightBackground': '#f6f8fa',
        'editor.selectionBackground': '#3b82f640',
        'editorCursor.foreground': '#3b82f6',
        'editorLineNumber.foreground': '#babbbd',
        'editorLineNumber.activeForeground': '#24292e',
        'editor.inactiveSelectionBackground': '#3b82f620',
        'editorIndentGuide.background': '#e1e4e8',
        'editorIndentGuide.activeBackground': '#c9d1d9',
        'editorWidget.background': '#ffffff',
        'editorWidget.border': '#e1e4e8',
      },
    });

    const themeName = editorSettings.theme === 'light' ? 'code-ide-light' : 'code-ide-dark';
    monaco.editor.setTheme(themeName);

    // Add save command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (file) {
        const content = editor.getValue();
        onSave(file.id, content);
      }
    });

    // Add Run Code context menu action
    if (file && onRunCode) {
      const language = getLanguageFromFileName(file.name);
      if (isRunnableLanguage(language)) {
        editor.addAction({
          id: 'run-code',
          label: '▶ Run Code',
          keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
          contextMenuGroupId: 'navigation',
          contextMenuOrder: 0,
          run: () => {
            const content = editor.getValue();
            onRunCode(content, language);
          }
        });
      }
    }

    // Focus editor
    editor.focus();
  };

  // Update theme when settings change
  useEffect(() => {
    if (monacoRef.current) {
      const getTheme = () => {
        if (editorSettings.theme === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'code-ide-dark'
            : 'code-ide-light';
        }
        return editorSettings.theme === 'light' ? 'code-ide-light' : 'code-ide-dark';
      };
      monacoRef.current.editor.setTheme(getTheme());
    }
  }, [editorSettings.theme]);

  // Update content when switching files or content changes
  useEffect(() => {
    if (editorRef.current && file) {
      const model = editorRef.current.getModel();
      if (model) {
        const currentValue = model.getValue();
        if (currentValue !== file.content) {
          // Save cursor position
          const position = editorRef.current.getPosition();
          editorRef.current.setValue(file.content || '');
          // Restore cursor position
          if (position) {
            editorRef.current.setPosition(position);
          }
        }
      }
    }
  }, [file?.id, file?.content]);

  const handleChange = useCallback(
    (value: string | undefined) => {
      if (file && value !== undefined) {
        onContentChange(file.id, value);
      }
    },
    [file, onContentChange]
  );

  if (!file) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-editor-bg">
        <div className="text-center text-muted-foreground">
          <div className="text-6xl mb-4 opacity-20">{'</>'}</div>
          <p className="text-lg font-medium">No file selected</p>
          <p className="text-sm mt-2">Select a file from the explorer to start editing</p>
          <div className="mt-6 text-xs space-y-1 opacity-75">
            <p>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+P</kbd> Quick open
            </p>
            <p>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+S</kbd> Save file
            </p>
            <p>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+B</kbd> Toggle sidebar
            </p>
          </div>
        </div>
      </div>
    );
  }

  const language = getLanguageFromExtension(file.name);

  return (
    <div className="h-full w-full overflow-hidden">
      <Editor
        height="100%"
        language={language}
        value={file.content || ''}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full bg-editor-bg">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
        options={{
          fontSize: editorSettings.fontSize,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
          fontLigatures: true,
          minimap: { enabled: editorSettings.minimap, maxColumn: 80 },
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          lineNumbers: editorSettings.lineNumbers,
          glyphMargin: false,
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'mouseover',
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          wordWrap: editorSettings.wordWrap,
          tabSize: editorSettings.tabSize,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: 'advanced',
          suggest: {
            showKeywords: true,
            showSnippets: true,
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
          parameterHints: { enabled: true },
          hover: { enabled: true },
          links: true,
        }}
      />
    </div>
  );
}
