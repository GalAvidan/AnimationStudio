# Task: Resume Project

## Use When

- "Resume"
- "Continue project X"
- "Where did we leave off?"
- "Pick up <project>"
- Automatically: as the first step of any session on an existing project before content changes.

## Load

- `agent-context/intent/dependencies/vault.md`
- `agent-context/intent/lifecycle.md`
- `{projects}/<name>/status.md`
- Last block of `{projects}/<name>/handoff.md` (if present)
- Open items in `{projects}/<name>/decisions.md` (if present)

Load nothing else. This task is bounded-context by design.

## Inputs

| Name | Required | Description |
|---|---|---|
| Project name | Yes | Project folder under `{projects}/`. |

## Validation

- Confirm `{projects}/<name>/` exists. If not, suggest `create-project`.
- Confirm `{projects}/<name>/status.md` exists. If not, offer to run `update-status` first.

## Steps

1. Read the files listed under **Load** and nothing else.
2. Produce a resume briefing with current phase, last session, next action, open decisions, and blocked-on notes.
3. Recommend one next task from `agent-context/map/workflow.md`.
4. Do not mutate any file.

## Output format

Emit this briefing in chat:

```
## Resume: <project-name>

**Current phase:** <value from status.md>
**Last session:** <value from status.md or handoff.md>
**Next action:** <value from status.md>
**Open decisions:** <from decisions.md or "none">
**Blocked on:** <from handoff.md or "none">
```

Then: `Recommended task: <task-name>`.

## Failure Modes

| Condition | Action |
|---|---|
| Project folder missing | Suggest `create-project` and stop |
| status.md missing | Suggest `update-status` and stop |

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
Read-only resume briefing for the requested project.
