# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager and runtime: **Bun** (no Node/npm/pnpm). Tailwind v4 is wired via `bun-plugin-tailwind` (see `bunfig.toml`), not a PostCSS config.

```bash
bun install                      # install deps
bun dev                          # dev server with --hot (HMR + browser console echo)
bun start                        # NODE_ENV=production bun src/index.ts
bun run build                    # build.ts → dist/ (scans src/**/*.html as entrypoints)
bunx tsc --noEmit                # typecheck (tsconfig has noEmit: true)
```

There is no test runner configured and no lint script. If asked to add tests, use the built-in `bun:test` runner.

## Architecture

Bun-native full-stack single-page app. The server and the client bundle share one entry: `src/index.ts` serves the HTML, and Bun's bundler transforms the `<script type="module" src="./frontend.tsx">` tag inside `src/index.html` on demand.

**Request flow**
- `src/index.ts` — `Bun.serve({ routes })`. `"/*"` returns `import index from "./index.html"` (Bun HTML import, handled by the bundler); `/api/hello` and `/api/hello/:name` are inline route handlers. `development.hmr` and `development.console` are enabled only when `NODE_ENV !== "production"`.
- `src/index.html` → `src/frontend.tsx` → `createRoot(#root).render(<App />)` with HMR root preservation via `import.meta.hot.data.root`.
- `build.ts` — production build. Globs `src/**/*.html` as entrypoints, emits to `dist/` with minify + linked sourcemaps, injects `process.env.NODE_ENV === "production"`.

**UI layer**
- `src/App.tsx` renders a single `<BasicCard />` inside a fixed `733 × 1024` container (the Figma artboard size).
- `src/BasicCard.tsx` is a ~925-line self-contained Pokémon card component. The important architectural fact is that the card is composed almost entirely of inline `<svg>` elements whose path data lives in two auto-generated sibling files at the repo root:
  - `svg-2xxt8uep3y.ts` — default export is a dictionary of named SVG `d` strings (e.g. `svgPaths.p19630400`).
  - `svg-3mfyb.tsx` — named exports of embedded image/data URLs (e.g. `imgRectangle12` used as a CSS `mask-image`).
  The filenames are hashed-looking but intentional imports; treat them as generated assets. Do not rename without updating every import in `BasicCard.tsx`.
- The nine Pokémon energy types are a closed union `TypeName` driven by a single `TYPE_CONFIG: Record<TypeName, ITypeConfig>` table. Each entry declares `baseFill`, `gradientTransform`, gradient `stops`, `symbolPath`, `symbolViewBox`, and the two special-case flags `isGrass` / `isPsychic`. To add/modify a type, edit that table — never fork the `Type` component.
- `src/BasicCard.css` uses Tailwind v4 `@reference "./index.css"` plus `@apply`, and encodes the Figma node's percentage-based inset layout (the 733×1024 artboard is the source of truth, all positions are `%` of that). Classes follow BEM-style names (`card__border`, `card__surface`, `type__symbol`, `attack__name`, …).
- `src/index.css` imports Tailwind v4 and defines the shadcn-style token set (`--background`, `--foreground`, `--primary`, …) with `light` defaults and a `.dark` override, then re-exports them through `@theme inline` so utilities like `bg-background` work.
- `src/assets/imgBg.png` and `imgPortraitImage.png` are imported as static URLs (Bun returns the hashed path).

## Conventions specific to this repo

- Tailwind v4 only — there is no `tailwind.config.{ts,js}`. Design tokens live in CSS via `@theme` / `:root`.
- Component-scoped CSS files use `@reference "./index.css"` so `@apply` can resolve Tailwind utilities. Preserve this directive when adding new component stylesheets.
- Percentages and logical properties (`inset-block-*`, `inset-inline-*`, `block-size`, `inline-size`) are used throughout `BasicCard.css` to stay fluid to the container. Keep that style when extending the card.
- `debug-screenshots/` holds one-off renders from prior iterations — safe to ignore, not part of the build.

## HoverTilt integration

`hover-tilt` (v1.x) is a dependency. It ships primarily as a **Svelte 5** component — in this React codebase, use the **Web Component** entry so no Svelte runtime is pulled in:

```tsx
import "hover-tilt/web-component";   // side-effect import, registers <hover-tilt>

<hover-tilt tilt-factor="1.5" scale-factor="1.1">
  <BasicCard />
</hover-tilt>
```

Notes:
- The side-effect import must run once (e.g. in `src/frontend.tsx` or alongside the component that uses it). Do not import from the package root (`from "hover-tilt"`) — that is the Svelte entry.
- Attribute names on the custom element are **kebab-case** (`tilt-factor`, `scale-factor`), not camelCase.
- For TypeScript JSX, `<hover-tilt>` is an unknown intrinsic element. If type errors appear, add a declaration augmenting `JSX.IntrinsicElements` with `"hover-tilt"` in a `.d.ts` file.
- The card has a fixed `733 × 1024` container in `App.tsx`; wrap that container (or an ancestor of it) with `<hover-tilt>` so the tilt transform applies to the whole card surface.
