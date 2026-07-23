---
title: Tree-sitter Lua
category: Biblioteca
year: 2018
summary: Gramática de Lua 5.4 para o Tree-sitter, com um scanner em C para strings e comentários com delimitadores variáveis.
outcome: Pacote publicado no npm, bindings para Node.js, Rust e Swift, dez releases no GitHub e três pull requests de colaboradores externos aceitos.
repository: https://github.com/Azganoth/tree-sitter-lua
tags:
  - JavaScript
  - C
---

O **Tree-sitter Lua** é uma gramática de Lua 5.4 para o sistema de parsing incremental **Tree-sitter**. A gramática é definida em JavaScript, compilada em um parser C e combinada com um scanner externo escrito em C para as regras de strings e comentários que exigem estado.

O [pacote no npm](https://www.npmjs.com/package/tree-sitter-lua) continua disponível na versão `v2.1.3`. Desenvolvi e publiquei o projeto entre 2018 e 2022; ele permanece disponível sob a licença MIT, mas não está em manutenção ativa.

---

## 🤝 Open source e colaboração

- **Dez releases no GitHub** foram publicadas entre 2018 e 2022; a mais recente é a [`v2.1.3`](https://github.com/Azganoth/tree-sitter-lua/releases/tag/v2.1.3).
- **Três pull requests de colaboradores externos** foram aceitos, adicionando nós de sintaxe e melhorias em return statements, estado do scanner por instância e suporte ao Swift Package Manager.
- O repositório tem um histórico com quatro contribuidores, mais de **50 estrelas** e mais de **20 forks**.
- O mesmo parser gerado está disponível por meio das configurações de build para Node.js, Rust e Swift.

## 🧩 Design do parser

### Precedência do Lua e formato da árvore sintática

Expressões Lua combinam operadores lógicos, comparativos, bitwise, de concatenação, aritméticos, unários e de potência. O `grammar.js` define a precedência explicitamente e aplica `prec.left` ou `prec.right` de acordo com as regras de associatividade do Lua. Os nós de expressão expõem os campos `left`, `operator` e `right` para editores e ferramentas de análise.

A gramática também representa atributos de variáveis locais do Lua 5.4, literais decimais e hexadecimais, statements e linhas shebang. As fixtures do corpus exercitam essas construções junto com a precedência das expressões.

### Scanner com estado para strings e comentários

Strings e comentários longos do Lua usam delimitadores correspondentes como `[[...]]` e `[=[...]=]`, com uma quantidade variável de sinais de igual. Como o fechamento precisa corresponder à abertura, o scanner externo em `scanner.c` guarda o tipo de token ativo e a profundidade do delimitador em um payload próprio de cada parser.

O scanner serializa esse estado em dois bytes para que o Tree-sitter possa restaurá-lo durante o parsing incremental. Ele também processa comentários curtos, strings com aspas e escapes, mantendo o estado isolado por instância do parser em vez de depender de variáveis globais.

## 🏗️ Um parser em três ecossistemas

O Tree-sitter CLI gera o `parser.c` a partir do `grammar.js`. Node.js, Rust e Swift usam sistemas de build nativo diferentes, mas cada binding compila o mesmo parser gerado junto com o scanner externo.

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

- **Node.js:** o pacote no npm expõe a linguagem gerada por meio de um wrapper nativo.
- **Rust:** `Cargo.toml` e `build.rs` fornecem uma crate que pode ser consumida diretamente do repositório.
- **Swift:** `Package.swift` compila os arquivos C como uma biblioteca do Swift Package Manager.
- **Verificação:** os testes de corpus do Tree-sitter rodam no GitHub Actions em macOS e Ubuntu.

---

## 🛠️ Tech stack

- **Gramática:** JavaScript
- **Parser gerado e scanner externo:** C
- **Bindings:** Node.js, Rust, Swift
- **Testes:** corpus do Tree-sitter
- **CI:** GitHub Actions
