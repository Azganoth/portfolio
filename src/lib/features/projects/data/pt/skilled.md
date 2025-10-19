---
title: Skilled E-learning
category: Landing Page
year: 2023
summary: Landing page desenvolvida com abordagem Utility-First (TailwindCSS), focada em implementação Pixel-Perfect e responsividade fluida.
repository: https://github.com/Azganoth/skilled-elearning-landing-page
website: https://azganoth.github.io/skilled-elearning-landing-page/
tags:
  - HTML
  - TailwindCSS
---

Este projeto explora a metodologia **Utility-First** de estilos para o desenvolvimento de interfaces rápidas e consistentes. Utilizando **TailwindCSS**, o foco foi traduzir um design estático em uma página web, gerenciando _design tokens_ (cores, espaçamentos, tipografia) diretamente através da configuração do framework, garantindo uma base para os estilos.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Grid Responsivo Adaptável

**O Problema:** O layout exigia uma transição de uma coluna única (mobile) para um grid de duas colunas (tablet) e três colunas (desktop), com cards que precisavam manter alinhamentos visuais precisos em relação ao cabeçalho e rodapé.

**A Solução:** Implementação de **CSS Grid** via classes utilitárias (`grid`, `grid-cols-1`, `tablet:grid-cols-2`, `desktop:grid-cols-3`). A utilização de prefixos de breakpoint (`tablet:`, `desktop:`) permitiu redefinir a estrutura do layout dramaticamente.

**Resultado:**

- Acessibilidade mantida (não altera ordem do DOM).
- Fluxo lógico de leitura preservado.

### 2. Design Tokens e Customização JIT

**O Problema:** Implementar cores específicas da marca e gradientes complexos (como o `from-outrageous-orange to-frostbite`) que não existem na paleta padrão do TailwindCSS.

**A Solução:** Extensão do tema no `tailwind.config.js`. Mapeei as cores do design (ex: `yankees-blue`, `sasquatch-socks`) para nomes semânticos no arquivo de configuração.

**Resultado:**

- Habilitou o IntelliSense da IDE.
- Garantiu que qualquer ajuste futuro na paleta de cores se propagasse automaticamente por toda a aplicação.
- Arquitetura de estilos resiliente a mudanças.

---

## 🏗️ Arquitetura

A escolha pelo TailwindCSS eliminou a necessidade de arquivos CSS monolíticos e problemas de especificidade.

- **Utility-First:** O HTML descreve não apenas a estrutura, mas também a aparência e o comportamento responsivo dos elementos.
- **Mobile-First:** O código base define a aparência em dispositivos móveis. As classes com prefixos condicionais (breakpoints) adicionam complexidade apenas quando a largura da tela permite, otimizando a renderização.
- **JIT (Just-In-Time) Compiler:** Uso de valores arbitrários (ex: `w-[343px]`) para ajustes finos de _pixel-perfect_ exigidos pelo design original, sem inchar o bundle final de CSS.

---

## 🛠️ Tech Stack

- **Markup:** HTML Semântico
- **Styling:** TailwindCSS
- **Config:** PostCSS
- **Deploy:** GitHub Pages
