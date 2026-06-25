# Task: Create Script

## Use When

- Turn an idea or rough explanation into an animation script.
- For a curriculum commission, turn an approved `as-out` v3 content brief into
  the production narration/dialogue script.

## Load

- `agent-context/intent/dependencies/vault.md`
- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/skills/core/visual-clarity.skill.md`
- `agent-context/skills/core/narrative-structure.skill.md`
- For curriculum commissions:
  - `agent-context/intent/dependencies/curriculum-studio.md`
  - `agent-context/skills/core/content-contract-traceability.skill.md`
  - linked `animation-brief.md`

## Inputs

| Input | Required | Notes |
|---|---|---|
| Project name and variant | yes | Existing AnimationStudio project |
| Audience, runtime, and tone | yes | May come from the v3 brief |
| Content brief | curriculum commissions | Exact linked `as-out` v3 artifact |
| Cast | narrative projects | Character IDs and labels |

## Steps

1. Determine whether this is standalone work or a curriculum commission.
2. For a commission, validate the brief header and required v3.1 sections before
   drafting. Stop if any subject-matter decision is unresolved.
3. Identify the core message and author concise narration or dialogue in plain
   language. AnimationStudio owns voice, metaphor, staging, and pacing.
4. Mark likely visual beats without specifying implementation details.
5. For commissioned work, add a traceability row for every production beat:
   content beat IDs, approved claim IDs, treatment guardrail IDs, and the
   acceptance checks it covers.
6. Run content-contract traceability. Do not browse for subject-matter facts or
   introduce a factual assertion outside `## Approved claims`; do not teach
   against `## Instructional treatment guardrails`.
7. Save to `{projects}/<name>/scripts/<variant>.script.md` and update status to
   `scripted`.

## Hard failures for commissioned work

- `HANDOFF_VERSION_MISMATCH` — brief is not supported `as-out` v3.
- `CONTENT_CONTRACT_INCOMPLETE` — the script would require research or a missing
  factual/pedagogical decision.
- `FABRICATED_CLAIM` — a production statement is outside the approved claim set.
- `INSTRUCTIONAL_TREATMENT_MISMATCH` — the script is factually traceable but
  teaches against a treatment guardrail.
- An acceptance check has no mapped production beat.

## Output

A readable, traceable production script ready for `create-spec`.
