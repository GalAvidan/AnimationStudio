# Task: Preview

## Use When

The user wants to inspect the animation locally.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Read `project.config.ts` to determine `adapter`.
3. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load all skills in `agent-context/skills/adapters/<adapter>/`.

## Steps

1. Read `project.config.ts` to confirm the project exists and the adapter.
2. From the adapter registry, get the `preview cmd` for this adapter.
3. Run the `preview cmd` from the adapter registry row, substituting `<name>`, from the repo root.
4. Report the local preview URL.
5. As the final step, call `update-status` to record:
	- `phase`: `previewed`
	- run outcome:
	  - `lastPreviewStatus`: `success` or `failed`
	  - `lastPreviewCommand`: expanded preview command used for the run
	  - `lastPreviewedAt`: ISO timestamp
	- `next action`: "Render output or apply focused revisions"
	- `session summary`: one-line preview result note.

## Ask If Missing

- Project name (when more than one project exists under `{projects}/`).

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.

## Palette Preview Mode (Optional)

When `project.config.ts` includes `paletteSource`, also verify that a dedicated
palette preview composition/scene is available in the project entrypoint.
Use this mode when the user asks to review color direction before full render.

Expected behavior:

- reviewers can switch between multiple named palettes within one preview run,
- semantic token swatches are visible,
- a representative sample frame updates with the selected palette.

This mode is additive and must not block normal animation preview.

## Output
A running animation studio preview.
