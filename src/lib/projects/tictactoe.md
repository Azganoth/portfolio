---
title: Tic Tac Toe
category: Game
year: 2023
summary: Jogo da Velha com um oponente de IA desafiador (algoritmo Minimax).
repository: https://github.com/Azganoth/tic-tac-toe
website: https://azganoth.github.io/tic-tac-toe/
tags:
  - React
  - SASS
  - Vitest
  - Testing Library
  - TypeScript
---

Esta é uma implementação moderna do clássico Jogo da Velha, permitindo partidas entre dois jogadores locais ou contra um oponente de IA. O projeto foi uma oportunidade para aprofundar em algoritmos de jogos, testes automatizados e gerenciamento de estado em React.

### Principais Funcionalidades

- **Dois Modos de Jogo**: O usuário pode escolher entre jogar contra outro jogador localmente ou desafiar o computador.
- **IA com Algoritmo Minimax**: O oponente do computador joga de forma otimizada, calculando a melhor jogada possível para nunca perder, tornando as partidas desafiadoras.
- **Persistência de Jogo**: O estado do jogo e os placares são salvos no `localStorage`, permitindo que o usuário feche e reabra o navegador sem perder seu progresso.
- **Suporte a Múltiplos Idiomas**: A interface está disponível em português e inglês, com um sistema simples de localização.

### Ferramentas e Tecnologias

A aplicação foi construída com **React** e **TypeScript**, utilizando **Vite** para um ambiente de desenvolvimento ágil. A estilização foi feita com **SASS** combinado ao **CSS Modules** para criar estilos modulares e de fácil manutenção. A qualidade e robustez do código são garantidas por uma suíte de testes completa com **Vitest** e **React Testing Library**.

### Desafios Técnicos e Aprendizados

- **Implementação da IA com Algoritmo Minimax**: O desafio mais complexo foi criar um oponente de computador que fosse verdadeiramente desafiador. Para isso, estudei e implementei o algoritmo **Minimax**, que analisa recursivamente todas as árvores de jogadas possíveis para determinar o movimento ótimo. O resultado é uma IA que joga perfeitamente, tornando o modo single-player uma experiência de lógica e estratégia.
- **Cobertura de Testes Abrangente**: Garantir que a lógica complexa do jogo e da IA estivesse livre de bugs era crucial. Criei uma suíte de testes com **Vitest** e **React Testing Library** que cobria tanto as funções puras do jogo (testes unitários no algoritmo Minimax) quanto as interações do usuário na interface (testes de integração), resultando em uma aplicação estável e de fácil manutenção.
