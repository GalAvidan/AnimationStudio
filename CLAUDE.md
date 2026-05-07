# Claude Adapter

This repository uses a model-agnostic context contract. Read `AGENTS.md` first, then use `agent-context/` as the canonical source of truth.

## Required Routing

For every task:

1. Load `agent-context/intent/overview.md`.
2. Load `agent-context/map/workflow.md`.
3. Match the request to a task in `agent-context/tasks/`.
4. Load only the skills referenced by that task.
5. Keep outputs in the documented workflow folders.

Do not add Claude-only rules here unless they are adapter mechanics. Shared project rules belong in `agent-context/`.
