# Task: Archive Project

## Use When

The user wants to move a completed or paused project from the active projects root to the archive.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/intent/conventions.md`.

## Inputs

| Input | Required | Notes |
|---|---|---|
| Project slug | Yes | Must match an existing folder under `{projects}/` |

## Validation

- Confirm `{projects}/<slug>/` exists. If not, stop and report the slug was not found under the active projects root.
- Confirm `Vault/AnimationStudio/archive/projects/<slug>/` does not already exist. If it does, stop and report the archive collision — do not overwrite.

## Steps

1. Read `{projects}/<slug>/project.config.ts` to confirm the project name, adapter, and variants.
2. Move the entire `{projects}/<slug>/` tree to `Vault/AnimationStudio/archive/projects/<slug>/`.
3. In `Vault/AnimationStudio/archive/ARCHIVE_INDEX.md`, append a row for the archived project:
   - Columns: slug, adapter, variants (comma-separated), archive date (YYYY-MM-DD), notes.
4. Create `Vault/AnimationStudio/archive/projects/<slug>/manifest/rehydration-map.md` documenting:
   - Original path: `{projects}/<slug>/`
   - Archive path: `Vault/AnimationStudio/archive/projects/<slug>/`
   - Adapter and variants at time of archive.
   - Any outstanding TODOs from `project.config.ts` or spec files.
5. If `Vault/AnimationStudio/archive/projects/<slug>/decisions.md` exists, fold unresolved or reversible decisions into `manifest/rehydration-map.md` under "Open decisions to revisit".
6. If `Vault/AnimationStudio/archive/projects/<slug>/notes.md` exists, promote any entries marked `reusable: yes` into `agent-context/patterns/index.md` with category hints (`motion`, `scene`, or `audio`).
7. Before reporting completion, ensure status context is captured:
   - If `Vault/AnimationStudio/archive/projects/<slug>/status.md` exists, append a final history line with phase `done/archived`.
   - If it does not exist, note this in `rehydration-map.md` so resume context can be rebuilt on restore.
8. Report the archive path and the archive-index row that was added.

## Failure Modes

| Condition | Action |
|---|---|
| Slug not found under `{projects}/` | Stop and report |
| Archive collision (slug already in archive) | Stop and report; do not overwrite |
| Partial move detected | Report and leave source intact; do not update archive-index |

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
Project tree moved to `Vault/AnimationStudio/archive/projects/<slug>/`, archive-index updated, `rehydration-map.md` created.
