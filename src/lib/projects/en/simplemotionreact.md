---
title: Simple Motion React
category: Library
year: 2024
summary: A declarative animation library for React, inspired by Vue's transition API, with zero dependencies.
repository: https://github.com/Azganoth/simple-motion-react
website: https://simple-motion-react.vercel.app/
tags:
  - React
  - Jest
  - Testing Library
  - Storybook
  - TypeScript
---

Simple Motion React is a lightweight and focused animation library for orchestrating React component transitions based on their lifecycle. Inspired by Vue's robust and native transition API, the project was an exercise in building a transition system from scratch with zero dependencies, delving deep into React's internal concepts.

### Main Features

- **Control by Transition Phases**: Provides hooks for each phase of the component's lifecycle (`entering`, `entered`, `exiting`, `exited`), allowing for granular control over transitions.
- **CSS Class-Based Animations**: The `<CSSTransition>` component facilitates applying CSS classes at each phase, enabling complex and high-performance animations.
- **List Animation**: The `<TransitionGroup>` component manages and animates a list of elements as they are added or removed, orchestrating individual transitions.
- **Component Switching**: The `<TransitionSwitch>` animates the transition between two components, ensuring the old one exits the scene before the new one enters.

### Tools and Technologies

The library was built with **React** and **TypeScript**, with no external animation dependencies. The components were tested with **Jest** and **React Testing Library** to ensure functionality, and with **Storybook** for visual and interactive documentation. The build for publishing to NPM is done with **tsup** and automated via **GitHub Actions**.

### Technical Challenges and Learnings

- **Phase Orchestration in `<Transition>`**: The main challenge was creating a robust state machine to manage the phases (`entering`, `exiting`, etc.). The solution involved using `useLayoutEffect` to react to changes in the `in` prop, `setTimeout` to control the duration of each phase, and the technique of forcing a browser reflow (by accessing `node.offsetHeight`) between applying classes, ensuring that CSS transitions are triggered consistently.
- **Child Management in `<TransitionGroup>`**: To animate the exit of a removed element from a list, it was necessary to keep it in the DOM even after its logical removal from the VDOM. I developed a logic that maintains an internal state of "renderable children." When a child is removed from the `props`, it is kept in this state with `in={false}` and is only actually removed from the DOM after the `onExited` callback is triggered, which deepened my understanding of React's reconciliation cycle.
- **Sequential Rendering in `<TransitionSwitch>`**: The goal was to create an "out-in" transition, where the old component completely disappears before the new one appears. A simple conditional render would not work. The solution was to use the child's `key` to detect the switch. Instead of rendering the new child immediately, the component first clones the old child, passes `in={false}` to it, and, crucially, uses the `onExited` callback to then, and only then, update the state and render the new component, ensuring the correct animation sequence.
