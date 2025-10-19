---
title: Equalizer
category: Landing Page
year: 2023
summary: Implementação de alta fidelidade (Pixel-Perfect) de uma landing page responsiva, utilizando variáveis CSS e metodologia BEM para a arquitetura de estilos escalável.
repository: https://github.com/Azganoth/equalizer-landing-page
website: https://azganoth.github.io/equalizer-landing-page/
tags:
  - HTML
  - CSS
---

Este projeto foi desenvolvido como uma solução para um desafio **Frontend Mentor**, focando na fidelidade visual e na escrita de um CSS limpo e performático, sem a dependência de frameworks. O objetivo principal foi demonstrar domínio sobre o **Box Model**, posicionamento e arquitetura de CSS em um cenário de design com elementos decorativos complexos (_backgrounds_ sobrepostos).

---

## 🧩 Desafios Técnicos & Soluções

### 1. Posicionamento de Assets Decorativos

**O Problema:** O design exigia padrões geométricos de fundo (`bg-pattern-1.svg`, `bg-pattern-2.svg`) que transbordam o _container_ principal ou se posicionam de forma assimétrica.

**A Solução:** Utilizei `position: absolute` ancorado a containers `relative` com coordenadas calculadas e `z-index` para controlar a ordem de empilhamento.

**Resultado:**

- Elementos visuais precisos.
- Sem interferência no fluxo de leitura do conteúdo principal.

### 2. Tipografia Responsiva

**O Problema:** A escala tipográfica precisava se adaptar drasticamente entre mobile e desktop (ex: títulos variando de 40px para 88px).

**A Solução:** Controlei a tipografia base no elemento `html` e ajustes pontuais nos componentes via **Media Queries**.

**Resultado:**

- Legibilidade garantida em qualquer dispositivo.
- Hierarquia visual consistente.

---

## 🏗️ Arquitetura

### Metodologia BEM (Block, Element, Modifier)

Para evitar especificidade excessiva e vazamento de estilos, problemas comuns em CSS puro, adotei estritamente a convenção **BEM**. Isso resultou em componentes desacoplados (como `.premium` e `.header`), facilitando a manutenção e garantindo que as classes sejam auto-explicativas.

### Estratégia Mobile-First

O desenvolvimento iniciou-se pela viewport móvel, garantindo que o layout base fosse leve e funcional.

- **Código:** O CSS padrão atende dispositivos móveis, enquanto **Media Queries** (`min-width: 768px`, `min-width: 1440px`) adicionam complexidade progressivamente para telas maiores.
- **Benefício:** Performance otimizada em dispositivos móveis (menos _overrides_) e código mais previsível.

### CSS Custom Properties (Variáveis)

Defini um sistema de design tokens no `:root` para cores (`--aquamarine-blue`, `--mirage-grey`), centralizando a gestão do tema. Isso permite alterações globais de paleta com a modificação de uma única linha de código, simulando a flexibilidade de pré-processadores como SASS, mas usando apenas recursos nativos do navegador.

---

## 🛠️ Tech Stack

- **Markup:** HTML Semântico
- **Estilos:** CSS
- **Workflow:** Prettier
- **Deploy:** GitHub Pages
