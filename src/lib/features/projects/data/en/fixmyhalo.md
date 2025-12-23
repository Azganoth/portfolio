---
title: Fix My Halo
category: Tool
year: 2026
summary: Tool to fix graphical artifacts in game development, available as a WebApp and CLI.
repository: https://github.com/Azganoth/fix-my-halo
website: https://fixmyhalo.vercel.app
tags:
  - Rust
  - WebAssembly
  - React
  - TypeScript
  - TailwindCSS
---

**Fix My Halo** is a hybrid engineering solution designed to solve a common problem in game engines (like Unity): the appearance of "white halos" around sprites containing transparency due to bilinear filtering. The project implements a processing core in **Rust** that is compiled both to a high-performance native executable and to **WebAssembly (Wasm)** as a library, allowing the same logic to run directly in the user's browser without a backend.

---

## 🧩 Technical Challenges & Solutions

### 1. Hybrid Architecture (Shared Core)

**The Problem:** Maintaining two separate codebases for the Web and CLI versions would result in logic duplication and inconsistency in image processing algorithms.

**The Solution:** I adopted a modular architecture where business logic resides in a shared module (`engine.rs`). The `lib.rs` file exposes this logic to JavaScript via `wasm-bindgen`, while `main.rs` consumes it to create the command-line interface.

**Result:**

- Single source of truth for the dilation algorithm.
- Bug fixes in the core instantly benefit both platforms.

### 2. Dilation Algorithm (Alpha Bleeding)

**The Problem:** Eliminating the invisible white color (R:255, G:255, B:255, A:0) that image editors save in transparent pixels, causing 3D rendering artifacts.

**The Solution:** I implemented an iterative dilation algorithm in **Rust**. The `process_image` function traverses the image and, for each "padding" step, spreads the color of visible pixels to transparent neighbors (`dilate_step`), keeping the Alpha channel at 0.

**Result:**

- The GPU starts interpolating the sprite edge with the correct color ("bled color") instead of white.
- Perfect visual transitions in-game.

### 3. Parallelism and Performance (Rayon & Workers)

**The Problem:** Processing high-resolution textures is CPU-intensive. On the Web, this would block the main thread (freezing the UI), and in the CLI, processing files sequentially would be inefficient.

**The Solution:**

- **Web:** I used **Web Workers** to isolate the Wasm module execution, keeping the React 19 interface fluid and responsive.
- **CLI:** I implemented data parallelism using the **Rayon** library. The `par_iter()` iterator automatically distributes image processing across all available CPU threads.

**Result:**

- Unblocked UI with real-time progress feedback.
- Massive asset processing in seconds via CLI.

---

## 🏗️ Architecture

### Rust Core & Wasm

The heart of the project is a Rust _crate_ compiled via `wasm-pack`. This allows manipulation of byte arrays (`Uint8Array`) with near-native performance inside the browser, bypassing JavaScript's performance limitations for bitwise pixel manipulation.

### Frontend Stack

The web interface was built with **React 19** and **Vite**, using the latest ecosystem technologies:

- **TailwindCSS v4:** Utilization of the new style engine for maximum build performance.
- **Zustand:** Global state management for configurations and processing queues.
- **Shadcn/UI & Motion:** Accessible components and declarative animations for a polished user experience (interactive "drop-zone").

---

## 🛠️ Tech Stack

- **Core:** Rust, Rayon, Image Crate
- **Web:** WebAssembly (Wasm), React, TypeScript
- **Styles:** Tailwind
- **CLI:** Clap (Command Line Argument Parser)
