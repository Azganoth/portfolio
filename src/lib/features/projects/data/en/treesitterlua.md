---
title: Tree-sitter Lua
category: Library
year: 2018
summary: Lua 5.4 grammar for Tree-sitter, with a stateful C scanner for strings and comments with variable delimiters.
outcome: A published npm package, Node.js, Rust, and Swift bindings, ten GitHub releases, and three merged external pull requests.
repository: https://github.com/Azganoth/tree-sitter-lua
tags:
  - JavaScript
  - C
---

**Tree-sitter Lua** is a Lua 5.4 grammar for the **Tree-sitter** incremental parsing system. The grammar is defined in JavaScript, compiled into a C parser, and paired with an external scanner written in C for stateful string and comment rules.

The [npm package](https://www.npmjs.com/package/tree-sitter-lua) remains published at `v2.1.3`. I developed and released the project from 2018 through 2022; it remains available under the MIT license but is not under active maintenance.

---

## 🤝 Open-source and collaboration

- **Ten GitHub releases** were published between 2018 and 2022; the latest is [`v2.1.3`](https://github.com/Azganoth/tree-sitter-lua/releases/tag/v2.1.3).
- **Three pull requests from external contributors** were merged, adding named syntax nodes and return-statement improvements, per-instance scanner state, and Swift Package Manager support.
- The repository has a four-contributor history, more than **50 stars**, and more than **20 forks**.
- The same generated parser is available through Node.js, Rust, and Swift build configurations.

## 🧩 Parser design

### Lua precedence and syntax-tree shape

Lua expressions combine logical, comparison, bitwise, concatenation, arithmetic, unary, and power operators. `grammar.js` defines their precedence explicitly and applies `prec.left` or `prec.right` according to Lua's associativity rules. Expression nodes expose named `left`, `operator`, and `right` fields for editor and analysis consumers.

The grammar also represents Lua 5.4 local-variable attributes, decimal and hexadecimal numerals, statements, and shebang lines. Corpus fixtures exercise these constructs alongside expression precedence.

### Stateful scanning for strings and comments

Lua long strings and comments use matching delimiters such as `[[...]]` and `[=[...]=]`, with a variable number of equal signs. Because the closing delimiter must match its opener, the external scanner in `scanner.c` tracks the active token type and delimiter depth in a per-parser payload.

The scanner serializes that two-byte state so Tree-sitter can restore it during incremental parsing. It also handles short comments, quoted strings, and escapes while keeping scanner state isolated per parser instance instead of relying on global variables.

## 🏗️ One parser across three ecosystems

The Tree-sitter CLI generates `parser.c` from `grammar.js`. Node.js, Rust, and Swift use different native build systems, but each binding compiles that same generated parser together with the external scanner.

```text
grammar.js -> Tree-sitter CLI -> parser.c
                                  |
scanner.c ------------------------+
                                  |
                  +---------------+---------------+
                  |               |               |
              Node.js           Rust            Swift
              node-gyp       build.rs + cc       SwiftPM
```

- **Node.js:** the npm package exposes the generated language through a native wrapper.
- **Rust:** `Cargo.toml` and `build.rs` provide a crate that can be consumed from the repository.
- **Swift:** `Package.swift` compiles the C sources as a Swift Package Manager library.
- **Verification:** Tree-sitter corpus tests run through GitHub Actions on macOS and Ubuntu.

---

## 🛠️ Tech stack

- **Grammar:** JavaScript
- **Generated parser and external scanner:** C
- **Bindings:** Node.js, Rust, Swift
- **Testing:** Tree-sitter corpus tests
- **CI:** GitHub Actions
