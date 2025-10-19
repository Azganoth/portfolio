---
title: Workit
category: Landing Page
year: 2023
summary: Responsive landing page with modular CSS architecture via SASS, focused on Developer Experience (DX) and scalable maintenance.
repository: https://github.com/Azganoth/workit-landing-page
website: https://azganoth.github.io/workit-landing-page/
tags:
  - HTML
  - SASS
---

Workit is a case study on architecture and style organization. Unlike approaches using pure CSS, here the focus was on **Developer Experience (DX)** and maintainability. Utilizing the **SASS (SCSS)** preprocessor allowed for the creation of a programmatic, modular, and highly reusable design system.

---

## 🧩 Technical Challenges & Solutions

### 1. Breakpoint Management and Nesting

**The Problem:** Standard Media Query syntax in pure CSS often forces the separation of responsive logic from the original selector, making reading difficult ("Context Switching").

**The Solution:** I developed a system of **SASS Mixins** (`abstracts/_mixins.scss`) to abstract media query complexity. The `@include breakpoint(tablet)` mixin allows nesting the responsive rule _inside_ the component itself.

**Result:**

- Maintains code cohesion.
- Prevents typos (validation via `$breakpoints` configuration map).

### 2. Hybrid Responsive Variables

**The Problem:** Changing spacing values or font sizes across multiple breakpoints usually requires a lot of code repetition.

**The Solution:** I created a hybrid strategy combining **SASS** and **CSS Custom Properties**. The `responsive-var` mixin accepts values for mobile, tablet, and desktop and automatically generates the necessary media queries.

**Result:**

- Layout adapts to different screens just by changing variable values.
- Eliminates the need to rewrite style rules.

---

## 🏗️ Architecture

The project structure follows the adapted **7-1 Pattern**:

- **Abstracts:** Variables, Mixins, and Functions (no direct CSS output).
- **Base/Globals:** Reset and base typography.
- **Layout:** Macro structure (`_header.scss`, `_content.scss`, `_footer.scss`).
- **Components:** Reusable and independent elements (`_buttons.scss`, `_headings.scss`).

This separation, combined with **BEM** methodology, ensures CSS specificity remains simple and predictable, avoiding style conflicts.

---

## 🛠️ Tech Stack

- **Markup:** Semantic HTML
- **Preprocessor:** SASS (SCSS)
- **Design Tokens:** CSS Custom Properties
- **Deploy:** GitHub Pages