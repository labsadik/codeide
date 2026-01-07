import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FileNode, getAllFiles, createFile as createFileInDB } from './db';
import { v4 as uuidv4 } from 'uuid';

// Get file extension
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

// Get language for Monaco Editor based on file extension
export function getLanguageFromExtension(filename: string): string {
  const ext = getFileExtension(filename);
  const languageMap: Record<string, string> = {
    js: 'javascript', jsx: 'javascript', mjs: 'javascript', cjs: 'javascript',
    ts: 'typescript', tsx: 'typescript', mts: 'typescript', cts: 'typescript',
    html: 'html', htm: 'html', xhtml: 'html',
    css: 'css', scss: 'scss', sass: 'scss', less: 'less',
    json: 'json', jsonc: 'jsonc',
    md: 'markdown', markdown: 'markdown', mdx: 'mdx',
    xml: 'xml', svg: 'xml', xsl: 'xml',
    yaml: 'yaml', yml: 'yaml', toml: 'toml',
    py: 'python', pyw: 'python', pyi: 'python',
    rb: 'ruby', rake: 'ruby', gemspec: 'ruby',
    go: 'go', rs: 'rust', java: 'java', kt: 'kotlin', scala: 'scala',
    c: 'c', h: 'c', cpp: 'cpp', cxx: 'cpp', cc: 'cpp', hpp: 'cpp',
    cs: 'csharp', fs: 'fsharp', vb: 'vb',
    php: 'php', phtml: 'php',
    swift: 'swift', dart: 'dart',
    sh: 'shell', bash: 'shell', zsh: 'shell', fish: 'shell',
    ps1: 'powershell', bat: 'bat', cmd: 'bat',
    sql: 'sql', mysql: 'mysql', pgsql: 'pgsql',
    dockerfile: 'dockerfile', docker: 'dockerfile',
    graphql: 'graphql', gql: 'graphql',
    r: 'r', lua: 'lua', perl: 'perl', pl: 'perl',
    hs: 'haskell', elm: 'elm', ex: 'elixir', exs: 'elixir', erl: 'erlang',
    vue: 'vue', svelte: 'svelte',
    tf: 'hcl', hcl: 'hcl', ini: 'ini', cfg: 'ini', conf: 'ini',
    env: 'dotenv', properties: 'properties',
    proto: 'protobuf', prisma: 'prisma', sol: 'solidity',
    asm: 'asm', s: 'asm', wasm: 'wat', wat: 'wat',
  };
  return languageMap[ext] || 'plaintext';
}

// Get file icon based on file type/extension
export function getFileIcon(filename: string, type: 'file' | 'folder'): string {
  if (type === 'folder') return '📁';
  
  const ext = getFileExtension(filename);
  const iconMap: Record<string, string> = {
    js: '🟨',
    jsx: '⚛️',
    ts: '🔷',
    tsx: '⚛️',
    html: '🌐',
    css: '🎨',
    scss: '🎨',
    json: '📋',
    md: '📝',
    py: '🐍',
    rb: '💎',
    go: '🔵',
    rs: '🦀',
    java: '☕',
    php: '🐘',
    sql: '🗃️',
    svg: '🖼️',
    png: '🖼️',
    jpg: '🖼️',
    gif: '🖼️',
    env: '🔐',
    git: '📦',
    lock: '🔒',
  };
  return iconMap[ext] || '📄';
}

// Export project as ZIP
export async function exportAsZip(files: FileNode[], selectedFolderId?: string): Promise<void> {
  const zip = new JSZip();
  
  // Build path map
  const pathMap = new Map<string, string>();
  
  const buildPath = (file: FileNode): string => {
    if (pathMap.has(file.id)) {
      return pathMap.get(file.id)!;
    }
    
    if (file.parentId === null) {
      pathMap.set(file.id, file.name);
      return file.name;
    }
    
    const parent = files.find(f => f.id === file.parentId);
    if (parent) {
      const parentPath = buildPath(parent);
      const fullPath = `${parentPath}/${file.name}`;
      pathMap.set(file.id, fullPath);
      return fullPath;
    }
    
    pathMap.set(file.id, file.name);
    return file.name;
  };
  
  // Filter files if a folder is selected
  let filesToExport = files;
  if (selectedFolderId) {
    const isDescendant = (file: FileNode, ancestorId: string): boolean => {
      if (file.parentId === ancestorId) return true;
      if (file.parentId === null) return false;
      const parent = files.find(f => f.id === file.parentId);
      return parent ? isDescendant(parent, ancestorId) : false;
    };
    
    filesToExport = files.filter(f => f.id === selectedFolderId || isDescendant(f, selectedFolderId));
  }
  
  // Add files to ZIP
  for (const file of filesToExport) {
    if (file.type === 'file' && file.content !== undefined) {
      const path = buildPath(file);
      zip.file(path, file.content);
    }
  }
  
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'project.zip');
}

// Import ZIP file
export async function importZip(
  file: File, 
  onComplete: () => Promise<void>
): Promise<void> {
  const zip = await JSZip.loadAsync(file);
  const now = Date.now();
  
  // Track created folders
  const folderIds = new Map<string, string>();
  
  // Create folder structure
  const createFolderPath = async (path: string): Promise<string | null> => {
    if (!path || path === '.') return null;
    
    if (folderIds.has(path)) {
      return folderIds.get(path)!;
    }
    
    const parts = path.split('/').filter(Boolean);
    let currentPath = '';
    let parentId: string | null = null;
    
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      
      if (folderIds.has(currentPath)) {
        parentId = folderIds.get(currentPath)!;
      } else {
        const id = uuidv4();
        await createFileInDB({
          id,
          name: part,
          type: 'folder',
          parentId,
          createdAt: now,
          updatedAt: now,
        });
        folderIds.set(currentPath, id);
        parentId = id;
      }
    }
    
    return parentId;
  };
  
  // Process each file in ZIP
  for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
    if (zipEntry.dir) continue;
    
    const parts = relativePath.split('/');
    const fileName = parts.pop()!;
    const folderPath = parts.join('/');
    
    const parentId = await createFolderPath(folderPath);
    const content = await zipEntry.async('text');
    
    await createFileInDB({
      id: uuidv4(),
      name: fileName,
      type: 'file',
      parentId,
      content,
      createdAt: now,
      updatedAt: now,
    });
  }
  
  await onComplete();
}
