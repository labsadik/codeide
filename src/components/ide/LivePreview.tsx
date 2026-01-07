import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Play,
  RefreshCw,
  ExternalLink,
  X,
  Smartphone,
  Tablet,
  Monitor,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileNode } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface LivePreviewProps {
  files: FileNode[];
  onLog: (type: 'log' | 'error' | 'warn' | 'info', message: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

const VIEWPORT_SIZES: Record<ViewportSize, { width: string; label: string }> = {
  mobile: { width: '375px', label: 'Mobile' },
  tablet: { width: '768px', label: 'Tablet' },
  desktop: { width: '100%', label: 'Desktop' },
};

export function LivePreview({ files, onLog, isOpen, onClose }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { toast } = useToast();

  // Build preview HTML
  const buildPreviewHtml = useCallback(() => {
    // Find HTML file
    const htmlFile = files.find(
      (f) => f.type === 'file' && (f.name === 'index.html' || f.name.endsWith('.html'))
    );

    if (!htmlFile?.content) {
      return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #1a1a2e;
      color: #eee;
      font-family: system-ui, sans-serif;
    }
    .message {
      text-align: center;
      padding: 2rem;
    }
    h2 { margin-bottom: 0.5rem; }
    p { opacity: 0.7; }
  </style>
</head>
<body>
  <div class="message">
    <h2>No Preview Available</h2>
    <p>Create an index.html file to see live preview</p>
  </div>
</body>
</html>`;
    }

    let html = htmlFile.content;

    // Find and inject CSS files
    const cssFiles = files.filter((f) => f.type === 'file' && f.name.endsWith('.css'));
    let cssContent = '';
    cssFiles.forEach((cssFile) => {
      if (cssFile.content) {
        cssContent += `/* ${cssFile.name} */\n${cssFile.content}\n`;
      }
    });

    // Find and inject JS files
    const jsFiles = files.filter(
      (f) => f.type === 'file' && (f.name.endsWith('.js') || f.name.endsWith('.jsx'))
    );
    let jsContent = '';
    jsFiles.forEach((jsFile) => {
      if (jsFile.content) {
        jsContent += `// ${jsFile.name}\n${jsFile.content}\n`;
      }
    });

    // Console capture script
    const consoleCapture = `
<script>
  (function() {
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };
    
    function sendToParent(type, args) {
      const message = Array.from(args).map(arg => {
        if (typeof arg === 'object') {
          try { return JSON.stringify(arg, null, 2); }
          catch { return String(arg); }
        }
        return String(arg);
      }).join(' ');
      
      window.parent.postMessage({ type: 'console', logType: type, message }, '*');
    }
    
    console.log = function() { sendToParent('log', arguments); originalConsole.log.apply(console, arguments); };
    console.error = function() { sendToParent('error', arguments); originalConsole.error.apply(console, arguments); };
    console.warn = function() { sendToParent('warn', arguments); originalConsole.warn.apply(console, arguments); };
    console.info = function() { sendToParent('info', arguments); originalConsole.info.apply(console, arguments); };
    
    window.onerror = function(msg, url, line, col, error) {
      sendToParent('error', [msg + ' (line ' + line + ')']);
    };
  })();
</script>`;

    // Inject CSS into head
    if (cssContent && !html.includes('<link') && !html.includes('</head>')) {
      html = html.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
    } else if (cssContent) {
      const headMatch = html.match(/<head[^>]*>/i);
      if (headMatch) {
        html = html.replace(
          headMatch[0],
          `${headMatch[0]}\n<style>\n${cssContent}\n</style>`
        );
      }
    }

    // Inject JS before closing body
    if (jsContent) {
      const bodyCloseIndex = html.lastIndexOf('</body>');
      if (bodyCloseIndex !== -1) {
        html =
          html.slice(0, bodyCloseIndex) +
          `<script>\n${jsContent}\n</script>\n` +
          html.slice(bodyCloseIndex);
      } else {
        html += `<script>\n${jsContent}\n</script>`;
      }
    }

    // Inject console capture at the beginning
    const headMatch = html.match(/<head[^>]*>/i);
    if (headMatch) {
      html = html.replace(headMatch[0], `${headMatch[0]}\n${consoleCapture}`);
    } else {
      html = consoleCapture + html;
    }

    return html;
  }, [files]);

  // Update preview
  const updatePreview = useCallback(() => {
    const html = buildPreviewHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Revoke old URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(url);

    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  }, [buildPreviewHtml, previewUrl]);

  // Handle console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console') {
        onLog(event.data.logType, event.data.message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLog]);

  // Initial load and file changes
  useEffect(() => {
    if (isOpen) {
      updatePreview();
    }
  }, [isOpen, files]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  // Open in new window
  const openInNewWindow = () => {
    const html = buildPreviewHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Share preview (copy to clipboard)
  const sharePreview = async () => {
    const html = buildPreviewHtml();
    try {
      await navigator.clipboard.writeText(html);
      toast({
        title: 'Copied!',
        description: 'HTML content copied to clipboard',
      });
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col border-l border-border bg-background">
      {/* Toolbar */}
      <div className="h-10 flex items-center justify-between px-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-accent-green" />
          <span className="text-sm font-medium">Live Preview</span>
        </div>
        <div className="flex items-center gap-1">
          {/* Viewport buttons */}
          <Button
            variant={viewport === 'mobile' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewport('mobile')}
            title="Mobile"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant={viewport === 'tablet' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewport('tablet')}
            title="Tablet"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={viewport === 'desktop' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setViewport('desktop')}
            title="Desktop"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={updatePreview}
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={sharePreview}
            title="Copy HTML"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={openInNewWindow}
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onClose}
            title="Close preview"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 flex items-center justify-center bg-muted/30 overflow-auto p-4">
        <div
          className={cn(
            'h-full bg-background shadow-lg transition-all duration-200',
            viewport !== 'desktop' && 'rounded-lg border border-border'
          )}
          style={{ width: VIEWPORT_SIZES[viewport].width, maxWidth: '100%' }}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-modals"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  );
}
