---
title: Nexus
category: Web App
year: 2025
summary: Link aggregation SaaS platform built in a Monorepo with scalable Full-Stack architecture.
repository: https://github.com/Azganoth/nexus
website: https://nexusapp.fly.dev
tags:
  - Next
  - React
  - TypeScript
  - TailwindCSS
  - Node
  - Express
  - Prisma
  - PostgreSQL
  - Docker
  - Jest
  - Testing Library
---

Nexus is a complete "Link-in-Bio" application, designed to simulate a real **SaaS** product. The project adopts a **Monorepo** architecture to share data contracts and logic between the frontend (**Next.js**) and the backend (**Express**), demonstrating mastery over the full software development lifecycle, from data modeling to container orchestration.

---

## 🧩 Technical Challenges & Solutions

### 1. Authentication Concurrency (Promise Singleton)

**The Problem:** In complex SPAs, multiple simultaneous requests can fail due to an expired token. If each attempts to renew the token independently, the **Refresh Token Rotation** mechanism would invalidate previous tokens in a cascade, inadvertently logging the user out.

**The Solution:** I implemented a **Promise Singleton** pattern in the HTTP client interceptor. The first 401 failure instantiates a refresh promise, and all subsequent requests subscribe to this same pending promise (queueing) instead of triggering new refreshes.

**Result:**

- Upon resolution, all paused requests are re-executed with the new token.
- Ensures atomicity in session renewal.

### 2. Session Integrity and Security

**The Problem:** Prevent replay attacks and ensure tokens could not be forged or collide, as well as allowing session validation on the server (**Next.js**) without exposing sensitive tokens.

**The Solution:** I injected cryptographic entropy (16 hex bytes) via **JTI (JWT ID)** into each generated token and created a read-only endpoint (**BFF Pattern**) allowing **Next.js** to validate the session via `httpOnly` cookies in **SSR**.

**Result:**

- Absolute uniqueness in the database for precise revocation.
- Does not inadvertently trigger write rotation logic.
- Security and performance maintained in SSR.

### 3. Upload with Deduplication (Content-Addressable Storage)

**The Problem:** Uploading binary images directly through the **Node.js** API blocks the main thread, degrading overall performance. Furthermore, some users upload the same image (e.g., social media logo), wasting storage and bandwidth with duplicate files.

**The Solution:** I implemented client-side SHA-256 hash logic (**Content-Based Addressing**). Before upload, the server checks via R2/S3 `HeadObject` if the file already exists. If it exists, it reuses it instantly; if not, it generates a **Presigned URL** for direct upload to the bucket.

**Result:**

- Automatic deduplication of identical files.
- Direct upload (Client-to-Storage) without blocking the **Node.js** server.

### 4. End-to-End Type-Safety (Shared Contracts)

**The Problem:** Keeping TypeScript types manually synchronized between Frontend and Backend is prone to human error. A simple field name change in the API can silently break the interface in production, as there is no cross-compilation validation between projects.

**The Solution:** I utilized the **Monorepo** architecture to create a shared package (`@repo/shared`). The **Zod** schemas defined in this package serve as the single source of truth, generating both static types (**TypeScript**) and validation rules for forms (Frontend) and API inputs (Backend).

**Result:**

- Safe refactoring: changing a field in the backend generates an immediate build error in the frontend.
- Isomorphic validation: the same email/password rule runs on client and server.

### 5. Optimistic Reordering and Database Constraints

**The Problem:** Updating the order of items in a column with a `UNIQUE` constraint in the SQL database often causes collision errors. Trying to swap item "1" for "2" fails immediately if the transaction is not atomic, because index "2" is already occupied at the time of writing.

**The Solution:** On the frontend, I used **SWR** for instant optimistic updates. On the backend, I implemented a transaction that first updates indices to temporary negative values, bypassing the uniqueness constraint before applying the new definitive order.

**Result:**

- Fluid UX without "jumps" or network waits.
- Data integrity guaranteed at the database level.

### 6. Intelligent Auto-Save (Debounce & Dirty Check)

**The Problem:** Implementing auto-save listening to every keystroke event (`onChange`) creates excessive unnecessary requests (overhead). Additionally, variable network latency causes race conditions, where an old response might overwrite newer data, reverting the user's modification.

**The Solution:** I created a custom hook `useAutoSaveForm` that combines **React Hook Form** state monitoring with `useDebounceValue`. The hook intelligently checks if there was a real change (isDirty) comparing with the initial value before triggering automatic submission.

**Result:**

- Fluid and modern editing experience.
- Drastic reduction of unnecessary network calls.

---

## 🏗️ Architecture

The system is orchestrated via **Turborepo**, allowing code sharing with **End-to-End Type-Safety**:

- **Apps:** `web` (**Next.js 14 App Router**) and `api` (**Express.js**).
- **Shared Packages:**
  - `@repo/database`: **Prisma** client and migrations, ensuring API and seed scripts use the same source of truth.
  - `@repo/shared`: **Zod** schemas and isomorphic **TypeScript** types. A change in the validation schema immediately reflects in build errors on both frontend and backend.

### Infrastructure

- **Multi-stage Docker:** Optimized builds for production with drastic reduction of final image size.
- **CI/CD:** **GitHub Actions** pipeline for automated tests (**Jest**/**Supertest**) and continuous deploy.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind
- **Backend:** Node.js, Express
- **Data:** PostgreSQL, Prisma
- **Infra:** Docker, Fly.io
