# Storybook + BasicCard Decomposition — Design

**Date:** 2026-04-12
**Status:** Draft (awaiting user approval)
**Scope:** Add Storybook to the project and decompose `src/BasicCard.tsx` into a reusable component library.

## Goals

1. Stand up Storybook 10 in a Bun-only project without disrupting the existing Bun build pipeline.
2. Break the 925-line `src/BasicCard.tsx` monolith into ~15 single-purpose components, each with its own folder, CSS, and stories.
3. Replace the hardcoded Smeargle card content with a flat `ICardData` interface driving every field.
4. Cover the full variant matrix present in the source Figma library (not just what today's code uses).
5. Preserve pixel-identical rendering of the existing `App.tsx` output at every commit.

## Non-goals

- Rewriting the existing absolute-positioned layout into CSS Grid. (Flagged as future work.)
- Converting fixed-artwork card internals to use `light-dark()` dark-mode tokens. (The card is static artwork; dark mode applies only to the Storybook preview background.)
- Adding tests beyond visual parity checks. (No test runner is currently configured.)
- Introducing a backend or card-data persistence layer.
- Deleting unused SVG path constants from `svg-2xxt8uep3y.ts` / `svg-3mfyb.tsx`. These are generated assets; we leave them in place.

## Decisions summary

| # | Decision | Chosen option |
|---|---|---|
| 1 | Storybook runtime/builder | **Storybook 10 + Vite + `@tailwindcss/vite`** (same `src/index.css` feeds both pipelines) |
| 2 | Storybook goal | **Component catalog + full-card playground** (every atom gets stories; `BasicCard` gets rich controls) |
| 3 | `BasicCard` props shape | **Single flat `ICardData` interface** (no `ReactNode` slot escape hatches) |
| 4 | File layout | **One folder per component** (`.tsx` + `.stories.tsx` + `.css` co-located) |
| 5 | CSS strategy | **Split per component + wrap in `@scope`; keep existing BEM class names** |
| 6 | Variant coverage | **Full Figma variant library** (4 attack variants, 3 stage variants, 6 rarity combinations, 4+ regulation letters, radiant species strip) |

---

## 1. Component inventory

15 components total, grouped by catalog depth.

### Primitives (6)

| Name | Replaces | Props |
|---|---|---|
| `TypeBadge` | `Type`, `SmallTypeBadge`, `ResistanceTypeBadge`, `WeaknessTypeBadge` | `type: TypeName` |
| `HpBadge` | `HpBadge` (existing, expanded) | `hp: number`, `type: TypeName` |
| `RegulationMark` | Inline regulation mark block | `mark: "D" \| "E" \| "F" \| "G"` |
| `RarityMark` | Inline rarity dot | `rarity: "common" \| "uncommon" \| "rare"`, `fill: "white" \| "black"` |
| `SetMark` | Inline Silver Tempest mark | `set: string` (extensible enum; today only `"silver-tempest"`) |
| `StagePill` | Inline stage pill + `StageLetter` helper | `stage: "basic" \| "stage-1" \| "stage-2"`, `evolvesFrom?: string`, `evolvesFromPortraitSrc?: string` |

### Molecules (6)

| Name | Replaces | Props |
|---|---|---|
| `AttackEnergy` | `AttackEnergy` (count extended to 1–4) | `count: 1\|2\|3\|4`, `type: TypeName` |
| `Attack` | `Attack` (variants extended per Figma) | `variant: "basic" \| "combo" \| "condition" \| "ability"`, `name`, `description?`, `damage?`, `energyCount?`, `energyType?` |
| `NameHeader` | Inline name + HP row | `name: string`, `hp: number`, `type: TypeName` |
| `BattleBar` | Inline weakness / resistance / retreat row | `weakness: { type, multiplier }`, `resistance?: { type, amount }`, `retreatCost: 0\|1\|2\|3\|4` |
| `SpeciesStrip` | Inline species strip (+ Figma radiant variant) | `variant: "default" \| "radiant"`, `number`, `species`, `category`, `height`, `weight`, `radiantRuleText?` |
| `BottomRow` | Inline bottom row | `regulationMark`, `copyright`, `illustrator`, `rarityShape`, `rarityFill`, `cardNumber`, `flavor`, `setMark` |

### Organisms (2)

| Name | Replaces | Props |
|---|---|---|
| `PortraitFrame` | Inline portrait frame + shadow | `portraitSrc: string` |
| `CardSurface` | Inline `.card__surface` stack (base / bg / overlay / holo / inset-shadow) | `bgSrc: string`, `holoMaskSrc: string` |

### Template (1)

| Name | Replaces | Props |
|---|---|---|
| `BasicCard` | `BasicCard` (existing, prop-ified) | `data?: Partial<ICardData>` (falls back to `SMEARGLE_DATA`) |

### Internal helpers (not exported, no stories)

- `TypeInnerShadow`, `TypeRadialGradient`, `GrassDropShadow` — SVG `<defs>` helpers used by `TypeBadge`.
- `StageLetter` — per-letter SVG renderer used by `StagePill`.

### Key unification note — `TypeBadge`

The current code has four hardcoded badge components at different sizes. The Figma source uses a single `Type` component at 38px with per-type symbol insets (e.g. Normal: `10.53% 15.81%`, Fire: `7.89% 10.53%`, Psychic: `26.32% 28.95% 31.58% 28.95%`). The unified `TypeBadge` adopts the Figma inset model and renders intrinsically at whatever CSS size its container gives it. The existing small-badge SVG paths in `svg-2xxt8uep3y.ts` are no longer referenced but remain in the file.

---

## 2. `ICardData` shape

Canonical data model. Flat where possible; `attacks` is a discriminated-union array; `flavor` is `string[]`.

```typescript
type TypeName =
  | "Normal" | "Fire" | "Water" | "Lightning" | "Fighting"
  | "Psychic" | "Metal" | "Dragon" | "Grass" | "Darkness";

type StageName = "basic" | "stage-1" | "stage-2";
type RegulationLetter = "D" | "E" | "F" | "G";
type RarityShape = "common" | "uncommon" | "rare";
type RarityFill = "white" | "black";
type SpeciesStripVariant = "default" | "radiant";

type IAttackEntry =
  | { variant: "basic";     name: string; damage: string; energyCount: 1|2|3|4; energyType: TypeName }
  | { variant: "combo";     name: string; description: string; damage: string; energyCount: 1|2|3|4; energyType: TypeName }
  | { variant: "condition"; name: string; description: string; energyCount: 1|2|3|4; energyType: TypeName }
  | { variant: "ability";   name: string; description: string };

interface ICardData {
  // Identity
  name: string;
  hp: number;
  type: TypeName;
  stage: StageName;
  evolvesFrom?: string;
  evolvesFromPortraitSrc?: string;

  // Artwork
  portraitSrc: string;
  bgSrc: string;
  holoMaskSrc: string;

  // Moves (attacks + abilities, order preserved)
  attacks: IAttackEntry[];

  // Battle bar
  weaknessType: TypeName;
  weaknessMultiplier: number;
  resistanceType?: TypeName;
  resistanceAmount?: number;
  retreatCost: 0 | 1 | 2 | 3 | 4;

  // Species strip
  speciesStripVariant: SpeciesStripVariant;
  pokedexNumber: number;
  category: string;       // e.g. "Painter Pokémon"
  height: string;         // e.g. "3´11´´"
  weight: string;         // e.g. "127.9 lbs."
  radiantRuleText?: string;

  // Bottom row
  regulationMark: RegulationLetter;
  copyright: string;
  illustrator: string;
  rarityShape: RarityShape;
  rarityFill: RarityFill;
  cardNumber: string;     // e.g. "137/195"
  flavor: string[];
  setMark: string;        // e.g. "silver-tempest"
}
```

**Notes**

- Abilities live inside the `attacks` array with `variant: "ability"`. Keeps card-order semantics (some cards show the ability above the attack, some below) and lets the renderer exhaustively check the discriminated union.
- `BasicCard` exports with signature `BasicCard(props: { data?: Partial<ICardData> })`. When `data` is undefined or partial, missing fields fall back to `SMEARGLE_DATA`. `App.tsx` can continue to render `<BasicCard />` with no props and see the same Smeargle card.

---

## 3. Storybook 10 + Vite + Tailwind v4 wiring

### Dev dependencies

Install via Bun:

```
bun add -D storybook @storybook/react-vite @storybook/addon-docs \
           @storybook/addon-a11y @storybook/addon-themes \
           @tailwindcss/vite vite
```

Storybook 10 folds the old "essentials" bundle into core. Docs, a11y, and themes remain opt-in.

### `.storybook/main.ts`

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/components/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-themes"],
  typescript: { reactDocgen: "react-docgen-typescript" },
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  },
};

