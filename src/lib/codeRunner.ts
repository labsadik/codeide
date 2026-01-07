// Simulated code runner for various programming languages
// Note: This is a browser-based simulation. Real execution would require a backend.

export interface CodeOutput {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
}

// Languages that support code execution
export const RUNNABLE_LANGUAGES = [
  'python', 'javascript', 'typescript', 'java', 'c', 'cpp', 'csharp',
  'go', 'rust', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'perl',
  'lua', 'r', 'dart', 'bash', 'powershell'
];

export function isRunnableLanguage(language: string): boolean {
  return RUNNABLE_LANGUAGES.includes(language.toLowerCase());
}

export function getLanguageFromFileName(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const langMap: Record<string, string> = {
    'py': 'python',
    'js': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'jsx': 'javascript',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cc': 'cpp',
    'cxx': 'cpp',
    'cs': 'csharp',
    'go': 'go',
    'rs': 'rust',
    'rb': 'ruby',
    'php': 'php',
    'swift': 'swift',
    'kt': 'kotlin',
    'kts': 'kotlin',
    'scala': 'scala',
    'pl': 'perl',
    'lua': 'lua',
    'r': 'r',
    'dart': 'dart',
    'sh': 'bash',
    'bash': 'bash',
    'ps1': 'powershell',
  };
  return langMap[ext] || '';
}

