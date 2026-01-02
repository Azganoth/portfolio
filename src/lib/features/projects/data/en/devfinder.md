---
title: GitHub User Search
category: Web App
year: 2023
summary: GitHub profile searcher built with Vue.js (Composition API) and hybrid rendering via Vite SSG.
repository: https://github.com/Azganoth/github-user-search-app
website: https://azganoth.github.io/github-user-search-app/
tags:
  - Vue
  - TypeScript
  - TailwindCSS
---

This application consumes the public GitHub API to display developer profiles with rich details. The project goes beyond a traditional **SPA** by implementing **Static Site Generation (SSG)**, ensuring initial content is delivered as static HTML for maximum performance and SEO, before being hydrated by **Vue.js** for interactivity.

---

## 🧩 Technical Challenges & Solutions

### 1. Reactive Theme Logic (Dark Mode)

**The Problem:** Create a theme system that respects the operating system preference, allows manual override by the user, and persists this choice without reloading the page.

**The Solution:** I used `watchEffect` from the Composition API to reactively synchronize the theme state with the DOM (adding classes to `<html>`) and `localStorage`. Initialization intelligently checks: `localStorage` > `prefers-color-scheme` > Default.

**Result:**

- Consistent experience.
- No "flashes" of incorrect theme.

### 2. Strict External API Typing

**The Problem:** The GitHub API returns complex JSON objects with many optional (`nullable`) fields. Consuming this without strict typing would lead to silent runtime errors.

**The Solution:** Full definition of TypeScript interfaces (`Profile`, `PublicUser`, `PrivateUser`) mirroring the API response.

**Result:**

- Enabled IntelliSense in the IDE.
- Allows compile-time error detection when accessing potentially null properties.
- Robust code.

---

## 🏗️ Architecture

The project adopts a modern architecture focused on **Performance (DX & UX)**.

- **Vue 3 + Script Setup:** Concise and performant code, with business logic visually separated from markup.
- **Vite SSG:** Utilization of the `vite-ssg` plugin to generate an application that combines the benefits of static sites (instant loading) with the richness of a Single Page Application (SPA).
- **TailwindCSS:** Utility-based styling, allowing a responsive and adaptable design (Dark Mode) without the overhead of dead code in production.

---

## 🛠️ Tech Stack

- **Frontend:** Vue.js
- **Build:** Vite + Vite SSG
- **Language:** TypeScript
- **Styles:** TailwindCSS
