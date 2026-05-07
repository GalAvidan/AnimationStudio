# Decision 0001: Use agent-context as the Source of Truth

## Status

Accepted

## Context

Different agents read different instruction files. Claude may read `CLAUDE.md`, Copilot reads `.github/copilot-instructions.md`, and generic agents may read `AGENTS.md`.

If each file contains separate project rules, they will drift.

## Decision

Use `agent-context/` as the canonical source of truth. Agent-specific files are thin adapters that route the agent into this shared context.

## Consequences

- Shared rules live once.
- Agent adapters stay short.
- The workflow remains model-agnostic.
