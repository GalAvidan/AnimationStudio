# Task: Revise Animation

## Use When

The user wants to change an existing animation by beat, timestamp, scene, or visual element.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Read `project.config.ts` to determine `adapter`.
3. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load `agent-context/skills/core/revision-workflow.skill.md`.
4. Load all skills in `agent-context/skills/adapters/<adapter>/`.
5. Load the relevant spec from `{projects}/<name>/specs/<variant>.spec.md`.
6. Load relevant source files from `{projects}/<name>/src/`.

## Steps

1. Read `{projects}/<name>/project.config.ts` to identify the adapter and variant.
2. Locate the requested change by scene, beat, timestamp, or visible element.
3. Decide whether the spec (`{projects}/<name>/specs/<variant>.spec.md`), code, or both should change.
4. Make the smallest useful edit.
5. Preserve existing approved behavior.
6. Tell the user how to preview with `pnpm --filter @studio/project-<name> dev`.
7. If the revision produced reusable learnings, append them to `{projects}/<name>/notes.md`:
   - include `observation`, `impact`, and whether the note is `reusable`.
8. As the final step, call `update-status` to record:
	- `phase`: `revising`
	- variant update: increment or clear `pendingRevisions` for `<variant>`
	- `next action`: "Preview updated changes and re-render if approved"
	- `session summary`: one-line revision note.

## Ask If Missing

- Project name and variant
- Which timestamp, scene, or visible element is affected

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
Focused spec or code changes at `{projects}/<name>/`, plus a short revision summary.
