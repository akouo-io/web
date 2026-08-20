# Akouo

A pnpm monorepo: three React apps sharing two packages.

## Layout

```
akouo/
├─ apps/
│  ├─ web/        @akouo/web       Vite + React SPA (authenticated app, no SEO)
│  ├─ desktop/    @akouo/desktop   Electron shell (electron-vite) wrapping React
│  └─ website/    @akouo/website   Next.js marketing site (SSG/SEO)
├─ packages/
│  ├─ ui/         @akouo/ui        Shared React components (consumed by all apps)
│  └─ theme/      @akouo/theme     Design tokens + Tailwind preset
└─ tooling/
   ├─ eslint-config/  @akouo/eslint-config   Shared flat ESLint config
   └─ tsconfig/       @akouo/tsconfig        Shared base tsconfigs
```

## Dependency direction

Dependencies flow **one way only** — nothing points upward:

```
theme  ←  ui  ←  apps
```

- `@akouo/theme` depends on nothing internal.
- `@akouo/ui` depends only on `@akouo/theme`.
- The apps depend on both.

This rule is **enforced by ESLint** (`no-restricted-imports` in the `theme` and
`ui` configs): `theme` may not import `ui` or any app, and `ui` may not import an
app. A violation fails `pnpm lint`.

## Theming

`@akouo/theme` owns the design tokens. The source of truth is
[`packages/theme/akouo-theme.css`](packages/theme/akouo-theme.css) — a Tailwind
v4 token layer (CSS variables under `:root` / `.dark`, exposed as utilities via
its `@theme inline` block). The package exports:

- `@akouo/theme/css` — the token stylesheet, imported once per app.
- `@akouo/theme/preset` — a Tailwind preset that mirrors those token names and
  wires class-based dark mode, which each app's `tailwind.config.ts` extends via
  `presets: [preset]`.

Because every app draws from the same tokens, **changing a token in the CSS
re-skins all three apps** from one place. See
[`apps/web/tailwind.config.ts`](apps/web/tailwind.config.ts) and
[`apps/web/src/index.css`](apps/web/src/index.css) for the wiring.

Dark mode is class-based: the theme toggles on a `.dark` class, and each app's
entry CSS declares the matching `@custom-variant dark`.

## Prerequisites

- Node — see [`.nvmrc`](.nvmrc) (`nvm use`)
- pnpm — pinned via the root `packageManager` field (`corepack enable`)

## Getting started

```bash
pnpm install          # install every workspace from the root
pnpm lint             # ESLint across all workspaces
pnpm typecheck        # tsc --noEmit across all workspaces
```

## Running each app

```bash
pnpm dev:web          # Vite dev server (apps/web)
pnpm dev:desktop      # electron-vite dev (apps/desktop)
pnpm dev:website      # Next.js dev server (apps/website)
```

Production builds:

```bash
pnpm build:web
pnpm build:desktop
pnpm build:website
```

Or target any workspace directly with pnpm filters, e.g.
`pnpm --filter @akouo/web build`.

## Conventions

- **TypeScript** everywhere, extending `@akouo/tsconfig` (`base.json`, or
  `react.json` for anything with JSX).
- **ESLint 9 flat config** — each workspace has an `eslint.config.js` that
  extends `@akouo/eslint-config` (`/react` for apps and `ui`, `/base` for
  `theme` and the repo root).
- The shared packages are consumed as **TypeScript source** (no prebuild step);
  the app bundlers transpile them (`transpilePackages` in Next.js).
