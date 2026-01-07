# Code IDE — Browser-Based Development Environment

A **professional, offline-first, browser-based Integrated Development Environment (IDE)** built with **React and TypeScript**. This project delivers a **VS Code–like experience directly in the browser**, featuring a powerful editor, multi-language support, real-time execution simulation, and a modern, responsive interface — all without requiring any backend services.

![Code IDE](https://img.shields.io/badge/Code-IDE-blue?style=for-the-badge\&logo=visualstudiocode)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge\&logo=typescript)

---

## 📌 Overview

**Code IDE** is a fully client-side web IDE designed to replicate the **core workflows and usability of Visual Studio Code** in a browser environment.
It works **entirely offline**, persists data locally using IndexedDB, and supports real-world development workflows such as file management, code execution, live previewing, and keyboard-driven navigation.

---

## ✨ Features

### 🖥️ Code Editor

* **Monaco Editor** — the same editor engine used by VS Code
* **60+ Programming Languages** with automatic syntax detection
* **IntelliSense** — smart autocomplete and parameter hints (language-dependent)
* **Theme Support** — Dark, Light, and System modes
* **Split Editor View** — edit files side-by-side
* **Editor Settings**:

  * Font size
  * Tab size
  * Word wrap
  * Minimap
  * Line numbers

---

### 🚀 Code Execution

* **Right-Click → Run Code** (language-aware)
* **Keyboard Shortcut**: `Ctrl + Enter`
* **Integrated Terminal Output**
* **Execution Support**:

  * **JavaScript**: real execution in browser sandbox
  * **Other languages (Python, Java, C/C++, etc.)**: simulated runtime with output parsing
* **Clear error and output display** for learning and debugging

> Example:

```python
print("Hello World")
```

Output:

```
Hello World
```

> ⚠️ Note: Due to browser security constraints, non-JavaScript languages are executed using a **safe simulation engine**, not native compilers.

---

### 📁 File Management

* **VS Code–style File Explorer**
* **Professional file & folder icons**
* **Create / Rename / Delete** files and folders
* **Drag & Drop** files between folders
* **Folder Import**:

  * Import directly from local device
  * Automatically replaces default workspace
* **Import / Export** projects as ZIP
* **Unsaved File Indicators**

---

### 🔧 Developer Tools

* **Integrated Terminal Panel**
* **Live Preview Server** for HTML / CSS / JavaScript
* **Command Palette** (`Ctrl + P`)
* **Full Keyboard Navigation**
* **Status Bar**:

  * Current language
  * File information
  * Editor state

---

### 🎨 User Interface

* **VS Code–inspired design language**
* **Custom professional icon system**
* **Collapsible Sidebar** (fully hidden when closed)
* **Resizable panels**
* **Responsive layout** for all screen sizes

---

## ⌨️ Keyboard Shortcuts

| Shortcut            | Action              |
| ------------------- | ------------------- |
| `Ctrl + S`          | Save file           |
| `Ctrl + B`          | Toggle sidebar      |
| `Ctrl + P`          | Command palette     |
| `Ctrl + ,`          | Open settings       |
| `Ctrl + ``          | Toggle terminal     |
| `Ctrl + \`          | Split editor        |
| `Ctrl + Shift + P`  | Toggle live preview |
| `Ctrl + K Ctrl + S` | Keyboard shortcuts  |

---

## 🛠️ Technology Stack

* **Framework**: React 18
* **Language**: TypeScript
* **Editor Engine**: Monaco Editor
* **Styling**: Tailwind CSS
* **UI Components**: shadcn/ui
* **State Management**: React Hooks
* **Persistence**: IndexedDB (Dexie)
* **Build Tool**: Vite

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── ide/              # Editor, Sidebar, Terminal, Tabs
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/
│   ├── codeRunner.ts     # Code execution & simulation engine
│   ├── db.ts             # IndexedDB persistence layer
│   ├── fileUtils.ts      # File system utilities
│   └── vsCodeIcons.tsx   # VS Code–style icon system
└── pages/                # Application entry points
```

---

## 🎯 Supported Languages

<details>
<summary><strong>Click to view all supported languages (60+)</strong></summary>

* JavaScript / TypeScript
* Python
* Java
* C / C++ / C#
* Go
* Rust
* Ruby
* PHP
* Swift
* Kotlin
* Scala
* Perl
* Lua
* R
* Dart
* HTML / CSS / SCSS
* JSON / YAML / XML
* Markdown
* SQL
* Shell / Bash / PowerShell
* And many more…

</details>

---

## 🔒 Privacy & Offline Support

* 100% **client-side**
* Works **fully offline**
* No backend, no APIs, no authentication
* All data stored locally in the browser

---

## 🧠 Design Philosophy

* Offline-first architecture
* Zero server dependency
* Clean, modular, and scalable codebase
* Optimized for performance and usability
* Built for real-world learning and development workflows

---

## 🤝 Contributing

Contributions are welcome.
Please submit a Pull Request with clear descriptions and tested changes.

---

## 📄 License

This project is open source and released under the **MIT License**.

---

<p align="center">
<strong>Built with precision. Inspired by VS Code. Powered by the browser.</strong>
</p>

---

If you want, I can next:

* Add **architecture diagrams**
* Write a **college project report**
* Create **screenshots + GIF documentation**
* Add **performance benchmarks**
* Prepare a **resume-ready project description**

Just tell me.
