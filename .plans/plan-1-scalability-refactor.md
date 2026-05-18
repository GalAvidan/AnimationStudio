# Plan 1: Clean-Slate Scalability Refactor - Project Self-Containment + Shared Brain

**TL;DR** - Reset the repo around two clean domains: the shared agentic brain at the root (`agent-context/`, `packages/`) and self-contained project units under `projects/<name>/`. Existing example projects, root-level scripts/specs/assets/output, and overly project-specific skills can be deleted instead of preserved. This creates a clean scalable baseline before Plan 2 adds renderer independence.

---

## Intent

This is a clean-slate refactor, not a legacy migration.

Remove the old active workflow surface:

- root `scripts/`
- root `specs/`
- root `assets/`
- root `output/`
- existing example projects under `projects/`
- project-specific or Remotion-specific skills that encode old assumptions

Rebuild around:

- shared agent context in `agent-context/`
- shared TypeScript packages in `packages/`
- one reusable project template in `projects/_template/`
- generated projects in `projects/<project-name>/`

No `projects/_legacy/` folder is needed.

---

## Decisions

- **First adapter:** `remotion`. The first `projects/_template/` is Remotion-based and uses direct per-project Remotion dependencies. Plan 1 does not create a Remotion adapter package. Plan 2 introduces additional adapters (Motion Canvas, Three.js, in-house).
- **`adapter-contract` scope in Plan 1:** Plan 1 creates `packages/adapter-contract/` only as a compatibility shim that re-exports `AdapterName` from `@studio/spec-types` and defines the lightweight registry metadata type `RenderAdapterMetadata`. The full runtime `RenderAdapter` interface is deferred to Plan 2.
- **Template workspace behavior:** `projects/_template/` is excluded from the pnpm workspace via negation; it is a scaffolding source, not an installable package. Keep runnable scripts in its `package.json` because generated projects inherit them.
- **Shared assets:** start with per-project asset duplication; extract `packages/shared-assets/` only after at least three projects share the same source assets.
- **Reference preservation:** archive the meta workflow narrative from the old `animation-studio-explained` project into `references/legacy-workflow-explainer.md` before deletion. Other legacy spec/script content is discarded.

---

## Tooling Baseline

- **Node:** `>= 20`
- **Package manager:** `pnpm >= 9` (exclusive; no npm/yarn)
- **TypeScript:** `>= 5.4`
- **npm scope:** `@studio` (all workspace packages)
- **Workspace package metadata:**
  - `"private": true`
  - `"version": "0.0.0"`
  - `"type": "module"` unless an adapter forbids it
- **Shared configs:**
  - `packages/config-tsconfig/` exports `base.json` extended by every package and project
  - `packages/config-eslint/` exports a flat ESLint config
  - Prettier config lives at the repo root (`.prettierrc`) and applies everywhere

---

## Command Conventions

- Use `pnpm` for every script. Never `npx`, `npm`, or `yarn` in docs or tasks.
- Run filtered commands from the repo root: `pnpm --filter ./projects/<name> <script>`.
- Use forward slashes in `project.config.ts` paths, regardless of OS.
- On Windows with the Remotion adapter, pass render props via a JSON file, not inline JSON, to avoid shell-escaping issues.
- Per-project entry scripts in `package.json`: `dev`, `build`, `lint`, `render`.

---

## Phase Order

Phases run strictly in order: **A → B → C → D → E**.

Hard dependencies within phases:

- D20 (create `_template/`) requires C16 (`spec-types`) and C17 (`animation-utils`).
- D20 also requires direct Remotion project dependencies and shared `@studio/*` packages to be installable (Phase C complete).
- D21 (`create-project.task.md`) requires D20.
- D22–D26 (task file updates) require B10 (`adapter-registry.md`).
- E27–E31 (docs and `.gitignore`) require all of Phase D.

Commit boundary: one commit per phase, on the branch defined in Phase A pre-step.

---