export default config;
```

### `.storybook/preview.ts`

```typescript
import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/index.css";  // Tailwind v4 + tokens — single source of truth

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "neutral",
      values: [
        { name: "neutral", value: "#e2e2e2" },
        { name: "dark",    value: "#0b0b0b" },
        { name: "light",   value: "#ffffff" },
      ],
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "dark",
      attributeName: "class",
    }),
  ],
};

export default preview;
```

### `package.json` additions

```json
"scripts": {
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build -o storybook-static"
}
```

### Coexistence with the Bun main app

| Concern | Main app | Storybook |
|---|---|---|
| Bundler | Bun + `bun-plugin-tailwind` | Vite + `@tailwindcss/vite` |
| Entry | `src/index.html` → `frontend.tsx` | `**/*.stories.tsx` |
| Tailwind source | `src/index.css` | `src/index.css` (same file) |
| Dev port | 3000 | 6006 |

Both pipelines consume the same `src/index.css`. No config drift.

**Install wizard skipped.** `bunx storybook init` doesn't know about Bun or Tailwind v4 and would add conflicting configs. We create the files above by hand. Storybook itself runs fine under Bun (`bun storybook`).

---

## 4. CSS `@scope` split

### What moves where

Each BEM block moves to its owning component's `.css` file, wrapped in `@scope`:

```
TypeBadge.css       → @scope (.type)                { .type__ring, .type__symbol, … }
HpBadge.css         → @scope (.card__hpBadge)       { .card__hpBadgeBase, HP text, symbol }
RegulationMark.css  → @scope (.card__regulationMark) { base + letter }
RarityMark.css      → @scope (.card__rarity)         { shape variants }
SetMark.css         → @scope (.card__setMark)        { inner + svg }
StagePill.css       → @scope (.card__stage)          { shadow, letters, evolves-from }
AttackEnergy.css    → @scope (.attackEnergy)         { slot layout }
Attack.css          → @scope (.attack)               { name, description, damage, energy }
NameHeader.css      → @scope (.card__hpType)         { name + hp group }
BattleBar.css       → @scope (.card__battleBar)      { weakness, resistance, retreat }
SpeciesStrip.css    → @scope (.card__speciesStrip)   { strip + text rows + radiant }
BottomRow.css       → @scope (.card__bottom)         { copyright, illustrator, flavor, etc }
PortraitFrame.css   → @scope (.card__portraitFrame)  { frame + shadow + portrait slot }
CardSurface.css     → @scope (.card__surface)        { base, bg, overlay, holo, inset-shadow }
```

### Example — `TypeBadge.css`

```css
@reference "../../../index.css";

@scope (.type) {
  :scope {
    position: relative;
    block-size: 100%;
    inline-size: 100%;
  }

  .type__ring            { /* moved unchanged from BasicCard.css */ }
  .type__symbol          { /* moved unchanged */ }
  .type__symbolGrassShadow { /* moved unchanged */ }
  .type__psychicExtra    { /* moved unchanged */ }
}
```

### What stays in `BasicCard.css`

Only the root artboard + slot-positioning rules. Internal styling is gone. New file length: ~120 lines (down from 659).

```css
@reference "./index.css";

