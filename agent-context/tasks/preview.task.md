# Task: Preview

## Use When

The user wants to inspect the animation locally.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Read `project.config.ts` to determine `adapter`.
3. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load all skills in `agent-context/skills/adapters/<adapter>/`.

## Steps

1. Read `project.config.ts` to confirm the project exists and the adapter.
2. From the adapter registry, get the `preview cmd` for this adapter.
3. Run the `preview cmd` from the adapter registry row, substituting `<name>`, from the repo root.
4. Report the local preview URL.

## Ask If Missing

- Project name (when more than one project exists under `{projects}/`).

## Output

A running animation studio preview.