## Target Structure

```text
AnimationStudio/
|-- agent-context/                # Shared agentic brain: intent, maps, skills, tasks
|   |-- intent/                   # Why: overview, anti-goals, conventions, glossary, ADRs
|   |-- map/                      # Where: folder map, workflow routing, adapter registry
|   |-- skills/                   # How: reusable craft knowledge
|   |   |-- core/                 # Renderer-agnostic skills (no library names allowed)
|   |   `-- adapters/             # Renderer-specific skills, one folder per adapter
|   `-- tasks/                    # Reusable agent workflows (create-script, build, render, ...)
|-- packages/                     # Shared TypeScript workspace packages (@studio/*)
|   |-- spec-types/               # ProjectConfig, Beat, Scene, SyncPoint, BeatTimeline types
|   |-- animation-utils/          # Renderer-neutral easing/progress/fade helpers
|   `-- adapter-contract/         # Plan 1: registry metadata/types; Plan 2: full RenderAdapter
|-- projects/                     # Self-contained animation projects
|   |-- _template/                # Scaffolding source; excluded from pnpm workspace
|   `-- <project-name>/           # One generated project, fully self-contained
|       |-- project.config.ts     # Single routing source: adapter, variants, video, slug
|       |-- package.json          # Per-project deps and scripts (dev, build, lint, render)
|       |-- scripts/              # Human-editable narration drafts, one per variant
|       |   `-- <variant>.script.md
|       |-- specs/                # Creative direction contracts, one per variant
|       |   `-- <variant>.spec.md
|       |-- props/                # JSON render props, one per variant
|       |   `-- <variant>.json
|       |-- assets/               # SVGs, audio, fonts scoped to this project
|       |-- src/                  # Adapter source code (scenes, components, data, Root)
|       `-- output/               # Rendered mp4/mov/webm/png artifacts (mp4/mov/webm gitignored)
|-- references/                   # Shared external research and archived legacy narratives
|-- package.json                  # Workspace root scripts (lint, typecheck, build, clean)
|-- pnpm-workspace.yaml           # Workspace globs: packages/*, projects/*, !projects/_template
`-- README.md, AGENTS.md, CLAUDE.md, BOT.md, CONTEXT.md, REFERENCES.md   # Agent entry adapters
```

Root `scripts/`, `specs/`, `assets/`, and `output/` are no longer active workflow folders after this plan.

---

## Canonical Project Layout

Every new project is self-contained:

```text
projects/<project-name>/
|-- project.config.ts             # Single routing source for all agents/tasks (typed via @studio/spec-types)
|-- package.json                  # Per-project deps (Remotion, @studio/*) and pnpm scripts
|-- scripts/                      # Human-editable narration drafts (input to spec)
|   `-- <variant>.script.md       # One script per audience variant (general, dev, ...)
|-- specs/                        # Reviewed creative direction (contract for build)
|   `-- <variant>.spec.md         # One spec per variant, matches script id
|-- props/                        # Remotion-safe render props, one JSON file per variant
|   `-- <variant>.json
|-- assets/                       # Source assets scoped to this project only
|   |-- svg/                      # Layered SVG files with conventional ids
|   |-- audio/                    # Voiceover, SFX, music stems
|   `-- fonts/                    # Project-specific font files
|-- src/                          # Adapter-specific source code
|   |-- data/                     # Derived timing/copy data (beats-*.ts)
|   |-- components/               # Reusable visual components
|   |-- scenes/                   # Scene-level components (one per beat group)
|   |-- compositions/             # Composition entry components (one per variant)
|   `-- Root.tsx                  # Registers compositions; adapter-specific entry
`-- output/                       # Rendered artifacts (mp4/mov/webm gitignored, png tracked)
```

Canonical naming:

- Project folder: `projects/<kebab-case-name>/`
- Script: `projects/<name>/scripts/<variant>.script.md`
- Spec: `projects/<name>/specs/<variant>.spec.md`
- Render props: `projects/<name>/props/<variant>.json`
- Assets: `projects/<name>/assets/<asset-kind>/...`
- Rendered video: `projects/<name>/output/<variant>.mp4`
- Rendered still: `projects/<name>/output/<variant>-<timestamp-or-frame>.png`

Do not use `projectN-` prefixes for new project names.

---

## `project.config.ts` Contract

`project.config.ts` is the single routing source for agents and tasks.

### Typed interface (canonical)

This interface lives in `@studio/spec-types` and is the source of truth. Agents must not introduce additional top-level fields without updating this interface and the ADR.

```ts
export type AdapterName = "remotion"; // Plan 2 extends this union

