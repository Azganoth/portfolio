---
title: Password Generator
category: Tool
year: 2025
summary: Ferramenta para geração de senhas seguras, focada em acessibilidade.
repository: https://github.com/Azganoth/password-generator-app
website: https://azganoth.github.io/password-generator-app/
tags:
  - Preact
  - HTML
  - CSS
---

Esta é uma ferramenta frontend que permite aos usuários gerar senhas seguras e customizáveis. O projeto foi um exercício para construir uma aplicação reativa e leve, com foco total em boas práticas de HTML, CSS e, principalmente, acessibilidade.

### Principais Funcionalidades

- **Geração de Senha Customizável**: O usuário pode definir o comprimento da senha e incluir ou excluir tipos de caracteres (maiúsculas, minúsculas, números e símbolos).
- **Avaliação de Força da Senha**: Uma interface visual indica a força da senha gerada em tempo real, incentivando a criação de senhas mais seguras.
- **Funcionalidade de Copiar**: Um botão permite copiar a senha gerada para a área de transferência com um único clique, fornecendo feedback visual da ação.
- **Alta Acessibilidade**: Toda a interface foi desenvolvida para ser completamente navegável e utilizável via teclado e leitores de tela, utilizando atributos ARIA.

### Ferramentas e Tecnologias

A aplicação foi desenvolvida com **Preact**, uma alternativa leve ao React, que foi importada diretamente no navegador via CDN, eliminando a necessidade de uma ferramenta de compilação como Vite ou Webpack. A estilização foi feita com **CSS** puro, e a estrutura segue as melhores práticas de **HTML semântico** e **acessibilidade (ARIA)** para garantir uma experiência inclusiva para todos os usuários.

### Desafios Técnicos e Aprendizados

- **Desenvolvimento Reativo sem Ferramenta de Build**: O desafio principal foi utilizar uma biblioteca moderna como o Preact em um ambiente sem etapa de compilação. A solução foi usar módulos ES6 (`ESM`) nativos do navegador para importar o Preact de um CDN. Esse processo aprofundou meu entendimento sobre como os frameworks de componentes funcionam "por baixo dos panos" e como construir aplicações leves e com setup simplificado.
- **Lógica de Geração de Senha Segura**: Desenvolvi um algoritmo em JavaScript que constrói dinamicamente o conjunto de caracteres possíveis com base nas opções selecionadas pelo usuário. A partir desse conjunto, a senha é gerada de forma aleatória, garantindo que todos os critérios definidos sejam atendidos.
