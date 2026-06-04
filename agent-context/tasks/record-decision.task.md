# Task: Record Decision

## Use When

The user wants to log a project-level creative or implementation decision.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/intent/conventions.md`.
3. Load `{projects}/<name>/decisions.md` if it exists.
4. Load `agent-context/templates/decisions.template.md` if `decisions.md` does not exist.

## Inputs

| Input | Required | Notes |
|---|---|---|
| Project slug | Yes | Folder under `{projects}/`. |
| Decision title | Yes | Short, specific title. |
| Context | Yes | What prompted the decision. |
| Choice | Yes | What was chosen. |
| Rationale | Yes | Why this choice. |
| Reversible | No | `yes` or `no`. Default: `yes`. |

## Steps

1. Ensure `{projects}/<name>/decisions.md` exists; create from template if missing.
2. Append a new decision block:
   - `## [YYYY-MM-DD] DEC-<NN> | <title>`
   - `context`, `choice`, `rationale`, `reversible` fields.
3. Call `update-status` with:
   - `phase`: keep current phase
   - `session summary`: "Decision recorded: <title>"
   - `next action`: unchanged unless user specified otherwise.

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
Updated `{projects}/<name>/decisions.md` with a new append-only decision entry.
