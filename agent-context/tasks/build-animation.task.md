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

1. Read `projects/<name>/project.config.ts` to confirm the spec, adapter, and variant.
2. Confirm the spec at `projects/<name>/specs/<variant>.spec.md` has a clear beat map and constraints.
3. Convert beats into scenes and timing data; write derived data to `projects/<name>/src/data/`.
4. Implement the composition with stable IDs inside `projects/<name>/src/`.
5. Keep scene code in `src/scenes/` and reusable components in `src/components/`.
6. Report the preview command from the adapter registry.

## Ask If Missing

- Project name and variant
- Approved spec
- Required assets
- Runtime or output size

## Output

An animation project ready to preview with `pnpm --filter ./projects/<name> dev`.
