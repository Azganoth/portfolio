---
title: Body Mass Index Calculator
category: Tool
year: 2023
summary: BMI calculation tool developed with Vanilla JavaScript, focused on accessibility (WAI-ARIA) and rendering performance optimization.
repository: https://github.com/Azganoth/bmi-calculator
website: https://azganoth.github.io/bmi-calculator/
tags:
  - JavaScript
  - HTML
  - CSS
---

This project is an engineering exercise focused on **Native Web**. The objective was to build an interactive and accessible application without the overhead of modern frameworks, demonstrating how native **DOM** APIs and fundamental design patterns can deliver superior performance and a robust user experience with zero dependencies.

---

## 🧩 Technical Challenges & Solutions

### 1. Accessible Tabs Component (WAI-ARIA)

**The Problem:** Create a tab system (Metric vs Imperial) that is not only functional but fully compatible with screen readers and keyboard navigation, without using UI libraries.

**The Solution:** I manually implemented the **WAI-ARIA Tabs** design pattern. I used JavaScript to manipulate ARIA attributes (`aria-selected`, `aria-hidden`, `tabindex`) in real-time and added event listeners for arrow keys (`ArrowLeft`, `ArrowRight`).

**Result:**

- Allows focus to transition fluidly between tabs.
- Replicates the native behavior expected by users of assistive technologies.

### 2. Reactivity and DOM Manipulation

**The Problem:** Update the interface instantly as the user types, including BMI classification and ideal weight ranges, without the automatic data-binding of frameworks.

**The Solution:** I developed an event-based architecture (`input`) that triggers a calculation and rendering pipeline. I used **Template Literals** for dynamic HTML injection and decoupled validation logic (`isPositiveNumber`) and unit conversion.

**Result:**

- Replaces the need for a **Virtual DOM** for this project scale.
- Facilitates testing and maintenance.

---

## 🏗️ Architecture

### Critical Rendering Path

The project was optimized for **Core Web Vitals**, specifically **LCP** (Largest Contentful Paint) and **CLS** (Cumulative Layout Shift).

- **Preloading:** Use of `<link rel="preload">` for fonts and critical CSS, ensuring immediate rendering without **FOUC** (Flash of Unstyled Content).
- **CSS Architecture:** Use of CSS Variables (`:root`) for design tokens and **BEM** methodology for style scoping.

### Mobile-First Strategy

The CSS was written strictly following the **Mobile-First** approach. The default layout is vertical (stack) and uses Flexbox/Grid for complex reorganization on larger viewports (Tablet/Desktop), ensuring mobile devices load only the essential CSS for their rendering.

---

## 🛠️ Tech Stack

- **Core:** JavaScript (ES6+)
- **Styles:** CSS
- **Accessibility:** WAI-ARIA
- **Performance:** Resource Hints (Strategic use of `preload`)
