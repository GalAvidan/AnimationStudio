# Skill: Content Contract Traceability

## Purpose

Keep a commissioned production script faithful to an `as-out` v3 content brief
without constraining creative realization.

## Steps

1. Parse the brief's content beats, approved claim IDs, required example,
   misconception correction, forbidden claims, caveats, and acceptance checks.
2. Map each production script beat to one or more content beat IDs and approved
   claim IDs.
3. Verify that every factual narration or dialogue statement is supported by the
   mapped approved claims.
4. Verify that every content-beat acceptance check is covered somewhere in the
   production script.
5. Verify the required example and misconception correction are preserved.
6. Flag any forbidden implication even if its wording is not copied verbatim.
7. If required meaning cannot be scripted from the brief alone, stop with
   `CONTENT_CONTRACT_INCOMPLETE`; do not browse for subject matter.

## Output

- Complete script traceability table.
- Uncovered acceptance checks, if any.
- `FABRICATED_CLAIM` or `CONTENT_CONTRACT_INCOMPLETE` failures, if any.
