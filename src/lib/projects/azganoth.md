---
title: Azganoth
category: Portfolio
year: 2025
summary: Portfólio pessoal para mostrar minhas habilidades, projetos e informações para contato.
repository: https://github.com/Azganoth/portfolio
website: https://azganoth.vercel.app
tags:
  - SvelteKit
  - Svelte
  - TailwindCSS
  - TypeScript
---

Este é meu portfólio pessoal, projetado como uma vitrine interativa para minhas habilidades e projetos. O site foi projetado para ter um design imersivo, com um fundo de estrelas animado e animações sutis, e foi construído com **SvelteKit** para garantir uma experiência de usuário reativa e performática e agilizar o densenvolvimento.

### Principais Funcionalidades

- **Gerenciamento de Conteúdo Local**: Todos os projetos são gerenciados como arquivos markdown locais, que são processados durante o build, simplificando o fluxo de trabalho e eliminando a dependência de serviços externos.
- **Design Interativo e Moderno**: A interface foi completamente desenhada com um tema escuro, tipografia moderna e um fundo de estrelas animado com efeito parallax para criar uma experiência de navegação imersiva.
- **Carregamento Progressivo e Animações**: Os projetos são carregados progressivamente para não sobrecarregar o visitante, e animações sutis são aplicadas aos elementos conforme eles entram na tela, guiando o olhar do visitante.

### Ferramentas e Tecnologias

O projeto é construído com **SvelteKit** e **TypeScript**, garantindo um desenvolvimento ágil, reativo e tipado. A estilização é feita com **TailwindCSS**, e a iconografia é gerenciada pela biblioteca **Iconify**. O deploy contínuo é feito na **Vercel**, aproveitando sua integração otimizada com SvelteKit.

### Desafios Técnicos e Aprendizados

- **Fundo Animado com Efeito Parallax**: Para criar um design imersivo sem prejudicar a performance, desenvolvi um componente em Svelte que utiliza a API de `<canvas>` do HTML para renderizar múltiplas camadas de estrelas. Cada camada se move em uma velocidade diferente com base na posição do scroll (`window.scrollY`), criando um efeito parallax. A animação é otimizada com `requestAnimationFrame` para garantir fluidez.
- **Carrossel de Imagens Performático**: Precisava de um carrossel para os projetos que fosse leve e acessível. A solução foi implementar um componente utilizando a API nativa `IntersectionObserver` para detectar qual slide está visível e atualizar a paginação. A navegação entre slides é feita com CSS Scroll Snap, resultando em uma experiência de usuário suave e de alta performance, sem depender de bibliotecas externas ou de código complexo.
- **Migração de Framework e Refatoração**: Um dos desafios iniciais foi a decisão de migrar de **Astro** para **SvelteKit**. O SvelteKit ofereceu uma experiência de desenvolvimento mais integrada e um ótimo balanço entre features e performance. Esse processo exigiu a refatoração completa de todos os componentes e da lógica de carregamento de dados, aprofundando meu conhecimento em arquitetura de componentes e gerenciamento de estado em Svelte e de modo geral.
- **Simplificação do Gerenciamento de Conteúdo**: O uso do Contentful como CMS estava adicionando uma camada de complexidade desnecessária. Optei por uma solução mais simples e controlada, movendo todo o conteúdo para arquivos **markdown locais** com `frontmatter`. Isso exigiu a criação de uma lógica no lado do servidor com `gray-matter` e `marked` para ler, processar e renderizar esses arquivos dinamicamente, me dando controle total sobre os dados e simplificando o processo de deploy.
