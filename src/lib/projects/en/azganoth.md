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

This is my personal portfolio, designed as an interactive showcase for my skills and projects. The site was designed to have an immersive design, featuring an animated starfield background and subtle animations, and was built with **SvelteKit** to ensure a reactive, high-performance user experience and to streamline development.

### Main Features

- **Local Content Management**: All projects are managed as local Markdown files, which are processed during the build, simplifying the workflow and eliminating dependency on external services.
- **Interactive and Modern Design**: The interface was completely designed with a dark theme, modern typography, and an animated starfield background with a parallax effect to create an immersive browsing experience.
- **Progressive Loading and Animations**: Projects are loaded progressively to avoid overwhelming the visitor, and subtle animations are applied to elements as they enter the screen, guiding the user's focus.

### Tools and Technologies

The project is built with **SvelteKit** and **TypeScript**, ensuring agile, reactive, and type-safe development. Styling is done with **TailwindCSS**, and iconography is managed by the **Iconify** library. Continuous deployment is handled by **Vercel**, taking advantage of its optimized integration with SvelteKit.

### Technical Challenges and Learnings

- **Animated Background with Parallax Effect**: To create an immersive design without compromising performance, I developed a Svelte component that uses the HTML `<canvas>` API to render multiple layers of stars. Each layer moves at a different speed based on the scroll position (`window.scrollY`), creating a parallax effect. The animation is optimized with `requestAnimationFrame` to ensure fluidity.
- **High-Performance Image Carousel**: I needed a lightweight and accessible carousel for the projects. The solution was to implement a component using the native `IntersectionObserver` API to detect which slide is visible and update the pagination. Navigation between slides is handled with CSS Scroll Snap, resulting in a smooth, high-performance user experience without relying on external libraries or complex code.
- **Framework Migration and Refactoring**: One of the initial challenges was the decision to migrate from **Astro** to **SvelteKit**. SvelteKit offered a more integrated development experience and a great balance between features and performance. This process required a complete refactoring of all components and data-loading logic, deepening my knowledge of component architecture and state management in Svelte and in general.
- **Simplifying Content Management**: Using Contentful as a CMS was adding an unnecessary layer of complexity. I opted for a simpler and more controlled solution, moving all content to **local Markdown files** with `frontmatter`. This required creating server-side logic with `gray-matter` and `marked` to read, process, and render these files dynamically, giving me full control over the data and simplifying the deployment process.
