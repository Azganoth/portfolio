---
title: Equalizer
category: Landing Page
year: 2023
summary: High-fidelity (Pixel-Perfect) implementation of a responsive landing page, utilizing CSS variables and BEM methodology for scalable style architecture.
repository: https://github.com/Azganoth/equalizer-landing-page
website: https://azganoth.github.io/equalizer-landing-page/
tags:
  - HTML
  - CSS
---

This project was developed as a solution to a **Frontend Mentor** challenge, focusing on visual fidelity and writing clean, performant CSS without reliance on frameworks. The main objective was to demonstrate mastery over the **Box Model**, positioning, and CSS architecture in a design scenario with complex decorative elements (overlapping backgrounds).

---

## 🧩 Technical Challenges & Solutions

### 1. Positioning Decorative Assets

**The Problem:** The design required geometric background patterns (`bg-pattern-1.svg`, `bg-pattern-2.svg`) that overflow the main container or are positioned asymmetrically.

**The Solution:** I used `position: absolute` anchored to `relative` containers with calculated coordinates and `z-index` to control the stacking order.

**Result:**

- Precise visual elements.
- No interference with the reading flow of the main content.

### 2. Responsive Typography

**The Problem:** The typographic scale needed to adapt drastically between mobile and desktop (e.g., headings varying from 40px to 88px).

**The Solution:** I controlled the base typography on the `html` element and made precise adjustments in components via **Media Queries**.

**Result:**

- Readability guaranteed on any device.
- Consistent visual hierarchy.

---

## 🏗️ Architecture

### BEM Methodology (Block, Element, Modifier)

To avoid excessive specificity and style leakage, common problems in pure CSS, I strictly adopted the **BEM** convention. This resulted in decoupled components (like `.premium` and `.header`), facilitating maintenance and ensuring classes are self-explanatory.

### Mobile-First Strategy

Development began with the mobile viewport, ensuring the base layout was lightweight and functional.

- **Code:** Default CSS serves mobile devices, while **Media Queries** (`min-width: 768px`, `min-width: 1440px`) progressively add complexity for larger screens.
- **Benefit:** Optimized performance on mobile devices (fewer overrides) and more predictable code.

### CSS Custom Properties (Variables)

I defined a design token system in `:root` for colors (`--aquamarine-blue`, `--mirage-grey`), centralizing theme management. This allows global palette changes by modifying a single line of code, simulating the flexibility of preprocessors like SASS, but using only native browser features.

---

## 🛠️ Tech Stack

- **Markup:** Semantic HTML
- **Styles:** CSS
- **Workflow:** Prettier
- **Deploy:** GitHub Pages
