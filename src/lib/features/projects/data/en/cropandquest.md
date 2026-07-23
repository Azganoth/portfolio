---
title: Crop & Quest
category: Web App
year: 2026
summary: Local-first RPG portrait editor with multiple built-in game presets, reusable custom formats, and exact browser-side exports.
outcome: Delivered a browser-only pipeline for game-ready PNG, BMP, and TGA portrait sets, backed by Vitest tests and cross-browser Playwright workflows.
repository: https://github.com/Azganoth/crop-and-quest
website: https://cropquest.vercel.app
tags:
  - Next.js
  - React
  - TypeScript
  - Canvas API
  - Vitest
  - Playwright
---

**Crop & Quest** prepares custom portraits for RPGs that require specific dimensions, file formats, naming conventions, and installation locations. Its 20 built-in presets define 42 portrait variants across Infinity Engine games, Owlcat RPGs, Pillars of Eternity, Shadowrun, Wasteland, Neverwinter Nights, and other titles.

The user selects one local image, crops each required variant, reviews the generated files, and downloads them individually or as a ZIP. Source images and generated portraits remain in the browser; the application requires no account, database, cloud storage, or server-side image processing.

---

## 🧩 Technical decisions

### 1. One editor driven by typed game presets

**Challenge:** Each game expects a different combination of dimensions, aspect ratios, formats, filename patterns, folder structures, and installation instructions. Encoding those rules directly in page components would couple the interface to every supported title.

**Implementation:** A typed `Preset` model defines portrait variants, export behavior, naming limits, and installation notes. The App Router workflow resolves either one of the built-in presets or a custom preset stored locally. Valibot validates custom preset forms and portrait names before those values reach the export pipeline.

**Outcome:**

- The same selection, crop, review, and export routes serve all 42 built-in variants.
- New built-in games can be added as data instead of separate editor implementations.
- Users can create, edit, reuse, and delete custom presets without an account.

### 2. Exact browser-side output, including legacy formats

**Challenge:** A visual crop must become a file with exact pixel dimensions, rotation, format, and filename. Older RPGs also require BMP or TGA output that is not available through the Canvas API's standard encoders.

**Implementation:** `react-easy-crop` supplies the selected pixel area. The export pipeline first draws rotation into an intermediate canvas, then renders that crop into a final canvas sized to the preset's exact width and height. Native canvas encoding handles PNG, JPEG, and WebP; dedicated binary encoders write 24-bit BMP and 32-bit TGA files. Preset filename templates determine each download path, and JSZip assembles the complete set.

**Outcome:**

- Built-in presets can produce PNG, BMP, and TGA files for both modern and legacy games.
- Individual downloads and ZIP archives use the dimensions, names, and folder structure defined by the selected preset.
- Re-encoding through canvas avoids carrying source-image metadata into exported portraits.

### 3. Explicit ownership of temporary and persistent state

**Challenge:** The editor spans upload, multiple crop routes, review, and export, but source images should not be persisted. At the same time, custom preset definitions should survive a browser restart.

**Implementation:** Zustand keeps the active image, object URL, and crop results in an ephemeral portrait session. Replacing or clearing the image revokes previous object URLs, and guarded routes return incomplete sessions to image selection. A before-unload warning protects active work. Custom preset metadata uses a separate persisted store, so reusable formats survive without storing the user's images.

**Outcome:**

- Missing images or invalid preset routes recover through explicit redirects.
- Session cleanup releases generated browser resources instead of retaining stale image blobs.
- Private image data remains temporary while reusable configuration remains available locally.

---

## 🏗️ Image and export flow

```text
typed preset ------> aspect ratio, dimensions, format, filename, install notes
local image -> object URL -> crop state -> canvas -> encoder -> portrait Blob
                                                       |
                                             individual download or ZIP
```

Uploads accept local PNG, JPEG, and WebP files up to 10 MB. The selection step rejects empty files, unsupported HEIC or HEIF images, unsupported MIME types, and dragged cross-origin URLs before creating the local object URL.

## ✅ Delivery and verification

- Unit and component tests cover schemas, forms, preset resolution, encoders, export behavior, routes, math helpers, and Zustand stores.
- Playwright journeys cover portrait generation and ZIP download, custom preset lifecycle, and cropper controls.
- Each Playwright journey runs against Chromium, Firefox, WebKit, and a mobile Chrome profile.
- GitHub Actions separates formatting, lint, and type checks from unit and end-to-end jobs. Non-cancelled browser runs retain their HTML report for 30 days.
- The [deployed application](https://cropquest.vercel.app) provides the complete workflow without registration.

### Scope and limitations

Processing speed and memory use depend on the user's browser and device; the project does not publish image-processing benchmarks. The active portrait session does not survive a page refresh, by design, while custom presets do. The editor processes one source image per session and does not currently provide batch portrait creation.

---

## 🛠️ Tech stack

- **Application:** Next.js App Router, React, TypeScript
- **Image pipeline:** Canvas API, react-easy-crop, custom BMP and TGA encoders, JSZip
- **State and forms:** Zustand, TanStack Form, Valibot
- **Interface:** Tailwind CSS, Radix UI
- **Quality:** Vitest, Testing Library, Playwright, Oxlint
- **Delivery:** GitHub Actions, Vercel
