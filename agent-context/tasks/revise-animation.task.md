# Task: Revise Animation

## Use When

The user wants to change an existing animation by beat, timestamp, scene, or visual element.

## Load

- `agent-context/skills/revision-workflow.skill.md`
- `agent-context/skills/remotion-composition.skill.md`
- The relevant spec in `specs/`
- Relevant files in `projects/<project-name>/src/`

## Steps

1. Locate the requested change.
2. Decide whether the spec, code, or both should change.
3. Make the smallest useful edit.
4. Preserve existing approved behavior.
5. Tell the user how to preview the change.

## Ask If Missing

- Which project to revise
- Which timestamp, scene, or visible element is affected

## Output

Focused spec/code changes and a short revision summary.
