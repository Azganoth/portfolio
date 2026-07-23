---
title: Pixel Icons
category: Extension
year: 2025
summary: 16×16 pixel-art file icon theme for VS Code, with broad coverage of languages, tooling, and folders.
outcome: More than 1,000 Marketplace installs; the project includes more than 100 icon definitions, a public catalog of every icon, and tag-triggered publishing.
repository: https://github.com/Azganoth/vscode-pixel-icons
website: https://vscode-pixel-icons.vercel.app/
tags:
  - VS Code
  - TypeScript
---

**Pixel Icons** is a 16×16 pixel-art file icon theme for VS Code. The project began with a credited set of icons created by Platinumaniac and was expanded to cover more languages, frameworks, runtimes, package managers, configuration files, and folders.

The extension currently contains more than 100 icon definitions and maps more than 390 items, including file extensions, exact filenames, and folder patterns.

---

## 📦 Adoption and verification

- Version `1.4.0` is published on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Azganoth.pixel-icons), where the extension has more than 1,000 installs.
- An automated test verifies that VS Code recognizes the extension in the test environment.
- A script turns the theme mappings into a sample workspace for visual review.
- GitHub Actions builds and publishes the extension to the VS Code Marketplace from a version tag or a manual run.

## 🧩 Theme design and maintenance

### Declarative coverage without runtime behavior

A useful icon theme needs to distinguish generic extensions from exact configuration and lock filenames while also handling collapsed and expanded folder states. Pixel Icons contributes `assets/theme.json` directly through `package.json` and declares no activation events, leaving mapping resolution and rendering to VS Code.

This keeps the extension free of background behavior while allowing specific filenames to override generic extension mappings. The catalog covers established languages alongside tooling such as Vite, Vitest, Tauri, Oxc, and Vercel.

### A consistent 16×16 visual system

Small pixel-art assets lose clarity when silhouettes, contrast, or visual weight vary across a large collection. I maintain dedicated variants for tests, TypeScript declarations, configuration files, lockfiles, and collapsed or expanded folders, then review them together in representative workspaces.

The changelog records both new coverage and refinements to existing proportions, highlights, and contrast. Related technologies remain distinguishable while sharing one visual language, and folder states retain a consistent silhouette.

### A reviewable catalog

A TypeScript script derives sample files and folders from the manifest. When an exact filename collides with a generated folder, the script places that file in a dedicated `_COLLISIONS_` directory. The [public catalog](https://vscode-pixel-icons.vercel.app/) groups icons by ecosystem and exposes filename and extension hints, an installation link, and an icon-request route.

The extension, website, changelog, and release workflow are maintained in the same repository.

## 🏗️ Distribution architecture

```text
theme.json -> VS Code icon-theme contribution -> Explorer rendering
theme.json -> TypeScript sample generator ----> review workspace
docs catalog ---------------------------------> Vercel
version tag -> GitHub Actions ----------------> VS Code Marketplace
```

### Maintenance constraints

The automated test verifies extension discovery, not every manifest mapping or image asset. Catalog validation remains a visual process supported by the generated workspace. The website gallery is manually curated rather than generated from `theme.json`, so it must be kept in sync when icons change. Because the assets are pixel art, non-integer VS Code zoom levels can introduce anti-aliasing and blur.

---

## 🛠️ Tech stack

- **Platform:** VS Code icon-theme contribution, Visual Studio Marketplace
- **Assets:** 16×16 PNG icons, declarative JSON manifest
- **Tooling:** TypeScript, Node.js, pnpm
- **Quality:** VS Code integration test, review workspace, versioned changelog
- **Delivery:** GitHub Actions, Vercel
