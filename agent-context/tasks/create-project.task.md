# Task: Create Project

## Use When

The user wants to start a new animation project from scratch.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/intent/overview.md`.
3. Load `agent-context/intent/conventions.md`.
4. Load `agent-context/map/adapter-registry.md`.

## Inputs

| Input | Default | Notes |
|---|---|---|
| Project name | — | Required. Must be kebab-case. |
| Short subject | — | Required. One sentence describing what the animation explains. |
| Variants | `general` | Comma-separated list of variant IDs (e.g. `general,dev`). |
| Adapter | `motion-canvas` | Must match a row in the adapter registry. |
| Commission ID | *(none)* | Optional `cmsn-NNNN` when project is created from a commission request. |
| Class ID | *(none)* | Optional curriculum class identifier (`cls-NNN-...`). |
| Collection | *(none)* | Optional. Kebab-case name of an existing theme collection (e.g. `mathematical-theorems`). If provided, the project is created under `{projects}/<collection>/<name>/` and the theme package is wired up automatically. |

## Validation

- Project name must match `^[a-z][a-z0-9-]*$` (kebab-case, no leading digit).
- If `collection` is provided:
  - Collection name must match `^[a-z][a-z0-9-]*$`.
  - Target path is `{projects}/<collection>/<name>/`; it must not already exist.
- If no collection: `{projects}/<name>/` must not already exist.
- Adapter must exist in `agent-context/map/adapter-registry.md`.

## Steps

1. Validate all inputs per the Validation section above. If any check fails, report the error and stop.
2. Determine the target path:
   - With collection: `{projects}/<collection>/<name>/`
   - Without collection: `{projects}/<name>/`
3. Copy the correct template based on adapter:
   - `remotion` → copy `projects/_template/` to the target path
   - `motion-canvas` → copy `projects/_template-motion-canvas/` to the target path
   - `manim` → copy `projects/_template-manim/` to the target path
4. In `<target>/project.config.ts`, replace the stub with real values:
   - `slug`: project name
   - `title`: title-cased subject
   - `collection`: collection name (omit the field entirely if no collection)
   - `adapter`: chosen adapter
   - `defaultVariant`: first variant in the list
   - `variants`: one entry per variant with `id`, `audience` (same as id), `script`, `spec`, `output`, `compositionId` (PascalCase slug + PascalCase variant)
   - `video`: `{ width: 1920, height: 1080, fps: 30 }`
   - `commissionId`: include when input provided
   - `classId`: include when input provided
5. For each variant:
   - Copy `agent-context/templates/script.template.md` to `<target>/scripts/<variant>.script.md`.
   - Copy `agent-context/templates/spec.template.md` to `<target>/specs/<variant>.spec.md`.
   - Create `<target>/props/<variant>.json` with content `{}`.
6. Initialize project coordination files:
   - Copy `agent-context/templates/decisions.template.md` to `<target>/decisions.md`.
   - Copy `agent-context/templates/handoff.template.md` to `<target>/handoff.md`.
   - Copy `agent-context/templates/notes.template.md` to `<target>/notes.md`.
7. **Node.js adapters only (remotion, motion-canvas):** In `<target>/package.json`, replace `@studio/project-template` with `@studio/project-<name>`. Skip this step for `manim` (no `package.json`).
8. **Node.js adapters only (remotion, motion-canvas):** If a collection was provided:
   - Check whether `projects/<collection>/_theme/` already exists.
   - If it does **not** exist: scaffold it as a minimal theme package (see `agent-context/map/folders.md` for the structure) and run `pnpm install` once scaffolding is done.
   - Add `"@studio/theme-<collection>": "workspace:*"` to the project's `package.json` dependencies.
   Skip this step for `manim` (collection theme packages are Node.js only).
9. Install dependencies:
   - **remotion / motion-canvas:** Run `pnpm install` from the repo root (the `projects/*` and `projects/*/*` globs auto-include the new project).
   - **manim:** Run `uv sync` from `<target>/` (installs `manim` and `manim-voiceover` into a local `.venv`). Manim projects are outside the pnpm workspace.
10. Run `update-status` for the new project with:
   - `phase`: `created`
   - `next action`: "Create a script draft for the default variant"
   - `session summary`: "Project scaffold created"
   - `variant updates`: initialize each listed variant row in `status.md`.

## Report to User

After completion, report:

```
Project created: {projects}/<name>/

Preview:  <preview cmd from adapter registry, with <name> substituted>
Render:   <render cmd from adapter registry, with <name> and <variant> substituted>

Next steps:
  1. Edit scripts/<variant>.script.md with your narration draft.
  2. Run create-spec to turn the script into a reviewed spec.
  3. Run build-animation once the spec is approved.
```

## Ask If Missing

- Project name
- Short subject

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
