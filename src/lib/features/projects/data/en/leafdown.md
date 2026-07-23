---
title: Leafdown
category: Desktop App
year: 2026
summary: Open-source, local-first Markdown desktop editor for ordinary files and folders, built around one hybrid reading and editing surface.
outcome: Native file workflows, source-projection Markdown editing, automated frontend and Rust verification, and a packaged Windows alpha release.
repository: https://github.com/Azganoth/leafdown
tags:
  - Tauri
  - React
  - TypeScript
  - Rust
  - Tailwind CSS
  - Vitest
---

**Leafdown** is an open-source, local-first Markdown desktop editor for ordinary files and folders. It opens content directly from the filesystem without requiring a vault, workspace, account, cloud service, or application metadata inside user folders.

The first Windows alpha is available through [GitHub Releases](https://github.com/Azganoth/leafdown/releases/tag/v0.1.0-alpha.1) as MSI and EXE installers. Development continues in public under the `GPL-3.0-or-later` license.

---

## 🧩 Technical decisions

### 1. One surface for rendered content and Markdown source

**Challenge:** Markdown editors often separate source and preview or hide syntax behind visual controls. Both approaches make it harder to combine comfortable reading with direct control over the saved Markdown.

**Implementation:** I built a source-projection engine on top of **Milkdown** and **ProseMirror**. When the selection enters a supported inline object, Leafdown temporarily exposes its Markdown source as editable document text while retaining the canonical editor model. The current adapters cover strong, emphasis, strikethrough, inline code, links, autolinks, and footnote references.

Each adapter locates its target, generates and parses source, validates edits, reconstructs semantic content, and maps the selection between both representations. Valid source becomes the corresponding rich object again; incomplete or invalid source remains exact literal text instead of losing the user's input.

**Outcome:**

- Reading and direct Markdown editing happen in the same document surface.
- Syntax markers remain available when precise control is needed.
- Invalid intermediate edits preserve the characters the user entered.

### 2. Local file workflows without a workspace model

**Challenge:** The editor must work with real files without claiming ownership of their folders. It also needs to protect unsaved work, detect external changes, preserve line endings, and keep folder navigation current.

**Implementation:** The **Rust/Tauri** backend owns file reads and writes, metadata, directory scanning, and filesystem watching. The React frontend maintains an explicit session for the active document and folder context. Before saving, it compares current file metadata with the version originally opened; detected LF or CRLF line endings are retained when writing.

**Outcome:**

- Markdown files remain the only source of truth.
- Opening a folder creates no database or application sidecar files.
- External filesystem events refresh navigation without silently replacing unsaved work.

### 3. Consistent clipboard semantics for source and rich content

**Challenge:** Copy and Cut in a structured editor must preserve Markdown in `text/plain`, semantic content in `text/html`, and ProseMirror's partial-document context. Windows **CF_HTML** envelopes can also introduce transport whitespace that changes the pasted document.

**Implementation:** One shared policy resolves clipboard payloads for native editor gestures, application menus, and the context popup. Selections inside source projection keep the exact selected Markdown in `text/plain` and provide semantic HTML when a faithful mapping exists. At paste ingress, a narrowly qualified normalization unwraps only one qualifying ProseMirror fragment and leaves external or malformed HTML unchanged.

**Outcome:**

- Keyboard, menu, and context-popup actions follow the same clipboard rules.
- Cut removes content only after the clipboard write succeeds.
- Windows transport details do not become document whitespace.

---

## 🏗️ Architecture and verification

```text
               Application components
                         |
                      Commands
                         |
                       Session
                         |
   Domain features: editor, document, folder context, preferences
              |                              |
   Milkdown / ProseMirror          Feature-owned Tauri APIs
                                             |
                                  Rust backend -> filesystem
```

The frontend enforces one-way dependencies from application composition through commands and session workflows into domain features and shared utilities. Native operations stay behind feature-owned Tauri API modules, keeping filesystem concerns out of React components.

### Content safety

- Raw Markdown HTML is displayed as literal text instead of live DOM.
- Remote images are blocked from loading automatically.
- External links open in the system browser, while local non-Markdown targets require confirmation.
- Syntax-highlighting assets are bundled instead of fetched at runtime.

### Delivery and verification

- **Vitest** and Testing Library cover editor, session, and interface behavior.
- Rust tests cover native file and folder operations.
- TypeScript, Oxlint, Oxfmt, Clippy, and Cargo fmt run as project checks.
- A committed Markdown corpus complements automation with round-trip, syntax, byte-boundary, file, and environment scenarios.
- **GitHub Actions** runs frontend and Rust checks separately on Windows. Tagged releases rerun the full check and build versioned Windows installers.

---

## 🛠️ Tech stack

- **Desktop:** Tauri
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Rust
- **Editor:** Milkdown, ProseMirror
- **State:** Zustand
- **Quality:** Vitest, Testing Library, Oxlint, Clippy
