# Task: Build Animation

## Use When

The user has an approved spec and wants a Remotion animation project.

## Load

- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/skills/remotion-composition.skill.md`
- `agent-context/skills/motion-easing.skill.md`
- `agent-context/skills/audio-sync.skill.md`
- The target spec in `specs/`

## Steps

1. Confirm the spec has a clear beat map and constraints.
2. Create or update `projects/<project-name>/`.
3. Convert beats into scenes and timing data.
4. Implement the composition with stable IDs.
5. Keep scene code organized in `src/scenes/` and reusable components in `src/components/`.
6. Explain how to preview the result.

## Ask If Missing

- Approved spec
- Required assets
- Runtime or output size

## Output

A Remotion project ready to preview.
