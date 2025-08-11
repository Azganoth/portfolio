---
title: GitHub User Search
category: Web App
year: 2023
summary: An application to search for and display information about GitHub user profiles.
repository: https://github.com/Azganoth/github-user-search-app
website: https://azganoth.github.io/github-user-search-app/
tags:
  - Vue
  - TailwindCSS
  - TypeScript
---

This application allows for real-time searching of user profiles on GitHub, displaying detailed information such as their bio, stats, and creation date. The project was an excellent opportunity to deepen my knowledge of the Vue.js ecosystem and interactions with external APIs.

### Main Features

- **User Search via API**: Consumes the official GitHub REST API to dynamically fetch and display profile data.
- **Error Handling**: The interface provides clear feedback to the user in case of errors, such as "user not found" or request failures.
- **Theme Switcher (Light/Dark)**: Allows the user to switch between light and dark themes, with the preference saved in `localStorage` to persist across sessions.
- **Responsive Design**: Developed with a mobile-first approach to ensure a consistent user experience on any device.

### Tools and Technologies

The interface was built with **Vue.js 3** (using the Composition API) and **TypeScript**, ensuring reactive, type-safe, and easily maintainable development. For styling, I used **TailwindCSS** for its speed and utility-first approach. The project was set up with **Vite** as the build tool, providing a fast development environment, and continuous deployment to **GitHub Pages** was automated with **GitHub Actions**.

### Technical Challenges and Learnings

- **External API Consumption and State Management**: The main challenge was managing calls to the GitHub REST API and reflecting its various states (loading, success, error) in the UI. I used Vue's Composition API to create a reactive state that was updated synchronously with the API response, resulting in a dynamic interface that provides clear user feedback.
- **Implementing Theme Switching with Persistence**: An interesting challenge was creating a reusable theme switcher. The solution involved logic that applies CSS classes to the root HTML element and uses the browser's `localStorage` to persist the user's preference between sessions, improving the user experience.
