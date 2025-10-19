---
title: Azganoth
category: Portfolio
year: 2025
summary: Personal portfolio developed with SvelteKit and TailwindCSS, focused on content, immersion, and performance.
repository: https://github.com/Azganoth/portfolio
website: https://azganoth.vercel.app
tags:
  - Svelte
  - TypeScript
  - TailwindCSS
---

My personal portfolio, a showcase for my skills, projects, and contact information, with multi-language support. Built using **Svelte 5**, **SvelteKit**, and **TailwindCSS**, the project focuses on performance, accessibility, and internationalization.

---

## 🧩 Technical Challenges & Solutions

### 1. Background Animation (Canvas API)

**The Problem:** Create a "starfield" effect with parallax layers that is visually rich but lightweight enough not to impact the main thread or page scrolling.

**The Solution:** Instead of manipulating thousands of DOM elements, I implemented the `Starfield.svelte` component, which uses the **Canvas API** to "paint" stars onto a canvas only within the user's viewport. The component manages the rendering lifecycle with `requestAnimationFrame`, optimizing position and opacity calculations.

**Result:**

- Ensures stable FPS.
- Avoids main thread overload and unnecessary calculations.

### 2. Hybrid Internationalization (i18n)

**The Problem:** Offer support for multiple languages (PT/EN) with automatic detection and persistence, without Flash of Untranslated Content (FOUC) and compatible with **SSR**.

**The Solution:** I implemented a custom solution combining **Middleware** (Vercel) and **Svelte Stores**. The middleware intercepts the request, checks cookies and `Accept-Language` headers, and redirects to the correct language if necessary.

**Result:**

- Language state is injected into the HTML during **SSR**.
- Ensures the client receives the page already translated.
- Optimized for SEO.

### 3. Dependency-Free Carousel

**The Problem:** Display project previews in an interactive carousel without adding the weight of third-party libraries (which often bring blocking JavaScript and unnecessary styles).

**The Solution:** I implemented a carousel using **CSS Scroll Snap** for native and smooth navigation physics. To manage pagination state, I used the `IntersectionObserver` API to detect which slide is visible in the viewport.

**Result:**

- Zero impact on the main thread.
- Fluid and native navigation.

---

## 🏗️ Architecture

### Modern Frontend

- **SvelteKit:** Hybrid rendering (SSR for content, CSR for interactivity).
- **TailwindCSS:** Uses the new engine for on-demand CSS compilation.

### Content & Data

- **Git-based CMS:** Projects and texts are stored as extended Markdown files with Frontmatter. This allows content versioning alongside code and simplifies the build, eliminating the need for an external CMS.

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Framework:** Svelte/SvelteKit
- **Styles:** TailwindCSS
