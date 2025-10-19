---
title: Galleria
category: Web App
year: 2023
summary: Galeria de arte virtual com layout Masonry customizado e Static Site Generation (SSG).
repository: https://github.com/Azganoth/galleria-slideshow-site
website: https://azganoth.github.io/galleria-slideshow-site/
tags:
  - Next
  - React
  - TypeScript
  - CSS Modules
---

Galleria é uma aplicação **Next.js** focada na exibição de arte de alta fidelidade. O projeto utiliza **Static Site Generation (SSG)** para garantir que o conteúdo seja entregue instantaneamente, combinando a robustez do **React** com um algoritmo de layout "_Masonry_" para criar uma experiência visual coesa e responsiva.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Algoritmo de Layout Masonry Manual

**O Problema:** Implementar um layout estilo "Pinterest" onde imagens de diferentes proporções se encaixam verticalmente sem lacunas, algo que o CSS Grid padrão ainda não resolve sem hacks ou bibliotecas externas.

**A Solução:** Desenvolvi um algoritmo de posicionamento em **TypeScript**. O componente `Masonry.tsx` calcula a altura de cada coluna em tempo real e distribui o próximo item da lista sempre na coluna "mais curta" naquele momento, utilizando `ResizeObserver` para recalcular o layout se necessário.

**Resultado:**

- Layout dinâmico e preciso.
- Responsividade fluida sem depender de scripts de terceiros.

### 2. Arquitetura SSG e Path Normalization

**O Problema:** Fazer o deploy de uma aplicação **Next.js** moderna em hospedagem estática (GitHub Pages) em um subdiretório, o que geralmente quebra caminhos de assets e rotas.

**A Solução:** Configurei o **Next.js** para modo `output: 'export'` e implementei um utilitário `normalizeUrl`.

**Resultado:**

- Garante que todas as referências a imagens e links internos recebam o prefixo correto do repositório (`basePath`).
- Aplicação funciona perfeitamente fora da raiz do domínio sem servidor **Node.js**.

---

## 🏗️ Arquitetura

### Frontend Moderno

- **Next.js 13:** Adoção das novas convenções de roteamento e **Server Components** para reduzir o JavaScript enviado ao cliente.
- **CSS Modules:** Estilização escopada localmente para evitar colisão de classes e facilitar a manutenção de estilos específicos de componentes complexos como o Slideshow.

### Performance

- **Static Export:** O site é pré-renderizado em HTML/CSS no momento do build. Isso resulta em **Time-to-First-Byte (TTFB)** extremamente baixo e segurança aprimorada, pois não há banco de dados ou servidor de _backend_ exposto.

---

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Linguagem:** TypeScript
- **Estilos:** CSS Modules
- **Deploy:** GitHub Pages
