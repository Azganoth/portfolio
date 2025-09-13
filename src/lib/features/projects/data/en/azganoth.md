---
title: Azganoth
category: Portfolio
year: 2025
summary: Personal portfolio to showcase my skills, projects, and contact information.
repository: https://github.com/Azganoth/portfolio
website: https://azganoth.vercel.app
tags:
  - SvelteKit
  - Svelte
  - TailwindCSS
  - TypeScript
---

My personal portfolio, a showcase for my skills, projects, and contact information, with support for Portuguese and English. It was built with **SvelteKit** to ensure a reactive, high-performance user experience and to streamline development.

### Main Features

- **Interactive and Modern Design**: The interface was completely designed with a dark theme, modern typography, and an animated starfield background with a parallax effect to create an immersive browsing experience.
- **Progressive Loading and Animations**: Projects are loaded progressively to avoid overwhelming the visitor, and subtle animations are applied to elements as they enter the screen, guiding the user's focus.
- **Multi-language Support**: The portfolio is fully localized, offering complete support for Portuguese and English, with automatic detection of the user's preferred language for a more accessible browsing experience.

### Tools and Technologies

The project is built with **SvelteKit** and **TypeScript**, ensuring agile, reactive, and type-safe development. Styling is done with **TailwindCSS**, and iconography is managed by the **Iconify** library. Continuous deployment is handled by **Vercel**, taking advantage of its optimized integration with SvelteKit.

### Technical Challenges and Learnings

- **Animated Background with Parallax Effect**: To create an immersive design without compromising performance, I developed a Svelte component that uses the HTML `<canvas>` API to render multiple layers of stars. Each layer moves at a different speed based on the scroll position (`window.scrollY`), creating a parallax effect. The animation is optimized with `requestAnimationFrame` to ensure fluidity.
- **High-Performance Image Carousel**: To show previews of my projects, I needed a lightweight and accessible carousel. The solution was to implement a component using the native `IntersectionObserver` API to detect which slide is visible and update the pagination. Navigation between slides is handled with CSS Scroll Snap, resulting in a smooth, high-performance user experience without relying on external libraries or complex code.
- **Framework Migration and Refactoring**: One of the initial challenges was the decision to migrate from **Astro** to **SvelteKit**. SvelteKit offered a more integrated development experience and a great balance between features and performance. This process required a complete refactoring of all components and data-loading logic, deepening my knowledge of component architecture and state management in general.
- **Simplifying Content Management**: Using Contentful as a CMS was adding an unnecessary layer of complexity. I opted for a simpler and more controlled solution, moving all content to **local Markdown files** with `frontmatter`. This required creating server-side logic with `gray-matter` and `marked` to read, process, and render these files dynamically, giving me full control over the data and simplifying the deployment process.
- **Custom Localization System Implementation**: To offer a multi-language experience, a custom localization system was developed, overcoming the limitations of legacy libraries for Svelte. The architecture consists of a **global Store** to manage the active language's messages, **JSON files** to store translations, and a **Cookie** to persist the user's choice. Initial language detection is optimized by a middleware on Vercel, which analyzes the browser's preferences or the visitor's Cookie.
