---
title: GitHub User Search
category: Web App
year: 2023
summary: Buscador de perfis do GitHub construído com Vue.js (Composition API) e renderização híbrida via Vite SSG.
repository: https://github.com/Azganoth/github-user-search-app
website: https://azganoth.github.io/github-user-search-app/
tags:
  - Vue
  - TailwindCSS
  - TypeScript
---

Esta aplicação consome a API pública do GitHub para exibir perfis de desenvolvedores com detalhes ricos. O projeto vai além de uma **SPA** tradicional ao implementar **Static Site Generation (SSG)**, garantindo que o conteúdo inicial seja entregue como HTML estático para máxima performance e SEO, antes de ser hidratado pelo **Vue.js** para interatividade.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Lógica de Tema Reativa (Dark Mode)

**O Problema:** Criar um sistema de temas que respeite a preferência do sistema operacional, permita _override_ manual pelo usuário e persista essa escolha, sem recarregar a página.

**A Solução:** Utilizei o `watchEffect` da Composition API para sincronizar reativamente o estado do tema com o DOM (adicionando classes no `<html>`) e o `localStorage`. A inicialização verifica inteligentemente: `localStorage` > `prefers-color-scheme` > Padrão.

**Resultado:**

- Experiência consistente.
- Sem "flashes" de tema incorreto.

### 2. Tipagem Estrita de API Externa

**O Problema:** A API do GitHub retorna objetos JSON complexos com muitos campos opcionais (`nullable`). Consumir isso sem tipagem rigorosa levaria a erros de _runtime_ silenciosos.

**A Solução:** Definição completa de interfaces TypeScript (`Profile`, `PublicUser`, `PrivateUser`) espelhando a resposta da API.

**Resultado:**

- Habilitou o autocompletar na IDE.
- Permite detecção de erros em tempo de compilação ao acessar propriedades que poderiam ser nulas.
- Código robusto.

---

## 🏗️ Arquitetura

O projeto adota uma arquitetura moderna focada em **Performance (DX & UX)**.

- **Vue 3 + Script Setup:** Código conciso e performático, com lógica de negócios separada visualmente da marcação.
- **Vite SSG:** Utilização do plugin `vite-ssg` para gerar uma aplicação que combina os benefícios de sites estáticos (carregamento instantâneo) com a riqueza de uma Single Page Application (SPA).
- **TailwindCSS:** Estilização baseada em utilitários, permitindo um design responsivo e adaptável (Dark Mode) sem a sobrecarga de _dead code_ em produção.

---

## 🛠️ Tech Stack

- **Frontend:** Vue.js
- **Build:** Vite + Vite SSG
- **Linguagem:** TypeScript
- **Estilos:** TailwindCSS