@scope (.card) {
  :scope {
    aspect-ratio: 733 / 1024;
    container-type: inline-size;    /* enables @container queries in children */
    position: relative;
    /* … fixed artboard sizing */
  }

  /* Slot positioning — where each sub-component sits on the 733×1024 artboard */
  .card__border, .card__surface, .card__portraitSlot, .card__portraitFrame,
  .card__hpType, .card__stage, .card__name, .card__speciesStrip,
  .card__attackFrame, .card__battleBar, .card__bottom {
    /* percent-based insets stay as today */
  }
}
```

### Import flow

- Each component's `.tsx` imports its own `.css`.
- `BasicCard.tsx` imports the 14 sub-components (which transitively import their CSS) plus `BasicCard.css`.
- Storybook's `preview.ts` imports `src/index.css` once globally.
- Vite de-dupes; no double-loading.

### `@reference` depth

Components are 3 levels deep under `src/`: `src/components/card/<Name>/<Name>.css` → `@reference "../../../index.css"`.

### Future work (not in scope)

- Layout migration from percent-absolute to CSS Grid with `grid-template-areas`.
- `light-dark()` tokens — N/A for card artwork.

---

## 5. Folder layout

```
src/
  components/
    card/
      types.ts                # TypeName, StageName, IAttackEntry, ICardData, etc.
      type-config.ts          # TYPE_CONFIG + SVG def helpers
      smeargle.ts             # default ICardData for fallback + stories
      TypeBadge/
        TypeBadge.tsx
        TypeBadge.stories.tsx
        TypeBadge.css
      HpBadge/                { .tsx, .stories.tsx, .css }
      RegulationMark/         { .tsx, .stories.tsx, .css }
      RarityMark/             { .tsx, .stories.tsx, .css }
      SetMark/                { .tsx, .stories.tsx, .css }
      StagePill/
        StagePill.tsx
        StagePill.stories.tsx
        StagePill.css
        StageLetter.tsx       # internal helper, not exported
      AttackEnergy/           { .tsx, .stories.tsx, .css }
      Attack/                 { .tsx, .stories.tsx, .css }
      NameHeader/             { .tsx, .stories.tsx, .css }
      BattleBar/              { .tsx, .stories.tsx, .css }
      SpeciesStrip/           { .tsx, .stories.tsx, .css }
      BottomRow/              { .tsx, .stories.tsx, .css }
      PortraitFrame/          { .tsx, .stories.tsx, .css }
      CardSurface/            { .tsx, .stories.tsx, .css }
      BasicCard/
        BasicCard.tsx
        BasicCard.stories.tsx
        BasicCard.css
  index.css                   # unchanged
  App.tsx                     # import path updated only
  frontend.tsx                # unchanged
  assets/                     # unchanged
