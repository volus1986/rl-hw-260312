# Pitfalls & verification

Grounded in this repo's stack: Next.js App Router + Supabase SSR + TanStack Query + Ky + Zustand + next-intl + Shadcn.

## Common mistakes

**Upward layer imports.** A feature importing a widget, an entity importing a feature, or a module importing another module's barrel are all upward/sideways imports. Lift the shared symbol down: shared types into `shared/interfaces/`, shared logic into `shared/utils/` or a feature, shared persistence into `entities/`.

**Direct `process.env` outside `src/config/env/`.** Read env vars only through `envClient` / `envServer` from `@/config/env`. Adding a new var means updating the Zod schema in `env.client.ts` or `env.server.ts` *and* `.env.example`. References to `process.env.X` elsewhere bypass the build-time validation.

**Mixing browser and server Supabase clients.** `@/pkg/supabase/client.ts` (`createBrowserClient`) is for client components only. Server components, route handlers, and `proxy.ts` must use the server client from `@/pkg/supabase/server.ts`. Importing the browser client in server code leaks `NEXT_PUBLIC_*` paths into RSC and breaks cookie-based auth.

**`'use client'` on a layout or page that doesn't need it.** Default to RSC. Mark `'use client'` only on the leaf that actually uses hooks/state. The root layout in `(web)/[locale]/layout.tsx` stays async-RSC; client providers wrap children.

**Forgetting `'use server'` in a server-action `*.api.ts`.** Server actions in `entities/api/<slice>/<slice>.api.ts` (e.g. sign-up, sign-in) must declare `'use server'` at the top of the file. Otherwise the function bundles into the client and any server-only secret it reads (`envServer.JWT_SECRET`, `headers()`, etc.) fails at runtime.

**Reading auth/session via Zustand on the server.** Persisted Zustand stores live in `localStorage` — they exist only in the browser. For SSR auth checks, use the Supabase server client. Zustand is for UI/profile state hydrated after the user is already known.

**Bypassing `@/pkg/locale` for navigation.** Use `Link`, `usePathname`, `useRouter` re-exported from `@/pkg/locale`, not the raw `next/link` / `next/navigation`. Bare imports skip the `[locale]` prefix and break locale routing.

**Hard-coded UI strings.** All visible strings go through `useTranslations(...)` keyed against `translations/*.json`. Inline strings won't translate and won't appear in the locale switcher.

**Missing `index.ts` barrel.** Every slice and segment ships an `index.ts`. Consumers import from the folder, not the file. Direct file imports become refactor risk later.

**TanStack Query: weak query setup.** Pass `signal` from the query function into the fetcher (Ky honours it). Set an explicit `staleTime`. Include every input in the query key (`['photos', page, limit]`, not `['photos']`). Co-locate `queryOptions` and the hook in `*.query.ts`.

**Mutations without invalidation.** A `useMutation` that succeeds but doesn't call `queryClient.invalidateQueries({ queryKey: [...] })` leaves the list view stale. Wire invalidation in `onSuccess` (or via `mutationOptions`) for every affected key.

**Zod schemas outside `entities/models/`.** Form and response schemas belong in `entities/models/<name>.model.ts`, exported as `S<Name>` (schema) and `T<Name>` (inferred type). Schemas inside components duplicate types and drift from the API.

**Business logic in `*.component.tsx`.** Module/widget components orchestrate; they don't compute. Move side-effectful or branching logic to `*.service.ts` and import it.

**`proxy.ts` cookie loss.** The middleware runs both `updateSession` (Supabase) and `intlMiddleware`, then merges cookies. Returning either response without merging drops the other set — auth or locale silently breaks. Keep the `mergeCookies(supabaseResponse, intlResponse)` step.

**Server-only var declared as `NEXT_PUBLIC_*`.** Anything in `env.client.ts` ships to the browser bundle. Secrets (JWT, service-role key, salt) must live in `env.server.ts` and never be referenced from a client component.

**Mixed concerns in `shared/`.** A util that calls a service is no longer a util. Network-touching code goes into `entities/` or a feature. A constant file that imports runtime code is not a constant — split it.

**Putting third-party adapters in `shared/`.** SDK wrappers (Supabase, Ky, Shadcn, next-intl) live in `pkg/`. `shared/` is for in-repo reusables.

## Verification checklist

Before declaring work done, confirm (run all yarn commands from `apps/client/`):

**Build & lint**
- [ ] `yarn type-check` passes.
- [ ] `yarn lint` passes (or `yarn format` end-to-end: type-check → lint → prettier).
- [ ] `yarn build` succeeds — `@t3-oss/env-nextjs` validates env at build time; missing or mistyped vars fail here.
- [ ] `yarn dev` boots; locale routes (`/en`, `/uk`) work; theme toggle works; auth flow (sign-up → cookie set → reload preserves session) works.
- [ ] `yarn test` (Playwright) passes for affected flows.

**Layer discipline**
- [ ] Every new folder has an `index.ts` barrel.
- [ ] Imports flow only downward. Spot-check: `grep -R "from '@/app/modules" apps/client/src/app/modules` returns nothing — modules don't import other modules.
- [ ] Env discipline: `grep -RE "process\\.env\\." apps/client/src/app apps/client/src/pkg` returns nothing (only `apps/client/src/config/env/` may reference `process.env`).
- [ ] No `'use client'` on the root `(web)/[locale]/layout.tsx`.
- [ ] Filenames use the layer's suffix: `*.component.tsx`, `*.service.ts`, `*.store.ts`, `*.hook.tsx`, `*.api.ts`, `*.query.ts`, `*.mutation.ts`, `*.model.ts`, `*.interface.ts`, `*.constant.ts`, `*.util.ts`, `*.provider.tsx`.
- [ ] Directories are kebab-case.

**For a new entity API slice**
- [ ] `*.api.ts` + (`*.query.ts` and/or `*.mutation.ts`) + `index.ts` present.
- [ ] Query function takes `{ signal }` and forwards it to Ky.
- [ ] Query key includes every input param.
- [ ] `staleTime` set explicitly.
- [ ] Mutations invalidate every affected query key in `onSuccess`.
- [ ] Server-action `*.api.ts` files start with `'use server'`.

**For a new module**
- [ ] Root `<slice>.component.tsx` is thin (data wiring + rendering); logic in `<slice>.service.ts`.
- [ ] Types in `<slice>.interface.ts`, constants in `<slice>.constant.ts`.
- [ ] Local sub-components live under `elements/<element>/`.

**For a new Zod schema**
- [ ] Lives in `entities/models/<name>.model.ts`.
- [ ] Exports `S<Name>` (schema) and `T<Name>` (inferred type).
- [ ] Re-exported from `entities/models/index.ts`.

**Configuration**
- [ ] Every new env var is in the Zod schema in `src/config/env/env.client.ts` or `env.server.ts` and listed in `.env.example`.
- [ ] No `process.env.X` reads outside `src/config/env/`.
- [ ] Server-only secrets are in `env.server.ts`, not `env.client.ts`.
