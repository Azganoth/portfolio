---
title: Galleria
category: Web App
year: 2023
summary: Galeria de arte interativa para explorar pinturas e suas histórias.
repository: https://github.com/Azganoth/galleria-slideshow-site
website: https://azganoth.github.io/galleria-slideshow-site/
tags:
  - Next
  - React
  - CSS Modules
  - TypeScript
---

Galleria é uma aplicação web imersiva que permite aos usuários explorar obras de arte e suas histórias, com foco em performance e um design responsivo e elegante. O projeto foi construído para ser uma experiência de galeria digital rápida e visualmente agradável.

### Principais Funcionalidades

- **Navegação por Obras de Arte**: Os usuários podem visualizar uma galeria completa e clicar em cada obra para ver detalhes como autor, ano e descrição em uma página dedicada.
- **Layout Masonry Dinâmico**: A página principal apresenta um layout no estilo masonry (como o do Pinterest) que se ajusta dinamicamente a diferentes tamanhos de tela, construído do zero.
- **Páginas Pré-renderizadas (SSG)**: Para garantir a máxima performance, todas as páginas são pré-renderizadas no momento do build utilizando Static Site Generation.
- **Design Mobile-First**: A aplicação foi desenvolvida com uma abordagem mobile-first, garantindo uma experiência de usuário otimizada em dispositivos móveis que se expande para telas maiores.

### Ferramentas e Tecnologias

O projeto foi desenvolvido com **Next.js**, **React** e **TypeScript**, aproveitando o poder do **Static Site Generation (SSG)** para servir páginas pré-renderizadas de forma extremamente rápida. A estilização foi feita com **CSS Modules** para criar componentes com escopo local, garantindo a manutenibilidade e evitando conflitos de estilo. A qualidade do código foi mantida com **ESLint** e **Prettier**, e o deploy automatizado com **GitHub Actions**.

### Desafios Técnicos e Aprendizados

- **Construção de um Layout Masonry Responsivo**: O principal desafio técnico foi construir um componente de layout masonry do zero, que se ajusta dinamicamente a diferentes tamanhos de tela. A solução foi implementada com CSS puro e lógica em **TypeScript**, garantindo que as imagens se reorganizem de forma fluida sem o uso de bibliotecas externas.
- **Otimização com Static Site Generation (SSG)**: Um objetivo chave era ter um site com carregamento quase instantâneo. Utilizei o SSG do Next.js para pré-renderizar todas as páginas da galeria durante o build, usando um arquivo `JSON` local como fonte de dados. Este processo aprofundou meu conhecimento em otimização de performance para aplicações web.
