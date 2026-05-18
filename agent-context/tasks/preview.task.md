# Task: Preview

## Use When

The user wants to inspect the animation locally.

## Load

1. Read `project.config.ts` to determine `adapter`.
2. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load all skills in `agent-context/skills/adapters/<adapter>/`.

## Steps

1. Go to `projects/<project-name>/`.
2. Install dependencies if needed.
3. Run `npm run dev`.
4. Report the local preview URL.

## Ask If Missing

- Project name when more than one project exists.

## Output

A running Remotion Studio preview.
