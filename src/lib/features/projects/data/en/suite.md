---
title: Suite
category: Landing Page
year: 2023
summary: Marketing solution focused on asset optimization and scalable CSS architecture, with emphasis on Responsive Images and Core Web Vitals.
repository: https://github.com/Azganoth/suite-landing-page
website: https://azganoth.github.io/suite-landing-page/
tags:
  - HTML
  - CSS
---

Suite is a landing page developed with a strict focus on **Rendering Performance** and **Asset Optimization**. The project surpasses traditional responsive layout by implementing native image loading strategies to reduce bandwidth usage on mobile devices, ensuring an optimized **LCP** (Largest Contentful Paint).

---

## 🧩 Technical Challenges & Solutions

### 1. Responsive Images Strategy

**The Problem:** The design specified distinct hero images for mobile and tablet/desktop. Serving the desktop image to a mobile phone would waste data and delay loading.

**The Solution:** Instead of using CSS or JavaScript to swap images, I used the `srcset` and `sizes` attributes directly on the `<img>` tag.

**Result:**

- The browser downloads only the necessary resource.
- Bandwidth savings.
- Accelerated time to interaction.

### 2. Scalable CSS Architecture (BEM)

**The Problem:** Keep CSS specificity low and code organized without using preprocessors in a layout with complex overlapping elements.

**The Solution:** Rigorous adoption of **BEM (Block, Element, Modifier)** methodology. I isolated styles into logical blocks (`.hero`, `.card`, `.footer`) and used **CSS Custom Properties** (`--dark-blue`, `--cream`) in `:root`.

**Result:**

- Avoids style bleeding.
- Facilitates visual theme maintenance without recompilation.

---

## 🏗️ Architecture

- **Semantic HTML:** Structure based on landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`) to ensure accessibility and SEO.
- **Mobile-First Development:** Base CSS is written for mobile devices. Media queries (`min-width: 768px`, `min-width: 1440px`) are used to *add* layout complexity on larger screens, keeping CSS parsing faster on limited devices.
- **Modern Layouts:** Combination of **CSS Grid** for macro structure (page layout) and **Flexbox** for micro alignments (internal components), exploiting the best of each specification.

---

## 🛠️ Tech Stack

- **Markup:** Semantic HTML
- **Styles:** CSS
- **Images:** WebP & Srcset
- **Deploy:** GitHub Pages