export interface VideoConfig {
  width: number;
  height: number;
  fps: number;
}

export interface ProjectVariant {
  id: string;                 // kebab-case, unique within project
  audience: string;           // free-form label, e.g. "general", "dev"
  script: string;             // path relative to project root
  spec: string;               // path relative to project root
  output: string;             // path relative to project root
  compositionId: string;      // adapter-specific composition/scene id
  durationFrames?: number;    // optional override; otherwise derived
}

export interface ProjectConfig {
  slug: string;               // kebab-case, must match folder name
  title: string;
  adapter: AdapterName;
  defaultVariant: string;     // must match a variants[].id
  variants: ProjectVariant[]; // length >= 1
  video: VideoConfig;
  tags?: string[];            // optional, for cataloging
}
```

### Example

```ts
import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "example-project",
  title: "Example Project",
  adapter: "remotion",
  defaultVariant: "general",
  variants: [
    {
      id: "general",
      audience: "general",
      script: "scripts/general.script.md",
      spec: "specs/general.spec.md",
      output: "output/general.mp4",
      compositionId: "ExampleProjectGeneral",
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
};

export default config;
```

---

## Phases

### Phase A - Clean Repository Surface

**Pre-step (deletion safety, required):**

- Tag the current `main`: `git tag pre-clean-slate`.
- Create and switch to a working branch: `git checkout -b refactor/clean-slate`.
- Push the tag and branch to origin before any deletion.
- Commit Phase A as a single commit titled `chore(refactor): clean-slate phase A - delete legacy surface`.

1. Archive useful legacy content before deletion:
   - Copy the meta workflow narrative from `specs/animation-studio-explained_spec-general.md` and the matching script into `references/legacy-workflow-explainer.md`. Strip code/path specifics; keep only the conceptual explainer text.
2. Delete existing example projects:
   - `projects/explainer-starter/`
   - `projects/animation-studio-explained/`
   - `projects/project1-how-ai-chat-works/`
3. Delete old root workflow artifact folders:
   - `scripts/`
   - `specs/`
   - `assets/`
   - `output/`
4. Remove stale lockfiles and package-manager artifacts that belonged only to deleted projects.
5. Keep `references/` at the root as shared external research.
6. Keep `.plans/` as planning material.

### Phase B - Reset the Shared Brain

**Core vs adapter rule:** Core skills must not name a renderer, library, or API. Anything that does belongs under `agent-context/skills/adapters/<adapter>/`.

7. Recreate `agent-context/skills/` as:
   - `agent-context/skills/core/`
   - `agent-context/skills/adapters/remotion/`
8. Apply this explicit per-skill mapping for the existing skills:
   | Existing skill | Action | Destination |
   |---|---|---|
   | `visual-clarity.skill.md` | Keep | `skills/core/visual-clarity.skill.md` |
   | `audio-sync.skill.md` | Keep | `skills/core/audio-sync.skill.md` |
   | `revision-workflow.skill.md` | Keep | `skills/core/revision-workflow.skill.md` |
   | `motion-easing.skill.md` | Rename and generalize | `skills/core/motion-language.skill.md` |
   | `svg-layer-naming.skill.md` | Keep (generic) | `skills/core/svg-layer-naming.skill.md` |
   | `remotion-composition.skill.md` | Move | `skills/adapters/remotion/composition.skill.md` |
9. After moving, scrub each core skill for renderer-specific terms (`useCurrentFrame`, `interpolate`, `<Composition>`, etc.) per the core vs adapter rule above.
10. Add `agent-context/map/adapter-registry.md` with the following schema and a Remotion row seeded:

    ```md
    | adapter | package | license | capabilities | skills dir | preview cmd | render cmd | status |
    |---|---|---|---|---|---|---|---|
    | remotion | direct per-project deps; no shared adapter package in Plan 1 | Remotion license | 2d,audio,vector | skills/adapters/remotion/ | pnpm --filter ./projects/<name> dev | pnpm --filter ./projects/<name> render -- --props=./props/<variant>.json | stable |
    ```

    The `license`, `capabilities`, and `skills dir` columns are included now so Plan 2 can add adapters without rewriting the registry shape.

11. Update all task files to load skills from `core/` and `adapters/<adapter>/`, resolving `<adapter>` from `project.config.ts` via the registry.

### Phase C - Workspace and Shared Packages

12. Add root `package.json` with `"private": true`, `packageManager: "pnpm@9.x"`, and workspace scripts: `lint`, `typecheck`, `build`, `clean`.
13. Add `pnpm-workspace.yaml` using negation to exclude `_template`:

    ```yaml
    packages:
      - "packages/*"
      - "projects/*"
      - "!projects/_template"
    ```

    Mark `projects/_template/package.json` as `"private": true` and keep the same `dev`, `build`, `lint`, and `render` scripts generated projects need. The workspace negation is what keeps `_template` inert; do not remove scripts from the template package.

14. Create `packages/config-tsconfig/` exporting `base.json` (strict, `moduleResolution: "bundler"`, `target: "ES2022"`). Every package and project extends this. Package metadata:
    - `name`: `@studio/config-tsconfig`
    - `private`: `true`
    - `version`: `0.0.0`
    - `type`: `module`
    - `exports`: `{ "./base.json": "./base.json" }`
    - no runtime dependencies and no build output required.
15. Create `packages/config-eslint/` exporting a flat ESLint config used by every workspace. Package metadata:
    - `name`: `@studio/config-eslint`
    - `private`: `true`
    - `version`: `0.0.0`
    - `type`: `module`
    - `exports`: `{ ".": "./index.js" }`
    - `index.js` exports a flat config array; no build output required.
16. Create `packages/spec-types/` exporting the types defined in the `ProjectConfig` Contract above, plus `Beat`, `Scene`, `SyncPoint`, `BeatTimeline`. Scope: `@studio/spec-types`. No runtime deps. Package metadata:
    - `name`: `@studio/spec-types`
    - `private`: `true`
    - `version`: `0.0.0`
    - `type`: `module`
    - `exports`: `{ ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" } }`
    - `main`: `./dist/index.js`
    - `types`: `./dist/index.d.ts`
    - scripts: `build` runs `tsc -p tsconfig.json`, `typecheck` runs `tsc -p tsconfig.json --noEmit`, `lint` runs `eslint .`.
17. Create `packages/animation-utils/` (scope `@studio/animation-utils`) with renderer-neutral helpers only. No imports from `remotion` or any adapter. Required exports:

    - `clamp01(value: number): number`
    - `bezier(p1x: number, p1y: number, p2x: number, p2y: number): (t: number) => number`
    - `progress(frame: number, start: number, end: number, easing?: (t: number) => number): number`
    - `fadeIn(frame: number, start: number, duration?: number): number`
    - `fadeOut(frame: number, start: number, duration?: number): number`
    - `sceneOpacity(frame: number, fadeInStart: number, fadeOutStart: number, fadeDuration?: number): number`
    - Easing constants: `easeOut`, `easeInOut`, `easeSpring` (as bezier-based functions)

    Package metadata:
    - `name`: `@studio/animation-utils`
    - `private`: `true`
    - `version`: `0.0.0`
    - `type`: `module`
    - `exports`: `{ ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" } }`
    - `main`: `./dist/index.js`
    - `types`: `./dist/index.d.ts`
    - scripts: `build` runs `tsc -p tsconfig.json`, `typecheck` runs `tsc -p tsconfig.json --noEmit`, `lint` runs `eslint .`.

    Future adapter packages wrap these to integrate with their own animation primitives (e.g., Remotion's `interpolate`).

18. **`adapter-contract` scope in Plan 1 (per Decisions):** create `packages/adapter-contract/` only as a thin metadata/type package. It must:
    - re-export `AdapterName` from `@studio/spec-types`;
    - define and export `RenderAdapterMetadata` exactly as:

      ```ts
      export interface RenderAdapterMetadata {
        adapter: AdapterName;
        package: string;
        license: string;
        capabilities: string[];
        skillsDir: string;
        previewCmd: string;
        renderCmd: string;
        status: "stable" | "experimental" | "legacy";
      }
      ```

    - use package metadata matching `@studio/spec-types` (`exports`, `main`, `types`, `build`, `typecheck`, `lint`).

    The runtime `RenderAdapter` interface, adapter invocation API, and adapter implementations are owned by Plan 2.

### Phase D - Project Template and Scaffolding

19. Create `agent-context/templates/`:
    - `agent-context/templates/script.template.md` (canonical script skeleton)
    - `agent-context/templates/spec.template.md` (canonical spec skeleton, replaces old `specs/_templates/animation-spec-template.md`)
20. Create `projects/_template/` with the canonical project layout and the following files:
    - `project.config.ts` (stub conforming to the typed interface)
    - `package.json` with: `"private": true`, `"version": "0.0.0"`, `"type": "module"`, scripts `dev`, `build`, `lint`, `render`, deps on `@studio/spec-types`, `@studio/animation-utils`, and direct Remotion packages
    - `tsconfig.json` extending `@studio/config-tsconfig/base.json`
    - `eslint.config.js` re-exporting `@studio/config-eslint`
    - `.gitignore` with per-project output rules (mirrors root `.gitignore` for `output/*.mp4|mov|webm`)
    - `scripts/general.script.md` (copied from `agent-context/templates/script.template.md`)
    - `specs/general.spec.md` (copied from `agent-context/templates/spec.template.md`)
    - `props/general.json` (empty or minimal Remotion-safe props object for the default variant)
    - `assets/.gitkeep`, `output/.gitkeep`
    - minimal Remotion `src/` files: `Root.tsx`, one empty composition, one empty scene, `index.ts`
21. Create `agent-context/tasks/create-project.task.md`:
    - inputs: project name, short subject, variants, chosen adapter (default `remotion`)
    - validate project name as kebab-case and not already present under `projects/`
    - copy `projects/_template/` to `projects/<name>/`
    - fill `project.config.ts` (slug, title, variants)
    - for each variant: copy `agent-context/templates/script.template.md` to `projects/<name>/scripts/<variant>.script.md`, copy the spec template to `projects/<name>/specs/<variant>.spec.md`, and create `projects/<name>/props/<variant>.json`
    - run `pnpm install` at the repo root (the `projects/*` glob auto-includes the new project; no edits to `pnpm-workspace.yaml` are required)
    - report preview/render commands using `pnpm --filter ./projects/<name>`
22. Update `create-script.task.md` to copy from `agent-context/templates/script.template.md` into `projects/<name>/scripts/<variant>.script.md`.
23. Update `create-spec.task.md` to copy from `agent-context/templates/spec.template.md` into `projects/<name>/specs/<variant>.spec.md`.
24. Update `build-animation.task.md` to read `project.config.ts`, load core skills, look up the adapter row in `agent-context/map/adapter-registry.md`, load `skills/adapters/<adapter>/`, and build inside `projects/<name>/src/`.
25. Update `preview.task.md`, `render.task.md`, and `revise-animation.task.md` to work entirely inside the self-contained project folder, invoking the registry's `preview cmd` / `render cmd`.
26. Update `refresh-map.task.md` so it treats self-contained project folders, adapter registry, and package workspaces as the current map sources. If it is no longer useful, explicitly mark it deprecated instead of leaving old root-folder routing in place.

### Phase E - Documentation and Conventions

27. Update root `README.md` with the new structure, clean-slate project model, create-project quickstart, and `pnpm`-based preview/render commands.
28. Update agent adapter files:
    - `AGENTS.md`
    - `CLAUDE.md`
    - `.github/copilot-instructions.md` (create this file if absent)
    - `BOT.md`
    - `CONTEXT.md`
    - `REFERENCES.md`
29. Update `agent-context/intent/conventions.md`, `agent-context/map/folders.md`, and `agent-context/map/workflow.md`.
30. Add ADR `agent-context/intent/decisions/0003-self-contained-projects-and-workspace-tooling.md` using the required ADR section outline:

    ```md
    # 0003 - Self-Contained Projects and Workspace Tooling

    ## Context
    Why the previous structure does not scale.

    ## Decision
    The chosen approach: self-contained `projects/<name>/`, pnpm workspaces, `project.config.ts` as routing source, first adapter `remotion`.

    ## Consequences
    Positive and negative implications, including legacy deletion.

    ## Alternatives Considered
    What was rejected and why (e.g., `_legacy/` freeze, npm workspaces, monorepo with single src).

    ## Migration Impact
    What got deleted, what was archived to `references/`, downstream task/skill changes.
    ```

31. Update root `.gitignore` for per-project outputs:
    - `projects/*/output/*.mp4`
    - `projects/*/output/*.mov`
    - `projects/*/output/*.webm`
    - keep `projects/*/output/*.png` trackable for review stills unless intentionally changed.

---

## Files to Modify

| File | Change |
|---|---|
| `AGENTS.md` | Point agents to project-contained workflow folders and new skill paths |
| `CLAUDE.md` | Same routing update as AGENTS |
| `.github/copilot-instructions.md` | Same routing update for Copilot; create if absent |
| `BOT.md` | Refresh identity/rules for self-contained projects |
| `CONTEXT.md` | Remove old root artifact model |
| `REFERENCES.md` | Update package manager and adapter references |
| `README.md` | New structure diagram and quickstart |
| `.gitignore` | Per-project output ignores |
| `agent-context/intent/conventions.md` | Canonical naming and project layout |
| `agent-context/map/folders.md` | New folder map |
| `agent-context/map/workflow.md` | New routing table |
| `agent-context/tasks/create-script.task.md` | Write scripts inside project folder |
| `agent-context/tasks/create-spec.task.md` | Write specs inside project folder |
| `agent-context/tasks/build-animation.task.md` | Read `project.config.ts`, load adapter skills |
| `agent-context/tasks/preview.task.md` | Preview from self-contained project |
| `agent-context/tasks/render.task.md` | Render to project output folder |
| `agent-context/tasks/revise-animation.task.md` | Revise project-contained spec/code |
| `agent-context/tasks/refresh-map.task.md` | Update map refresh guidance for self-contained projects or mark deprecated |

---

## Files and Folders to Delete

- `projects/explainer-starter/`
- `projects/animation-studio-explained/`
- `projects/project1-how-ai-chat-works/`
- root `scripts/`
- root `specs/`
- root `assets/`
- root `output/`
- old project-specific skill files that are not rewritten as generic core or adapter skills
- old project-local `package-lock.json` files tied to deleted projects

---

## New Files and Folders

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `.prettierrc`
- `packages/config-tsconfig/`
- `packages/config-eslint/`
- `packages/spec-types/`
- `packages/animation-utils/`
- `packages/adapter-contract/` (metadata/types only in Plan 1)
- `projects/_template/`
- `agent-context/skills/core/`
- `agent-context/skills/adapters/remotion/`
- `agent-context/templates/script.template.md`
- `agent-context/templates/spec.template.md`
- `agent-context/tasks/create-project.task.md`
- `agent-context/map/adapter-registry.md`
- `agent-context/intent/decisions/0003-self-contained-projects-and-workspace-tooling.md`
- `references/legacy-workflow-explainer.md` (archived from deleted meta project)

---

## Verification Checklist

Each check has the exact command(s) used to verify it.

- [ ] Workspace installs cleanly: `pnpm -w install`
- [ ] Workspace lints and typechecks: `pnpm -w run lint && pnpm -w run typecheck`
- [ ] `_template` is not treated as a workspace package: `pnpm -r list --depth -1` does not list `projects/_template`
- [ ] No active docs/tasks route new work to root `scripts/`, `specs/`, `assets/`, or `output/`: `rg -n "(^|[[:space:]`])(?:scripts|specs|assets|output)/|root `(scripts|specs|assets|output)/`|root (scripts|specs|assets|output)" agent-context README.md AGENTS.md CLAUDE.md BOT.md CONTEXT.md REFERENCES.md` returns no active routing references outside explicit legacy/deletion notes
- [ ] `create-project` scaffolds: run the task with name `test-project` and verify `projects/test-project/project.config.ts`, `scripts/general.script.md`, `specs/general.spec.md`, `props/general.json`, `assets/`, `src/`, `output/` all exist
- [ ] Scaffolded project previews: `pnpm --filter ./projects/test-project dev` starts and serves the studio
- [ ] Scaffolded project renders: `pnpm --filter ./projects/test-project render -- --props=./props/general.json` produces `projects/test-project/output/general.mp4`
- [ ] `create-script` writes to `projects/test-project/scripts/general.script.md` (verified by file timestamp / git status after running task)
- [ ] `create-spec` writes to `projects/test-project/specs/general.spec.md` (same verification method)
- [ ] `build-animation`, `preview`, `render`, and `revise-animation` all resolve the project through `project.config.ts` (manual review of task files: each references reading `project.config.ts` before any work)
- [ ] No stale references to deleted example projects in active guidance: `rg -n "explainer-starter|animation-studio-explained|project1-how-ai-chat-works" agent-context README.md AGENTS.md CLAUDE.md` returns no results outside `.plans/` and `references/`
- [ ] Deletion safety: `git tag -l pre-clean-slate` returns the tag; current branch is `refactor/clean-slate`
- [ ] Temporary scaffold cleanup: remove `projects/test-project/` after scaffold, preview, render, create-script, and create-spec verification.

---

## Decisions / Scope Boundaries

- **Included:** deleting existing example projects and old root workflow artifacts.
- **Included:** replacing project-specific skills with a small generic core and adapter-specific folders.
- **Included:** self-contained project layout as the only canonical model.
- **Included:** pnpm workspace setup.
- **Included:** clean shared type packages for future projects.
- **Excluded:** preserving or migrating existing example animations.
- **Excluded:** maintaining root `scripts/`, `specs/`, `assets/`, or `output/` as active workflow folders.
- **Deferred to Plan 2 unless explicitly pulled into Plan 1:** full renderer independence and full `RenderAdapter` runtime implementation.

---

## Open Considerations

All Plan 1 decisions previously listed here have been promoted to the **Decisions** section at the top of this plan. Remaining open questions for the future:

1. **When to extract `packages/shared-assets/`:** trigger is "3+ projects share the same source asset"; revisit after Plan 2 lands and a few real projects exist.
2. **Sharing a single Remotion adapter package across projects** instead of per-project Remotion deps: defer until ergonomic pain is observed; current per-project deps keep projects self-contained.
3. **Whether `references/legacy-workflow-explainer.md` should be rebuilt as a fresh meta-explainer project** once the new template is stable.
