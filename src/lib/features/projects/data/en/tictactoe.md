---
title: Tic Tac Toe
category: Game
year: 2023
summary: Tic Tac Toe game with a challenging AI opponent (Minimax algorithm).
repository: https://github.com/Azganoth/tic-tac-toe
website: https://azganoth.github.io/tic-tac-toe/
tags:
  - React
  - SASS
  - Vitest
  - Testing Library
  - TypeScript
---

This is a modern implementation of the classic Tic Tac Toe game, allowing matches between two local players or against an AI opponent. The project was an opportunity to delve into game algorithms, automated testing, and state management in React.

### Main Features

- **Two Game Modes**: The user can choose between playing against another player locally or challenging the computer.
- **AI with Minimax Algorithm**: The computer opponent plays optimally, making the matches challenging.
- **Game Persistence**: The game state and scores are saved in `localStorage`, allowing the user to close and reopen the browser without losing their progress.
- **Multi-language Support**: The interface is available in Portuguese and English, with a simple localization system.

### Tools and Technologies

The application was built with **React** and **TypeScript**, using **Vite** for a fast development environment. Styling was done with **SASS** combined with **CSS Modules** to create modular and easily maintainable styles. The quality and robustness of the code are ensured by a comprehensive test suite with **Vitest** and **React Testing Library**.

### Technical Challenges and Learnings

- **Implementing the AI with the Minimax Algorithm**: The most complex challenge was creating a computer opponent that was truly challenging. To do this, I studied and implemented the **Minimax** algorithm, which recursively analyzes all possible move trees to determine the optimal move. The result is an AI that plays perfectly, making the single-player mode an experience of logic and strategy.
- **Comprehensive Test Coverage**: Ensuring that the complex game and AI logic was bug-free was crucial. I created a test suite with **Vitest** and **React Testing Library** that covered both the pure game functions (unit tests on the Minimax algorithm) and user interactions in the interface (integration tests), resulting in a stable and easily maintainable application.
