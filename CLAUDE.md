# Claude Adapter

This repository uses a model-agnostic context contract. Read `agents.md` first, then use `agent-context/` as the canonical source of truth.

## Required Routing

For every task:

1. Load `agent-context/intent/overview.md`.
2. Load `agent-context/map/workflow.md`.
3. Match the request to a task in `agent-context/tasks/`.
4. Load core skills from `agent-context/skills/core/`.
5. Read `project.config.ts` in the target project to determine the adapter.
6. Look up the adapter in `agent-context/map/adapter-registry.md`.
7. Load adapter skills from `agent-context/skills/adapters/<adapter>/`.
8. Keep all outputs inside the self-contained project folder under `projects/<name>/`.

Do not add Claude-only rules here unless they are adapter mechanics. Shared project rules belong in `agent-context/`.
