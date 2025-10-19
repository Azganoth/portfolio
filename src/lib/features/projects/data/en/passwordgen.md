---
title: Password Generator
category: Tool
year: 2025
summary: Interactive application developed with Preact and ESM (Buildless), focused on accessibility and complex state manipulation.
repository: https://github.com/Azganoth/password-generator-app
website: https://azganoth.github.io/password-generator-app/
tags:
  - Preact
  - CSS
---

This project is a technical study on modern web development without complex build tools (**Buildless Workflow**). The application uses **Preact** loaded directly via browser-native **ESM** modules, combining the reactivity of a **Virtual DOM** library with the simplicity of a static structure.

---

## 🧩 Technical Challenges & Solutions

### 1. "Buildless" Architecture with HTM

**The Problem:** Use state-based components and JSX without relying on bundlers (**Webpack**/**Vite**) or transpilers (**Babel**), reducing development infrastructure complexity.

**The Solution:** I adopted the `htm` (**Hyperscript Tagged Markup**) library combined with **Preact**. `htm` uses native JavaScript **Tagged Templates** to process syntax similar to JSX directly in the browser.

**Result:**

- Allowed writing modern functional components with Hooks (`useState`, `useMemo`).
- Runs natively in any modern browser, without needing compilation.

### 2. Accessibility in Dynamic Applications (ARIA)

**The Problem:** Ensure dynamic screen updates (such as changing password strength or generating a new hash) are perceived by screen readers.

**The Solution:** Robust implementation of **WAI-ARIA** attributes. I used `aria-live="assertive"` and `aria-atomic="true"` on the password display component and strength meter. Sliders and checkboxes were implemented with semantic labels.

**Result:**

- Screen readers immediately announce when a new password is generated or status changes.
- Full keyboard navigability.

---

## 🏗️ Architecture

The application logic is separated into isolated functional components, managing local state and side effects.

- **State Management:** Use of Hooks (`useState`) to control generation parameters (length, character types) and the resulting password.
- **Optimization:** Use of `useMemo` to recalculate password strength only when input changes, and `useCallback` to memoize the generation function, avoiding unnecessary re-renders.
- **Generation Logic:** Array shuffling algorithm (simplified Fisher-Yates) to ensure the password contains a mixed distribution of selected characters.

---

## 🛠️ Tech Stack

- **Core:** Preact (via ESM)
- **Templating:** HTM
- **Styles:** CSS
- **Deploy:** GitHub Pages
