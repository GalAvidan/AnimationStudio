# CurriculumStudio

CurriculumStudio commissions curriculum animations through an `as-out` v3.1
`animation-brief.md` stored in Vault and linked by the exchange request.

## Required v3 sections

- Title
- Class ID
- Module objective
- Target audience
- Key message
- Content beat contract
- Instructional treatment guardrails
- Approved claims
- Required example
- Misconception correction
- Forbidden claims
- Gaps and caveats
- Source list
- Production constraints

## Boundary

The brief is a closed subject-matter contract. AnimationStudio owns narration,
dialogue, visual metaphor, staging, timing, design, implementation, and render.
It does not browse for lesson facts or silently repair content gaps.
The treatment guardrails are also closed: AnimationStudio owns the storyboard
and creative realization, but it may not teach a different mental model,
misapply a metaphor, or drop required misconception pressure.

Return `CONTENT_CONTRACT_INCOMPLETE` when an essential content decision is
missing. Return or flag `FABRICATED_CLAIM` when a proposed production statement
cannot be traced to `## Approved claims`.
Return or flag `INSTRUCTIONAL_TREATMENT_MISMATCH` when the script or spec is
factually traceable but violates an approved treatment guardrail.
