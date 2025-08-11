---
title: Suite
category: Landing Page
year: 2023
summary: A responsive landing page with a focus on performance optimization through responsive images.
repository: https://github.com/Azganoth/suite-landing-page
website: https://azganoth.github.io/suite-landing-page/
tags:
  - HTML
  - CSS
---

This is a landing page for a fictional marketing consultancy. The project was an exercise focused on two critical areas of frontend development: performance optimization and creating a scalable CSS architecture without the use of pre-processors.

### Main Features

- **Fully Responsive Design**: Built with a mobile-first approach, the layout adapts fluidly to mobile devices, tablets, and desktops.
- **Optimized Images**: Uses responsive images to serve the most appropriate version of each image based on the user's device, optimizing loading time and data consumption.
- **Semantic and Modular Structure**: The code was structured with semantic HTML and the BEM methodology to ensure accessibility and an easily maintainable CSS.

### Tools and Technologies

The project was built using only pure **HTML** and **CSS**. To ensure code organization and scalability, I applied the **BEM (Block, Element, Modifier)** methodology in structuring the styles. The design approach was **mobile-first**, ensuring a solid foundation for responsiveness.

### Technical Challenges and Learnings

- **Implementing Responsive Images**: The main challenge was optimizing image loading across different devices. I used the `<picture>` tag and the `srcset` and `sizes` attributes to allow the browser to choose the most appropriate image based on the screen width. This resulted in a significant improvement in loading time on mobile devices and an optimization in bandwidth consumption.
- **Modular CSS without a Pre-processor**: Another challenge was keeping the CSS organized and scalable without the conveniences of SASS. I rigorously adopted the **BEM** methodology, which enforced a clear and modular class structure. As a result, I achieved an easily maintainable and conflict-free CSS, demonstrating the ability to create robust style architectures with fundamental tools.
