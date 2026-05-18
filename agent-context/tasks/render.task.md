# Task: Render

## Use When

The user wants a video or still export.

## Load

1. Read `project.config.ts` to determine `adapter` and `variants`.
2. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load all skills in `agent-context/skills/adapters/<adapter>/`.
4. Load the relevant spec from `projects/<name>/specs/<variant>.spec.md`.

## Steps

1. Confirm composition ID, output format, and destination.
2. Go to `projects/<project-name>/`.
3. Run a Remotion render command.
4. Put final files in `output/`.
5. Avoid inline JSON props on Windows; use props files when needed.

## Output

A rendered video or still in `output/`.
