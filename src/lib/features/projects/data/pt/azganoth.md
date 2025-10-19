---
title: Azganoth
category: Portfolio
year: 2025
summary: Portfólio pessoal desenvolvido com SvelteKit e TailwindCSS, focado em conteúdo, imersão e performance.
repository: https://github.com/Azganoth/portfolio
website: https://azganoth.vercel.app
tags:
  - SvelteKit
  - Svelte
  - TailwindCSS
  - TypeScript
---

Meu portfólio pessoal, uma vitrine para minhas habilidades, projetos e informações para contato, com suporte para múltiplas linguagens. Utilizando **Svelte 5**, **SvelteKit** e **TailwindCSS**, o projeto foca em performance, acessibilidade e internacionalização.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Animação de Fundo (Canvas API)

**O Problema:** Criar um efeito de "campo estelar" com camadas de parallax que fosse visualmente rico mas leve o suficiente para não impactar a _thread_ principal ou o _scroll_ da página.

**A Solução:** Em vez de manipular milhares de elementos DOM, implementei o componente `Starfield.svelte`, que utiliza a **Canvas API** para "pintar" as estrelas em um canvas apenas na área visível ao usuário. O componente gerencia o ciclo de vida de renderização com `requestAnimationFrame`, realizando cálculos de posição e opacidade de forma otimizada.

**Resultado:**

- Garante FPS estáveis.
- Evita sobrecarga na _thread_ principal e cálculos desnecessários.

### 2. Internacionalização (i18n) Híbrida

**O Problema:** Oferecer suporte a múltiplos idiomas (PT/EN) com detecção automática e persistência, sem flash de conteúdo não traduzido (FOUC) e compatível com SSR.

**A Solução:** Implementei uma solução customizada que combina **Middleware** (Vercel) e **Svelte Stores**. O middleware intercepta a requisição, verifica _cookies_ e _headers_ `Accept-Language`, e redireciona para a linguagem correta se necessário.

**Resultado:**

- O estado do idioma é injetado no HTML durante o SSR.
- Garante que o cliente receba a página já traduzida.
- Otimização para SEO.

### 3. Carrossel Sem Dependências

**O Problema:** Exibir prévias de projetos em um carrossel interativo sem adicionar o peso de bibliotecas de terceiros (que frequentemente trazem JavaScript bloqueante e estilos desnecessários).

**A Solução:** Implementei um carrossel utilizando **CSS Scroll Snap** para a física de navegação nativa e suave. Para gerenciar o estado de paginação, utilizei a API `IntersectionObserver` para detectar qual slide está visível na viewport.

**Resultado:**

- Zero impacto na _thread_ principal.
- Navegação fluida e nativa.

---

## 🏗️ Arquitetura

### Frontend Moderno

- **SvelteKit:** Renderização híbrida (SSR para conteúdo, CSR para interatividade).
- **TailwindCSS:** Uso da nova engine para compilação CSS on-demand.

### Conteúdo & Dados

- **Git-based CMS:** Projetos e textos são armazenados como arquivos Markdown estendido com Frontmatter. Isso permite versionamento do conteúdo junto com o código e simplifica o _build_, eliminando a necessidade de CMS externo.

---

## 🛠️ Tech Stack

- **Linguagem:** TypeScript
- **Framework:** Svelte/SvelteKit
- **Estilos:** TailwindCSS
