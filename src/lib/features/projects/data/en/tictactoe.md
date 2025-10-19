---
title: Tic Tac Toe
category: Game
year: 2023
summary: Robust tic-tac-toe game with AI engine (Minimax), internationalization, and automated test coverage.
repository: https://github.com/Azganoth/tic-tac-toe
website: https://azganoth.github.io/tic-tac-toe/
tags:
  - React
  - TypeScript
  - SASS
  - Vitest
  - Testing Library
---

This project demonstrates the application of software engineering practices in a playful domain. More than a simple game, it is an exercise in **Clean Architecture** on the frontend, rigorously separating business logic (game rules, AI) from the presentation layer (**React**), ensuring code is testable, maintainable, and localizable.

---

## 🧩 Technical Challenges & Solutions

### 1. AI Algorithm

**The Problem:** Create a challenging single-player experience where the CPU doesn't just play randomly, but plays to win (or draw).

**The Solution:** Implementation of the **Recursive Minimax** algorithm. The algorithm simulates the complete game decision tree at each turn, evaluating all possible future scenarios and assigning scores to terminal states.

**Result:**

- Chooses the move that maximizes CPU gain.

### 2. Reliability and Refactoring (TDD)

**The Problem:** Win detection logic and the Minimax algorithm are prone to off-by-one errors and regressions during refactoring.

**The Solution:** Adoption of **Test-Driven Development (TDD)** with **Vitest**. I wrote unit tests for pure game logic functions before integrating with the UI and used **React Testing Library** for integration tests.

**Result:**

- Ensures user interaction triggers correct state changes.
- Shields the project against regressions.

---

## 🏗️ Architecture

- **Separation of Concerns:** Game logic resides in testable reducers and pure utilities, decoupled from visual components.
- **Internationalization (i18n):** Custom translation system via **React Context** (`TranslationContext`), allowing native support for multiple languages (`en`, `pt-BR`) without heavy external libraries.
- **Hybrid State Management:** Combination of `useReducer` for complex turn transition logic and `localStorage` for data persistence, allowing the user to reload the page without losing progress.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styles:** SASS & SASS Modules
- **Tests:** Vitest, Testing Library
- **Build:** Vite
