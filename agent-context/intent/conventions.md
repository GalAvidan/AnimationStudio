# Conventions

## Project Layout

Every animation project is self-contained under `projects/<kebab-case-name>/`:

```
projects/<name>/
  project.config.ts        Single routing source: adapter, variants, video, slug
  package.json             Per-project deps and pnpm scripts (dev, build, lint, render)
  tsconfig.json            Extends @studio/config-tsconfig/base.json
  eslint.config.js         Re-exports @studio/config-eslint
  scripts/
    <variant>.script.md    One narration draft per audience variant
  specs/
    <variant>.spec.md      One creative direction spec per variant
  props/
    <variant>.json         Render props JSON (one per variant)
  assets/
    svg/                   Layered SVG files with conventional IDs
    audio/                 Voiceover, SFX, music stems
    fonts/                 Project-specific font files
  src/
    data/                  Derived timing/copy data (beats-*.ts)
    components/            Reusable visual components
    scenes/                Scene-level components (one per beat group)
    compositions/          Composition entry components (one per variant)
    Root.tsx               Registers compositions; adapter-specific entry
    index.ts               Registers the animation root
  output/                  Rendered artifacts (mp4/mov/webm gitignored, png tracked)
```

## Canonical Naming

- Project folder: `projects/<kebab-case-name>/`
- Script: `projects/<name>/scripts/<variant>.script.md`
- Spec: `projects/<name>/specs/<variant>.spec.md`
- Render props: `projects/<name>/props/<variant>.json`
- Rendered video: `projects/<name>/output/<variant>.mp4`
- Rendered still: `projects/<name>/output/<variant>-<timestamp-or-frame>.png`

Use lowercase kebab-case for project names, e.g. `how-tokens-work`. Do not use `projectN-` prefixes.

## Specs

Specs should include:

- Goal and audience
- Runtime target
- Beat map
- Visual philosophy
- Key moments
- Audio or narration sync points
- Asset notes
- Constraints
- Review checklist

Specs must not include:

- Code
- Component props
- Pixel positions
- Frame numbers
- Low-level implementation details

## Source Code

Each animation project keeps code organized by role:

- `src/Root.tsx` registers compositions.
- `src/index.ts` registers the animation root.
- `src/compositions/` contains composition entry components (one per variant).
- `src/scenes/` contains scene-level components.
- `src/components/` contains reusable visual components.
- `src/data/` contains derived timing or copy data.

## Assets

For SVG and layered assets, use descriptive IDs and layer names:

- Characters: `<character>_<part>_<side>`, e.g. `hero_eye_left`.
- Scenes: `<layer>_<element>_<number>`, e.g. `bg_grid_01`.
- Audio markers: use names that match spec beats, e.g. `product-visible`.

## Package Manager

- Use `pnpm >= 9` exclusively. Never `npm`, `yarn`, or `npx`.
- Run per-project scripts from the repo root: `pnpm --filter ./projects/<name> <script>`.
- Use forward slashes in `project.config.ts` paths, regardless of OS.
- Pass render props via a JSON file on Windows: `--props=./props/<variant>.json`.
