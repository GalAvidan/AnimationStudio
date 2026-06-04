# Task: Update Status

## Use When

- "Update status"
- "Refresh status"
- "What is the current project state?"
- Automatically: as the final step after any mutating task (`create-script`, `create-spec`, `build-animation`, `preview`, `render`, `revise-animation`, `archive-project`).

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/intent/lifecycle.md`.
3. Load `agent-context/intent/conventions.md`.
4. Load `{projects}/<name>/status.md` if it exists.
5. Load `agent-context/templates/status.template.md` if `{projects}/<name>/status.md` does not exist.

## Inputs

| Name | Required | Description |
|---|---|---|
| Project name | Yes | Folder under `{projects}/` to update. |
| Phase | Yes | New lifecycle phase. Must match `agent-context/intent/lifecycle.md`. |
| Next action | Yes | Single most important next step. |
| Session summary | Yes | One-line summary of what changed in this session. |
| Variant updates | No | Optional updates for one or more variant rows (`scripted`, `specApproved`, `built`, `rendered`, `pendingRevisions`). |

## Validation

- Confirm `{projects}/<name>/` exists. Stop and report if missing.
- Confirm `Phase` is one of the allowed lifecycle values.

## Steps

1. If `{projects}/<name>/status.md` does not exist, copy `agent-context/templates/status.template.md` to `{projects}/<name>/status.md`.
2. Update **Last updated** to today (`YYYY-MM-DD`).
3. Set **Current phase** to the provided phase.
4. Set **Next action** to the provided next action.
5. Set **Last session** to the provided session summary.
6. If variant updates were provided, update matching rows in the **Variants** table.
7. Append one line to **State history**:
   - `[YYYY-MM-DD] <phase> | <session summary>`
8. Save `{projects}/<name>/status.md`.

## Report to User

- Confirm `status.md` was updated.
- Report the new phase and next action.

## Failure Modes

| Condition | Action |
|---|---|
| Project folder missing | Stop and report |
| Invalid phase value | Stop and list allowed lifecycle values |

## Output

Updated `{projects}/<name>/status.md` with current lifecycle state and append-only history.