.storybook/
  main.ts
  preview.ts
svg-2xxt8uep3y.ts             # unchanged (generated assets stay at repo root)
svg-3mfyb.tsx                 # unchanged
```

At the end of migration, old `src/BasicCard.tsx` and `src/BasicCard.css` are deleted.

---

## 6. Story structure per component

### Title convention

- Primitives: `Card/Primitives/<Name>`
- Molecules: `Card/Molecules/<Name>`
- Organisms: `Card/Organisms/<Name>`
- Template: `Card/BasicCard`

### Every component file contains

1. A `Playground` story with all props exposed as Storybook controls.
2. One named story per meaningful variant.
3. An `AllVariants` story for side-by-side comparison, where applicable.
4. Autodocs (via `@storybook/addon-docs`) generated from TSDoc + `argTypes`.

### Example — `TypeBadge.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TypeBadge } from "./TypeBadge";
import { TYPE_NAMES } from "../types";

const meta = {
  title: "Card/Primitives/TypeBadge",
  component: TypeBadge,
  parameters: { layout: "centered" },
  argTypes: { type: { control: "select", options: TYPE_NAMES } },
  args: { type: "Normal" },
  decorators: [
    (Story) => <div style={{ inlineSize: "3rem", aspectRatio: 1 }}><Story /></div>,
  ],
} satisfies Meta<typeof TypeBadge>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};

