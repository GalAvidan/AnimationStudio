# Task: Capture Project Note

## Use When

The user wants to capture a reusable lesson or observation during build/revision work.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `{projects}/<name>/notes.md` if it exists.
3. Load `agent-context/templates/notes.template.md` if `notes.md` does not exist.

## Inputs

| Input | Required | Notes |
|---|---|---|
| Project slug | Yes | Folder under `{projects}/`. |
| Observation | Yes | What was learned. |
| Impact | Yes | Why it matters for future work. |
| Reusable | No | `yes` or `no`. Default: `no`. |

## Steps

1. Ensure `{projects}/<name>/notes.md` exists; create from template if missing.
2. Append a note block:
   - `## [YYYY-MM-DD] note-<NN>`
   - `observation`, `impact`, `reusable` fields.
3. If `reusable: yes`, mention that archive flow should promote it to `agent-context/patterns/`.

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
Updated `{projects}/<name>/notes.md` with a new append-only note.
