---
name: architecture
description: Use when creating, moving, or naming files in apps/client/src, or when deciding which layer code belongs to. Covers the layer hierarchy ((web), modules, widgets, features, entities, shared, config, pkg), allowed import directions between layers, and file/directory naming conventions (*.component.tsx, *.service.ts, *.store.ts, *.hook.tsx, *.api.ts, *.query.ts, *.mutation.ts, *.model.ts, *.interface.ts, *.util.ts, *.provider.tsx, kebab-case dirs).
---

# Client Architecture Guide (Next.js)

## Overview

- **Layers** — standardized levels of abstraction
- **Slices** — feature-based divisions within layers
- **Segments** — technical purpose divisions within slices

```
┌─────────────┬────────────┬────────────┐
│   Layers    │   Slices   │  Segments  │
├─────────────┼────────────┼────────────┤
│    (web)    │      -     │      +     │
│   modules   │      +     │      +     │
│   widgets   │      +     │      +     │
│   features  │      +     │      +     │
│   entities  │      +     │      +     │
│   shared    │      -     │      +     │
│   config    │      -     │      +     │
│     pkg     │      -     │      +     │
└─────────────┴────────────┴────────────┘
```

## Complete Project Structure

```
src/
├── app/
│   ├── (web)/                                      # Layer - Next.js routing (route group)
│   │   └── [locale]/                               # Locale-prefixed routes (next-intl)
│   │       ├── page.tsx                            # Root page
│   │       ├── layout.tsx                          # Root layout (async RSC)
│   │       ├── not-found.tsx                       # 404 page (Optional)
│   │       ├── error.tsx                           # Error boundary (Optional)
│   │       ├── loading.tsx                         # Loading UI (Optional)
│   │       └── page-name/                          # Nested routes
│   │           ├── page.tsx
│   │           ├── layout.tsx                      # (Optional)
│   │           └── loading.tsx                     # (Optional)
│   ├── modules/                                    # Layer - Main business logic
│   │   ├── module-name/                            # Slice
│   │   │   ├── elements/                           # Segment (Optional) - Custom elements
│   │   │   │   ├── element-name/
│   │   │   │   │   ├── element-name.component.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ...
│   │   │   │   └── index.ts
│   │   │   ├── module-name.component.tsx           # Slice root component
│   │   │   ├── module-name.service.ts              # Segment (Optional)
│   │   │   ├── module-name.store.ts                # Segment (Optional)
│   │   │   ├── module-name.constant.ts             # Segment (Optional)
│   │   │   ├── module-name.interface.ts            # Segment (Optional)
│   │   │   └── index.ts
│   │   └── ...
│   ├── widgets/                                    # Layer - Self-sufficient parts of functionality or interface
│   │   ├── widget-name/                            # Slice
│   │   │   ├── elements/                           # Segment (Optional) - Custom elements
│   │   │   │   ├── element-name/
│   │   │   │   │   ├── element-name.component.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ...
│   │   │   │   └── index.ts
│   │   │   ├── widget-name.component.tsx
│   │   │   ├── widget-name.service.ts              # Segment (Optional)
│   │   │   ├── widget-name.store.ts                # Segment (Optional)
│   │   │   ├── widget-name.constant.ts             # Segment (Optional)
│   │   │   ├── widget-name.interface.ts            # Segment (Optional)
│   │   │   └── index.ts
│   │   └── ...
│   ├── features/                                   # Layer - Reusable implementations
│   │   ├── feature-name/                           # Slice
│   │   │   ├── feature-name.component.tsx
│   │   │   ├── feature-name.service.ts             # Segment (Optional)
│   │   │   ├── feature-name.constant.ts            # Segment (Optional)
│   │   │   ├── feature-name.interface.ts           # Segment (Optional)
│   │   │   └── index.ts
│   │   └── ...
│   ├── entities/                                   # Layer - Business entities
│   │   ├── api/                                    # Slice
│   │   │   ├── api-name/                           # Segment
│   │   │   │   ├── api-name.api.ts                 # Fetcher / server action
│   │   │   │   ├── api-name.query.ts               # TanStack Query hooks (Optional)
│   │   │   │   ├── api-name.mutation.ts            # TanStack Mutation hooks (Optional)
│   │   │   │   └── index.ts
│   │   │   ├── ...
│   │   │   └── index.ts
│   │   └── models/                                 # Slice
│   │       ├── model-name.model.ts                 # Type or Zod schema (S<Name> + T<Name>)
│   │       ├── ...
│   │       └── index.ts
│   └── shared/                                     # Layer - Reusable code
│       ├── components/                             # Segment - Shared UI components
│       │   ├── component-name/
│       │   │   ├── component-name.component.tsx
│       │   │   └── index.ts
│       │   ├── ...
│       │   └── index.ts
│       ├── hooks/                                  # Segment
│       │   ├── hook-name.hook.tsx
│       │   ├── ...
│       │   └── index.ts
│       ├── store/                                  # Segment - Zustand stores
│       │   ├── store-name.store.ts
│       │   ├── ...
│       │   └── index.ts
│       ├── interfaces/                             # Segment
│       │   ├── interface-name.interface.ts
│       │   ├── ...
│       │   └── index.ts
│       ├── utils/                                  # Segment - Pure helpers
│       │   ├── util-name.util.ts
│       │   ├── ...
│       │   └── index.ts
│       └── assets/                                 # Segment
│           ├── icons/
│           │   ├── icon-name.svg
│           │   ├── ...
│           │   └── index.ts
│           ├── ...
│           └── index.ts
├── config/                                         # Application configuration
│   ├── env/                                        # Segment - Environment variables
│   │   ├── env.client.ts                           # NEXT_PUBLIC_* (Zod)
│   │   ├── env.server.ts                           # Server-only secrets (Zod)
│   │   └── index.ts
│   ├── styles/                                     # Segment - Global styles + fonts
│   │   ├── globals.css
│   │   ├── theme.css
│   │   └── fonts/
│   │       ├── fonts.ts
│   │       └── index.ts
│   └── types/                                      # Segment - Ambient TS declarations
│       └── svg.d.ts
├── pkg/                                            # Layer - Third-party adapters
│   ├── supabase/                                   # Supabase SSR (browser + server clients)
│   ├── rest-api/                                   # Ky fetcher + TanStack Query provider
│   ├── shadcn/                                     # Shadcn/ui components
│   └── locale/                                     # next-intl re-exports (Link, usePathname, ...)
└── proxy.ts                                        # Next.js middleware (renamed from middleware.ts)
```

