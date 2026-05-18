# Task: Create Spec

## Use When

The user wants to turn a script into an animation spec.

## Load

- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/skills/core/visual-clarity.skill.md`
- `agent-context/skills/core/audio-sync.skill.md`
- `agent-context/templates/spec.template.md`

## Steps

1. Read the script from `projects/<name>/scripts/<variant>.script.md`.
2. Identify the core message and audience.
3. Create a beat map with timestamps or relative timing.
4. Define visual philosophy, key moments, sync points, assets, and constraints.
5. Exclude code, frame numbers, pixel positions, and component props.
6. Save to `projects/<name>/specs/<variant>.spec.md` using `agent-context/templates/spec.template.md` as the skeleton.

## Ask If Missing

- Project name and variant
- Runtime target
- Visual style direction
- Voiceover or music assumptions

## Output

A reviewed creative direction spec at `projects/<name>/specs/<variant>.spec.md`, ready for a build.
