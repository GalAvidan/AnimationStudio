# Results 01 - ResearchStudio Pattern Baseline for Studio/Vault Standardization

**Date:** 2026-05-28  
**Prepared for:** AnimationStudio Vault migration planning  
**Status:** Ready to use as canonical standard

---

## Purpose

Capture the implemented split pattern from ResearchStudio as the baseline standard that AnimationStudio and future studios should follow.

---

## Source of Truth Used

- ResearchStudio implemented contract and routing files.
- Vault-side migration lab and ecosystem conventions.
- Current AnimationStudio task-path and dependency state (for comparison).

### Authoritative Sources

The following files are authoritative proof inputs for this baseline:

- `Vault/agent-context/.plans/stodio_data_migration/PLAN.md`
- `Vault/agent-context/.plans/stodio_data_migration/researchStudio_migration_lab.md`
- `ResearchStudio/agent-context/intent/vault.md`

The folder `ResearchStudio/agent-context/.plans/vault-migration/` is locator-only context in this review and is not treated as canonical evidence.

---

## Critical Observations

1. The folder `ResearchStudio/agent-context/.plans/vault-migration/` is currently empty.
2. The effective migration plan artifacts are in Vault under:
   - `Vault/agent-context/.plans/stodio_data_migration/PLAN.md`
   - `Vault/agent-context/.plans/stodio_data_migration/researchStudio_migration_lab.md`
3. ResearchStudio has already implemented alias-based content routing via `agent-context/intent/vault.md`.
4. ResearchStudio tasks are now largely alias-based (`{projects}`, `{knowledge}`), with framework exceptions (such as `_template`) retained locally.
5. Vault conventions are aligned with studio-keyed content areas and branch naming by domain.

## Provenance Note

This baseline treats the ResearchStudio implementation pattern plus the Vault-hosted migration lab as the source evidence for the reusable split model. If a referenced repo folder is empty, treat it as a locator only; do not treat the empty folder itself as the canonical proof.

---

## Canonical Standard (Reusable Across Studios)

### 1) Single-file Vault contract per studio

Each studio must have:

`agent-context/intent/vault.md`

Minimum shape:

```yaml
vaultRoot: c:\Git\Vault
studioName: <StudioName>

{projects}: {vaultRoot}\{studioName}\projects
```

Additive aliases are studio-specific (for example `{knowledge}`, `{assets}`, `{scripts}`).

### 1a) Verification ownership and pass conditions

| Check | Owner | Pass condition |
|---|---|---|
| Vault contract exists and parses | Repo maintainer | `agent-context/intent/vault.md` loads without syntax errors |
| Contract is loaded first | Root adapter owner | `AGENTS.md` load order places the vault contract before task/map files |
| Tasks/skills/maps use aliases | Content owner | No unapproved bare content paths remain in the reviewed scope |
| Framework paths remain local | Framework owner | `agent-context/`, `references/`, and template paths stay unchanged |
| Pilot validation passes | Migration owner | install, typecheck, build, preview, and render all succeed for the pilot |

### 2) Contract-first load order

Root adapter (`AGENTS.md`) must load vault contract first, before lifecycle/task files.

### 3) Alias-only content paths in tasks/skills/maps

All content references in tasks/skills/maps use aliases, not bare local content paths.

Examples:

- `projects/<name>/...` -> `{projects}/<name>/...`
- `knowledge/...` -> `{knowledge}/...`
- Shared assets/scripts -> `{assets}/...`, `{scripts}/...` when intentionally shared

### 4) Framework paths remain local (never aliased)

Keep these local to the studio repo:

- `agent-context/`
- `references/`
- `projects/_template/`
- `projects/_template-motion-canvas/` (if present)
- shared packages/tooling needed to build the framework

### 5) Rewrite-first, move-second

Phase split is mandatory:

- Phase A: non-destructive path rewrite and verification
- Phase B: physical content migration after all gates pass

### 6) Hard dependency gate before physical migration

If projects depend on internal workspace packages (`workspace:*`), physical migration is blocked until resolution strategy is finalized and validated.

### 7) Pilot then wave migration

Migrate one low-risk project first, validate end-to-end, then migrate remaining projects in waves.

---

## Branch and Ownership Convention

- Studio repos: framework/process/tooling ownership.
- Vault repo: content/source-of-truth ownership.
- Branch naming:
  - `research/<project-name>` for research content
  - `animation/<project-name>` for animation content

---

## Decision Notes for AnimationStudio

1. Keep templates in AnimationStudio.
2. Move project content to `Vault/AnimationStudio/projects/<project-name>/`.
3. Add shared `assets/` and optional shared `scripts/` under `Vault/AnimationStudio/`.
4. Do not move projects physically while `@studio/*` package resolution remains `workspace:*`-bound without an approved model.

---

## Risks to Track

- Build/install breakage after move due to unresolved workspace package strategy.
- Over-rewrite in docs/tasks causing non-migration regressions.
- Vault artifact growth from generated media if ignore policy is weak.
- Ambiguity between project-local and shared content folders.

## Mitigation Map

| Risk | Trigger | Mitigation |
|---|---|---|
| Workspace package breakage | install/typecheck fails after relocation | Do not move additional projects until the dependency strategy is validated and documented |
| Over-rewrite regression | unrelated path or convention text changes | Limit edits to migration-scoped files and verify diffs against the rewrite target list |
| Vault artifact bloat | generated media enters source control | Enforce Vault ignore rules before migration and review generated outputs during pilot |
| Shared-folder ambiguity | a script or asset is copied to Vault without a reuse decision | Keep content project-local by default and only centralize after repeated reuse is proven |

---

## Verification Baseline (applies to every studio)

- Vault contract exists and parses.
- Contract is loaded first in root adapter.
- Tasks/skills/maps use aliases for content paths.
- Framework paths remain local and unchanged.
- Rewrite-only verification reports no unapproved bare content paths.
- Pilot project passes install, typecheck, build, preview, render.
- Wave migrations produce no unresolved regressions.

## Recommendation for AnimationStudio

Use the same split model, but keep the dependency-resolution gate explicit and timeboxed before any physical move. The baseline is reusable only if each studio documents its own gate owner, pass condition, and rollback path.

---

## Practical Conclusion

ResearchStudio provides a proven template: a single alias contract, task-level alias routing, strict ownership boundaries, and phased migration discipline. AnimationStudio should follow the same structure, with an explicit dependency gate before physical movement.