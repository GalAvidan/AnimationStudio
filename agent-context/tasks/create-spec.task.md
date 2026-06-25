# Task: Create Spec

## Use When

The user wants to turn a script into an animation spec.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/skills/core/visual-clarity.skill.md`
- `agent-context/skills/core/audio-sync.skill.md`
- `agent-context/skills/core/narrative-structure.skill.md`
- `agent-context/templates/spec.template.md`

## Steps

1. Read the script from `{projects}/<name>/scripts/<variant>.script.md`.
   For curriculum commissions, confirm every `## Contract Verification` item is
   checked before translating the script into visual direction.
2. Identify the core message and audience.
3. If the script has `[SPEAKER:]` markers, fill in the spec's **Cast** table and use the **Speaker** / **Emotion** columns in the Beat Map. Otherwise leave Cast blank and the Speaker column empty (narrator).
4. Create a beat map with duration per beat (time on screen, e.g. `6s`, `400ms`). Do not use absolute timeline positions.
5. Define visual philosophy, key moments, sync points, assets, and constraints.
6. For curriculum commissions, verify the visual philosophy and beat map
   preserve the script's treatment guardrail mappings. Flag
   `INSTRUCTIONAL_TREATMENT_MISMATCH` if the visuals teach a different mental
   model even when narration is factually correct.
7. Exclude code, frame numbers, pixel positions, and component props.
8. Save to `{projects}/<name>/specs/<variant>.spec.md` using `agent-context/templates/spec.template.md` as the skeleton.
   - Ensure frontmatter starts with:
     - `status: Draft`
     - `approvedBy:`
     - `approvedDate:`
9. As the final step, call `update-status` to record:
	- `phase`: `spec-drafted`
	- variant update: `specApproved = Draft` for `<variant>`
	- `next action`: "Run approve-spec after review, then build-animation"
	- `session summary`: one-line spec progress note.

## Ask If Missing

- Project name and variant
- Runtime target
- Visual style direction
- Voiceover or music assumptions
- For narrative projects: the cast (character ids and labels) if not already in `project.config.ts`

## Preconditions

- Required inputs are provided and resolve to valid project paths.
- Files listed in the task's Load section are available.
- Validation checks in this task pass before execution continues.

## Produces

- The primary artifact(s) listed in this task's Output section.
- Any explicit status/history updates described in this task.
## Output
A reviewed creative direction spec at `{projects}/<name>/specs/<variant>.spec.md`, ready for a build.
