# Results 03 - Phase 0 Inventory (AnimationStudio Vault Migration)

Date: 2026-05-29
Scope: Phase 0 only (baseline and inventory), no physical moves

## 1) Project Inventory (Non-Template)

| Folder | Type | Package Status | Migration Scope |
|---|---|---|---|
| `projects/character-pilot/` | project | has `package.json` | in scope |
| `projects/mathematical-theorems/pythagorean-theorem/` | collection project | has `package.json` | in scope |
| `projects/mathematical-theorems/_theme/` | collection theme package | has `package.json` | framework dependency (not a content project move target) |
| `projects/agentic-ai-architecture/` | folder | no `package.json` | out of active migration set |
| `projects/pythagorean-theorem/` | folder | no `package.json` | out of active migration set |
| `projects/why-ice-floats/` | folder | no `package.json` | out of active migration set |
| `projects/why-sky-is-blue/` | folder | no `package.json` | out of active migration set |

Phase-0 migration project set:
- `character-pilot`
- `mathematical-theorems/pythagorean-theorem`

## 2) Dependency Risk Matrix (Hard-Block Relevant)

| Project | Internal deps (`@studio/*`) | `workspace:*` usage | Risk | Why |
|---|---|---|---|---|
| `character-pilot` | `@studio/adapter-motion-canvas`, `@studio/spec-types`, `@studio/config-tsconfig`, `@studio/config-eslint` | yes (4/4) | high | direct workspace coupling; physical relocation can break install/build without a resolved dependency model |
| `mathematical-theorems/pythagorean-theorem` | `@studio/spec-types`, `@studio/theme-mathematical-theorems`, `@studio/config-tsconfig`, `@studio/config-eslint` | yes (4/4) | high | direct workspace coupling plus collection theme package dependency |

Dependency gate baseline status:
- BLOCKED for physical migration until Phase 3 decision and representative validation are complete.

## 3) Rewrite Target List (Task/Map Scope)

Source scan: `agent-context/tasks/` and `agent-context/map/`.

Summary:
- Files with bare content path references: 16
- Total hits: 77

Target files:
- `agent-context/tasks/align-narration.task.md`
- `agent-context/tasks/build-animation.task.md`
- `agent-context/tasks/compile-timeline.task.md`
- `agent-context/tasks/create-audio-plan.task.md`
- `agent-context/tasks/create-project.task.md`
- `agent-context/tasks/create-script.task.md`
- `agent-context/tasks/create-spec.task.md`
- `agent-context/tasks/generate-narration.task.md`
- `agent-context/tasks/preview.task.md`
- `agent-context/tasks/refresh-map.task.md`
- `agent-context/tasks/render.task.md`
- `agent-context/tasks/revise-animation.task.md`
- `agent-context/tasks/select-music-and-sfx.task.md`
- `agent-context/map/adapter-registry.md`
- `agent-context/map/folders.md`
- `agent-context/map/workflow.md`

Rewrite policy for Phase 2:
- Rewrite content paths only:
  - `projects/<name>/...` -> `{projects}/<name>/...`
  - `projects/<collection>/<name>/...` -> `{projects}/<collection>/<name>/...`
- Keep framework paths local and unchanged:
  - `agent-context/`
  - `references/`
  - template paths: `projects/_template/`, `projects/_template-motion-canvas/`

## 4) Contract Baseline

- `agent-context/intent/vault.md`: missing at baseline (must be created in Phase 1).

## 5) Verification Commands Used in Phase 0

PowerShell checks:
- project/package inventory under `projects/`
- `@studio/*` and `workspace:*` dependency scan in project `package.json`
- bare path scan under `agent-context/tasks/` and `agent-context/map/`
- vault contract existence check

## Phase 0 Exit

Status: PASS

Reason:
- Project inventory complete
- Dependency risk matrix complete
- Rewrite target list complete
- Hard-block risk identified and preserved
