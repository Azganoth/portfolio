---
title: Simple Motion React
category: Library
year: 2024
summary: Declarative animation library for React inspired by Vue, with zero extra dependencies and focused on bundle size.
repository: https://github.com/Azganoth/simple-motion-react
website: https://simple-motion-react.vercel.app/
tags:
  - React
  - Jest
  - Testing Library
  - Storybook
  - TypeScript
---

**Simple Motion React** is a component transition library for **React** with an API inspired by **Vue.js**. Developed as a software engineering case study, the project implements an extended lifecycle management system "from scratch", allowing animation of component mounting and, crucially, unmounting, with a focus on **DX** (Developer Experience) and performance.

---

## 🧩 Technical Challenges & Solutions

### 1. Extended Lifecycle Management (Unmount Animation)

**The Problem:** **React** removes components from the DOM immediately upon unmounting, preventing exit animations with pure CSS.

**The Solution:** I developed a state machine (`entering` → `entered` → `exiting` → `exited`) inside the `<Transition>` component. When the `in` prop changes to `false` (indicating children will be unmounted), the component intercepts the rendering and keeps children "alive" (last state) in the DOM, using `useLayoutEffect` to coordinate CSS classes and timers.

**Result:**

- Removes the React node only after animation completion.
- Allows smooth exit animations.

### 2. Forcing Reflow for CSS Transitions

**The Problem:** Browsers optimize rendering by grouping style changes ("batching"), which often breaks animations that depend on an initial state (e.g., `opacity: 0`) applied immediately before the active state (e.g., `opacity: 1`).

**The Solution:** I implemented a utility function (`reflow`) that forces reading the `node.offsetHeight` layout property between class applications, forcing the rendering engine to "paint" the initial frame before processing the transition class.

**Result:**

- Ensures rendering of the initial state before transition.

### 3. List Orchestration (TransitionGroup)

**The Problem:** Animating items being inserted and removed from dynamic arrays is complex, as it requires tracking the identity and position of elements that no longer exist.

**The Solution:** The `<TransitionGroup>` component maintains an internal state derived from children's `keys`. When an item is removed, it is kept in the group's internal state with the exit prop activated (`in={false}`).

**Result:**

- Allows exit animation to occur in parallel with reordering of other items.

---

## 🏗️ Architecture

The project follows rigorous standards for Open Source package distribution:

- **Hybrid Build (CJS/ESM):** Utilization of **tsup** (esbuild) to generate outputs compatible with modern bundlers (Vite/Webpack) and legacy ones (Node.js), with native **Tree Shaking** and automatic type definition generation (`.d.ts`).
- **Strict Typing:** APIs 100% typed with **TypeScript** to ensure **IntelliSense** and safety for library consumers.
- **Living Documentation:** Use of **Storybook** for isolated component development, visual testing, and interactive documentation generation.
- **Behavior Testing:** Test suite with **Jest** and **React Testing Library** simulating real usage scenarios and timing edge cases.

---

## 🛠️ Tech Stack

- **Core:** React, TypeScript
- **Build Tooling:** tsup
- **Quality:** Jest, Testing Library
- **Docs:** Storybook