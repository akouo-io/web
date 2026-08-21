# Akouo

A pnpm monorepo: three React apps sharing two packages.

## Layout

```
akouo/
├─ apps/
│  ├─ app/        @akouo/app       Next.js app (authenticated knowledge work)
│  ├─ desktop/    @akouo/desktop   Electron shell (electron-vite) wrapping React
│  └─ website/    @akouo/website   Vite + React SPA — static, hostable on GH Pages
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
[`apps/website/tailwind.config.ts`](apps/website/tailwind.config.ts) and
[`apps/website/src/index.css`](apps/website/src/index.css) for the wiring.

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
pnpm dev:app          # Next.js dev server (apps/app)
pnpm dev:desktop      # electron-vite dev (apps/desktop)
pnpm dev:website      # Vite dev server (apps/website)
```

Production builds:

```bash
pnpm build:app
pnpm build:desktop
pnpm build:website
```

Or target any workspace directly with pnpm filters, e.g.
`pnpm --filter @akouo/app build`.

### Hosting the website on GitHub Pages

`apps/website` is a static Vite SPA — `pnpm build:website` emits plain files to
`apps/website/dist/`, which can be served by any static host. Its Vite `base` is
relative (`"./"`) so it works from a project subpath such as
`https://<org>.github.io/<repo>/`; set `base: "/"` for a custom domain or a
user/org root page. Deploy by publishing `apps/website/dist/` (e.g. an Actions
workflow that runs the build and uploads it as the Pages artifact).

## Documentation

- [Templates](docs/templates.md) — how a template turns a transcript into
  structured, traceable output (summaries, action items, metrics, lists).
- [Export](docs/export.md) — sending structured output to the tools where work
  happens (Jira, Linear, GitHub, Notion).

## Component development (Storybook + Chromatic)

`packages/ui` ships a [Storybook](https://storybook.js.org/) (`@storybook/react-vite`)
whose canvas imports the `@akouo/theme` layer, so stories render with the real
tokens and a light/dark toolbar toggle.

```bash
pnpm --filter @akouo/ui storybook          # dev server on :6006
pnpm --filter @akouo/ui build-storybook    # static build (storybook-static/)
```

Visual review runs on [Chromatic](https://www.chromatic.com/). The
[`.github/workflows/chromatic.yml`](.github/workflows/chromatic.yml) workflow
publishes the `ui` Storybook on every push, authenticating with the
`CHROMATIC_KEY` repository secret. Visual changes don't fail the build
(`exitZeroOnChanges`) — accept or reject them in the Chromatic UI.

## Conventions

- **TypeScript** everywhere, extending `@akouo/tsconfig` (`base.json`, or
  `react.json` for anything with JSX).
- **ESLint 9 flat config** — each workspace has an `eslint.config.js` that
  extends `@akouo/eslint-config` (`/react` for apps and `ui`, `/base` for
  `theme` and the repo root).
- The shared packages are consumed as **TypeScript source** (no prebuild step);
  the app bundlers transpile them (`transpilePackages` in Next.js).
