---
title: Leafdown
category: Desktop App
year: 2026
summary: Open-source, local-first Markdown desktop editor for ordinary files and folders, built around one hybrid reading and editing surface.
outcome: Public open-source alpha with native filesystem integration, source-projection Markdown editing, and a tested React/Rust architecture.
repository: https://github.com/Azganoth/leafdown
tags:
  - Tauri
  - React
  - TypeScript
  - Rust
  - TailwindCSS
  - Vitest
---

**Leafdown** is an open-source, local-first Markdown desktop editor under active development. It opens ordinary files and folders directly from the filesystem without requiring a vault, workspace, account, cloud synchronization, or application metadata inside user folders.

The project is currently a **public alpha**. I develop the application together with its product specification, architecture, technical decisions, engineering patterns, and verification strategy.

---

## 🧩 Technical Challenges & Solutions

### 1. Hybrid Editing Through Source Projection

**The Problem:** Markdown editors commonly choose between permanent source text, a separate preview, or visual components that hide syntax completely. These approaches make it difficult to combine fluent reading with precise control over the saved Markdown.

**The Solution:** I built a _source projection_ system on top of **Milkdown/ProseMirror**. When the selection enters a supported object — including emphasis, inline code, links, autolinks, and footnote references — the editor temporarily replaces its visual presentation with editable Markdown inside the document itself.

Each adapter owns target discovery, source generation, validation, semantic rehydration, and selection mapping. Valid edits reconstruct the rich object; incomplete or invalid input is preserved as literal text instead of being discarded.

**Outcome:**

- One surface for reading and editing without switching between source and preview modes.
- Markdown markers remain accessible when the user needs direct control.
- Saved files remain ordinary, portable Markdown.

### 2. Native File Workflows Without a Workspace Model

**The Problem:** The editor needed to operate on real files without claiming ownership of user folders while still handling dirty state, external changes, recent items, local links, and navigation refreshes.

**The Solution:** The **Rust/Tauri** backend owns file reads and writes, metadata, directory scanning, and filesystem watching. The frontend maintains an explicit session for the active document and folder context, checking metadata freshness before overwriting a file.

**Outcome:**

- Markdown files remain the only source of truth.
- Folders open directly without databases or application sidecar files.
- External changes refresh article navigation without silently replacing unsaved work.

### 3. Semantic Clipboard Behavior and Windows Compatibility

**The Problem:** Clipboard behavior in a structured editor involves Markdown in `text/plain`, semantic HTML, and the partial-document context used by ProseMirror. On Windows/WebView, **CF_HTML** envelopes can also introduce whitespace that changes pasted content.

**The Solution:** I centralized Copy/Cut payload resolution across native shortcuts and application commands, preserving Markdown as text alongside semantically equivalent HTML. At paste ingress, a narrowly qualified normalization unwraps only one valid ProseMirror fragment while leaving external or malformed HTML unchanged.

**Outcome:**

- Menus, contextual controls, and native gestures follow the same clipboard policy.
- Projected selections preserve the exact Markdown characters selected by the user.
- External HTML retains the editor's default behavior.

### 4. Architecture and Verification Strategy

The frontend follows feature-owned boundaries across application components, commands, session workflows, domain features, and shared utilities. Native operations remain behind feature-owned Tauri API modules.

Verification combines:

- Behavioral and integration tests with **Vitest** and Testing Library.
- Rust tests for native operations.
- TypeScript, Oxlint, Oxfmt, Clippy, and Cargo fmt checks.
- A manual Markdown corpus for round trips, syntax interactions, byte boundaries, local files, and environment scenarios.

---

## 🏗️ Stack

- **Desktop:** Tauri
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Rust
- **Editor:** Milkdown / ProseMirror
- **State:** Zustand
- **Quality:** Vitest, Testing Library, Oxlint, Clippy
