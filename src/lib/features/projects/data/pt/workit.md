---
title: Workit
category: Landing Page
year: 2023
summary: Landing page responsiva com arquitetura CSS modular via SASS, focada em Developer Experience (DX) e manutenção escalável.
repository: https://github.com/Azganoth/workit-landing-page
website: https://azganoth.github.io/workit-landing-page/
tags:
  - HTML
  - SASS
---

Workit é um estudo de caso sobre arquitetura e organização de estilos. Diferente de abordagens que utilizam CSS puro, aqui o foco foi a **Developer Experience (DX)** e a manutenibilidade. A utilização do pré-processador **SASS (SCSS)** permitiu a criação de um sistema de design programático, modular e altamente reutilizável.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Gestão de Breakpoints e Nesting

**O Problema:** A sintaxe padrão de Media Queries no CSS puro muitas vezes força a separação da lógica responsiva do seletor original, dificultando a leitura ("_Context Switching_").

**A Solução:** Desenvolvi um sistema de **Mixins SASS** (`abstracts/_mixins.scss`) para abstrair a complexidade das media queries. O mixin `@include breakpoint(tablet)` permite aninhar a regra responsiva _dentro_ do próprio componente.

**Resultado:**

- Mantém a coesão do código.
- Previne erros de digitação (validação via mapa de configuração `$breakpoints`).

### 2. Variáveis Responsivas Híbridas

**O Problema:** Alterar valores de espaçamento ou tamanho de fonte em múltiplos breakpoints geralmente exige muita repetição de código.

**A Solução:** Criei uma estratégia híbrida combinando **SASS** e **CSS Custom Properties**. O mixin `responsive-var` aceita valores para mobile, tablet e desktop e gera automaticamente as media queries necessárias.

**Resultado:**

- O layout se adapta a diferentes telas apenas mudando o valor das variáveis.
- Elimina a necessidade de reescrever regras de estilo.

---

## 🏗️ Arquitetura

A estrutura do projeto segue o padrão **7-1 Pattern** adaptado:

- **Abstracts:** Variáveis, Mixins e Funções (sem output CSS direto).
- **Base/Globals:** Reset e tipografia base.
- **Layout:** Estrutura macro (`_header.scss`, `_content.scss`, `_footer.scss`).
- **Components:** Elementos reutilizáveis e independentes (`_buttons.scss`, `_headings.scss`).

Essa separação, unida à metodologia **BEM**, garante que o especificidade do CSS permaneça simples e previsível, evitando conflitos de estilo.

---

## 🛠️ Tech Stack

- **Markup:** HTML Semântico
- **Pré-processador:** SASS (SCSS)
- **Design Tokens:** CSS Custom Properties
- **Deploy:** GitHub Pages
