# rl-hw-260312

## Environment Requirements

- Node `>=24.11.1`
- Yarn `1.22.22` (pinned via `packageManager` and Volta in [apps/client/package.json](apps/client/package.json))

## Build and Test

Run all yarn commands from `apps/client/` — there is no root `package.json`.

```bash
yarn dev         # Start dev server (Next.js with Turbo)
yarn build       # Production build
yarn start       # Run the production build
yarn lint        # ESLint --fix on src/**/*.{js,jsx,ts,tsx}
yarn prettier    # Prettier --write on src/**/*.{js,jsx,ts,tsx,css,scss}
yarn type-check  # tsc --noEmit
yarn format      # type-check → lint → prettier (in this order)
yarn test        # Playwright E2E tests
```

## Code Style

- 2-space indentation
- Prefer ES modules over CommonJS
- All code and comments in English

## Architecture

This is a Next.js (App Router) application with TypeScript, living in `apps/client/`. All paths below are relative to `apps/client/`.

Layer structure, import rules, and file/directory naming conventions — see the `architecture` skill.

### Key architectural decisions

**Auth** — Supabase SSR via `@supabase/ssr`. Sessions are cookie-based. The middleware in `src/proxy.ts` handles session refresh. Server and browser Supabase clients are in `src/pkg/supabase/`.

**Data fetching** — Ky HTTP client (`src/pkg/rest-api/`) wrapped in TanStack Query hooks in `src/app/entities/api/`. External data comes from JSONPlaceholder; auth goes to Supabase.

**State** — Zustand (`src/app/shared/store/`) for persistent global state (user profile). React Hook Form + Zod for all form validation.

**i18n** — `next-intl` with locale-based routing. Translation files live in `translations/*.json`. All routes under `(web)/[locale]/`.

**UI** — Shadcn/ui components in `src/pkg/shadcn/ui/components/`. Tailwind CSS 4 for styling. `next-themes` for light/dark mode.

### Environment variables

`src/config/env/` validates all environment variables at build time via Zod (`@t3-oss/env-nextjs`). Add new env vars there before using them — referencing `process.env.X` directly will not work.

## Repository Etiquette

- Branch names: `feat/`, `fix/`, `chore/` prefix
- Commit messages: imperative, under 72 chars
