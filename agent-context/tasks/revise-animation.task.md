# Task: Revise Animation

## Use When

The user wants to change an existing animation by beat, timestamp, scene, or visual element.

## Load

1. Read `project.config.ts` to determine `adapter`.
2. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load `agent-context/skills/core/revision-workflow.skill.md`.
4. Load all skills in `agent-context/skills/adapters/<adapter>/`.
5. Load the relevant spec from `projects/<name>/specs/<variant>.spec.md`.
6. Load relevant source files from `projects/<name>/src/`.

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