export const AllTypes: S = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 3rem)", gap: "1rem" }}>
      {TYPE_NAMES.map((t) => <TypeBadge key={t} type={t} />)}
    </div>
  ),
};

export const Normal:    S = { args: { type: "Normal" } };
export const Fire:      S = { args: { type: "Fire" } };
// …all 10 types
```

### Example — `BasicCard.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BasicCard } from "./BasicCard";
import { SMEARGLE_DATA } from "../smeargle";
import { TYPE_NAMES } from "../types";

const meta = {
  title: "Card/BasicCard",
  component: BasicCard,
  parameters: { layout: "centered" },
  args: SMEARGLE_DATA,
  argTypes: {
    type: { control: "select", options: TYPE_NAMES },
    stage: { control: "radio", options: ["basic", "stage-1", "stage-2"] },
    weaknessType: { control: "select", options: TYPE_NAMES },
    resistanceType: { control: "select", options: TYPE_NAMES },
    retreatCost: { control: { type: "range", min: 0, max: 4, step: 1 } },
    rarityShape: { control: "radio", options: ["common", "uncommon", "rare"] },
    rarityFill: { control: "radio", options: ["white", "black"] },
    regulationMark: { control: "select", options: ["D", "E", "F", "G"] },
    speciesStripVariant: { control: "radio", options: ["default", "radiant"] },
    flavor: { control: "object" },
    attacks: { control: "object" },
  },
} satisfies Meta<typeof BasicCard>;

export default meta;
type S = StoryObj<typeof meta>;

