# 0003 - Self-Contained Projects and Workspace Tooling

## Context

The previous AnimationStudio structure kept scripts, specs, assets, and output at the repo root, shared across all projects. This worked for a single project but did not scale:

- Root folders accumulated a mix of projects without clear boundaries.
- Example/starter projects cluttered `projects/` alongside real work.
- Skills were Remotion-specific despite the stated goal of renderer independence.
- There was no shared TypeScript package infrastructure, so types and utilities were duplicated or absent.
- Agent instructions referred to root folders that would grow into naming conflicts as projects multiplied.

## Decision

Restructure around two clean domains:

1. **Shared agentic brain** at the root: `agent-context/` for intent, maps, skills, and tasks; `packages/` for shared TypeScript (`@studio/*`).
2. **Self-contained project units** under `projects/<name>/`: each project owns its own `project.config.ts`, scripts, specs, props, assets, source code, and output.

Key choices:

- `project.config.ts` is the single routing source for agents: it declares the adapter, variants, and video config.
- `agent-context/map/adapter-registry.md` maps adapter names to skills directories and commands.
- Skills are split into `skills/core/` (renderer-agnostic) and `skills/adapters/<adapter>/` (renderer-specific).
- First adapter: `remotion`, with direct per-project Remotion dependencies. No shared adapter package yet.
- Package manager: `pnpm >= 9` exclusively. Workspace globs: `packages/*`, `projects/*`, `!projects/_template`.
- `projects/_template/` is a scaffolding source excluded from the workspace by negation.

## Consequences

**Positive:**
- Each project is independently deployable and testable.
- Adding a new project does not affect other projects.
- Shared types (`@studio/spec-types`) and utilities (`@studio/animation-utils`) are versioned and importable.
- Adapter independence is structurally enforced: core skills may not name a renderer.
- The `create-project` task can scaffold a new project in one step.

**Negative:**
- Each project duplicates Remotion dependencies (accepted trade-off until ergonomic pain is observed).
- Existing example animations were deleted rather than migrated.
- Root `scripts/`, `specs/`, `assets/`, and `output/` no longer exist — links to them in external notes will break.

## Alternatives Considered

- **`_legacy/` freeze**: keep old projects under `projects/_legacy/` rather than deleting. Rejected because it leaves dead weight in the workspace and still requires the new structure to work around it.
- **npm/yarn workspaces**: rejected in favor of pnpm for performance and strict dependency isolation.
- **Single `src/` monorepo**: keep all animation source in one `src/` tree, one `package.json`. Rejected because it makes it impossible to have per-project dependencies or to hand a single project to someone else.
- **Shared Remotion adapter package**: defer until per-project deps cause observable pain (see Plan 2 open questions).

## Migration Impact

**Deleted:**
- `projects/explainer-starter/`
- `projects/animation-studio-explained/`
- `projects/project1-how-ai-chat-works/`
- Root `scripts/`, `specs/`, `assets/`, `output/`
- Old flat skills: `motion-easing.skill.md`, `remotion-composition.skill.md`, and others (replaced by `core/` and `adapters/remotion/`)

**Archived:**
- Meta workflow narrative from `animation-studio-explained` → `references/legacy-workflow-explainer.md`

**Task and skill changes:**
- All tasks updated to load from `skills/core/` and `skills/adapters/<adapter>/`.
- All tasks updated to read `project.config.ts` and use `pnpm --filter` commands.
- New task: `create-project.task.md`.
- `motion-easing.skill.md` replaced by `skills/core/motion-language.skill.md` (renderer-neutral).
- `remotion-composition.skill.md` moved to `skills/adapters/remotion/composition.skill.md`.
