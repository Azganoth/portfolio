---
title: Suite
category: Landing Page
year: 2023
summary: Solução de marketing focada em otimização de assets e arquitetura CSS escalável, com ênfase em Responsive Images e Core Web Vitals.
repository: https://github.com/Azganoth/suite-landing-page
website: https://azganoth.github.io/suite-landing-page/
tags:
  - HTML
  - CSS
---

Suite é uma landing page desenvolvida com foco estrito em **Performance de Renderização** e **Otimização de Assets**. O projeto supera o layout responsivo tradicional ao implementar estratégias nativas de carregamento de imagens para reduzir o uso de largura de banda em dispositivos móveis, garantindo um **LCP** (Largest Contentful Paint) otimizado.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Estratégia de Imagens Responsivas

**O Problema:** O design especificava imagens de destaque distintas para mobile e tablet/desktop. Servir a imagem de desktop para um celular desperdiçaria dados e atrasaria o carregamento.

**A Solução:** Em vez de usar CSS ou JavaScript para trocar as imagens, utilizei o atributo `srcset` e `sizes` diretamente na tag `<img>`.

**Resultado:**

- O navegador baixa apenas o recurso necessário.
- Economia de largura de banda.
- Tempo de interação acelerado.

### 2. Arquitetura CSS Escalável (BEM)

**O Problema:** Manter a especificidade do CSS baixa e o código organizado sem o uso de pré-processadores em um layout com elementos sobrepostos complexos.

**A Solução:** Adoção rigorosa da metodologia **BEM (Block, Element, Modifier)**. Isolei estilos em blocos lógicos (`.hero`, `.card`, `.footer`) e utilizei **CSS Custom Properties** (`--dark-blue`, `--cream`) no `:root`.

**Resultado:**

- Evita _bleeding_ de estilos.
- Facilita a manutenção do tema visual sem necessidade de recompilação.

---

## 🏗️ Arquitetura

- **HTML Semântico:** Estrutura baseada em _landmarks_ (`<header>`, `<main>`, `<nav>`, `<footer>`) para garantir acessibilidade e SEO.
- **Mobile-First Development:** O CSS base é escrito para dispositivos móveis. Media queries (`min-width: 768px`, `min-width: 1440px`) são usadas para _adicionar_ complexidade de layout em telas maiores, mantendo o parseamento do CSS mais rápido em dispositivos limitados.
- **Layouts Modernos:** Combinação de **CSS Grid** para a estrutura macro (layout da página) e **Flexbox** para alinhamentos micro (componentes internos), explorando o melhor de cada especificação.

---

## 🛠️ Tech Stack

- **Markup:** HTML Semântico
- **Estilos:** CSS
- **Imagens:** WebP & Srcset
- **Deploy:** GitHub Pages
