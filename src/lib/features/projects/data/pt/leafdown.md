---
title: Leafdown
category: Aplicação desktop
year: 2026
summary: Editor de Markdown para desktop, open source e local-first, feito para arquivos e pastas comuns e baseado em uma única superfície de leitura e edição.
outcome: Fluxos nativos de arquivos, edição Markdown com source projection, testes no frontend e no backend Rust e instaladores da versão alpha para Windows.
repository: https://github.com/Azganoth/leafdown
tags:
  - Tauri
  - React
  - TypeScript
  - Rust
  - Tailwind CSS
  - Vitest
---

O **Leafdown** é um editor de Markdown para desktop, open source e local-first, feito para arquivos e pastas comuns. Ele abre o conteúdo diretamente do sistema de arquivos sem exigir vault, workspace, conta, serviço de nuvem ou metadados próprios dentro das pastas do usuário.

A primeira versão alpha para Windows está disponível no [GitHub Releases](https://github.com/Azganoth/leafdown/releases/tag/v0.1.0-alpha.1) em instaladores MSI e EXE. O projeto continua sendo desenvolvido publicamente sob a licença `GPL-3.0-or-later`.

---

## 🧩 Decisões técnicas

### 1. Uma superfície para conteúdo renderizado e código Markdown

**Desafio:** Editores Markdown costumam separar código e prévia ou esconder a sintaxe atrás de controles visuais. Nos dois casos, fica mais difícil conciliar uma leitura confortável com o controle direto sobre o Markdown salvo.

**Implementação:** Construí sobre **Milkdown** e **ProseMirror** um mecanismo de source projection. Quando a seleção entra em um objeto inline compatível, o Leafdown expõe temporariamente seu código Markdown como texto editável dentro do documento, sem abandonar o modelo canônico do editor. Os adapters atuais cobrem negrito, ênfase, tachado, código inline, links, autolinks e referências de nota de rodapé.

Cada adapter localiza o alvo, gera e interpreta o código-fonte, valida as edições, reconstrói o conteúdo semântico e remapeia a seleção entre as duas representações. Uma edição válida volta a formar o objeto visual correspondente; uma edição incompleta ou inválida permanece como texto literal exato, sem descartar o que o usuário digitou.

**Resultado:**

- Leitura e edição direta do Markdown acontecem na mesma superfície.
- Os marcadores de sintaxe continuam disponíveis quando o usuário precisa de controle preciso.
- Edições intermediárias inválidas preservam todos os caracteres digitados.

### 2. Arquivos locais sem criar um workspace próprio

**Desafio:** O editor precisa trabalhar com arquivos reais sem assumir controle sobre suas pastas. Ao mesmo tempo, deve proteger alterações não salvas, detectar mudanças externas, preservar quebras de linha e manter a navegação atualizada.

**Implementação:** O backend em **Rust/Tauri** é responsável por leitura, escrita, metadados, varredura de diretórios e monitoramento do sistema de arquivos. O frontend em React mantém uma sessão explícita para o documento ativo e o contexto de pasta. Antes de salvar, compara os metadados atuais do arquivo com os registrados no momento da abertura; as quebras de linha LF ou CRLF detectadas também são mantidas na escrita.

**Resultado:**

- Os arquivos Markdown continuam sendo a única fonte da verdade.
- Abrir uma pasta não cria banco de dados nem arquivos auxiliares do aplicativo.
- Eventos do sistema de arquivos atualizam a navegação sem substituir silenciosamente alterações não salvas.

### 3. Clipboard consistente para Markdown e rich text

**Desafio:** Copy e Cut em um editor estruturado precisam preservar Markdown em `text/plain`, HTML semântico em `text/html` e o contexto parcial do ProseMirror. No Windows, envelopes **CF_HTML** também podem introduzir whitespace de transporte e alterar o documento colado.

**Implementação:** Uma política compartilhada monta os payloads de clipboard usados pelos gestos nativos do editor, pelos menus da aplicação e pelo popup contextual. Seleções dentro de source projection mantêm exatamente o Markdown selecionado em `text/plain` e fornecem HTML semântico quando existe uma representação fiel. Na entrada do Paste, uma normalização restrita desempacota somente um fragmento ProseMirror válido com o contexto esperado e mantém HTML externo ou malformado inalterado.

**Resultado:**

- Atalhos, menus e popup contextual seguem as mesmas regras de clipboard.
- Cut só remove o conteúdo depois que ele é gravado com sucesso no clipboard.
- Detalhes do transporte no Windows não são incorporados como espaços ao documento.

---

## 🏗️ Arquitetura e verificação

```text
                Componentes da aplicação
                          |
                       Comandos
                          |
                        Sessão
                          |
 Features de domínio: editor, documento, contexto de pasta, preferências
              |                               |
   Milkdown / ProseMirror           APIs Tauri de cada feature
                                              |
                                 Backend Rust -> sistema de arquivos
```

O frontend mantém dependências em uma única direção: da composição da aplicação para os comandos e fluxos de sessão, chegando às features de domínio e aos utilitários compartilhados. As operações nativas ficam atrás das APIs Tauri de cada feature, sem levar responsabilidades do sistema de arquivos para os componentes React.

### Segurança do conteúdo

- HTML presente no Markdown aparece como texto literal, sem ser executado no DOM.
- Imagens remotas não são carregadas automaticamente.
- Links externos abrem no navegador padrão do sistema, enquanto arquivos locais que não são Markdown exigem confirmação.
- Os recursos de syntax highlighting fazem parte do aplicativo e não são baixados em runtime.

### Entrega e verificação

- **Vitest** e Testing Library cobrem o editor, as sessões e o comportamento da interface.
- Testes em Rust cobrem as operações nativas de arquivos e pastas.
- TypeScript, Oxlint, Oxfmt, Clippy e Cargo fmt fazem parte das verificações do projeto.
- Um corpus Markdown versionado complementa a automação com cenários de round trip, sintaxe, limites de bytes, arquivos e ambiente.
- O **GitHub Actions** executa verificações separadas para o frontend e o backend Rust no Windows. A cada tag de versão, o workflow de release repete todas as verificações e gera instaladores versionados.

---

## 🛠️ Tech stack

- **Desktop:** Tauri
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Rust
- **Editor:** Milkdown, ProseMirror
- **Estado:** Zustand
- **Qualidade:** Vitest, Testing Library, Oxlint, Clippy
