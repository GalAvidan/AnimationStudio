# Plan Review: Plan 6: Archive-First Studio Reset - Remove Active Projects, Preserve Markdown Records, Rebuild the Studio Surface

- **Reviewed:** 2026-05-29
- **Lens:** neutral
- **Scope:** single file
- **Verdict:** CONDITIONAL PASS

## Summary
The plan has a clear strategic intent: reduce Studio complexity by archiving historical material and rebuilding the active workspace around a new canonical structure. The main gaps are execution-critical: the archive scope is limited to markdown, and the archive topology is described in more than one way.

## Strengths
- The target outcome is explicit and easy to understand.
- The phase breakdown gives the migration a sensible order.
- The risk section acknowledges the main tradeoffs instead of treating the reset as free.

## Findings

| # | Severity | File | Lens | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | 🟠 major | [plan-6-archive-first-studio-reset.md](plan-6-archive-first-studio-reset.md#L82) | Completeness | The archive step only moves markdown files, but the plan also removes active project folders and later reintroduces projects. That leaves non-markdown project artifacts undefined, so rehydration cannot be guaranteed from the archive as written. | Define the full per-project artifact scope, including what is archived, regenerated, or intentionally discarded. |
| 2 | 🟠 major | [plan-6-archive-first-studio-reset.md](plan-6-archive-first-studio-reset.md#L42) | Internal Consistency | The archive layout is not canonical yet: the proposed typed tree under `archive/projects`, `archive/specs`, `archive/plans`, and `archive/notes` conflicts with the later option to keep a single archive root and with the instruction to preserve original folder relationships. | Choose one archive topology and one mapping rule for how archived content will be rehydrated later. |
| 3 | 🟡 minor | [plan-6-archive-first-studio-reset.md](plan-6-archive-first-studio-reset.md#L159) | Completeness | The plan says the new Studio structure will be “loaded by default,” but it never names the mechanism or owner for changing the default loading path, so the acceptance criterion is hard to verify. | Specify the exact file or config that controls the default entry surface and who updates it. |

Severity scale: 🔴 critical · 🟠 major · 🟡 minor · 💡 suggestion

## Open Questions
1. Which artifacts, besides markdown, must be archived to make one project rehydration possible?
2. Which archive topology is canonical: typed subfolders, original folder mirroring, or a single root?
3. Which file or config establishes the default Studio load path after Phase 2?

## Verdict Rationale
Two execution-critical gaps remain: archive scope is incomplete, and archive structure is not settled. The plan is directionally sound, but it needs those decisions locked before it can be executed safely.