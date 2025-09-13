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

Uma gramática completa da linguagem Lua (compatível com a versão 5.4) para o sistema de parsing Tree-sitter. O projeto foi escrito em C e JavaScript (para a definição da gramática), e inclui um scanner externo para lidar com regras complexas como comentários e strings.

A biblioteca é publicada e consumível em múltiplos ecossistemas, incluindo Node.js (NPM), Rust (Crates.io) e Swift (SPM).

### Principais Funcionalidades

- **Parsing de Lua 5.4**: Parse completo da sintaxe do Lua 5.4, incluindo suporte a `shebang` e atributos de variáveis locais (ex: `<const>` e `<close>`).
- **Scanner Externo Eficiente**: Inclui um scanner externo em C para analisar corretamente a sintaxe de comentários (curtos e longos) e strings (curtas, longas), que não podem ser tratadas apenas pela gramática declarativa.
- **Bindings Multi-linguagem**: Gera bindings nativos para integração em diferentes ambientes, incluindo **Node.js**, **Rust** e **Swift**.
- **Testes e CI**: Configuração de integração contínua com **GitHub Actions** para rodar a suíte de testes (`tree-sitter test`) e garantir a corretude da gramática em múltiplos sistemas operacionais.

### Ferramentas e Tecnologias

O núcleo da gramática é definido em **JavaScript** (`grammar.js`), que é compilado pelo **Tree-sitter CLI** para gerar o parser em **C** (`parser.c`). Um scanner externo (`scanner.c`) é escrito em **C** para lidar com regras de parsing que exigem estado.

Os bindings são fornecidos para:

- **Node.js**: Usando `node-gyp` e `nan` para compilar o wrapper em C++.
- **Rust**: Usando `cc` no `build.rs` para compilar os fontes C e linkar com a crate Rust.
- **Swift**: Usando o **Swift Package Manager** (`Package.swift`) para expor os cabeçalhos C.

### Desafios Técnicos e Aprendizados

- **Gramática e Precedência de Operadores**: O principal desafio foi definir a gramática em `grammar.js` para resolver conflitos de parsing LR(1). Isso exigiu uma definição cuidadosa de precedência de operadores (ex: `PREC.COMPARATIVE`, `PREC.UNARY`) e a refatoração de regras complexas como `binary_expression` para eliminar ambiguidades.
- **Scanner Externo para Strings e Comentários**: A gramática declarativa do Tree-sitter não consegue lidar com strings e comentários longos do Lua (ex: `[=[ ... ]=]`), que podem ter um número variável de `=`. Foi necessário implementar um scanner externo em C (`scanner.c`) que gerencia o estado (armazenando o `depth` dos delimitadores) para parsear corretamente esses blocos de texto.
- **Suporte à Sintaxe Lua 5.4**: O projeto foi atualizado para dar suporte completo à especificação do Lua 5.4. Isso incluiu a adição de novas regras, como os atributos de variáveis locais (`<const>` e `<close>`), e a expansão da sintaxe numérica para suportar literais hexadecimais complexos.
- **Configuração de Build Multi-Linguagem**: Fornecer a biblioteca para múltiplos ecossistemas exigiu a configuração de sistemas de build distintos: `binding.gyp` para Node.js, `Cargo.toml` com um script `build.rs` para Rust, e `Package.swift` para Swift. O desafio foi garantir que os mesmos fontes C (`parser.c` e `scanner.c`) fossem compilados e linkados corretamente em todos esses ambientes.