## Layer Descriptions

### 1. (web) Layer — Next.js Routing

**Purpose**: Next.js App Router pages and layouts under `[locale]/`.

- Define pages and layouts using Next.js conventions
- Routing through file system; locale prefix via next-intl
- Root layout is async RSC; client providers wrap children
- The Next.js middleware lives in `src/proxy.ts` (deliberate non-default name) and merges Supabase session refresh + intl middleware

**Files**:

- `page.tsx` — Page components
- `layout.tsx` — Layout wrappers
- `loading.tsx` — Loading states
- `error.tsx` — Error boundaries
- `not-found.tsx` — 404 pages

### 2. Modules Layer

**Purpose**: Core business logic — page-level orchestration

- Main application features
- Complex page sections that compose widgets/features
- Owns data wiring (queries) and renders the section

**Files**:

- `*.component.tsx` — Slice root component
- `*.service.ts` — Business logic
- `*.store.ts` — Module state
- `*.interface.ts` — Module-specific types
- `*.constant.ts` — Module constants
- `elements/` — Local sub-components, not reused outside the slice

### 3. Widgets Layer

**Purpose**: Self-sufficient UI components

- Complex reusable components with internal logic
- Reusable across pages
- Independent functionality

**Files**:

- `*.component.tsx` — Widget component
- `*.service.ts` — Widget logic
- `*.store.ts` — Widget state
- `elements/` — Local sub-components

### 4. Features Layer

**Purpose**: Simple reusable implementations

- Small UI components
- Single-purpose functionality
- Simple hooks

**Files**:

- `*.component.tsx` — Feature component
- `*.service.ts` — Feature logic
- `*.interface.ts` — Feature types

### 5. Entities Layer

**Purpose**: Business entities and data

- HTTP fetchers (Ky) and Next.js server actions
- TanStack Query / Mutation hooks
- Type definitions and Zod schemas

**Files**:

- `api/<slice>/<slice>.api.ts` — Fetcher (Ky) or server action (`'use server'`)
- `api/<slice>/<slice>.query.ts` — `queryOptions` + `useQuery` hooks
- `api/<slice>/<slice>.mutation.ts` — `useMutation` hooks with invalidation
- `models/<name>.model.ts` — Types and Zod schemas (`S<Name>`, `T<Name>`)

### 6. Shared Layer

**Purpose**: In-repo reusables (not third-party)

- Reusable UI components
- Custom hooks
- Global Zustand stores
- Pure utilities
- Assets and icons

**Files**:

- `components/<name>/<name>.component.tsx` — Shared UI components
- `hooks/<name>.hook.tsx` — Custom hooks
- `store/<name>.store.ts` — Global state (Zustand)
- `utils/<name>.util.ts` — Pure helpers
- `interfaces/<name>.interface.ts` — Shared types
- `assets/**` — Images, icons, etc.

### 7. Config Layer

**Purpose**: Application configuration

