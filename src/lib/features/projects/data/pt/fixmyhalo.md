---
title: Fix My Halo
category: Tool
year: 2026
summary: Ferramenta para corrigir artefatos gráficos em desenvolvimento de jogos, disponível como WebApp e CLI.
repository: https://github.com/Azganoth/fix-my-halo
website: https://fixmyhalo.vercel.app
tags:
  - Rust
  - WebAssembly
  - React
  - TypeScript
  - TailwindCSS
---

**Fix My Halo** é uma solução de engenharia híbrida projetada para resolver um problema comum em motores de jogos (como Unity): o aparecimento de "halos brancos" ao redor de sprites que contém transparencia devido à filtragem bilinear. O projeto implementa um núcleo de processamento em **Rust** que é compilado tanto para um executável nativo de alta performance quanto para **WebAssembly (Wasm)** como uma biblioteca, permitindo que a mesma lógica rode diretamente no navegador do usuário sem backend.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Arquitetura Híbrida (Core Compartilhado)

**O Problema:** Manter duas bases de código separadas para a versão Web e CLI resultaria em duplicação de lógica e inconsistência nos algoritmos de processamento de imagem.

**A Solução:** Adotei uma arquitetura modular onde a lógica de negócios reside em um módulo compartilhado (`engine.rs`). O arquivo `lib.rs` expõe essa lógica para o JavaScript via `wasm-bindgen`, enquanto o `main.rs` a consome para criar a interface de linha de comando.

**Resultado:**

- Única fonte da verdade para o algoritmo de dilatação.
- A correção de bugs no core beneficia instantaneamente ambas as plataformas.

### 2. Algoritmo de Dilatação (Alpha Bleeding)

**O Problema:** Eliminar a cor branca invisível (R:255, G:255, B:255, A:0) que editores de imagem salvam em pixels transparentes, causando artefatos de renderização 3D.

**A Solução:** Implementei um algoritmo iterativo de dilatação em **Rust**. A função `process_image` percorre a imagem e, para cada passo de "padding", espalha a cor dos pixels visíveis para os vizinhos transparentes (`dilate_step`), mantendo o canal Alpha em 0.

**Resultado:**

- A GPU passa a interpolar a borda do sprite com a cor correta ("bled color") em vez de branco.
- Transições visuais perfeitas in-game.

### 3. Paralelismo e Performance (Rayon & Workers)

**O Problema:** O processamento de texturas de alta resolução é intensivo para a CPU. Na Web, isso bloquearia a thread principal (congelando a UI), e na CLI, processar arquivos sequencialmente seria ineficiente.

**A Solução:**

- **Web:** Utilizei **Web Workers** para isolar a execução do módulo Wasm, mantendo a interface React 19 fluida e responsiva.
- **CLI:** Implementei paralelismo de dados utilizando a biblioteca **Rayon**. O iterador `par_iter()` distribui automaticamente o processamento das imagens entre todas as threads disponíveis da CPU.

**Resultado:**

- UI desbloqueada com feedback de progresso em tempo real.
- Processamento massivo de assets em segundos via CLI.

---

## 🏗️ Arquitetura

### Rust Core & Wasm

O coração do projeto é uma _crate_ Rust compilada via `wasm-pack`. Isso permite manipulação de _arrays_ de bytes (`Uint8Array`) com performance próxima à nativa dentro do browser, contornando as limitações de performance do JavaScript para manipulação de pixels bit a bit.

### Frontend Stack

A interface web foi construída com **React 19** e **Vite**, utilizando as tecnologias mais recentes do ecossistema:

- **TailwindCSS v4:** Utilização da nova engine de estilos para máxima performance de build.
- **Zustand:** Gerenciamento de estado global para configurações e filas de processamento.
- **Shadcn/UI & Motion:** Componentes acessíveis e animações declarativas para uma experiência de usuário polida ("drop-zone" interativa).

---

## 🛠️ Tech Stack

- **Core:** Rust, Rayon, Image Crate
- **Web:** WebAssembly (Wasm), React, TypeScript
- **Estilos:** Tailwind
- **CLI:** Clap (Command Line Argument Parser)
