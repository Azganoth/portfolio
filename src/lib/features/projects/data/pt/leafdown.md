---
title: Leafdown
category: Desktop App
year: 2026
summary: Editor Markdown desktop open-source e local-first para arquivos e pastas comuns, com uma única superfície híbrida de leitura e edição.
outcome: Alpha público e open-source, com integração nativa ao sistema de arquivos, edição Markdown por projeção de código-fonte e uma arquitetura React/Rust coberta por testes automatizados.
repository: https://github.com/Azganoth/leafdown
tags:
  - Tauri
  - React
  - TypeScript
  - Rust
  - TailwindCSS
  - Vitest
---

O **Leafdown** é um editor Markdown desktop open-source e local-first em desenvolvimento ativo. Ele abre arquivos e pastas comuns diretamente do sistema de arquivos, sem exigir vault, workspace, conta, sincronização em nuvem ou metadados próprios dentro das pastas do usuário.

O projeto está atualmente em **alpha público**. Desenvolvo tanto a aplicação quanto sua especificação de produto, arquitetura, decisões técnicas, padrões de engenharia e estratégia de verificação.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Edição Híbrida com Projeção de Código-Fonte

**O Problema:** Editores Markdown normalmente escolhem entre texto-fonte permanente, uma prévia separada ou componentes visuais que escondem completamente a sintaxe. Essas abordagens dificultam alternar entre leitura fluida e controle preciso sobre o Markdown salvo.

**A Solução:** Construí sobre **Milkdown/ProseMirror** um mecanismo de _source projection_. Quando o cursor entra em objetos compatíveis — como ênfase, código inline, links, autolinks e referências de nota de rodapé — o editor substitui temporariamente a apresentação visual por Markdown editável dentro do próprio documento.

Cada adaptador controla descoberta do alvo, geração da fonte, validação, reconstrução semântica e mapeamento da seleção. Edições válidas reidratam o objeto rico; conteúdo incompleto ou inválido é preservado como texto literal em vez de ser descartado.

**Resultado:**

- Uma única superfície para leitura e edição, sem alternar entre modo fonte e prévia.
- Marcadores Markdown continuam acessíveis quando o usuário precisa editá-los.
- O arquivo salvo permanece Markdown comum e portátil.

### 2. Fluxos Nativos de Arquivos sem Modelo de Workspace

**O Problema:** O editor precisava trabalhar com arquivos reais sem assumir propriedade sobre as pastas do usuário, ao mesmo tempo em que tratava estado sujo, alterações externas, arquivos recentes, links locais e atualização da navegação.

**A Solução:** O backend em **Rust/Tauri** é responsável por leitura e escrita, metadados, varredura de diretórios e observação do sistema de arquivos. O frontend mantém uma sessão explícita para o documento ativo e o contexto de pasta, verificando a atualidade dos metadados antes de sobrescrever um arquivo.

**Resultado:**

- Arquivos Markdown continuam sendo a única fonte da verdade.
- Pastas são abertas diretamente, sem banco de dados ou arquivos auxiliares do aplicativo.
- Mudanças externas atualizam o navegador de artigos sem substituir silenciosamente trabalho não salvo.

### 3. Clipboard Semântico e Compatibilidade com Windows

**O Problema:** Copiar e colar em um editor estruturado envolve simultaneamente Markdown em `text/plain`, HTML semântico e o contexto parcial utilizado pelo ProseMirror. No Windows/WebView, envelopes **CF_HTML** ainda podem introduzir espaços que alteram o conteúdo colado.

**A Solução:** Centralizei a resolução de payloads de Copy/Cut para os atalhos nativos e comandos do aplicativo, preservando Markdown no formato de texto e uma representação HTML semanticamente equivalente. Na entrada, uma normalização restrita remove apenas o envelope de um fragmento ProseMirror válido e mantém HTML externo ou malformado inalterado.

**Resultado:**

- Menu, popup contextual e gestos nativos compartilham as mesmas regras de clipboard.
- Seleções projetadas preservam exatamente os caracteres Markdown selecionados.
- Conteúdo HTML externo continua seguindo o comportamento padrão do editor.

### 4. Arquitetura e Estratégia de Verificação

O frontend é organizado por funcionalidades com limites de importação entre componentes de aplicação, comandos, sessão, domínios e utilitários compartilhados. O backend mantém as operações nativas atrás de módulos de API pertencentes a cada funcionalidade.

A verificação combina:

- Testes de comportamento e integração com **Vitest** e Testing Library.
- Testes Rust para operações nativas.
- Validação de TypeScript, Oxlint, Oxfmt, Clippy e Cargo fmt.
- Um corpus Markdown manual para round trips, interações de sintaxe, bytes limítrofes, arquivos locais e cenários de ambiente.

---

## 🏗️ Stack

- **Desktop:** Tauri
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Rust
- **Editor:** Milkdown / ProseMirror
- **Estado:** Zustand
- **Qualidade:** Vitest, Testing Library, Oxlint, Clippy
