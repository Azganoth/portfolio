---
title: Skilled E-learning
category: Landing Page
year: 2023
summary: Landing page developed with Utility-First approach (TailwindCSS), focused on Pixel-Perfect implementation and fluid responsiveness.
repository: https://github.com/Azganoth/skilled-elearning-landing-page
website: https://azganoth.github.io/skilled-elearning-landing-page/
tags:
  - HTML
  - TailwindCSS
---

This project explores the **Utility-First** styling methodology for developing fast and consistent interfaces. Using **TailwindCSS**, the focus was translating a static design into a web page, managing design tokens (colors, spacing, typography) directly through framework configuration, ensuring a foundation for styles.

---

## 🧩 Technical Challenges & Solutions

### 1. Adaptive Responsive Grid

**The Problem:** The layout required a transition from a single column (mobile) to a two-column grid (tablet) and three columns (desktop), with cards needing to maintain precise visual alignments relative to the header and footer.

**The Solution:** Implementation of **CSS Grid** via utility classes (`grid`, `grid-cols-1`, `tablet:grid-cols-2`, `desktop:grid-cols-3`). Utilizing breakpoint prefixes (`tablet:`, `desktop:`) allowed for dramatic redefinition of the layout structure.

**Result:**

- Accessibility maintained (does not alter DOM order).
- Logical reading flow preserved.

### 2. Design Tokens and JIT Customization

**The Problem:** Implementing specific brand colors and complex gradients (like `from-outrageous-orange to-frostbite`) that don't exist in the default TailwindCSS palette.

**The Solution:** Theme extension in `tailwind.config.js`. I mapped design colors (e.g., `yankees-blue`, `sasquatch-socks`) to semantic names in the configuration file.

**Result:**

- Enabled **IntelliSense** in the IDE.
- Guaranteed that any future color palette adjustment would propagate automatically throughout the application.
- Style architecture resilient to changes.

---

## 🏗️ Architecture

Choosing TailwindCSS eliminated the need for monolithic CSS files and specificity issues.

- **Utility-First:** HTML describes not just structure, but also appearance and responsive behavior of elements.
- **Mobile-First:** Base code defines appearance on mobile devices. Classes with conditional prefixes (breakpoints) add complexity only when screen width permits, optimizing rendering.
- **JIT (Just-In-Time) Compiler:** Use of arbitrary values (e.g., `w-[343px]`) for fine **Pixel-Perfect** adjustments required by the original design, without bloating the final CSS bundle.

---

## 🛠️ Tech Stack

- **Markup:** Semantic HTML
- **Styling:** TailwindCSS
- **Config:** PostCSS
- **Deploy:** GitHub Pages