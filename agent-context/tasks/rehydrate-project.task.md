# Task: Rehydrate Project

## Use When

The user wants to restore an archived project back to the active projects root for continued work.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/intent/conventions.md`.

## Inputs

| Input | Required | Notes |
|---|---|---|
| Project slug | Yes | Must match an existing folder under `Vault/hub/studios/AnimationStudio/archive/projects/` |

## Validation

- Confirm `Vault/hub/studios/AnimationStudio/archive/projects/<slug>/` exists. If not, stop and report the slug was not found in the archive.
- Confirm `{projects}/<slug>/` does not already exist. If it does, stop and report the path collision — do not overwrite active work.

## Steps

1. Read `Vault/hub/studios/AnimationStudio/archive/projects/<slug>/manifest/rehydration-map.md` to confirm the original path, adapter, and variants.
2. Move the entire `Vault/hub/studios/AnimationStudio/archive/projects/<slug>/` tree back to `{projects}/<slug>/`.
3. Append a rehydration entry to `Vault/hub/studios/AnimationStudio/archive/rehydration-log.md`:
   - Columns: slug, rehydration date (YYYY-MM-DD), restored-to path, any notes.
4. Report the restored path and the next recommended step (e.g., run `build-animation` or `preview`).

## Failure Modes

| Condition | Action |
|---|---|
| Slug not found in archive | Stop and report |
| Target path already exists under `{projects}/` | Stop and report; do not overwrite |

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
Project tree restored to `{projects}/<slug>/`, rehydration-log updated.