export const Smeargle:    S = {};
export const FireStarter: S = { args: { ...SMEARGLE_DATA, name: "Charmander", type: "Fire", hp: 70, weaknessType: "Water" } };
export const Radiant:     S = { args: { ...SMEARGLE_DATA, speciesStripVariant: "radiant", radiantRuleText: "You can't have more than 1 Radiant Pokémon in your deck." } };
export const Stage2:      S = { args: { ...SMEARGLE_DATA, stage: "stage-2", evolvesFrom: "Squirtle" } };
```

### Story count estimate (~60 total)

| Component | Stories |
|---|---|
| TypeBadge | 12 (Playground, AllTypes, 10 type variants) |
| Attack | 5 (Playground + 4 variants) |
| StagePill | 4 (Playground + 3 stages) |
| RarityMark | 7 (Playground + 6 combinations) |
| RegulationMark | 5 (Playground + 4 letters) |
| AttackEnergy | 6 (Playground + 4 counts + AllCounts) |
| BattleBar | 3 (Playground, WithResistance, NoResistance) |
| SpeciesStrip | 3 (Playground, Default, Radiant) |
| HpBadge, NameHeader, SetMark, BottomRow, PortraitFrame, CardSurface | ~2 each (Playground + default) |
| BasicCard | 4+ (Smeargle, FireStarter, Radiant, Stage2) |

---

## 7. Migration plan (visual parity at every step)

Bottom-up extraction. Each step leaves `App.tsx` rendering an identical card.

### Step 0 — Baseline screenshot

Before any code changes: screenshot `bun dev` output (via Chrome DevTools MCP or manual) and save as `debug-screenshots/baseline-pre-storybook.png`. Every subsequent step compares against this.

### Step 1 — Storybook scaffold (no component changes)

- `bun add -D` the Storybook + Vite + Tailwind deps
- Create `.storybook/main.ts`, `.storybook/preview.ts`
- Add `storybook` / `build-storybook` scripts
- `bun storybook` opens at :6006 with zero stories
- `bun dev` and `bun run build` unchanged
- **Commit**

### Step 2 — Shared files (no UI changes)

- Create `src/components/card/types.ts`
- Create `src/components/card/type-config.ts` (move `TYPE_CONFIG` + `TypeInnerShadow` + `TypeRadialGradient` + `GrassDropShadow` from old `BasicCard.tsx`)
- Create `src/components/card/smeargle.ts` (extract current hardcoded Smeargle strings into an `ICardData` const)
- Old `BasicCard.tsx` imports `TYPE_CONFIG` from the new location
- `bunx tsc --noEmit` clean; visual diff still matches
- **Commit**

### Step 3 — Extract components bottom-up (one commit per component, 14 commits)

Order:

1. `TypeBadge/` (replaces 4 inline badge variants; adopts Figma per-type inset model)
2. `HpBadge/`
3. `RegulationMark/`
4. `RarityMark/`
5. `SetMark/`
6. `StagePill/` (with internal `StageLetter.tsx`)
7. `AttackEnergy/` (depends on TypeBadge)
8. `Attack/` (depends on AttackEnergy)
9. `NameHeader/` (depends on HpBadge)
10. `BattleBar/` (depends on TypeBadge)
11. `SpeciesStrip/`
12. `BottomRow/` (depends on RegulationMark, RarityMark, SetMark)
13. `PortraitFrame/`
14. `CardSurface/`

For each:

- Create folder with `<Name>.tsx` + `<Name>.css` + `<Name>.stories.tsx`
- Move JSX block from old `BasicCard.tsx` to `<Name>.tsx`
- Move corresponding CSS rules from old `BasicCard.css` to `<Name>.css`, wrapped in `@scope`
- Update old `BasicCard.tsx` to import and compose the new component
- Add full story set (Playground + variants + AllVariants)
- Visual diff: `bun dev` screenshot vs baseline — must match
- `bun storybook` — new story renders correctly in isolation
- **Commit**

### Step 4 — BasicCard move + prop-ification

- Create `src/components/card/BasicCard/BasicCard.tsx` with signature `BasicCard(props: { data?: Partial<ICardData> })`
- Move composition root from old `src/BasicCard.tsx`
- Copy remaining layout-only CSS (~120 lines) to `BasicCard/BasicCard.css`
- Update `src/App.tsx` import path
- Delete old `src/BasicCard.tsx` and `src/BasicCard.css`
- Add `BasicCard.stories.tsx` (Smeargle / FireStarter / Radiant / Stage2)
- Visual diff: final match against baseline
- **Commit**

### Step 5 — Lock-in verification

- `bunx tsc --noEmit` — zero errors
- `bun run build` — clean `dist/`
- `bun storybook` — all stories render
- `bun run build-storybook` — clean `storybook-static/`
- Final screenshot diff
- **Commit** (final "done" marker)

### Rollback plan

Every step leaves a working tree. If step N breaks visual parity, revert that commit only and re-extract with a smaller diff.

---

## 8. Risks & open questions

- **TypeBadge unification drift** — the Figma source uses per-type symbol insets, the current code uses full-fill + per-type viewBox. Both render identically at the same container size *in theory*; ≤1px shift is possible in practice. Caught by the visual-diff check; if it occurs, we keep the viewBox model instead.
- **CSS specificity inside `@scope`** — scope proximity can break ties when a rule sits outside any scope. If a Tailwind utility stops winning over a scoped rule, wrap the utility in `@layer utilities`. Unlikely to hit.
- **Unused SVG paths** — after extraction, some path constants in `svg-2xxt8uep3y.ts` become unreferenced. We leave them in place (generated assets).
- **No test runner** — verification is manual (typecheck + build + visual diff). Adding `bun:test` is out of scope.
- **Storybook 10 addon API churn** — v10 is recent; `@storybook/addon-themes` and `@storybook/addon-a11y` APIs may have shifted. If install-time versions differ from this spec, adapt to whatever the current docs show.

## 9. Future work (explicit non-goals, noted for later)

- Migrate card layout from percent-absolute to CSS Grid with `grid-template-areas`.
- Replace BEM class names with `@scope`-native names (drop `card__*` prefixes).
- Load Pokémon card data from JSON instead of inline TypeScript consts.
- Chromatic or Playwright-based visual regression test suite.
- Add `bun:test` unit tests for pure helpers (type-config lookups, discriminated-union narrowing).
