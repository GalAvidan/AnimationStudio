# ADR 0006 — Consume Closed Lesson-Content Contracts

- **Status:** Approved
- **Date:** 2026-06-23
- **Deciders:** studio owner

## Context

CurriculumStudio previously sent a prewritten production script and a brief that
also prescribed visual cues. That duplicated AnimationStudio's Script → Spec →
Build workflow and blurred responsibility for narration and visual storytelling.

## Decision

For curriculum commissions, AnimationStudio consumes `as-out` v3 lesson-content
briefs. The brief is a closed factual boundary containing semantic content beats,
approved claims, examples, misconceptions, caveats, forbidden claims, and
acceptance checks.

AnimationStudio owns production scripting, visual specification, implementation,
and rendering. It may creatively transform the content but may not perform
subject-matter research, resolve missing knowledge, or add unsupported factual
claims. An incomplete brief is returned as `CONTENT_CONTRACT_INCOMPLETE`.

## Consequences

- Commissioned scripts trace production beats to approved claim IDs.
- Intake rejects unsupported contract versions and incomplete v3 briefs.
- Standalone creative projects may still begin from user ideas; the closed-claim
  rules apply when a curriculum content brief is present.
