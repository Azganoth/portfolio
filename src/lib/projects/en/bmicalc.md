---
title: Body Mass Index Calculator
category: Tool
year: 2024
summary: A BMI (Body Mass Index) calculator with a focus on responsive design and accessibility.
repository: https://github.com/Azganoth/bmi-calculator
website: https://azganoth.github.io/bmi-calculator/
tags:
  - HTML
  - CSS
  - JavaScript
---

This is an interactive tool for calculating Body Mass Index (BMI). The project was developed with fundamental web technologies (HTML, CSS, and JavaScript) to create a simple, fast, accessible, and fully responsive user experience.

### Main Features

- **BMI Calculation**: Allows users to input their height and weight to get their BMI result instantly.
- **Input Validation**: The form validates the entered data to ensure only valid numbers are processed, providing feedback to the user.
- **Clear Visual Feedback**: Displays the result clearly, indicating the corresponding weight range (underweight, healthy, overweight).
- **High Accessibility**: The interface is fully navigable and functional using only the keyboard, with support for screen readers through ARIA attributes.

### Tools and Technologies

This project was intentionally built with **vanilla JavaScript** to focus on direct DOM manipulation and fundamental programming logic. The structure was created with **semantic HTML**, and styling was done with pure **CSS**, following a **mobile-first** approach to ensure responsiveness across all devices.

### Technical Challenges and Learnings

- **DOM Manipulation and Interactive Logic**: The main challenge was creating a fluid and reactive user experience without using a framework. I developed all the logic for data capture, input validation, and result display using `addEventListener` and direct DOM element manipulation. This deepened my knowledge of JavaScript fundamentals and interaction with the HTML element tree.
- **Optimizing the Loading Experience**: To avoid the Flash of Unstyled Content (FOUC) and ensure the interface rendered quickly, I used the `<link rel="preload">` tag in the HTML. This technique instructs the browser to load the CSS files and main fonts with priority, resulting in a noticeable improvement in the initial loading experience for the user.
