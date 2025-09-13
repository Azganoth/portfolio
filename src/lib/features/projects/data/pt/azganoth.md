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

Meu portfólio pessoal, uma vitrine para minhas habilidades, projetos e informações para contato com suporte para português e inglês. Construído com **SvelteKit** para garantir uma experiência de usuário reativa, performática e agilizar o densenvolvimento.

### Principais Funcionalidades

- **Design Interativo e Moderno**: A interface foi completamente desenhada com um tema escuro, tipografia moderna e um fundo de estrelas animado com efeito parallax para criar uma experiência de navegação imersiva.
- **Carregamento Progressivo e Animações**: Os projetos são carregados progressivamente para não sobrecarregar o visitante, e animações sutis são aplicadas aos elementos conforme eles entram na tela, guiando o olhar do visitante.
- **Suporte Multilíngue**: O portfólio foi totalmente localizado, oferecendo suporte completo para português e inglês, com detecção automática da preferência do usuário para uma experiência de navegação mais acessível.

### Ferramentas e Tecnologias

O projeto é construído com **SvelteKit** e **TypeScript**, garantindo um desenvolvimento ágil, reativo e tipado. A estilização é feita com **TailwindCSS**, e a iconografia é gerenciada pela biblioteca **Iconify**. O deploy contínuo é feito na **Vercel**, aproveitando sua integração com SvelteKit e Git.

### Desafios Técnicos e Aprendizados

- **Fundo Animado com Efeito Parallax**: Para criar um design imersivo sem prejudicar a performance, desenvolvi um componente em Svelte que utiliza a API de `<canvas>` do HTML para renderizar múltiplas camadas de estrelas. Cada camada se move em uma velocidade diferente com base na posição do scroll (`window.scrollY`), criando um efeito parallax. A animação é otimizada com `requestAnimationFrame` para garantir fluidez.
- **Carrossel de Imagens Performático**: Para mostrar prévias dos meus projetos precisei de um carrossel para os projetos que fosse leve e acessível. A solução foi implementar um componente utilizando a API nativa `IntersectionObserver` para detectar qual slide está visível e atualizar a paginação. A navegação entre slides é feita com CSS Scroll Snap, resultando em uma experiência de usuário suave e de alta performance, sem depender de bibliotecas externas ou de código complexo.
- **Migração de Framework e Refatoração**: Um dos desafios iniciais foi a decisão de migrar de **Astro** para **SvelteKit**. O SvelteKit ofereceu uma experiência de desenvolvimento mais integrada e um ótimo balanço entre features e performance. Esse processo exigiu a refatoração completa de todos os componentes e da lógica de carregamento de dados, aprofundando meu conhecimento em arquitetura de componentes e gerenciamento de estado de modo geral.
- **Simplificação do Gerenciamento de Conteúdo**: O uso do Contentful como CMS estava adicionando uma camada de complexidade desnecessária. Optei por uma solução mais simples e controlada, movendo todo o conteúdo para arquivos **markdown locais** com `frontmatter`. Isso exigiu a criação de uma lógica no lado do servidor com `gray-matter` e `marked` para ler, processar e renderizar esses arquivos dinamicamente, me dando controle total sobre os dados e simplificando o processo de deploy.
- **Implementação de um Sistema de Localização Customizado**: Para oferecer uma experiência multilíngue, foi desenvolvido um sistema de localização customizado, superando a limitação de bibliotecas legadas para Svelte. A arquitetura consiste em uma Store global que gerencia as mensagens do idioma ativo, arquivos JSON para armazenar as traduções, e um Cookie para persistir a escolha do usuário. A detecção inicial do idioma é otimizada por um middleware na Vercel, que analisa as preferências do navegador ou o Cookie do visitante.
