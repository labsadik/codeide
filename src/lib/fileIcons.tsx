import React from 'react';
import {
  FileText,
  FileCode,
  FileJson,
  FileImage,
  File,
  Folder,
  FolderOpen,
  FileType,
  Braces,
  Hash,
  Globe,
  Palette,
  Database,
  Settings,
  Lock,
  Package,
  GitBranch,
  Terminal,
  FileVideo,
  FileAudio,
} from 'lucide-react';

export interface FileIconConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const FILE_ICONS: Record<string, FileIconConfig> = {
  // JavaScript/TypeScript
  js: { icon: Braces, color: 'text-yellow-400' },
  jsx: { icon: Braces, color: 'text-blue-400' },
  ts: { icon: Braces, color: 'text-blue-500' },
  tsx: { icon: Braces, color: 'text-blue-400' },
  mjs: { icon: Braces, color: 'text-yellow-400' },
  cjs: { icon: Braces, color: 'text-yellow-400' },

  // Web
  html: { icon: Globe, color: 'text-orange-500' },
  htm: { icon: Globe, color: 'text-orange-500' },
  css: { icon: Palette, color: 'text-blue-400' },
  scss: { icon: Palette, color: 'text-pink-400' },
  sass: { icon: Palette, color: 'text-pink-400' },
  less: { icon: Palette, color: 'text-blue-500' },

  // Data
  json: { icon: FileJson, color: 'text-yellow-500' },
  yaml: { icon: FileCode, color: 'text-red-400' },
  yml: { icon: FileCode, color: 'text-red-400' },
  xml: { icon: FileCode, color: 'text-orange-400' },
  csv: { icon: Database, color: 'text-green-400' },
  sql: { icon: Database, color: 'text-blue-400' },

  // Documentation
  md: { icon: FileText, color: 'text-blue-300' },
  markdown: { icon: FileText, color: 'text-blue-300' },
  txt: { icon: FileText, color: 'text-gray-400' },
  rtf: { icon: FileText, color: 'text-gray-400' },

  // Python
  py: { icon: FileCode, color: 'text-yellow-500' },
  pyw: { icon: FileCode, color: 'text-yellow-500' },
  pyc: { icon: FileCode, color: 'text-yellow-600' },

  // Other languages
  java: { icon: FileCode, color: 'text-red-500' },
  class: { icon: FileCode, color: 'text-red-600' },
  c: { icon: FileCode, color: 'text-blue-500' },
  cpp: { icon: FileCode, color: 'text-blue-600' },
  h: { icon: FileCode, color: 'text-purple-400' },
  hpp: { icon: FileCode, color: 'text-purple-400' },
  cs: { icon: FileCode, color: 'text-green-500' },
  go: { icon: FileCode, color: 'text-cyan-400' },
  rs: { icon: FileCode, color: 'text-orange-600' },
  rb: { icon: FileCode, color: 'text-red-500' },
  php: { icon: FileCode, color: 'text-purple-500' },
  swift: { icon: FileCode, color: 'text-orange-500' },
  kt: { icon: FileCode, color: 'text-purple-400' },

  // Shell
  sh: { icon: Terminal, color: 'text-green-400' },
  bash: { icon: Terminal, color: 'text-green-400' },
  zsh: { icon: Terminal, color: 'text-green-400' },
  fish: { icon: Terminal, color: 'text-green-400' },
  ps1: { icon: Terminal, color: 'text-blue-400' },
  bat: { icon: Terminal, color: 'text-yellow-400' },
  cmd: { icon: Terminal, color: 'text-yellow-400' },

  // Config
  env: { icon: Lock, color: 'text-yellow-500' },
  gitignore: { icon: GitBranch, color: 'text-orange-400' },
  dockerignore: { icon: Settings, color: 'text-blue-400' },
  eslintrc: { icon: Settings, color: 'text-purple-400' },
  prettierrc: { icon: Settings, color: 'text-pink-400' },
  editorconfig: { icon: Settings, color: 'text-gray-400' },
  babelrc: { icon: Settings, color: 'text-yellow-400' },

  // Package
  lock: { icon: Lock, color: 'text-yellow-500' },

  // Images
  png: { icon: FileImage, color: 'text-purple-400' },
  jpg: { icon: FileImage, color: 'text-purple-400' },
  jpeg: { icon: FileImage, color: 'text-purple-400' },
  gif: { icon: FileImage, color: 'text-purple-400' },
  svg: { icon: FileImage, color: 'text-orange-400' },
  ico: { icon: FileImage, color: 'text-blue-400' },
  webp: { icon: FileImage, color: 'text-purple-400' },

  // Video/Audio
  mp4: { icon: FileVideo, color: 'text-red-400' },
  webm: { icon: FileVideo, color: 'text-red-400' },
  mov: { icon: FileVideo, color: 'text-red-400' },
  mp3: { icon: FileAudio, color: 'text-pink-400' },
  wav: { icon: FileAudio, color: 'text-pink-400' },
  ogg: { icon: FileAudio, color: 'text-pink-400' },

  // Font
  woff: { icon: FileType, color: 'text-gray-400' },
  woff2: { icon: FileType, color: 'text-gray-400' },
  ttf: { icon: FileType, color: 'text-gray-400' },
  otf: { icon: FileType, color: 'text-gray-400' },
  eot: { icon: FileType, color: 'text-gray-400' },
};

const SPECIAL_FILES: Record<string, FileIconConfig> = {
  'package.json': { icon: Package, color: 'text-green-400' },
  'package-lock.json': { icon: Lock, color: 'text-yellow-500' },
  'tsconfig.json': { icon: Settings, color: 'text-blue-400' },
  'vite.config.ts': { icon: Settings, color: 'text-purple-400' },
  'vite.config.js': { icon: Settings, color: 'text-purple-400' },
  '.gitignore': { icon: GitBranch, color: 'text-orange-400' },
  '.env': { icon: Lock, color: 'text-yellow-500' },
  '.env.local': { icon: Lock, color: 'text-yellow-500' },
  '.env.development': { icon: Lock, color: 'text-yellow-500' },
  '.env.production': { icon: Lock, color: 'text-yellow-500' },
  'dockerfile': { icon: Package, color: 'text-blue-400' },
  'docker-compose.yml': { icon: Package, color: 'text-blue-400' },
  'readme.md': { icon: FileText, color: 'text-blue-300' },
  'license': { icon: FileText, color: 'text-yellow-400' },
  'license.md': { icon: FileText, color: 'text-yellow-400' },
};

export function getFileIconConfig(filename: string, type: 'file' | 'folder'): FileIconConfig {
  if (type === 'folder') {
    return { icon: Folder, color: 'text-yellow-400' };
  }

  const lowerName = filename.toLowerCase();

  // Check special files first
  if (SPECIAL_FILES[lowerName]) {
    return SPECIAL_FILES[lowerName];
  }

  // Get extension
  const parts = filename.split('.');
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';

  // Check extension
  if (FILE_ICONS[ext]) {
    return FILE_ICONS[ext];
  }

  return { icon: File, color: 'text-gray-400' };
}

interface FileIconProps {
  filename: string;
  type: 'file' | 'folder';
  isOpen?: boolean;
  className?: string;
}

export function FileIcon({ filename, type, isOpen, className }: FileIconProps) {
  if (type === 'folder') {
    const Icon = isOpen ? FolderOpen : Folder;
    return <Icon className={`${className} text-yellow-400`} />;
  }

  const config = getFileIconConfig(filename, type);
  const Icon = config.icon;
  return <Icon className={`${className} ${config.color}`} />;
}
