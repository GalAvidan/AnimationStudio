# Plan Review: Plan 6 Set — Archive-First Studio Reset (Parent + Execution Plan)

- **Reviewed:** 2026-05-29
- **Lens:** neutral
- **Scope:** 2 files (plan-6-archive-first-studio-reset.md + plan-6-archive-first-studio-reset.execution-plan.md)
- **Verdict:** NEEDS REVISION

## Summary
The execution plan correctly addresses all three major findings from the prior single-file review: artifact scope beyond markdown (Section 1.2), canonical archive topology (Section 1.1), and default load path ownership (Phase 2 gate). However, the parent plan was not updated after the execution plan locked those decisions, so the two files contradict each other on topology and status in ways that will mislead any reader who loads the parent plan alone. A rollback mechanism is referenced but never defined across either file.

## Strengths
- The execution plan's locked decisions (Sections 1.1–1.3) are unambiguous and directly close the prior review's gaps.
- The verification matrix provides measurable pass conditions for every phase and role.
- Rollback triggers are specific and named rather than generic.
- Role/ownership separation is clearly bounded; the note that "role responsibilities still apply as separate checklists" even for solo contributors prevents accountability collapse.
- Acceptance criteria in the execution plan are operationalized with explicit verification methods, not just aspirational statements.

## Findings

| # | Severity | File | Lens | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | 🟠 major | [plan-6-archive-first-studio-reset.md](plan-6-archive-first-studio-reset.md) | Internal Consistency | The "Proposed Archive Model" section still shows the unresolved topology (typed global trees + "or single root" fallback + "preserve original folder relationships") that the execution plan explicitly locked and superseded. Any reader of the parent plan alone receives incorrect guidance on archive structure. | Update the parent plan's Proposed Archive Model section to state the locked topology (`Vault/studios/AnimationStudio/archive/projects/<project-slug>/markdown+manifest+notes`) and reference Section 1.1 of the execution plan. |
| 2 | 🟠 major | [plan-6-archive-first-studio-reset.execution-plan.md](plan-6-archive-first-studio-reset.execution-plan.md) | Completeness | Rollback action step 2 says "Restore from last verified phase checkpoint" but neither document defines what constitutes a checkpoint. Without a concrete checkpoint mechanism (git tag, branch snapshot, manifest hash), triggers A, B, and C cannot be acted on reliably. | Define the checkpoint artifact for each phase — at minimum, a git tag convention (e.g., `archive/phase-N-complete`) created before any destructive action. |
| 3 | 🟠 major | [plan-6-archive-first-studio-reset.md](plan-6-archive-first-studio-reset.md) | Internal Consistency | Parent plan status is "Draft — alternative direction for review." The execution plan status is "Ready for execution after owner assignment." The parent plan reads as unsettled when the execution plan has already locked scope decisions and is ready to execute. | Update the parent plan status to "Execution Plan Active — see plan-6-archive-first-studio-reset.execution-plan.md" and remove the "alternative direction for review" qualifier. |
| 4 | 🟡 minor | [plan-6-archive-first-studio-reset.md](plan-6-archive-first-studio-reset.md) | Completeness | Phase 1 in the parent plan still says "Move project-related markdown files into the archive root." The execution plan's Section 1.2 adds conditional source/asset archiving for projects that cannot be reintroduced from markdown alone. The parent plan understates Phase 1 scope for anyone reading it as the primary reference. | Add a one-sentence note to the parent plan's Phase 1 that source/asset archiving is required for non-regenerable projects and is defined in the execution plan Section 1.2. |
| 5 | 🟡 minor | [plan-6-archive-first-studio-reset.execution-plan.md](plan-6-archive-first-studio-reset.execution-plan.md) | Feasibility | Phase 2 "Default Load Path Decision" names the Studio Maintainer and "root guidance document(s) used at startup" as the control point, but does not name the specific files. The maintainer cannot complete this step without investigating the actual entry surface of the Studio. | Identify the specific files by name (e.g., `context.md`, `agents.md`, `bot.md`) that constitute the default load path, and list them as the explicit update targets in Phase 2. |
| 6 | 🟡 minor | [plan-6-archive-first-studio-reset.execution-plan.md](plan-6-archive-first-studio-reset.execution-plan.md) | Completeness | Section 1.3 Active Surface Contract lists what remains after Phase 2 ("framework and shared packages," "templates," "migration and archive pointers") but does not address the `agent-context/` directory (intents, maps, skills, tasks, templates). It is unclear whether this is classified as framework that stays or as legacy content requiring a migration pointer. | Add an explicit statement on `agent-context/` disposition to Section 1.3. |
| 7 | 💡 suggestion | [plan-6-archive-first-studio-reset.execution-plan.md](plan-6-archive-first-studio-reset.execution-plan.md) | Feasibility | "Immediate Next Actions" item 1 says "Assign named owners to the four roles" but provides no assignment table. This leaves the document in a state where it cannot become fully actionable without a structural edit. | Add a 4-row owner assignment table directly in Section 2 with a placeholder column for the named person, so assignment is a fill-in rather than a structural edit. |
| 8 | 💡 suggestion | [plan-6-archive-first-studio-reset.execution-plan.md](plan-6-archive-first-studio-reset.execution-plan.md) | Feasibility | Phase 0 action 1 instructs "Generate project inventory with per-project file counts by type" but specifies no tooling approach. In a Windows/pnpm workspace with nested project folders, the method to enumerate this is non-obvious. | Add a parenthetical noting the intended approach (e.g., PowerShell `Get-ChildItem` tree, or a one-line shell command) so Phase 0 can start without a tooling decision. |

Severity scale: 🔴 critical · 🟠 major · 🟡 minor · 💡 suggestion

## Cross-File Consistency Summary

| Area | Status | Notes |
|------|--------|-------|
| Archive topology | ❌ Conflict | Execution plan locked; parent plan still shows old options |
| Artifact scope (markdown + conditional source) | ⚠️ Partial | Execution plan defines fully; parent plan Phase 1 understates scope |
| Plan status / readiness | ❌ Conflict | "Draft" vs "Ready for execution" |
| Acceptance criteria | ✅ Aligned | Both sets map to the same five outcomes |
| Phase sequencing | ✅ Aligned | Both describe Phases 0–4 in the same order |
| Rollback / risk | ⚠️ Partial | Execution plan adds triggers; checkpoint mechanism is undefined in both |

## Open Questions
1. Which files specifically constitute the Studio's default load path — the ones the Studio Maintainer must update in Phase 2?
2. What is the checkpoint artifact for each phase that enables rollback (git tag, manifest snapshot, something else)?
3. Is `agent-context/` classified as active framework that survives Phase 2, or does it require a migration pointer?

## Verdict Rationale
Three major findings exist: the parent plan's topology section was not updated after the execution plan locked it, the plan status is misaligned between the two files, and rollback is promised but the checkpoint mechanism is absent. These are all correctable with targeted edits — none require structural rethink — but they must be resolved before Phase 0 begins to avoid a reader or agent acting on stale guidance in the parent plan.

