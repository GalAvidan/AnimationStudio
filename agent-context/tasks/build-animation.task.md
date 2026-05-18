# Task: Build Animation

## Use When

The user has an approved spec and wants a Remotion animation project.

## Load

1. Read `project.config.ts` to determine `adapter` and `variants`.
2. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load `agent-context/intent/overview.md` and `agent-context/intent/conventions.md`.
4. Load all skills in `agent-context/skills/core/`.
5. Load all skills in `agent-context/skills/adapters/<adapter>/` (resolved from registry).
6. Load the target spec from `projects/<name>/specs/<variant>.spec.md`.

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
