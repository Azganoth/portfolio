---
title: Galleria
category: Web App
year: 2023
summary: An interactive art gallery to explore paintings and their stories.
repository: https://github.com/Azganoth/galleria-slideshow-site
website: https://azganoth.github.io/galleria-slideshow-site/
tags:
  - Next
  - React
  - CSS Modules
  - TypeScript
---

Galleria is an immersive web application that allows users to explore works of art and their stories, with a focus on performance and an elegant, responsive design. The project was built to be a fast and visually pleasing digital gallery experience.

### Main Features

- **Artwork Navigation**: Users can view a complete gallery and click on each work to see details such as the author, year, and description on a dedicated page.
- **Dynamic Masonry Layout**: The main page features a masonry-style layout (similar to Pinterest) that dynamically adjusts to different screen sizes, built from scratch.
- **Pre-rendered Pages (SSG)**: To ensure maximum performance, all pages are pre-rendered at build time using Static Site Generation.
- **Mobile-First Design**: The application was developed with a mobile-first approach, ensuring an optimized user experience on mobile devices that expands to larger screens.

### Tools and Technologies

The project was developed with **Next.js**, **React**, and **TypeScript**, leveraging the power of **Static Site Generation (SSG)** to serve pre-rendered pages extremely quickly. Styling was done with **CSS Modules** to create locally-scoped components, ensuring maintainability and avoiding style conflicts. Code quality was maintained with **ESLint** and **Prettier**, and deployment was automated with **GitHub Actions**.

### Technical Challenges and Learnings

- **Building a Responsive Masonry Layout**: The main technical challenge was building a masonry layout component from scratch that dynamically adjusts to different screen sizes. The solution was implemented with CSS and **TypeScript**, ensuring that the images reorganize fluidly without the use of external libraries.
- **Optimization with Static Site Generation (SSG)**: A key objective was to have a site with almost instantaneous loading. I used Next.js's SSG to pre-render all gallery pages during the build, using a local `JSON` file as the data source. This process deepened my knowledge of performance optimization for web applications.
