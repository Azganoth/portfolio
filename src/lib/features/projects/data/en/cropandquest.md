---
title: Crop & Quest
category: Web App
year: 2026
summary: Local-first portrait cropping and export tool for the exact formats required by popular RPGs.
outcome: Turns one source image into correctly sized and named portrait sets entirely in the browser, with individual and ZIP exports.
repository: https://github.com/Azganoth/crop-and-quest
website: https://cropquest.vercel.app
tags:
  - Next
  - React
  - TypeScript
  - TailwindCSS
  - Vitest
  - Playwright
---

**Crop & Quest** prepares custom portraits for RPGs whose modding systems require multiple image dimensions, formats, and filenames. The user chooses a game preset, crops each required variant, reviews the generated set, and downloads individual files or a ready-to-install ZIP.

All image processing happens locally in the browser. The application does not require an account, database, cloud storage, or server-side image processing.

---

## 🧩 Technical Challenges & Solutions

### 1. One Workflow for Incompatible Game Formats

**The Problem:** Each supported game expects a different combination of portrait dimensions, aspect ratios, optional variants, filenames, and installation notes. Encoding those rules directly in the interface would make every new preset a maintenance problem.

**The Solution:** I modeled each game as typed preset data. Presets define their variants and export rules while the editor reuses the same selection, cropping, review, and download workflow.

**Outcome:**

- New games can be supported without creating a separate editor.
- Required and optional variants follow the rules of the selected game.
- A custom format covers games that do not yet have a built-in preset.

### 2. Precise Client-Side Image Generation

**The Problem:** Visual crop coordinates must produce files with exact pixel dimensions and predictable names. Generating several variants can also consume enough memory to freeze or fail on constrained browsers.

**The Solution:** The editor keeps crop state in **Zustand**, renders each selected area to a precisely sized Canvas, converts the result into the preset's output format, and bundles completed variants with **JSZip**. File validation and recoverable UI states keep invalid inputs or export failures from silently breaking the session.

**Outcome:**

- Exported portraits match the dimensions and filenames expected by each game.
- Images never need to leave the user's device.
- Users can download one variant or the complete portrait set.

### 3. Multi-Step Reliability

**The Problem:** The editor spans image selection, several crop routes, review, and export. Navigation or missing session data must not leave users in an invalid state.

**The Solution:** The application uses a feature-oriented **Next.js** architecture with explicit session state and guarded routes. Unit and component tests cover the core behavior, while **Playwright** exercises the complete browser workflow through reusable fixtures and page objects.

**Outcome:**

- Invalid or incomplete sessions return users to a recoverable step.
- Automated tests cover both isolated behavior and real user journeys.
- The deployed application remains a small, serverless product despite its stateful workflow.

---

## 🏗️ Stack

- **Framework:** Next.js, React, TypeScript
- **Image workflow:** Canvas API, react-easy-crop, JSZip
- **State and validation:** Zustand, Valibot
- **Styles:** Tailwind CSS
- **Quality:** Vitest, Testing Library, Playwright, Oxlint
