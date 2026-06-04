# Folder Map

## Root

- `AGENTS.md`: generic agent adapter.
- `CLAUDE.md`: Claude adapter.
- `.github/copilot-instructions.md`: Copilot adapter.
- `bot.md`, `context.md`, `references.md`: human-friendly project context.
- `README.md`: repository guide for humans.
- `package.json`: workspace root with `lint`, `typecheck`, `build`, `clean` scripts.
- `pnpm-workspace.yaml`: declares `packages/*`, `projects/*`, and `projects/*/*` globs (excludes `projects/_template` and `projects/_template-motion-canvas`).
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
- `packages/audio-spec/`: `AudioPlan`, `VoiceProfile`, `AudioCue`, `MusicBed`, `NarrationClip`, `AlignedWord`, `CompiledTimeline`, and related types (`@studio/audio-spec`). Used by the audio pipeline tasks and by Remotion compositions that mount narration/music.
- `packages/animation-utils/`: renderer-neutral easing/progress/fade helpers (`@studio/animation-utils`).
- `packages/adapter-contract/`: adapter registry metadata types (`@studio/adapter-contract`).

## Projects

- `projects/_template/`: scaffolding source — excluded from pnpm workspace. Copy this to create a new project.
- `projects/_template-motion-canvas/`: Motion Canvas scaffolding source — excluded from pnpm workspace.
- `{projects}/<name>/`: one self-contained animation project. Contains `project.config.ts`, `scripts/`, `specs/`, `props/`, `assets/`, `src/`, `output/`, and optionally `audio/`.
- `{projects}/<collection>/`: a **theme collection** folder grouping related projects. Contains no `package.json` itself — it is just a folder. Each project inside is a standard animation project nested one level deeper.
- `{projects}/<collection>/_theme/`: shared design-token package for the collection (`@studio/theme-<collection>`). Exports `palette` and `fonts` constants used by every project in the collection. Build it with `pnpm --filter @studio/theme-<collection> build`.
- `{projects}/<collection>/<name>/`: a project inside a collection. Identical structure to a flat project; its `project.config.ts` sets `collection: "<collection>"` and its `package.json` adds `@studio/theme-<collection>` as a dependency. Use the package name filter to run scripts: `pnpm --filter @studio/project-<name> dev` (path-based filters only work when the cwd is the workspace root).

## References

- `references/`: shared external research and archived legacy narratives.

## Campaign Membership

A project may declare campaign membership in its `project.config.ts` via a `campaign.slug` field. This is optional — projects without it are standalone.

- Campaign content lives in `Vault/campaigns/{campaign-slug}/` — never in this repo.
- Path aliases (`{campaign_root}`, `{campaign_shared}`, `{campaign_chars}`, etc.) are defined in `agent-context/intent/dependencies/campaign.md`.
- Alias resolution rules (including `CAMPAIGN_NOT_FOUND` fallback) are defined in `agent-context/skills/cross/campaign-resolution.skill.md`.
- The Hub plugin routes campaign-aware work via the same `{projects}` root; campaign paths are additive, not structural alternatives.

## Deprecated / Deleted

The following root folders existed before the Plan 1 clean-slate refactor and have been removed:
- `scripts/` — replaced by per-project `{projects}/<name>/scripts/`
- `specs/` — replaced by per-project `{projects}/<name>/specs/`
- `assets/` — replaced by per-project `{projects}/<name>/assets/`
- `output/` — replaced by per-project `{projects}/<name>/output/`
