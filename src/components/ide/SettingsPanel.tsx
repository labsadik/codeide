import React from 'react';
import { Settings, Monitor, Sun, Moon, RotateCcw } from 'lucide-react';
import { EditorSettings } from '@/hooks/useSettings';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: EditorSettings;
  onUpdateSettings: (updates: Partial<EditorSettings>) => void;
  onResetSettings: () => void;
}

export function SettingsPanel({
  open,
  onOpenChange,
  settings,
  onUpdateSettings,
  onResetSettings,
}: SettingsPanelProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </DialogTitle>
          <DialogDescription>Customize your editor preferences</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme */}
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="flex gap-2">
              <Button
                variant={settings.theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className="flex-1"
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </Button>
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className="flex-1"
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </Button>
              <Button
                variant={settings.theme === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUpdateSettings({ theme: 'system' })}
                className="flex-1"
              >
                <Monitor className="w-4 h-4 mr-2" />
                System
              </Button>
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Font Size</Label>
              <span className="text-sm text-muted-foreground">{settings.fontSize}px</span>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => onUpdateSettings({ fontSize: value })}
              min={10}
              max={24}
              step={1}
            />
          </div>

          {/* Tab Size */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Tab Size</Label>
              <span className="text-sm text-muted-foreground">{settings.tabSize} spaces</span>
            </div>
            <Slider
              value={[settings.tabSize]}
              onValueChange={([value]) => onUpdateSettings({ tabSize: value })}
              min={2}
              max={8}
              step={2}
            />
          </div>

          {/* Word Wrap */}
          <div className="space-y-2">
            <Label>Word Wrap</Label>
            <Select
              value={settings.wordWrap}
              onValueChange={(value: 'on' | 'off' | 'bounded') =>
                onUpdateSettings({ wordWrap: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Off</SelectItem>
                <SelectItem value="on">On</SelectItem>
                <SelectItem value="bounded">Bounded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Line Numbers */}
          <div className="space-y-2">
            <Label>Line Numbers</Label>
            <Select
              value={settings.lineNumbers}
              onValueChange={(value: 'on' | 'off' | 'relative') =>
                onUpdateSettings({ lineNumbers: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on">On</SelectItem>
                <SelectItem value="off">Off</SelectItem>
                <SelectItem value="relative">Relative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minimap */}
          <div className="flex items-center justify-between">
            <Label htmlFor="minimap">Show Minimap</Label>
            <Switch
              id="minimap"
              checked={settings.minimap}
              onCheckedChange={(checked) => onUpdateSettings({ minimap: checked })}
            />
          </div>

          {/* Reset */}
          <Button variant="outline" onClick={onResetSettings} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
