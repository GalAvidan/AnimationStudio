# Skill: Theme Collection

## Purpose

Scaffold and maintain consistent design-token packages for theme collections. A theme collection groups related animation projects under a shared `_theme/` package that exports `palette` and `fonts` constants. This skill defines what a valid theme package must contain and how agents should scaffold or update one.

## Rules

- A theme collection lives at `{projects}/<collection>/` and contains a `_theme/` sub-package.
- The theme package name is always `@studio/theme-<collection>`.
- `_theme/` must export a `palette` constant and a `fonts` constant from `src/index.ts`.
- Every project in the collection adds `@studio/theme-<collection>` as a dependency in its `package.json`.
- Do not create a `_theme/` package if one already exists — reuse and extend it.
- Collection slugs must be kebab-case matching `^[a-z][a-z0-9-]*$`.

## Required Files for a New Theme Package

```
{projects}/<collection>/_theme/
├── package.json          name: "@studio/theme-<collection>"; scripts: { build }; main: "dist/index.js"
├── tsconfig.json         extends: "@studio/config-tsconfig/base.json"
└── src/
    └── index.ts          exports palette and fonts constants
```

### `src/index.ts` shape

```typescript
export const palette = {
  background: "#000000",
  primary: "#ffffff",
  accent: "#0066ff",
  // add collection-specific tokens here
} as const;

export const fonts = {
  heading: "Inter",
  body: "Inter",
  mono: "JetBrains Mono",
  // add collection-specific fonts here
} as const;
```

## Defaults

- Background: `#000000` (dark default — override per collection)
- Primary: `#ffffff`
- Accent: `#0066ff`
- Heading font: `Inter`
- Body font: `Inter`
- Mono font: `JetBrains Mono`

Change any default when the collection's visual identity requires it. Document the rationale in a comment inside `src/index.ts`.

## Palette Viewer Compatibility

To support visual palette review in project previews, a collection theme package
may also export additional named palettes in a `paletteSets` array:

```typescript
import type { PaletteSet } from "@studio/spec-types";

export const paletteSets: PaletteSet[] = [
  {
    id: "clean-light",
    label: "Clean Light",
    tokens: {
      background: "#f5f7fb",
      surface: "#ffffff",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      accent: "#0f766e",
      accentText: "#ecfeff",
    },
  },
];
```

Projects can then mirror these values into `src/data/palettes.ts` or directly
re-export them as their `paletteSource` contract.

## Failure Modes

| Condition | Action |
|---|---|
| `_theme/` already exists | Reuse — do not overwrite. Add missing tokens only. |
| Invalid collection slug | Stop and report. |
| `palette` or `fonts` export missing from existing package | Add the missing export; do not remove existing tokens. |
