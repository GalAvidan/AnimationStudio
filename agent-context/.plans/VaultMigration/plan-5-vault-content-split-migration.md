# Plan 5: Vault Content Split Migration - AnimationStudio Logic in Studio, Content in Vault

**Date:** 2026-05-28  
**Status:** Draft - ready to execute (phased)  
**Scope:** Refactor AnimationStudio to match the ResearchStudio split model: Studio keeps logic/framework; Vault keeps studio content.

---

## Problem

AnimationStudio currently mixes framework logic and project content in one repository tree.

Current project folders include both logic and content artifacts under `projects/<name>/`, including:

- scripts
- specs
- props
- assets
- audio pipeline artifacts
- source code
- output files

This breaks the intended ecosystem boundary where studios are reusable frameworks and Vault is the durable content store.

---

## Target Outcome

Adopt the same split model as ResearchStudio:

- AnimationStudio repository owns framework logic only:
  - `agent-context/`
  - `packages/`
  - `projects/_template/`
  - `projects/_template-motion-canvas/`
  - `references/`
  - root workspace/build tooling
- Vault repository owns AnimationStudio content:
  - `Vault/AnimationStudio/projects/<project-name>/`
  - `Vault/AnimationStudio/assets/` (shared reusable project assets/themes)
  - `Vault/AnimationStudio/scripts/` (optional shared scripts area; project-local scripts remain inside each migrated project)
  - optional future `Vault/AnimationStudio/library/` for reusable clip/audio/script packs

---

## Principles

- Preserve the Studio as a reusable framework/tooling repo.
- Move content to Vault in a way that is reversible and auditable.
- Use alias-based path indirection so future path changes touch one contract file.
- Separate non-destructive rewrites from physical file movement.
- Pilot first, then migrate in waves.
- Do not physically migrate while internal package dependency resolution is undefined.
- Keep the alias contract Windows-specific for this workspace unless cross-platform support is explicitly added later.

---

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Migration pattern | Reuse ResearchStudio alias contract pattern | Proven and minimizes broad rewrites |
| Canonical studio-content root | `Vault/AnimationStudio/` | Mirrors `Vault/ResearchStudio/` |
| Physical migration strategy | Pilot 1 project, then waves | Reduces blast radius |
| Template projects | Stay in AnimationStudio | Templates are framework scaffolding |
| Package strategy gate | Hard block before physical move | Projects depend on `@studio/*` via `workspace:*` |
| Shared scripts folder in Vault | Optional and additive | Keep project scripts local unless intentional centralization |

---

## Hard Block (Must Resolve Before Physical Migration)

AnimationStudio projects are pnpm workspace members with `workspace:*` dependencies on internal packages (`@studio/*`).

A physical move to Vault can break install/build/render unless package resolution strategy is explicitly finalized.

Required gate output:

1. Chosen dependency model for migrated projects, selected from one of:
   - publish `@studio/*` packages to a registry and consume versions, or
   - approved monorepo/path-link model that still works from Vault, or
   - another documented strategy with CI verification
2. Workspace and CI behavior documented for both repos.
3. Proof that one migrated project can install, typecheck, build, preview, and render.
4. Named owner and sign-off date for the gate decision.

No project folder moves until this gate is marked complete.

---

## Alias Contract

Create `AnimationStudio/agent-context/intent/vault.md` with canonical path aliases.

```yaml
vaultRoot: c:\Git\Vault
studioName: AnimationStudio

{projects}: {vaultRoot}\{studioName}\projects
{assets}: {vaultRoot}\{studioName}\assets
{scripts}: {vaultRoot}\{studioName}\scripts
```

Notes:

- Use Windows-native separators in alias values.
- Keep framework paths (for example `agent-context/`, `references/`, template paths) unaliased.
- If a shared Vault scripts area is not used, keep `{scripts}` but document as optional.

---

## Phase Plan

### Phase 0 - Baseline and Inventory

1. Snapshot current folder and dependency state.
2. Inventory all content-bearing projects to migrate (excluding templates).
3. Inventory path references in task/skill/map files that still point at local `projects/<name>/...` locations.

Deliverable:

- migration inventory table (project names, critical commands, dependency risks).

### Phase 1 - Contract and Doc Alignment (No File Moves)

1. Create `agent-context/intent/vault.md` for AnimationStudio.
2. Update Studio root/docs to load and honor vault contract:
   - `AGENTS.md`
   - `CONTEXT.md`
   - `agent-context/intent/overview.md`
   - `agent-context/intent/conventions.md`
3. Define what belongs in Vault vs Studio in explicit bullets.

Deliverable:

- docs are aligned on split boundaries and alias contract.

### Phase 2 - Rewrite-Only Path Normalization

