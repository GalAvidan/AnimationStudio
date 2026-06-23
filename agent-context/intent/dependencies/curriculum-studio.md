# CurriculumStudio

CurriculumStudio commissions curriculum animations through an `as-out` v3
`animation-brief.md` stored in Vault and linked by the exchange request.

## Required v3 sections

- Title
- Class ID
- Module objective
- Target audience
- Key message
- Content beat contract
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

Return `CONTENT_CONTRACT_INCOMPLETE` when an essential content decision is
missing. Return or flag `FABRICATED_CLAIM` when a proposed production statement
cannot be traced to `## Approved claims`.
