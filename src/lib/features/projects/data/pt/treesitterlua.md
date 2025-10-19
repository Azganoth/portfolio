---
title: Tree Sitter Lua
category: Library
year: 2018
summary: Gramática completa da linguagem Lua para o parser Tree-sitter, com scanner externo para strings e comentários.
repository: https://github.com/Azganoth/tree-sitter-lua
tags:
  - JavaScript
  - Node
  - C
  - Rust
  - Lua
---

Uma gramática completa da linguagem **Lua** (compatível com a versão 5.4) para o sistema de _parsing_ **Tree-sitter**. O projeto foi escrito em **JavaScript** (definição da gramática) e **C** (_scanner_ externo), o _scanner_ externo lida com regras complexas como comentários e strings.

A biblioteca é publicada e consumível em múltiplos ecossistemas, incluindo **Node.js** (NPM), **Rust** (Crates.io) e **Swift** (SPM).

---

## 🧩 Desafios Técnicos & Soluções

### 1. Gramática e Precedência de Operadores

**O Problema:** Definir a gramática em `grammar.js` para resolver conflitos de parsing LR(1) comuns em linguagens dinâmicas.

**A Solução:** Definição cuidadosa de precedência de operadores (ex: `PREC.COMPARATIVE`, `PREC.UNARY`) e a refatoração de regras complexas como `binary_expression`.

**Resultado:**

- Eliminação de ambiguidades.
- Parsing preciso.

### 2. Scanner Externo para Strings e Comentários

**O Problema:** A gramática declarativa do **Tree-sitter** não consegue lidar com strings e comentários longos do Lua (ex: `[=[ ... ]=]`), que podem ter um número variável de sinais de igual.

**A Solução:** Foi necessário implementar um _scanner_ externo em **C** (`scanner.c`) que gerencia o estado (armazenando o nível (`depth`) dos delimitadores).

**Resultado:**

- Parse correto de blocos de texto complexos.

### 3. Suporte à Sintaxe Lua 5.4

**O Problema:** Manter a gramática atualizada com as últimas especificações da linguagem.

**A Solução:** O projeto foi atualizado para dar suporte completo à especificação do **Lua 5.4**. Isso incluiu a adição de novas regras, como os atributos de variáveis locais (`<const>` e `<close>`) e literais hexadecimais complexos.

**Resultado:**

- Compatibilidade total com a versão mais recente da linguagem.

### 4. Configuração de Build Multi-Linguagem

**O Problema:** Fornecer a biblioteca para múltiplos ecossistemas (**Node.js**, **Rust**, **Swift**) com sistemas de build distintos.

**A Solução:** Configurei pipelines de build específicos: `binding.gyp` para **Node.js** e `Cargo.toml` com `build.rs` para **Rust**. Uma contribuição de terceiros garantiu build para **Swift** (`Package.swift`).

**Resultado:**

- Garante que os mesmos fontes **C** (`parser.c` e `scanner.c`) sejam compilados corretamente.
- Biblioteca consumível nativamente em vários ambientes.

---

## 🏗️ Arquitetura

O núcleo da gramática é definido em **JavaScript** (`grammar.js`), que é compilado pelo **Tree-sitter CLI** para gerar o _parser_ em **C** (`parser.c`). Um _scanner_ externo (`scanner.c`) é escrito em **C** para lidar com regras de parsing que exigem estado.

### Bindings Multi-linguagem

Os bindings são fornecidos nativamente para:

- **Node.js**: Usando `node-gyp` e `nan` para compilar o _wrapper_ em C++.
- **Rust**: Usando `cc` no `build.rs` para compilar os fontes **C** e linkar com a _crate_ Rust.
- **Swift**: Usando o **Swift Package Manager** (`Package.swift`) para expor os cabeçalhos **C**.

---

## 🛠️ Tech Stack

- **Gramática:** JavaScript
- **Parsing:** C
- **Bindings:** Node.js, Rust, Swift
- **CI:** GitHub Actions