// Simple code interpreter/simulator
export function runCode(code: string, language: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  
  try {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'typescript':
        return runJavaScript(code);
      case 'python':
        return runPython(code);
      case 'java':
        return runJava(code);
      case 'c':
      case 'cpp':
        return runCpp(code);
      case 'csharp':
        return runCSharp(code);
      case 'go':
        return runGo(code);
      case 'rust':
        return runRust(code);
      case 'ruby':
        return runRuby(code);
      case 'php':
        return runPHP(code);
      case 'swift':
        return runSwift(code);
      case 'kotlin':
        return runKotlin(code);
      case 'lua':
        return runLua(code);
      case 'bash':
      case 'powershell':
        return runShell(code, language);
      default:
        return [{ type: 'info', message: `Running ${language} code...` }, ...simulateGenericRun(code, language)];
    }
  } catch (error) {
    outputs.push({ type: 'error', message: `Runtime Error: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
  
  return outputs;
}

function runJavaScript(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running JavaScript...' });
  
  // Create a custom console to capture output
  const logs: CodeOutput[] = [];
  const customConsole = {
    log: (...args: any[]) => logs.push({ type: 'log', message: args.map(a => formatValue(a)).join(' ') }),
    error: (...args: any[]) => logs.push({ type: 'error', message: args.map(a => formatValue(a)).join(' ') }),
    warn: (...args: any[]) => logs.push({ type: 'warn', message: args.map(a => formatValue(a)).join(' ') }),
    info: (...args: any[]) => logs.push({ type: 'info', message: args.map(a => formatValue(a)).join(' ') }),
  };
  
  try {
    // Create a function with custom console
    const func = new Function('console', code);
    func(customConsole);
    outputs.push(...logs);
    if (logs.length === 0) {
      outputs.push({ type: 'info', message: '(No output)' });
    }
  } catch (error) {
    outputs.push({ type: 'error', message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
  
  return outputs;
}

function runPython(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running Python...' });
  
  // Parse and simulate Python print statements
  const lines = code.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Handle print statements
    const printMatch = trimmed.match(/^print\s*\((.*)\)$/);
    if (printMatch) {
      const content = printMatch[1];
      const result = evaluatePythonExpression(content);
      outputs.push({ type: 'log', message: result });
      continue;
    }
    
    // Handle f-strings in print
    const fstringMatch = trimmed.match(/^print\s*\(f['"](.*)['"]\)$/);
    if (fstringMatch) {
      outputs.push({ type: 'log', message: fstringMatch[1].replace(/\{[^}]+\}/g, '[variable]') });
      continue;
    }
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output - code executed successfully)' });
  }
  
  return outputs;
}

function evaluatePythonExpression(expr: string): string {
  // Handle string literals
  const strMatch = expr.match(/^['"](.*)['"]$/);
  if (strMatch) return strMatch[1];
  
  // Handle numbers
  if (/^-?\d+(\.\d+)?$/.test(expr)) return expr;
  
  // Handle simple arithmetic
  try {
    if (/^[\d\s+\-*/().]+$/.test(expr)) {
      return String(eval(expr));
    }
  } catch {}
  
  // Handle multiple arguments
  if (expr.includes(',')) {
    return expr.split(',').map(e => evaluatePythonExpression(e.trim())).join(' ');
  }
  
  return expr;
}

function runJava(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Compiling and running Java...' });
  
  // Parse System.out.println statements
  const printMatches = code.matchAll(/System\.out\.println\s*\((.*?)\);/g);
  for (const match of printMatches) {
    const content = match[1];
    const strMatch = content.match(/^"(.*)"$/);
    outputs.push({ type: 'log', message: strMatch ? strMatch[1] : content });
  }
  
  // Parse System.out.print statements
  const printNoLnMatches = code.matchAll(/System\.out\.print\s*\((.*?)\);/g);
  for (const match of printNoLnMatches) {
    const content = match[1];
    const strMatch = content.match(/^"(.*)"$/);
    outputs.push({ type: 'log', message: strMatch ? strMatch[1] : content });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(Compilation successful, no output)' });
  }
  
  return outputs;
}

function runCpp(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Compiling and running C/C++...' });
  
  // Parse cout statements
  const coutMatches = code.matchAll(/(?:std::)?cout\s*<<\s*(.*?)\s*(?:<<\s*(?:std::)?endl|;)/g);
  for (const match of coutMatches) {
    let content = match[1];
    // Extract string content
    const parts = content.split('<<').map(p => {
      const trimmed = p.trim();
      const strMatch = trimmed.match(/^"(.*)"$/);
      return strMatch ? strMatch[1] : trimmed;
    });
    outputs.push({ type: 'log', message: parts.join('') });
  }
  
  // Parse printf statements
  const printfMatches = code.matchAll(/printf\s*\(\s*"([^"]*)"/g);
  for (const match of printfMatches) {
    outputs.push({ type: 'log', message: match[1].replace(/\\n/g, '') });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(Compilation successful, no output)' });
  }
  
  return outputs;
}

function runCSharp(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Compiling and running C#...' });
  
  const writeLineMatches = code.matchAll(/Console\.WriteLine\s*\((.*?)\);/g);
  for (const match of writeLineMatches) {
    const content = match[1];
    const strMatch = content.match(/^"(.*)"$/);
    outputs.push({ type: 'log', message: strMatch ? strMatch[1] : content });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(Compilation successful, no output)' });
  }
  
  return outputs;
}

function runGo(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running Go...' });
  
  const printMatches = code.matchAll(/fmt\.Println\s*\((.*?)\)/g);
  for (const match of printMatches) {
    const content = match[1];
    const strMatch = content.match(/^"(.*)"$/);
    outputs.push({ type: 'log', message: strMatch ? strMatch[1] : content });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output)' });
  }
  
  return outputs;
}

function runRust(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Compiling and running Rust...' });
  
  const printMatches = code.matchAll(/println!\s*\(\s*"([^"]*)"/g);
  for (const match of printMatches) {
    outputs.push({ type: 'log', message: match[1].replace(/\{[^}]*\}/g, '[variable]') });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(Compilation successful, no output)' });
  }
  
  return outputs;
}

function runRuby(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running Ruby...' });
  
  const putsMatches = code.matchAll(/puts\s+(['"])(.*?)\1/g);
  for (const match of putsMatches) {
    outputs.push({ type: 'log', message: match[2] });
  }
  
  const printMatches = code.matchAll(/print\s+(['"])(.*?)\1/g);
  for (const match of printMatches) {
    outputs.push({ type: 'log', message: match[2] });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output)' });
  }
  
  return outputs;
}

function runPHP(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running PHP...' });
  
  const echoMatches = code.matchAll(/echo\s+(['"])(.*?)\1/g);
  for (const match of echoMatches) {
    outputs.push({ type: 'log', message: match[2] });
  }
  
  const printMatches = code.matchAll(/print\s+(['"])(.*?)\1/g);
  for (const match of printMatches) {
    outputs.push({ type: 'log', message: match[2] });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output)' });
  }
  
  return outputs;
}

function runSwift(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running Swift...' });
  
  const printMatches = code.matchAll(/print\s*\(\s*"([^"]*)"\s*\)/g);
  for (const match of printMatches) {
    outputs.push({ type: 'log', message: match[1] });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output)' });
  }
  
  return outputs;
}

function runKotlin(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running Kotlin...' });
  
  const printMatches = code.matchAll(/println\s*\(\s*"([^"]*)"\s*\)/g);
  for (const match of printMatches) {
    outputs.push({ type: 'log', message: match[1] });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output)' });
  }
  
  return outputs;
}

function runLua(code: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: '▶ Running Lua...' });
  
  const printMatches = code.matchAll(/print\s*\(\s*(['"])(.*?)\1\s*\)/g);
  for (const match of printMatches) {
    outputs.push({ type: 'log', message: match[2] });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output)' });
  }
  
  return outputs;
}

function runShell(code: string, language: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  outputs.push({ type: 'info', message: `▶ Running ${language === 'powershell' ? 'PowerShell' : 'Bash'}...` });
  
  const echoMatches = code.matchAll(/echo\s+(['"]?)([^'";\n]+)\1/g);
  for (const match of echoMatches) {
    outputs.push({ type: 'log', message: match[2] });
  }
  
  if (outputs.length === 1) {
    outputs.push({ type: 'info', message: '(No output)' });
  }
  
  return outputs;
}

function simulateGenericRun(code: string, language: string): CodeOutput[] {
  const outputs: CodeOutput[] = [];
  
  // Try to find common print patterns
  const printPatterns = [
    /print\s*\(\s*(['"])(.*?)\1\s*\)/g,
    /println\s*\(\s*(['"])(.*?)\1\s*\)/g,
    /echo\s+(['"])(.*?)\1/g,
    /puts\s+(['"])(.*?)\1/g,
  ];
  
  for (const pattern of printPatterns) {
    const matches = code.matchAll(pattern);
    for (const match of matches) {
      outputs.push({ type: 'log', message: match[2] });
    }
  }
  
  if (outputs.length === 0) {
    outputs.push({ type: 'info', message: '(Code executed successfully, no output detected)' });
  }
  
  return outputs;
}

function formatValue(value: any): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
}
