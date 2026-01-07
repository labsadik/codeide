import Dexie, { type Table } from 'dexie';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | null;
  content?: string;
  createdAt: number;
  updatedAt: number;
}

export interface EditorState {
  id: string;
  openTabs: string[];
  activeTabId: string | null;
  expandedFolders: string[];
}

export class IDEDatabase extends Dexie {
  files!: Table<FileNode>;
  editorState!: Table<EditorState>;

  constructor() {
    super('CodeIDEDB');
    this.version(1).stores({
      files: 'id, name, type, parentId, createdAt, updatedAt',
      editorState: 'id',
    });
  }
}

export const db = new IDEDatabase();

// File Operations
export async function getAllFiles(): Promise<FileNode[]> {
  return await db.files.toArray();
}

export async function getFile(id: string): Promise<FileNode | undefined> {
  return await db.files.get(id);
}

export async function createFile(file: FileNode): Promise<string> {
  return await db.files.add(file);
}

export async function updateFile(id: string, updates: Partial<FileNode>): Promise<number> {
  return await db.files.update(id, { ...updates, updatedAt: Date.now() });
}

export async function deleteFile(id: string): Promise<void> {
  // Get all children if it's a folder
  const file = await db.files.get(id);
  if (file?.type === 'folder') {
    const children = await db.files.where('parentId').equals(id).toArray();
    for (const child of children) {
      await deleteFile(child.id);
    }
  }
  await db.files.delete(id);
}

export async function getChildren(parentId: string | null): Promise<FileNode[]> {
  if (parentId === null) {
    return await db.files.where('parentId').equals('').toArray();
  }
  return await db.files.where('parentId').equals(parentId).toArray();
}

// Editor State Operations
export async function getEditorState(): Promise<EditorState | undefined> {
  return await db.editorState.get('main');
}

export async function saveEditorState(state: Partial<EditorState>): Promise<void> {
  const existing = await db.editorState.get('main');
  if (existing) {
    await db.editorState.update('main', state);
  } else {
    await db.editorState.add({ id: 'main', openTabs: [], activeTabId: null, expandedFolders: [], ...state });
  }
}

// Initialize with sample files if empty
export async function initializeDefaultFiles(): Promise<void> {
  const count = await db.files.count();
  if (count === 0) {
    const now = Date.now();
    
    // Create a sample project structure
    await db.files.bulkAdd([
      {
        id: 'folder-src',
        name: 'src',
        type: 'folder',
        parentId: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'file-index',
        name: 'index.ts',
        type: 'file',
        parentId: 'folder-src',
        content: `// Welcome to Code IDE
// Start editing your code here!

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));

export { greet };
`,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'file-readme',
        name: 'README.md',
        type: 'file',
        parentId: null,
        content: `# Code IDE

A browser-based code editor with offline support.

## Features

- 📝 Monaco Editor (VS Code engine)
- 📁 File & folder management
- 💾 Automatic saving to IndexedDB
- 📦 Import/Export projects
- 🌙 Dark theme

## Getting Started

1. Create files and folders using the sidebar
2. Edit code in the main editor
3. Your work is automatically saved
4. Export your project as a ZIP file

Enjoy coding! 🚀
`,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'file-styles',
        name: 'styles.css',
        type: 'file',
        parentId: 'folder-src',
        content: `/* Main Styles */

:root {
  --primary-color: #3b82f6;
  --background: #0d1117;
  --text: #c9d1d9;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--background);
  color: var(--text);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.button {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.9;
}
`,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'folder-components',
        name: 'components',
        type: 'folder',
        parentId: 'folder-src',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'file-button',
        name: 'Button.tsx',
        type: 'file',
        parentId: 'folder-components',
        content: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100',
  };

  return (
    <button
      className={\`\${baseStyles} \${variants[variant]}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
`,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  }
}
