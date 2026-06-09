# Plan 6: Archive-First Studio Reset - Remove Active Projects, Preserve Markdown Records, Rebuild the Studio Surface

**Date:** 2026-05-29  
**Status:** Draft - alternative direction for review  
**Scope:** Replace the current project-heavy Studio layout with a smaller framework-first Studio, while moving existing project markdown records into an archive for later rehydration.

Detailed execution reference: `plan-6-archive-first-studio-reset.execution-plan.md`

---

## Report Summary

This option changes the migration strategy from "move existing projects into Vault" to "clear the active Studio project surface, archive the markdown records, then reintroduce projects one at a time from the archive."

The goal is to reduce the active complexity of AnimationStudio immediately, make the new structure easier to reason about, and avoid carrying forward old project layouts that no longer fit the target design.

This is a more disruptive reset than the current phased migration plan, but it may be the cleaner path if the intent is to rebuild the Studio around a new canonical structure rather than preserve the current project tree.

---

## Why This Direction

- It lets the Studio be refitted around the new structure before any individual project returns.
- It preserves the existing markdown files as a retrievable record instead of forcing them to remain in the active workspace.
- It reduces the chance that old project conventions keep leaking into the new layout.
- It makes each later project reintroduction an explicit, reviewable decision.

---

## Target Outcome

At the end of this option:

- AnimationStudio contains the new framework-first structure only.
- Existing project folders are removed from the active Studio tree.
- Project markdown files are stored in an archive location for later reference.
- Reintroduction of projects happens one by one, based on the archived records.
- Each project returns only after it has been adapted to the new structure.

---

## Proposed Archive Model

Use an archive location that is separate from the active Studio tree and clearly marked as historical/reference content.

Suggested shape:

- `Vault/studios/AnimationStudio/archive/projects/`
- `Vault/studios/AnimationStudio/archive/specs/`
- `Vault/studios/AnimationStudio/archive/plans/`
- `Vault/studios/AnimationStudio/archive/notes/`

If a simpler structure is preferred, keep a single archive root and preserve the original project folder names inside it.

---

## Principles

- Preserve content records before removing active projects.
- Rebuild the Studio structure first, then reintroduce projects deliberately.
- Keep archived markdowns read-only in practice, even if they remain editable on disk.
- Avoid mixing old and new structures in the active Studio workspace.
- Treat each reintroduced project as a fresh adaptation, not a direct restore.

---

## Phase Plan

### Phase 0 - Snapshot and Inventory

1. Capture a full inventory of existing AnimationStudio projects and markdown files.
2. Classify markdown files into:
   - active guidance
   - project-specific reference
   - historical/archive-only
3. Record any files that must remain in the active Studio because they define the new structure.

Deliverable:

- inventory of what will be archived, removed, or retained.

### Phase 1 - Archive the Markdown Records

1. Move project-related markdown files into the archive root.
2. Preserve original folder relationships where possible.
3. Add a short archive index so later rehydration can find the right source files quickly.
4. Leave a clear pointer in the active Studio to the archive location.

Deliverable:

- markdown archive is complete and discoverable.

### Phase 2 - Rebuild the Active Studio Structure

1. Remove the active project folders from the Studio tree.
2. Replace them with the new framework-first layout.
3. Update routing docs, load instructions, and any root references so they match the new structure.
4. Keep the active workspace focused on framework, tooling, and the new structure definition.

Deliverable:

- AnimationStudio is reduced to the new canonical structure.

### Phase 3 - Reintroduce Projects One by One

1. Select one project from the archive.
2. Recreate or adapt it against the new structure.
3. Validate the project in isolation.
4. Repeat for the next project only after the previous one is confirmed.

Deliverable:

- project-by-project restoration workflow.

### Phase 4 - Stabilize and Document

1. Document the archive-to-active conversion rules.
2. Record which archived files were reused, rewritten, or retired.
3. Confirm the Studio structure no longer depends on legacy project layout assumptions.

Deliverable:

- a stable operating model for the new Studio structure.

---

## Benefits

- Cleaner reset of the active repository surface.
- Easier to enforce a new structure without legacy drift.
- Archived markdowns remain available for later reuse.
- Fewer partial migrations, because the active Studio is rebuilt before project return.

---

## Risks and Tradeoffs

- Risk: removing active projects too early can reduce immediate continuity.
  - Mitigation: keep a complete archive index and do not delete records before verification.
- Risk: archive structure may become a second source of truth if it is not tightly governed.
  - Mitigation: define archive as historical/reference-only and keep the active Studio as the only operational workspace.
- Risk: later project rehydration may take longer than a direct move-based migration.
  - Mitigation: accept the slower path if the priority is structural cleanup over speed.

---

## Decision Criteria

Choose this option if the primary goal is to redesign AnimationStudio around the new structure first.

Prefer the current phased migration plan if the priority is to preserve more of the active project tree while moving content gradually.

This option is strongest when the current tree is considered too coupled to be worth preserving in place.

---

## Acceptance Criteria

1. Existing project markdown files are archived and recoverable.
2. Active AnimationStudio no longer contains the legacy project tree.
3. The new Studio structure is documented and loaded by default.
4. One project can be reintroduced from the archive without reusing legacy layout assumptions.
5. The archive remains clearly separated from active work.

