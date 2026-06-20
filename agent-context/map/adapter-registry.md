# Adapter Registry

This file is the single source of truth for supported rendering adapters.
Agents resolve `<adapter>` from `project.config.ts`, then look up the matching row here to find the correct skills directory and commands.

| adapter | package | license | capabilities | skills dir | preview cmd | render cmd | status |
|---|---|---|---|---|---|---|---|
| remotion | direct per-project deps; no shared adapter package in Plan 1 | Remotion license | 2d,audio,vector | skills/adapters/remotion/ | pnpm --filter @studio/project-<name> dev | pnpm --filter @studio/project-<name> render -- --props=./props/\<variant\>.json | stable |
| motion-canvas | packages/adapter-motion-canvas | MIT | 2d,audio,vector | skills/adapters/motion-canvas/ | pnpm --filter @studio/project-<name> dev | pnpm --filter @studio/project-<name> build | experimental |
| manim | direct per-project deps (uv/pip) | MIT | 2d,3d,audio,vector | skills/adapters/manim/ | uv run manim render -ql -p src/scenes/\<variant\>.py \<CompositionId\> | uv run manim render -qh src/scenes/\<variant\>.py \<CompositionId\> | experimental |

## Usage by Agents and Tasks

1. Read `project.config.ts` in the target project to get `adapter`.
2. Find the matching row in this table.
3. Load every skill file in the `skills dir` column.
4. Use `preview cmd` and `render cmd` verbatim, substituting `<name>` and `<variant>`.

## Adding an Adapter (Plan 2+)

Add a row to this table, create `agent-context/skills/adapters/<adapter>/`, and add at least a `composition.skill.md` (or equivalent entry skill) in that folder.
