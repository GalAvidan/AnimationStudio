# Copilot Instructions

AnimationStudio is an agent-assisted workflow for producing explanatory animations with Remotion. It is not a design app clone.

Use `agent-context/` as the canonical project context. This file is only a VS Code Copilot adapter.

Before implementing a request, read:

- `agent-context/intent/overview.md`
- `agent-context/map/workflow.md`
- `agent-context/intent/conventions.md`
- The matching task in `agent-context/tasks/`
- Core skills from `agent-context/skills/core/`
- Adapter skills from `agent-context/skills/adapters/<adapter>/` (resolve adapter from `project.config.ts` via `agent-context/map/adapter-registry.md`)

Follow the Script → Spec → Build → Preview → Render → Revise workflow.

Every animation project is self-contained under `projects/<name>/`. Do not route work to root `scripts/`, `specs/`, `assets/`, or `output/` — those folders no longer exist.

Use `pnpm` for all commands. Never `npm`, `yarn`, or `npx`.
