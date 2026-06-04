# Task: Build Animation

## Use When

The user has an approved spec and wants to build an animation project.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Read `project.config.ts` to determine `adapter` and `variants`.
3. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load `agent-context/intent/overview.md` and `agent-context/intent/conventions.md`.
4. Load all skills in `agent-context/skills/core/`.
5. Load all skills in `agent-context/skills/adapters/<adapter>/` (resolved from registry).
6. Load the target spec from `{projects}/<name>/specs/<variant>.spec.md`.

## Steps

1. Read `{projects}/<name>/project.config.ts` to confirm the spec, adapter, and variant.
2. Read frontmatter in `{projects}/<name>/specs/<variant>.spec.md` and confirm:
   - `status: Approved`
   - `approvedBy` is not empty
   - `approvedDate` is not empty
   If any of these checks fail, stop and report that the spec is not approved for build.
3. Confirm the spec at `{projects}/<name>/specs/<variant>.spec.md` has a clear beat map and constraints.
4. Convert beats into scenes and timing data; write derived data to `{projects}/<name>/src/data/`.
5. If `{projects}/<name>/audio/compiled.timeline.json` exists, read it and wire `<Audio>` / `<Sequence>` blocks into the composition for narration clips, music beds, and SFX cues. Use `compiledTimeline.scenes[].beats[].narration.fileRef` for narration and `compiledTimeline.scenes[].music.trackRef` for music beds.
6. Implement the composition with stable IDs inside `{projects}/<name>/src/`.
7. Keep scene code in `src/scenes/` and reusable components in `src/components/`.
8. Report the preview command from the adapter registry.
9. If notable implementation learnings emerged, append them to `{projects}/<name>/notes.md`:
   - include `observation`, `impact`, and whether the note is `reusable`.
10. As the final step, call `update-status` to record:
	- `phase`: `built`
	- variant update: `built = yes` for `<variant>`
	- `next action`: "Preview the build and capture revision notes"
	- `session summary`: one-line build progress note.

## Ask If Missing

- Project name and variant
- Approved spec (`status: Approved`, `approvedBy`, `approvedDate`)
- Required assets
- Runtime or output size

## Failure Modes

| Condition | Action |
|---|---|
| Spec status is not `Approved` | Stop and report. Recommend `approve-spec` before build. |
| `approvedBy` or `approvedDate` missing | Stop and report missing approval metadata. |

## Output

An animation project ready to preview with `pnpm --filter @studio/project-<name> dev`.