1. Rewrite task/map references from direct project paths to aliases.
2. Add `agent-context/intent/vault.md` to `## Load` sections where required.
3. Keep rewrites limited to content paths only; do not rewrite framework paths.

Expected rewrite patterns:

- `projects/<name>/...` -> `{projects}/<name>/...`
- shared asset references -> `{assets}/...` when truly shared
- optional shared script references -> `{scripts}/...`

Verification:

- zero unapproved bare `projects/<name>/` references in migrated task/map scope (template exceptions allowed)
- no broken task load blocks
- no edits to unrelated conventions text beyond migration scope

Deliverable:

- deterministic alias-based path layer with no physical movement.

### Phase 3 - Dependency Gate Resolution (Hard Block Gate)

1. Compare the candidate package-resolution strategies and choose one.
2. Document package and workspace rules across both repos.
3. Produce one green validation run for a representative project in a Vault-like location.
4. Record the owner, decision date, and approval note in the migration log.

Deliverable:

- signed-off gate checklist.

### Phase 4 - Vault Receiving Structure

1. Ensure Vault structure exists:
   - `Vault/AnimationStudio/projects/`
   - `Vault/AnimationStudio/assets/`
   - `Vault/AnimationStudio/scripts/` (optional)
2. Update Vault ignore rules for animation artifacts (video/audio/generated intermediates).
3. Confirm ownership boundaries in Vault docs.

Deliverable:

- Vault ready to receive AnimationStudio content.

### Phase 5 - Pilot Migration (One Project)

1. Select one low-risk project as pilot using explicit criteria:
  - no custom native dependency/toolchain requirements
  - no unresolved `workspace:*` dependency questions after Phase 3
  - minimal shared asset/script coupling
  - existing install/typecheck/build/preview/render commands are already documented
2. Move pilot project to `Vault/AnimationStudio/projects/<project>/`.
3. Validate end-to-end:
   - install
   - typecheck
   - build
   - preview
   - render
   - task execution using alias paths
4. Record breakages and fix instructions.
5. If any validation step fails, stop the pilot, revert the move, and log the failure mode before retrying.

Deliverable:

- pilot acceptance report with go/no-go decision.

### Phase 6 - Wave Migration (Remaining Projects)

1. Migrate remaining non-template projects in small waves.
2. Re-run validation per wave.
3. Keep templates and framework packages in AnimationStudio.
4. Remove migrated project folders from AnimationStudio only after successful verification.

Deliverable:

- all scoped projects live in Vault with passing checks.

### Phase 7 - Stabilization and Closeout

1. Final pass on docs and map routing.
2. Record migration log and residual follow-ups.
3. Confirm Studio remains framework-first and Vault content-first.

Deliverable:

- migration completion note and maintenance checklist.

---

## In-Scope vs Out-of-Scope

### In Scope

- Vault split planning and execution for AnimationStudio content folders.
- Alias contract and path normalization in tasks/maps/docs.
- Project content migration from AnimationStudio into Vault.

### Out of Scope

- Rewriting core animation architecture unrelated to path/content ownership.
- Changing adapter design beyond migration necessities.
- Deleting templates or shared framework packages.

---

## Acceptance Criteria

1. Studio/Vault ownership boundary is explicit in docs and followed in task paths.
2. `agent-context/intent/vault.md` exists and is loaded by standard task flow.
3. Rewrite-only pass completes with expected exceptions only.
4. Dependency gate is resolved and documented before any bulk file movement.
5. Pilot migration passes end-to-end workflow checks.
6. Remaining projects migrate in waves with no unresolved regressions.
7. AnimationStudio repo retains framework logic; Vault becomes source of truth for animation content.
8. Any cross-platform support decision for the alias contract is documented if the workspace is no longer Windows-only.

---

## Risks and Mitigations

- Risk: build break after physical move due to `workspace:*` dependencies.  
  Mitigation: hard block gate + pilot-first validation.

- Risk: over-rewrite of docs/tasks causing non-migration regressions.  
  Mitigation: rewrite-only phase, scoped patterns, verification grep checks.

- Risk: artifact bloat in Vault from generated media/audio.  
  Mitigation: enforce Vault `.gitignore` and commit policy before migration.

- Risk: unclear content boundaries (`assets`/`scripts` shared vs project-local).  
  Mitigation: keep project-local by default; promote to shared Vault folders only when reused.

- Risk: pilot failure after physical move.  
  Mitigation: revert the move, record the failure mode, and do not advance to wave migration until the failure is resolved.

---

## Execution Notes

- Commit once per phase.
- Keep migration PRs small and reviewable.
- Record every exception decision in a short migration log entry.
- If dependency gate remains unresolved, continue only through Phases 0-2 and 4; stop before Phase 5.
