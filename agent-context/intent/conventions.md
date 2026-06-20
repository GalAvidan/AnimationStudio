# Conventions

## Project Layout

Every animation project is self-contained under `{projects}/<kebab-case-name>/`:

```
{projects}/<name>/
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
    audio/                 Voiceover, SFX, music stems (manually placed assets)
    fonts/                 Project-specific font files
  audio/                   Generated audio pipeline artifacts
    plan.json              Authored voice profiles + music moods (version-controlled)
    narration/             TTS-generated WAV clips per beat (gitignored)
    alignment/             Word-timing JSON per beat from forced alignment (gitignored)
    music/                 Selected/downloaded music beds (gitignored)
    sfx/                   Selected/downloaded SFX clips (gitignored)
    compiled.timeline.json Merged audio timeline consumed by the composition (gitignored)
  src/
    data/                  Derived timing/copy data (beats-*.ts)
    components/            Reusable visual components
    scenes/                Scene-level components (one per beat group)
    compositions/          Composition entry components (one per variant)
    Root.tsx               Registers compositions; adapter-specific entry
    index.ts               Registers the animation root
  output/                  Rendered artifacts (mp4/mov/webm gitignored, png tracked)
```

The `audio/` folder is **optional** — projects without narration do not need it. When it exists, `audio/plan.json` is the only file that is committed; all generated files are excluded via `.gitignore`.

## Canonical Naming

- Project folder: `{projects}/<kebab-case-name>/`
- Script: `{projects}/<name>/scripts/<variant>.script.md`
- Spec: `{projects}/<name>/specs/<variant>.spec.md`
- Render props: `{projects}/<name>/props/<variant>.json`
- Rendered video: `{projects}/<name>/output/<variant>.mp4`
- Rendered still: `{projects}/<name>/output/<variant>-<timestamp-or-frame>.png`

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

## Narrative Fields (optional)

For projects with named characters and dialogue, three fields are available:

- **`Beat.speaker`** — character id (kebab-case) delivering the narration line. Must match a `ProjectConfig.characters[].id` and a row in the spec's Cast table. Omit for narrator.
- **`Beat.emotion`** — free-form tag (e.g. `curious`, `worried`, `surprised`). Authoring intent only — no runtime behavior. Adapters with a rig + presets system map this name 1:1 to a preset (Motion Canvas: scene-author calls `character.applyPreset(beat.emotion)`).
- **`ProjectConfig.characters`** — the cast: `{ id, label, rigAsset? }`. Empty/omitted is fine.

Scene transitions are expressed in scripts as a prose marker:

```
[TRANSITION: fade 400ms]
```

There is no typed `SceneTransition` field on `Scene` yet — the marker is read by the agent writing scene code, who translates it to the adapter's transition primitive (Motion Canvas: `fadeTransition(400)`). A typed field will land when ≥2 transition kinds or ≥2 projects need it.

## Source Code

Each animation project keeps code organized by role:

- `src/Root.tsx` registers compositions.
- `src/index.ts` registers the animation root.
- `src/compositions/` contains composition entry components (one per variant).
- `src/scenes/` contains scene-level components.
- `src/components/` contains reusable visual components.
- `src/data/` contains derived timing or copy data.

## Palette Preview Data

Projects that support visual palette review should keep a canonical palette source
at `src/data/palettes.ts` and wire the path in `project.config.ts`:

```ts
paletteSource: {
  sourcePath: "src/data/palettes.ts",
  defaultPaletteId: "clean-light",
}
```

`src/data/palettes.ts` should export one or more `PaletteSet` objects with
semantic token keys (`background`, `surface`, `textPrimary`, `textSecondary`,
`accent`, `accentText`). Keep values in hex format for consistency.

When present, add a dedicated preview composition/scene (for example
`ProjectNamePalettePreview`) so reviewers can validate color direction before
rendering a full video.

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
