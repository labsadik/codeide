import React from 'react';
import { FileNode } from '@/lib/db';
import { CodeEditor } from './CodeEditor';
import { EditorSettings } from '@/hooks/useSettings';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface SplitEditorProps {
  leftFile: FileNode | null;
  rightFile: FileNode | null;
  settings: EditorSettings;
  onContentChange: (id: string, content: string) => void;
  onSave: (id: string, content: string) => void;
  onRunCode?: (code: string, language: string) => void;
}

export function SplitEditor({
  leftFile,
  rightFile,
  settings,
  onContentChange,
  onSave,
  onRunCode,
}: SplitEditorProps) {
  if (!rightFile) {
    return (
      <div className="h-full w-full">
        <CodeEditor
          file={leftFile}
          settings={settings}
          onContentChange={onContentChange}
          onSave={onSave}
          onRunCode={onRunCode}
        />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={50} minSize={20}>
        <div className="h-full">
          <CodeEditor
            file={leftFile}
            settings={settings}
            onContentChange={onContentChange}
            onSave={onSave}
            onRunCode={onRunCode}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={20}>
        <div className="h-full">
          <CodeEditor
            file={rightFile}
            settings={settings}
            onContentChange={onContentChange}
            onSave={onSave}
            onRunCode={onRunCode}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
