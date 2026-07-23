---
title: Simple Motion React
category: Library
year: 2024
summary: React transition library inspired by Vue, built around CSS and lifecycle coordination.
outcome: Published npm package for lifecycle-aware CSS transitions, keyed lists, and keyed component switches, with Storybook documentation and automated tests.
repository: https://github.com/Azganoth/simple-motion-react
website: https://simple-motion-react.vercel.app/
tags:
  - React
  - TypeScript
  - Jest
  - Testing Library
  - Storybook
---

**Simple Motion React** is a focused transition library for **React** with an API inspired by **Vue.js**. It coordinates component lifecycle phases and CSS classes while leaving animation values and visual behavior to the consumer's stylesheet.

The package is published on npm as [`@simple-motion/react`](https://www.npmjs.com/package/@simple-motion/react). Version `0.0.2` provides `Transition`, `CSSTransition`, `TransitionGroup`, and `TransitionSwitch`.

---

## 📦 Package usage

```bash
pnpm add @simple-motion/react
```

```tsx
import { CSSTransition } from "@simple-motion/react";

<CSSTransition in={visible} duration={200} name="fade" unmount>
  <div>Transitioned content</div>
</CSSTransition>;
```

```css
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
```

## 🧩 Component behavior

### Keeping an element mounted during its exit phase

An exit animation cannot continue after React removes its element. `<Transition>` therefore owns an `entering → entered → exiting → exited` state machine. When its `in` prop becomes `false`, the component enters the exit phase, invokes lifecycle callbacks, and waits for the configured exit `duration`. With `unmount` enabled, it returns `null` only after reaching `exited`.

Effect cleanup cancels an obsolete timer when the direction changes quickly. Render-prop consumers can style every phase directly, and separate appear, enter, and exit durations and callbacks are supported.

### Sequencing CSS classes across browser layout

Applying initial and target classes in one rendering batch can prevent a CSS transition because the browser never calculates the starting layout. `<CSSTransition>` maps lifecycle phases to Vue-style `enter-from`, `enter-active`, `enter-to`, `leave-from`, `leave-active`, and `leave-to` classes.

Between the initial and active classes, the library reads `offsetHeight` to force a layout calculation before applying the target state. Consumers can follow the naming convention or provide each class explicitly, while CSS remains responsible for properties, easing, and visual design.

### Reconciling keyed children during removal and replacement

A removed list item no longer exists in the caller's children, but its transition component must remain rendered until its exit callback completes. `<TransitionGroup>` keeps an internal keyed child list, clones removed children with `in={false}`, and deletes them only after `onExited`. Persisting and newly added keys are merged into the caller's latest order.

`<TransitionSwitch>` applies the same principle to replacements by keeping the previous keyed child mounted until it exits. Multiple removals retain independent lifecycle state, and keyed replacements run in exit-then-enter order.

## Distribution and verification

- **tsup** produces ESM, CommonJS, and TypeScript declaration files.
- The published `0.0.2` artifact is a 6.9 kB compressed npm tarball with a 10.0 kB unminified ESM entry.
- The [Storybook site](https://simple-motion-react.vercel.app/) documents components, recipes, and isolated examples.
- Jest and Testing Library tests cover lifecycle phases, CSS classes, list reconciliation, keyed switching, rapid direction changes, and ref composition.
- GitHub Actions runs the test suite with coverage and uploads its result to Codecov.

### Design constraints and status

The package is closest in scope to React Transition Group: it coordinates lifecycle and CSS classes but does not implement layout animation, gesture handling, spring physics, or a keyframe engine.

Transition completion is based on the configured `duration`, not a `transitionend` listener, so consumers must keep CSS timing and component props aligned. The package is published on npm as `v0.0.2`; maintenance is currently paused.

---

## 🛠️ Tech stack

- **Core:** React, TypeScript
- **Build tooling:** tsup
- **Quality:** Jest, Testing Library, Codecov
- **Documentation:** Storybook
