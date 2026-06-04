# Task: Create Collection

## Use When

The user wants to create a new theme collection that future projects can belong to, or when scaffolding a `_theme/` package before any projects in the collection exist.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/intent/conventions.md`.
3. Load `agent-context/skills/cross/theme-collection.skill.md`.

## Inputs

| Input | Required | Notes |
|---|---|---|
| Collection slug | Yes | Kebab-case; e.g. `mathematical-theorems`. Must match `^[a-z][a-z0-9-]*$`. |
| Palette overrides | No | Key-value token overrides (e.g. `accent: "#ff6600"`). Applied on top of skill defaults. |
| Font overrides | No | Key-value font overrides. |

## Validation

- Collection slug must match `^[a-z][a-z0-9-]*$`. Stop if invalid.
- `{projects}/<collection>/_theme/` must not already exist. If it does, stop and report — use `create-project` with `collection` to add a project to an existing collection instead.

## Steps

1. Create the folder `{projects}/<collection>/`.
2. Create `{projects}/<collection>/_theme/` with the required files per `theme-collection.skill.md`:
   - `package.json` with `name: "@studio/theme-<collection>"` and a `build` script.
   - `tsconfig.json` extending `@studio/config-tsconfig/base.json`.
   - `src/index.ts` exporting `palette` and `fonts` constants (apply any palette/font overrides from inputs).
3. Report the collection path, theme package name, and next steps:
   - Run `pnpm install` to wire the workspace.
   - Use `create-project` with `collection: <collection>` to add a project.

## Failure Modes

| Condition | Action |
|---|---|
| Invalid collection slug | Stop and report |
| `_theme/` already exists | Stop and report; suggest using `create-project` instead |

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
`{projects}/<collection>/_theme/` scaffolded and ready for `pnpm install`.
