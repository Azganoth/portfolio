---
title: Tree Sitter Lua
category: Library
year: 2018
summary: Complete Lua language grammar for the Tree-sitter parser, with external scanner for strings and comments.
repository: https://github.com/Azganoth/tree-sitter-lua
tags:
  - JavaScript
  - C
---

A complete grammar of the **Lua** language (compatible with version 5.4) for the **Tree-sitter** parsing system. The project was written in **JavaScript** (grammar definition) and **C** (external scanner); the external scanner handles complex rules like comments and strings.

The library is published and consumable in multiple ecosystems, including **Node.js** (NPM), **Rust** (Crates.io), and **Swift** (SPM).

---

## 🧩 Technical Challenges & Solutions

### 1. Grammar and Operator Precedence

**The Problem:** Define the grammar in `grammar.js` to resolve LR(1) parsing conflicts common in dynamic languages.

**The Solution:** Careful definition of operator precedence (e.g., `PREC.COMPARATIVE`, `PREC.UNARY`) and refactoring of complex rules like `binary_expression`.

**Result:**

- Elimination of ambiguities.
- Precise parsing.

### 2. External Scanner for Strings and Comments

**The Problem:** **Tree-sitter**'s declarative grammar cannot handle long Lua strings and comments (e.g., `[=[ ... ]=]`), which may have a variable number of equal signs.

**The Solution:** It was necessary to implement an external scanner in **C** (`scanner.c`) that manages state (storing delimiter depth).

**Result:**

- Correct parse of complex text blocks.

### 3. Support for Lua 5.4 Syntax

**The Problem:** Keep the grammar updated with the latest language specifications.

**The Solution:** The project was updated to fully support the **Lua 5.4** specification. This included adding new rules, such as local variable attributes (`<const>` and `<close>`) and complex hexadecimal literals.

**Result:**

- Full compatibility with the latest language version.

### 4. Multi-Language Build Configuration

**The Problem:** Provide the library to multiple ecosystems (**Node.js**, **Rust**, **Swift**) with distinct build systems.

**The Solution:** I configured specific build pipelines: `binding.gyp` for **Node.js** and `Cargo.toml` with `build.rs` for **Rust**. A third-party contribution ensured build for **Swift** (`Package.swift`).

**Result:**

- Ensures the same **C** sources (`parser.c` and `scanner.c`) are compiled correctly.
- Library natively consumable in various environments.

---

## 🏗️ Architecture

The grammar core is defined in **JavaScript** (`grammar.js`), which is compiled by the **Tree-sitter CLI** to generate the parser in **C** (`parser.c`). An external scanner (`scanner.c`) is written in **C** to handle parsing rules requiring state.

### Multi-language Bindings

Bindings are provided natively for:

- **Node.js**: Using `node-gyp` and `nan` to compile the C++ wrapper.
- **Rust**: Using `cc` in `build.rs` to compile C sources and link with the Rust crate.
- **Swift**: Using **Swift Package Manager** (`Package.swift`) to expose C headers.

---

## 🛠️ Tech Stack

- **Grammar:** JavaScript
- **Parsing:** C
- **Bindings:** Node.js, Rust, Swift
- **CI:** GitHub Actions
