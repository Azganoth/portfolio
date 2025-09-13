---
title: Tree Sitter Lua
category: Library
year: 2018
summary: A complete Lua language grammar for the Tree-sitter parser, with an external scanner for strings and comments.
repository: https://github.com/Azganoth/tree-sitter-lua
tags:
  - JavaScript
  - Node
  - C
  - Rust
  - Lua
---

A complete Lua language grammar (compatible with version 5.4) for the Tree-sitter parsing system. The project was written in C and JavaScript (for the grammar definition), and includes an external scanner to handle complex rules like comments and strings.

The library is published and consumable in multiple ecosystems, including Node.js (NPM), Rust (Crates.io), and Swift (SPM).

### Key Features

- **Lua 5.4 Parsing**: Complete parsing of Lua 5.4 syntax, including support for `shebang` and local variable attributes (e.g., `<const>` and `<close>`).
- **Efficient External Scanner**: Includes an external scanner in C to correctly parse the syntax of comments (short and long) and strings (short and long), which cannot be handled by the declarative grammar alone.
- **Multi-language Bindings**: Generates native bindings for integration into different environments, including **Node.js**, **Rust**, and **Swift**.
- **Testing and CI**: Continuous Integration setup with **GitHub Actions** to run the test suite (`tree-sitter test`) and ensure the grammar's correctness across multiple operating systems.

### Tools and Technologies

The core grammar is defined in **JavaScript** (`grammar.js`), which is compiled by the **Tree-sitter CLI** to generate the parser in **C** (`parser.c`). An external scanner (`scanner.c`) is written in **C** to handle stateful parsing rules.

Bindings are provided for:

- **Node.js**: Using `node-gyp` and `nan` to compile the C++ wrapper.
- **Rust**: Using `cc` in `build.rs` to compile the C sources and link with the Rust crate.
- **Swift**: Using the **Swift Package Manager** (`Package.swift`) to expose the C headers.

### Technical Challenges and Learnings

- **Grammar and Operator Precedence**: The main challenge was defining the grammar in `grammar.js` to resolve LR(1) parsing conflicts. This required careful definition of operator precedence (e.g., `PREC.COMPARATIVE`, `PREC.UNARY`) and refactoring complex rules like `binary_expression` to eliminate ambiguities.
- **External Scanner for Strings and Comments**: Tree-sitter's declarative grammar cannot handle Lua's long strings and comments (e.g., `[=[ ... ]=]`), which can have a variable number of `=`. It was necessary to implement an external scanner in C (`scanner.c`) that manages state (storing the `depth` of the delimiters) to correctly parse these text blocks.
- **Lua 5.4 Syntax Support**: The project was updated to fully support the Lua 5.4 specification. This included adding new rules, such as local variable attributes (`<const>` and `<close>`), and expanding the number syntax to support complex hexadecimal literals.
- **Multi-Language Build Configuration**: Providing the library to multiple ecosystems required configuring distinct build systems: `binding.gyp` for Node.js, `Cargo.toml` with a `build.rs` script for Rust, and `Package.swift` for Swift. The challenge was ensuring the same C sources (`parser.c` and `scanner.c`) were compiled and linked correctly in all these environments.
