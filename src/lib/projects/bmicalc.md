---
title: Body Mass Index Calculator
category: Tool
year: 2024
summary: Calculadora de IMC (Índice de Massa Corporal) com foco em design responsivo e acessibilidade.
repository: https://github.com/Azganoth/bmi-calculator
website: https://azganoth.github.io/bmi-calculator/
tags:
  - HTML
  - CSS
  - JavaScript
---

Esta é uma ferramenta interativa para calcular o Índice de Massa Corporal (IMC). O projeto foi desenvolvido com tecnologias web fundamentais (HTML, CSS e JavaScript) para criar uma experiência de usuário simples, rápida, acessível e totalmente responsiva.

### Principais Funcionalidades

- **Cálculo de IMC**: Permite que os usuários insiram sua altura e peso para obter o resultado do IMC de forma instantânea.
- **Validação de Entrada**: O formulário valida os dados inseridos para garantir que apenas números válidos sejam processados, fornecendo feedback ao usuário.
- **Feedback Visual Claro**: Exibe o resultado de forma clara, indicando a faixa de peso correspondente (abaixo do peso, saudável, sobrepeso).
- **Alta Acessibilidade**: A interface é totalmente navegável e funcional utilizando apenas o teclado, com suporte a leitores de tela através de atributos ARIA.

### Ferramentas e Tecnologias

Este projeto foi construído intencionalmente com **JavaScript puro** (vanilla JS) para focar na manipulação direta do DOM e na lógica de programação fundamental. A estrutura foi criada com **HTML semântico** e a estilização com **CSS** puro, seguindo uma abordagem **mobile-first** para garantir a responsividade em todos os dispositivos.

### Desafios Técnicos e Aprendizados

- **Manipulação do DOM e Lógica Interativa**: O principal desafio foi criar uma experiência de usuário fluida e reativa sem o uso de um framework. Desenvolvi toda a lógica de captura de dados, validação de entrada e exibição de resultados usando `addEventListener` e manipulação direta de elementos do DOM. Isso aprofundou meu conhecimento nos fundamentos do JavaScript e na interação com a árvore de elementos do HTML.
- **Otimização da Experiência de Carregamento**: Para evitar o Flash of Unstyled Content (FOUC) e garantir que a interface fosse renderizada rapidamente, utilizei a tag `<link rel="preload">` no HTML. Essa técnica instrui o navegador a carregar os arquivos de CSS e as fontes principais com prioridade, resultando em uma melhoria perceptível na experiência de carregamento inicial para o usuário.
