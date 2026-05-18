# Task: Render

## Use When

The user wants a video or still export.

## Load

1. Read `project.config.ts` to determine `adapter` and `variants`.
2. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load all skills in `agent-context/skills/adapters/<adapter>/`.
4. Load the relevant spec from `projects/<name>/specs/<variant>.spec.md`.

## Steps

1. Read `projects/<name>/project.config.ts` to get composition ID, output path, and adapter.
2. From the adapter registry, get the `render cmd` for this adapter.
3. Confirm `projects/<name>/props/<variant>.json` exists and contains valid props.
4. Run from the repo root:
   `pnpm --filter ./projects/<name> render -- --props=./props/<variant>.json`
5. Verify the output file at `projects/<name>/output/<variant>.mp4`.

## Ask If Missing

- Project name and variant
- Output format if not mp4

## Output

A rendered video at `projects/<name>/output/<variant>.mp4`.
