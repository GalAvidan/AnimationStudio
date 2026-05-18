# Folder Map

## Root

- `AGENTS.md`: generic agent adapter.
- `CLAUDE.md`: Claude adapter.
- `.github/copilot-instructions.md`: Copilot adapter.
- `BOT.md`, `CONTEXT.md`, `REFERENCES.md`: human-friendly project context.
- `README.md`: repository guide for humans.
- `package.json`: workspace root with `lint`, `typecheck`, `build`, `clean` scripts.
- `pnpm-workspace.yaml`: declares `packages/*` and `projects/*` globs (excludes `projects/_template`).
- `.prettierrc`: root Prettier config, applies everywhere.

## Canonical Context

- `agent-context/intent/`: purpose, decisions, conventions, glossary, and anti-goals.
- `agent-context/map/`: folder map, workflow routing, and adapter registry.
- `agent-context/skills/core/`: renderer-agnostic animation craft rules.
- `agent-context/skills/adapters/<adapter>/`: renderer-specific skills, one folder per adapter.
- `agent-context/tasks/`: reusable agent workflows.
- `agent-context/templates/`: canonical script and spec skeletons.

## Shared Packages

- `packages/config-tsconfig/`: exports `base.json` — extended by all packages and projects.
- `packages/config-eslint/`: exports shared flat ESLint config.
- `packages/spec-types/`: `ProjectConfig`, `Beat`, `Scene`, `SyncPoint`, `BeatTimeline` types (`@studio/spec-types`).
- `packages/animation-utils/`: renderer-neutral easing/progress/fade helpers (`@studio/animation-utils`).
- `packages/adapter-contract/`: adapter registry metadata types (`@studio/adapter-contract`).

## Projects

- `projects/_template/`: scaffolding source — excluded from pnpm workspace. Copy this to create a new project.
- `projects/<name>/`: one self-contained animation project. Contains `project.config.ts`, `scripts/`, `specs/`, `props/`, `assets/`, `src/`, `output/`.

## References

- `references/`: shared external research and archived legacy narratives.

## Deprecated / Deleted

The following root folders existed before the Plan 1 clean-slate refactor and have been removed:
- `scripts/` — replaced by per-project `projects/<name>/scripts/`
- `specs/` — replaced by per-project `projects/<name>/specs/`
- `assets/` — replaced by per-project `projects/<name>/assets/`
- `output/` — replaced by per-project `projects/<name>/output/`