- Environment variables (Zod-validated via `@t3-oss/env-nextjs`)
- Global styles and fonts
- Ambient TypeScript declarations

**Files**:

- `env/env.client.ts` — `NEXT_PUBLIC_*` schema
- `env/env.server.ts` — Server-only secret schema
- `styles/globals.css`, `styles/theme.css`
- `styles/fonts/fonts.ts` — `next/font` setup
- `types/*.d.ts` — Ambient module declarations

### 8. Pkg Layer

**Purpose**: Third-party adapters and SDK wrappers

- `supabase/` — `createBrowserClient` (`client.ts`), `createServerClient` (`server.ts`), session middleware
- `rest-api/` — Ky instance + `RestApiProvider` (TanStack Query)
- `shadcn/` — Shadcn/ui components
- `locale/` — next-intl `Link`, `usePathname`, `useRouter`, `routing`

In-repo utilities go in `shared/utils/`, not `pkg/`.

## Import Rules

Layers can only import from lower layers in the hierarchy:

```tsx
// ✅ Allowed imports
// (web) -> modules, widgets, features, entities, shared, config, pkg
// modules -> widgets, features, entities, shared, config, pkg
// widgets -> features, entities, shared, config, pkg
// features -> entities, shared, config, pkg
// entities -> shared, config, pkg
// shared -> config, pkg
// config -> pkg
// pkg -> (no other layers, only external packages)

// ❌ Forbidden imports
// shared -> entities, features, widgets, modules, (web)
// entities -> features, widgets, modules, (web)
// features -> widgets, modules, (web)
// widgets -> modules, (web)
// modules -> (web), other modules
// config -> any app layers
// pkg -> any app layers
```

## Naming Conventions

### Files

- **Pages / Layouts**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- **Components**: `component-name.component.tsx`
- **Services**: `service-name.service.ts`
- **Stores**: `store-name.store.ts`
- **Hooks**: `hook-name.hook.tsx`
- **Utilities**: `util-name.util.ts`
- **Providers**: `provider-name.provider.tsx`
- **Models**: `model-name.model.ts`
- **APIs**: `api-name.api.ts`
- **Queries**: `api-name.query.ts`
- **Mutations**: `api-name.mutation.ts`
- **Constants**: `constant-name.constant.ts`
- **Interfaces**: `interface-name.interface.ts`

### Symbols

- **Interfaces**: `I` prefix — `IUser`, `IPhotoList`, `IProps`
- **Type aliases**: `T` prefix — `TSignRes`
- **Zod schemas**: `S` prefix — `SSignRes`, `SCreateUserReq`
- **Components**: PascalCase + suffix — `CardComponent`, `HeaderComponent`
- **Hooks**: `use` prefix — `useUserStore`, `usePhotoListQuery`

### Directories

- Use **kebab-case**: `user-profile`, `order-history`
- Singular for components: `button`, `card`
- Plural for collections: `users`, `orders`

## Project Structure Rules

1. **Each layer is independent** — Lower layers don't know about upper layers
2. **Index files** — Every folder ships an `index.ts` exposing the public API
3. **No circular dependencies** — Use dependency injection if needed
4. **Keep pages thin** — Business logic belongs in modules/services
5. **Type safety first** — Use TypeScript strictly
6. **Server Components by default** — Use `'use client'` only on leaves that need it

## Comments

Short label-style `//` comments sit above named symbols and expand on the identifier in 1–5 words. Inside components, common labels include `// interface`, `// component`, `// return`, `// constant`, `// function`. Full convention, examples, and anti-patterns live in `references/comments.md`.

## Examples

Canonical file shapes for every layer live in `examples/`. The tree mirrors the canonical `src/` layout, so `cp -r examples/* <project>/src/` (with placeholder substitution) yields a working skeleton. Use the relevant subtree for incremental refactors of an existing project.

**Placeholder conventions:**
- **Identifiers** inside files use angle-bracket notation: `<slice>`, `<Slice>`, `<entity>`, `<Entity>`, `I<Entity>`, `S<Entity>Res`, `T<Entity>Res`. Replace every `<…>` before saving in a real project.
- **File and folder names** with placeholders use double-underscore notation: `__slice__/`, `__slice__.component.tsx`, `__entity__.model.ts`. Rename to the real slice/entity name when copying.
- Files are **shape references, not runnable code** — angle-bracket identifiers are invalid TypeScript. The contract is structural: imports, layer dependencies, signatures, return shapes, comment style.

## Resources

- **`references/comments.md`** — comment-style convention: when to comment, what earns a comment, anti-patterns.
- **`references/pitfalls.md`** — Next.js/Supabase/TanStack pitfalls and the pre-merge verification checklist.
- **`examples/`** — canonical file shapes per layer with `<…>` placeholder identifiers and `__…__` placeholder folders.
