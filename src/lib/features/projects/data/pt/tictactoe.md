---
title: Tic Tac Toe
category: Game
year: 2023
summary: Jogo da velha robusto com motor de IA (Minimax), internacionalização e cobertura de testes automatizados.
repository: https://github.com/Azganoth/tic-tac-toe
website: https://azganoth.github.io/tic-tac-toe/
tags:
  - React
  - TypeScript
  - SASS
  - Vitest
  - Testing Library
---

Este projeto demonstra a aplicação de práticas de engenharia de software em um domínio lúdico. Mais do que um simples jogo, é um exercício de **arquitetura limpa** no frontend, separando rigorosamente a lógica de negócios (regras do jogo, IA) da camada de apresentação (**React**), garantindo um código testável, manutenível e internacionalizável.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Algoritmo de IA

**O Problema:** Criar uma experiência _single-player_ desafiadora, onde a CPU não apenas jogue aleatoriamente, mas jogue para ganhar (ou empatar).

**A Solução:** Implementação do algoritmo **Minimax Recursivo**. O algoritmo simula a árvore de decisão completa do jogo a cada turno, avaliando todos os cenários futuros possíveis e atribuindo pontuações a estados terminais.

**Resultado:**

- Escolhe o movimento que maximiza o ganho da CPU.

### 2. Confiabilidade e Refatoração (TDD)

**O Problema:** A lógica de detecção de vitória e o algoritmo Minimax são propensos a erros de borda ("_off-by-one_") e regressões durante refatorações.

**A Solução:** Adoção de **Test-Driven Development (TDD)** com **Vitest**. Escrevi testes unitários para as funções puras de lógica de jogo antes de integrar com a UI e utilizei **React Testing Library** para testes de integração.

**Resultado:**

- Garante que a interação do usuário dispare as mudanças de estado corretas.
- Blinda o projeto contra regressões.

---

## 🏗️ Arquitetura

- **Separação de Conceitos:** A lógica do jogo reside em _reducers_ e _utilitários puros_ testáveis, desacoplada dos componentes visuais.
- **Internacionalização (i18n):** Sistema de tradução customizado via **React Context** (`TranslationContext`), permitindo suporte nativo a múltiplos idiomas (`en`, `pt-BR`) sem bibliotecas externas pesadas.
- **Gerenciamento de Estado Híbrido:** Combinação de `useReducer` para lógica complexa de transição de turnos e `localStorage` para persistência de dados, permitindo que o usuário recarregue a página sem perder o progresso.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Estilos:** SASS & SASS Modules
- **Testes:** Vitest, Testing Library
- **Build:** Vite
