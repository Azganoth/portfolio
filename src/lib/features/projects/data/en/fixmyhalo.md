---
title: Fix My Halo
category: Developer Tool
year: 2026
summary: Web and Windows CLI tool that removes texture artifacts from transparent game sprites.
outcome: Delivered one tested Rust core as a browser-based Wasm tool and a parallel native CLI, with direct validation from a RimWorld modder.
repository: https://github.com/Azganoth/fix-my-halo
website: https://fixmyhalo.vercel.app
tags:
  - Rust
  - WebAssembly
  - React
  - TypeScript
  - Tailwind CSS
---

**Fix My Halo** automates texture dilation, also known as alpha bleeding, for transparent game sprites. With some filtering methods, the GPU samples visible edge pixels together with RGB values stored in transparent pixels. If those hidden values are white or black, the interpolation creates an outline around the sprite.

The web app processes files locally in the browser without sending them to a backend. The native CLI provides the same correction for individual files, folders, and glob patterns.

---

## 🧩 Technical decisions

### 1. One Rust core for two delivery formats

**Challenge:** The browser offers the most accessible workflow, while a native CLI is better suited to mod projects with many textures. Separate implementations would allow their image-processing behavior to diverge.

**Implementation:** `engine.rs` contains the `process_image` function and dilation steps. `lib.rs` exposes that core through `wasm-bindgen`, accepting encoded image bytes and returning PNG bytes to the browser. `main.rs` uses the same engine behind a native interface built with Clap.

**Outcome:**

- Both delivery formats use the same algorithm and padding semantics.
- Platform-specific code remains limited to file discovery, byte transfer, progress, and output.

### 2. Iterative alpha bleeding without changing transparency

**Challenge:** The tool must replace problematic RGB data inside fully transparent pixels without changing the sprite's visible shape or partially transparent edges.

**Implementation:** Each dilation pass inspects fully transparent pixels and copies the color of the first non-transparent pixel found among their eight neighbors. Repeating the pass expands edge colors by one pixel per configured `padding` step. After processing, the original alpha channel is restored across the image.

**Outcome:**

- Only hidden color data is changed; the original transparency remains intact.
- Processing stops early when another pass would make no changes.

### 3. Worker-isolated browser processing and parallel CLI jobs

**Challenge:** Image processing should not block the React interface, while large CLI batches should make use of available CPU threads.

**Implementation:**

- **Browser:** A Web Worker initializes the Wasm module, receives each job, and transfers the input and result buffers without copying them through the UI thread.
- **CLI:** File, directory, and glob inputs are converted into jobs. Rayon's `par_iter()` distributes those jobs across its thread pool, while the CLI reports progress and a final summary.

**Outcome:**

- The browser UI can continue updating file states while Wasm processes an image.
- Folder and recursive CLI batches process files concurrently.

---

## 🏗️ Architecture and workflows

Rust was chosen primarily so the browser and CLI could reuse the same image-processing implementation, not because the algorithm could not be written in JavaScript. The shared crate is compiled with `wasm-pack` for browser use and as a native executable for batch processing.

```text
React UI -> transferable buffer -> Web Worker -> Wasm binding -> Rust core
CLI input -> file discovery -> Rayon jobs ---------------------> Rust core
```

The React interface supports drag-and-drop batches, a configurable dilation radius, per-file status, individual downloads, and ZIP export. The browser queue handles one image at a time outside the main thread; file-level parallelism is provided by the CLI.

## 📦 Distribution and verification

[Version 0.2.0](https://github.com/Azganoth/fix-my-halo/releases/tag/v0.2.0) provides a Windows x64 executable. After downloading `fixmyhalo.exe`, it can process one file or recursively process a directory:

```powershell
.\fixmyhalo.exe "Textures\Player.png"
.\fixmyhalo.exe "C:\MyMod\Textures" --recursive
```

- Rust unit tests cover neighbor selection, a single dilation step, multi-step padding, already-correct transparent colors, and fully opaque images.
- GitHub Actions builds the Windows x64 executable whenever a version tag is pushed and attaches it to the corresponding release.
- The [hosted web app](https://fixmyhalo.vercel.app/) provides the no-install workflow.

After I shared the project with the RimWorld community, a modder reported that it removed a whitish border from a workbench texture they had been unable to correct manually. The [launch post and discussion](https://www.reddit.com/r/RimWorld/comments/1qnqxwi/tool_fix_my_halo_an_opensource_web_cli_tool_to/) provide direct validation from the intended audience.

### Scope and limitations

The project does not publish cross-platform benchmarks, so its performance claims are limited to observable implementation choices: processing is isolated from the browser's UI thread, and CLI jobs are parallelized across files. The downloadable native build currently targets Windows x64.

---

## 🛠️ Tech stack

- **Image-processing core:** Rust, image
- **Concurrency:** Web Workers, transferable buffers, Rayon
- **Web:** WebAssembly, React, TypeScript, Zustand
- **Interface:** Tailwind CSS, Radix UI, Motion
- **Delivery:** Clap, GitHub Actions, Vercel
