---
title: GitHub User Search
category: Web App
year: 2023
summary: Aplicativo para buscar e mostrar informações sobre perfis de usuários do GitHub.
repository: https://github.com/Azganoth/github-user-search-app
website: https://azganoth.github.io/github-user-search-app/
tags:
  - Vue
  - TailwindCSS
  - TypeScript
---

Este aplicativo permite a busca em tempo real de perfis de usuários no GitHub, exibindo suas informações detalhadas como bio, estatísticas e data de criação. O projeto foi uma excelente oportunidade para aprofundar meus conhecimentos no ecossistema Vue.js e em interações com APIs externas.

### Principais Funcionalidades

- **Busca de Usuários via API**: Consome a API REST oficial do GitHub para buscar e exibir dados de perfis de forma dinâmica.
- **Tratamento de Erros**: A interface fornece feedback claro para o usuário em casos de erro, como "usuário não encontrado" ou falhas na requisição.
- **Seletor de Tema (Claro/Escuro)**: Permite ao usuário alternar entre os temas claro e escuro, com a preferência sendo salva no `localStorage` para persistir entre as sessões.
- **Design Responsivo**: Desenvolvido com uma abordagem mobile-first para garantir uma experiência de uso consistente em qualquer dispositivo.

### Ferramentas e Tecnologias

A interface foi construída com **Vue.js 3** (utilizando a Composition API) e **TypeScript**, garantindo um desenvolvimento reativo, tipado e de fácil manutenção. Para a estilização, utilizei **TailwindCSS** pela sua agilidade e abordagem _utility-first_. O projeto foi configurado com **Vite** como ferramenta de build, proporcionando um ambiente de desenvolvimento rápido, e o deploy contínuo para o **GitHub Pages** foi automatizado com **GitHub Actions**.

### Desafios Técnicos e Aprendizados

- **Consumo de API Externa e Gerenciamento de Estado**: O desafio central foi gerenciar as chamadas à API REST do GitHub e refletir seus vários estados (carregando, sucesso, erro) na UI. Utilizei a Composition API do Vue para criar um estado reativo que era atualizado de forma síncrona com a resposta da API, resultando em uma interface dinâmica que fornece feedback claro ao usuário.
- **Implementação de Troca de Tema com Persistência**: Um desafio interessante foi criar um seletor de tema reutilizável. A solução envolveu uma lógica que aplica classes CSS no elemento raiz do HTML e utiliza o `localStorage` do navegador para persistir a preferência do usuário entre as sessões, melhorando a experiência do usuário com um toque de personalização.
