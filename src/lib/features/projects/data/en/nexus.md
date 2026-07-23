---
title: Nexus
category: Web App
year: 2025
summary: Full-stack link-in-bio application built as a Next.js and Express monorepo.
outcome: Shared contracts, coordinated session renewal, direct-to-storage avatar uploads, automated tests, and deployment on Fly.io.
repository: https://github.com/Azganoth/nexus
website: https://nexusapp.fly.dev
tags:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Node.js
  - Express
  - Prisma
  - PostgreSQL
  - Docker
  - Jest
  - Testing Library
---

Nexus is a link-in-bio application built to explore a production-shaped **SaaS** architecture beyond the interface. Its **Turborepo** workspace connects a **Next.js** frontend, an **Express** API, shared **Zod** contracts, **PostgreSQL** through **Prisma**, and S3-compatible object storage on **Cloudflare R2**.

---

## 🧩 Technical decisions

### 1. Session renewal without competing requests

**Challenge:** When an access token expires, several browser requests can receive a 401 response at once. If each request starts its own refresh, they compete over the same session. Server-rendered routes also need a way to inspect the session without invoking the renewal flow.

**Implementation:** The HTTP client keeps a shared `Promise` for the active refresh request. The first eligible 401 response starts the request; later failures await the same `Promise` and retry with the new access token. The API verifies the signed refresh token against its stored session, while an `httpOnly` cookie keeps that token outside client-side JavaScript. A separate read-only endpoint lets **Next.js** inspect the session during **SSR**.

**Outcome:**

- Only one browser refresh request remains in flight at a time.
- Failed requests retry after the shared refresh completes.
- SSR session checks do not invoke the token-renewal endpoint.

### 2. Direct avatar uploads with content deduplication

**Challenge:** Sending image bodies through the **Express** API would consume application-server bandwidth and memory. Re-uploading the same processed avatar would also create redundant objects.

**Implementation:** The browser crops the avatar to a 256 × 256 WebP image and calculates its SHA-256 hash. The API uses that hash in the object key and checks **R2** with `HeadObject`. If the object already exists for that account, it returns the public URL; otherwise, it returns a presigned `PUT` URL and the browser uploads the image directly to the bucket.

**Outcome:**

- Repeated uploads of the same processed avatar reuse the existing object.
- Image bodies travel from the browser to R2 instead of passing through Express.

### 3. Shared contracts across frontend and backend

**Challenge:** Duplicating request types and validation rules across applications makes contract drift easy to miss.

**Implementation:** The `@repo/shared` package centralizes **Zod** schemas and the **TypeScript** types inferred from them. The Next.js forms and Express request handlers consume the same definitions.

**Outcome:**

- Contract changes surface during build or type-checking instead of relying on manual synchronization.
- The same validation rules are applied at the client and API boundaries.

### 4. Optimistic reordering under a UNIQUE constraint

**Challenge:** Swapping positions directly can violate the database's `UNIQUE` ordering constraint before every row reaches its final value.

**Implementation:** **SWR** applies the new order optimistically in the interface. The API first confirms that the submitted IDs exactly match the user's links. Inside a database transaction, it assigns temporary negative positions and then writes the final zero-based order.

**Outcome:**

- The interface responds before the API round trip completes.
- The database keeps a unique, validated order for every saved link.

## Other implementation details

Profile settings use a reusable auto-save hook. It watches selected fields, waits one second after the latest edit, compares them with the saved values, validates the changed state, and submits only when an update is necessary.

---

## 🏗️ Architecture

```text
                         @repo/shared
                Zod schemas and TypeScript contracts
                       /                    \
Browser -> Next.js frontend -> Express API -> PostgreSQL
   |                              |
   |                              +-> R2: existence check + presigned URL
   +--------------------------------> R2: direct avatar upload
```

- **Applications:** `web` with the **Next.js App Router** and `api` with **Express**.
- **Shared packages:**
  - `@repo/database`: **Prisma** client and migrations shared by the API and seed scripts.
  - `@repo/shared`: **Zod** schemas, API contracts, and inferred **TypeScript** types.

### Delivery and verification

- Separate multi-stage Dockerfiles build the web and API applications for **Fly.io**.
- **GitHub Actions** builds and tests the workspace. On the main branch, it also applies database migrations and deploys both applications.
- **Jest**, **Supertest**, and Testing Library cover API and frontend behavior.

### Current scope and production considerations

The deployed instance demonstrates the product architecture rather than operating as a public multi-tenant service. Commercial operation would also require structured observability, backup and restore procedures, rate limiting and abuse controls, capacity planning, and operational runbooks.

---

## 🛠️ Tech stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express
- **Data:** PostgreSQL, Prisma
- **Infrastructure:** Docker, Fly.io
