# Task: Refresh Map

## Use When

The folder structure, projects, packages, or adapter registry has changed and the context map needs updating.

## Load

1. Load `agent-context/intent/vault.md`.
- `agent-context/map/folders.md`
- `agent-context/map/workflow.md`
- `agent-context/map/adapter-registry.md`

## Steps

1. Inspect the repository. Primary sources to check:
   - `packages/` — any new or removed workspace packages.
   - `{projects}/` — any new self-contained project folders (look for `project.config.ts`).
   - `agent-context/skills/core/` and `agent-context/skills/adapters/` — any new or removed skill files.
   - `agent-context/map/adapter-registry.md` — any new or changed adapters.
2. Update `agent-context/map/folders.md` if stable folder locations have changed.
3. Update `agent-context/map/workflow.md` if the routing table has changed.
4. Update `adapter-registry.md` if adapter metadata has changed.
5. Do not change intent files without explaining the proposed change.

## Notes

- Each project under `{projects}/` is self-contained. Do not route new work to root `scripts/`, `specs/`, `assets/`, or `output/` — those folders no longer exist.
- `projects/_template/` is a scaffolding source, not an active project.

## Output

Updated map files reflecting the current repository shape.
