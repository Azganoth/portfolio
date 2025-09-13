---
title: Nexus
category: Web App
year: 2025
summary: A link aggregation platform with a management dashboard, secure authentication, and continuous deployment.
repository: https://github.com/Azganoth/nexus
website: https://nexusapp.fly.dev
tags:
  - Next
  - React
  - Node
  - Express
  - Prisma
  - PostgreSQL
  - Docker
  - TypeScript
---

Nexus solves the problem of scattered links across multiple platforms by offering a unified solution where users can consolidate all their profiles and projects into a single, public, and shareable "Hub." The application was built from scratch, covering everything from database architecture to continuous deployment in production.

**Main Features**

- **Complete Profile Management**: Users can sign up, log in, customize avatars with a cropping tool, edit their bio, and manage the visibility of their profiles.
- **Dynamic Links**: An interface with full CRUD support for links, including reordering with drag-and-drop and individual visibility control for each link.
- **Dashboard with Live Preview**: An intuitive control panel that displays a real-time preview of the public profile as the user makes changes.
- **Security and Compliance**: A robust authentication system with refresh token rotation, a password recovery flow, and a complete consent management system (LGPD/GDPR).
- **Data Portability**: A feature that allows the user to export all of their data in JSON format at any time.

**Tools and Technologies**

The project's architecture was structured in a **monorepo** with Turborepo to manage the codebase cohesively. The frontend was developed with **Next.js** and **React** to create a modern and reactive interface, while the backend was built as a RESTful API with **Node.js** and **Express**. Communication with the **PostgreSQL** database is managed securely and efficiently by **Prisma**.

**Technical Challenges and Learnings**

- **Preventing Race Conditions in Token Refresh**: To prevent multiple simultaneous requests with an expired token from triggering several refresh attempts, I implemented a "lock" with a shared Promise in the `apiClient`. The first request initiates the refresh process, while the others await its completion, eliminating the race condition and preventing unexpected logouts.
- **Server-Side Authentication with BFF**: Validating the user's session in Next.js Server Components was a challenge, as the refresh endpoint (`POST /auth/refresh`) altered the state. The solution was to create a dedicated "read-only" endpoint (`GET /auth/session`) for session verification on the server, separating responsibilities and respecting Next.js's constraints.
- **Ensuring Uniqueness of JWTs**: The `jsonwebtoken` library generated identical tokens if called within the same second, causing unique key failures in the database. I solved the problem by using the `jti` (JWT ID) claim from the RFC 7519 standard, adding 16 random bytes to each token to ensure its cryptographic uniqueness.
- **Fixing Critical Bugs in the Auto-Save Hook**: The `useAutoSaveForm` hook had an infinite retry loop in case of a network failure and sent stale data after a successful save. I refactored the hook to break the auto-save cycle after an error and, crucially, to use the API response to re-synchronize the form's base state, ensuring data integrity and the stability of the feature.
