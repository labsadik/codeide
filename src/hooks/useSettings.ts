import { useState, useEffect, useCallback } from 'react';

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  wordWrap: 'on' | 'off' | 'bounded';
  minimap: boolean;
  theme: 'dark' | 'light' | 'system';
  lineNumbers: 'on' | 'off' | 'relative';
}

const DEFAULT_SETTINGS: EditorSettings = {
  fontSize: 14,
  tabSize: 2,
  wordWrap: 'off',
  minimap: true,
  theme: 'system',
  lineNumbers: 'on',
};

const STORAGE_KEY = 'code-ide-settings';

export function useSettings() {
  const [settings, setSettings] = useState<EditorSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (theme: 'dark' | 'light') => {
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyTheme(settings.theme);
    }
  }, [settings.theme]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((updates: Partial<EditorSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return { settings, updateSettings, resetSettings };
}
