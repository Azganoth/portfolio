---
title: Password Generator
category: Tool
year: 2025
summary: A tool for generating secure passwords, focused on accessibility.
repository: https://github.com/Azganoth/password-generator-app
website: https://azganoth.github.io/password-generator-app/
tags:
  - Preact
  - HTML
  - CSS
---

This is a tool that allows users to generate secure and customizable passwords. The project was an exercise in building a lightweight and reactive application with a strong focus on best practices in HTML, CSS, and, most importantly, accessibility.

### Main Features

- **Customizable Password Generation**: The user can define the password length and include or exclude character types (uppercase, lowercase, numbers, and symbols).
- **Password Strength Evaluation**: A visual interface indicates the strength of the generated password in real-time, encouraging the creation of more secure passwords.
- **Copy Functionality**: A button allows the user to copy the generated password to the clipboard with a single click, providing visual feedback of the action.
- **High Accessibility**: The entire interface was developed to be completely navigable and usable via keyboard and screen readers, using ARIA attributes.

### Tools and Technologies

The application was developed with **Preact**, a lightweight alternative to React, which was imported directly into the browser via a CDN, eliminating the need for a build tool like Vite or Webpack. Styling was done with pure **CSS**, and the structure follows best practices for **semantic HTML** and **accessibility (ARIA)** to ensure an inclusive experience for all users.

### Technical Challenges and Learnings

- **Reactive Development without a Build Tool**: The main challenge was using a modern library like Preact in an environment without a build step. The solution was to use native browser ES6 modules (`ESM`) to import Preact from a CDN and to link components together. This process deepened my understanding of how component frameworks work "under the hood" and how to build lightweight applications with a simplified setup.
- **Secure Password Generation Logic**: I developed a JavaScript algorithm that dynamically constructs the set of possible characters based on the user's selected options. From this set, the password is generated randomly, ensuring that all defined criteria are met.
