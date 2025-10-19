---
title: Galleria
category: Web App
year: 2023
summary: Virtual art gallery with custom Masonry layout and Static Site Generation (SSG).
repository: https://github.com/Azganoth/galleria-slideshow-site
website: https://azganoth.github.io/galleria-slideshow-site/
tags:
  - Next
  - React
  - TypeScript
---

Galleria is a **Next.js** application focused on high-fidelity art display. The project utilizes **Static Site Generation (SSG)** to ensure content is delivered instantly, combining the robustness of **React** with a custom "Masonry" layout algorithm to create a cohesive and responsive visual experience.

---

## 🧩 Technical Challenges & Solutions

### 1. Manual Masonry Layout Algorithm

**The Problem:** Implement a "Pinterest-style" layout where images of different aspect ratios fit vertically without gaps, something standard CSS Grid still doesn't solve without hacks or external libraries.

**The Solution:** I developed a positioning algorithm in **TypeScript**. The `Masonry.tsx` component calculates the height of each column in real-time and distributes the next list item to the "shortest" column at that moment, using `ResizeObserver` to recalculate the layout if necessary.

**Result:**

- Dynamic and precise layout.
- Fluid responsiveness without depending on third-party scripts.

### 2. SSG Architecture and Path Normalization

**The Problem:** Deploying a modern **Next.js** application to static hosting (GitHub Pages) in a subdirectory, which typically breaks asset paths and routes.

**The Solution:** I configured **Next.js** for `output: 'export'` mode and implemented a `normalizeUrl` utility.

**Result:**

- Ensures all references to images and internal links receive the correct repository prefix (`basePath`).
- Application functions perfectly outside the domain root without a **Node.js** server.

---

## 🏗️ Architecture

### Modern Frontend

- **Next.js 13:** Adoption of new routing conventions and **Server Components** to reduce JavaScript sent to the client.
- **CSS Modules:** Locally scoped styling to avoid class collisions and facilitate maintenance of specific styles for complex components like the Slideshow.

### Performance

- **Static Export:** The site is pre-rendered into HTML/CSS at build time. This results in extremely low **Time-to-First-Byte (TTFB)** and enhanced security, as there is no database or backend server exposed.

---

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styles:** CSS Modules
- **Deploy:** GitHub Pages
