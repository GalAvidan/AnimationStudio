# Skill: Content Contract Traceability

## Purpose

Keep a commissioned production script faithful to an `as-out` v3.1 content
brief without constraining creative realization.

## Steps

1. Parse the brief's content beats, instructional treatment guardrails, approved
   claim IDs, required example, misconception correction, forbidden claims,
   caveats, and acceptance checks.
2. Map each production script beat to one or more content beat IDs and approved
   claim IDs, plus any relevant treatment guardrail IDs.
3. Verify that every factual narration or dialogue statement is supported by the
   mapped approved claims.
4. Verify that every treatment guardrail is preserved by the script's teaching
   structure and visual intent markers.
5. Verify that every content-beat acceptance check is covered somewhere in the
   production script.
6. Verify the required example and misconception correction are preserved.
7. Flag any forbidden implication even if its wording is not copied verbatim.
8. If required meaning cannot be scripted from the brief alone, stop with
   `CONTENT_CONTRACT_INCOMPLETE`; do not browse for subject matter.

## Output

- Complete script traceability table.
- Uncovered acceptance checks, if any.
- `FABRICATED_CLAIM`, `INSTRUCTIONAL_TREATMENT_MISMATCH`, or
  `CONTENT_CONTRACT_INCOMPLETE` failures, if any.
