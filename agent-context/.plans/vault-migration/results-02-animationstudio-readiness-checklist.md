# Results 02 - AnimationStudio Readiness Checklist (Phases 0-2)

**Date:** 2026-05-28  
**Scope:** Immediate execution guidance for standardizing AnimationStudio to Studio/Vault split model  
**Constraint:** No physical migration until package dependency gate is signed off

---

## Outcome Target

Prepare AnimationStudio for safe migration by completing:

- Phase 0: Baseline and inventory
- Phase 1: Contract and doc alignment
- Phase 2: Rewrite-only path normalization

This checklist intentionally stops before any file movement.

---

## Phase 0 - Baseline and Inventory

### 0.1 Inventory projects in scope

- Include all non-template content projects.
- Exclude framework templates:
  - `projects/_template/`
  - `projects/_template-motion-canvas/`

Deliverable:

- A migration table with project name, adapter, key commands, and risk notes.

### 0.2 Capture dependency risk per project

For each scoped project, record internal package usage:

- `@studio/*` dependencies
- `workspace:*` versions

Deliverable:

- Dependency risk matrix (high/medium/low) with blockers.

### 0.3 Inventory path references in task/map files

Find and catalog bare content-path patterns:

- `projects/<name>/...`
- `projects/...` in routing text
- any content path that is not alias-based

Deliverable:

- File-level rewrite list with expected substitution pattern.

Exit criteria:

- Full project inventory complete.
- Dependency matrix complete.
- Rewrite target list complete.

---

## Phase 1 - Contract and Doc Alignment (No Moves)

### 1.1 Create contract file

Create:

`agent-context/intent/vault.md`

Initial contract:

```yaml
vaultRoot: c:\Git\Vault
studioName: AnimationStudio

{projects}: {vaultRoot}\{studioName}\projects
{assets}: {vaultRoot}\{studioName}\assets
{scripts}: {vaultRoot}\{studioName}\scripts
```

Notes:

- Keep Windows separators in alias values.
- `{scripts}` may remain optional but should exist in contract for stability.

### 1.2 Update root adapters and intent docs

Update these files so split ownership is explicit and consistent:

- `agents.md`
- `context.md`
- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`

Required messaging:

- AnimationStudio is framework/tooling.
- Content resolves via aliases in `intent/vault.md`.
- Templates and framework packages remain local.

### 1.3 Establish load order rule

Root adapter load order should place:

1. `agent-context/intent/vault.md`
2. remaining intent/map/task files

Exit criteria:

- Contract file exists.
- Docs are aligned on ownership and aliases.
- Load order includes contract first.

---

## Phase 2 - Rewrite-Only Path Normalization

### 2.1 Rewrite content paths in task/map scope

Apply substitutions only to content paths:

- `projects/<name>/...` -> `{projects}/<name>/...`
- shared asset references -> `{assets}/...` (only when truly shared)
- shared script references -> `{scripts}/...` (only when intentionally shared)

Do not rewrite framework paths:

- `agent-context/`
- `references/`
- template project paths
- package/tooling framework paths

### 2.2 Ensure contract is loaded by changed tasks

For each changed task file, add `agent-context/intent/vault.md` in its load section (prefer first).

### 2.3 Verification checks (hard)

- Zero unapproved bare `projects/<name>/` references in migrated task/map scope.
- No broken load blocks after edits.
- No unrelated convention rewrites beyond migration scope.

### 2.4 Suggested grep verification set

Use these checks and review each hit:

```powershell
rg -n "projects/<name>|projects/" agent-context/tasks agent-context/map
rg -n "\{projects\}|\{assets\}|\{scripts\}" agent-context/tasks agent-context/map
rg -n "agent-context/intent/vault.md" agent-context/tasks
```

If using literal project slugs in docs, add targeted checks for each slug as needed.

Exit criteria:

- Rewrite-only pass complete and reviewed.
- Alias references in place for content paths.
- Unapproved bare paths removed in scope.

---

## Phase 3 - Dependency Gate Resolution (Hard Block)

### 3.1 Choose the package-resolution strategy

Decide one approved model for migrated projects:

- publish `@studio/*` packages to a registry and consume versions
- approved monorepo/path-link model that still works from Vault
- another documented strategy with CI verification

Deliverable:

- a signed-off dependency strategy with owner and decision date

### 3.2 Document workspace and CI behavior

Document how install, typecheck, build, preview, and render behave in both repos after migration.

Deliverable:

- workspace and CI rules for Studio and Vault repos

### 3.3 Validate one representative project in a Vault-like location

Run one green validation for a representative project after the dependency strategy is chosen.

Deliverable:

- validation log for the representative project

Exit criteria:

- dependency strategy approved
- workspace and CI rules documented
- representative validation green

---

## Phase 4 - Vault Receiving Structure

### 4.1 Ensure Vault structure exists

Create or confirm:

- `Vault/studios/AnimationStudio/projects/`
- `Vault/studios/AnimationStudio/assets/`
- `Vault/studios/AnimationStudio/scripts/` (optional)

### 4.2 Update ignore rules

Add Vault ignore rules for generated video, audio, and other intermediates before physical migration.

### 4.3 Confirm ownership boundaries

Document what remains in Studio versus what is allowed into Vault.

Exit criteria:

- Vault receiving structure exists
- ignore rules are in place
- ownership boundaries are documented

---

## Hard Block Gate (Before Phase 5 Physical Pilot)

Do not move project folders physically until all are true:

1. Dependency model for migrated projects is chosen and documented.
2. Workspace and CI behavior are documented for Studio and Vault repos.
3. One Vault-located pilot project passes:
   - install
   - typecheck
   - build
   - preview
   - render

If the pilot fails, stop the migration, revert the move, and capture the failure mode before attempting wave migration.

Status recommendation:

- Keep this gate as a mandatory signed checklist item in every migration PR.

---

## Ready-to-Use PR Slice Plan

Use small PRs in this order:

1. PR-1: Add `intent/vault.md` only.
2. PR-2: Root/intent doc alignment only.
3. PR-3: Rewrite-only pass for tasks/maps only.
4. PR-4: Dependency-gate documentation and validation artifacts.
5. PR-5: Vault receiving structure and ignore-rule hardening.
6. PR-6: Pilot physical migration (after gate approval).

---

## Quick Decision Guidance

- If a path points to produced project content, alias it.
- If a path points to framework logic or scaffolding, keep it local.
- If uncertain whether a script/asset is shared, keep it project-local first; promote later when reuse is proven.

---

## Practical Conclusion

AnimationStudio can be standardized using the exact ResearchStudio model, but only if dependency resolution is treated as a hard physical-migration gate. Phases 0-2 are safe to execute immediately and should be completed before any folder moves.
