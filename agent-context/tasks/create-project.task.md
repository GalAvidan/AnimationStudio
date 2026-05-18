# Task: Create Project

## Use When

The user wants to start a new animation project from scratch.

## Load

- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/map/adapter-registry.md`

## Inputs

| Input | Default | Notes |
|---|---|---|
| Project name | — | Required. Must be kebab-case. |
| Short subject | — | Required. One sentence describing what the animation explains. |
| Variants | `general` | Comma-separated list of variant IDs (e.g. `general,dev`). |
| Adapter | `motion-canvas` | Must match a row in the adapter registry. |

## Validation

- Project name must match `^[a-z][a-z0-9-]*$` (kebab-case, no leading digit).
- `projects/<name>/` must not already exist.
- Adapter must exist in `agent-context/map/adapter-registry.md`.

## Steps

1. Validate all inputs per the Validation section above. If any check fails, report the error and stop.
2. Copy the correct template based on adapter:
   - `remotion` → copy `projects/_template/` to `projects/<name>/`
   - `motion-canvas` → copy `projects/_template-motion-canvas/` to `projects/<name>/`
3. In `projects/<name>/project.config.ts`, replace the stub with real values:
   - `slug`: project name
   - `title`: title-cased subject
   - `adapter`: chosen adapter
   - `defaultVariant`: first variant in the list
   - `variants`: one entry per variant with `id`, `audience` (same as id), `script`, `spec`, `output`, `compositionId` (PascalCase slug + PascalCase variant)
   - `video`: `{ width: 1920, height: 1080, fps: 30 }`
4. For each variant:
   - Copy `agent-context/templates/script.template.md` to `projects/<name>/scripts/<variant>.script.md`.
   - Copy `agent-context/templates/spec.template.md` to `projects/<name>/specs/<variant>.spec.md`.
   - Create `projects/<name>/props/<variant>.json` with content `{}`.
5. In `projects/<name>/package.json`, replace `@studio/project-template` with `@studio/project-<name>`.
6. Run `pnpm install` from the repo root (the `projects/*` glob auto-includes the new project).

## Report to User

After completion, report:

```
Project created: projects/<name>/

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
