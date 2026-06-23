# Task: Intake Commission Request

## Use When

- Check the animation inbox or claim a queued commission.

## Load

1. Vault dependency and exchange schemas/indexes.
2. For CurriculumStudio requests, the CurriculumStudio dependency contract.
3. The linked `animation-brief.md`.

## Validation

- Request envelope has required identity and a unique
  `commission_id + project_slug + episode_or_module` tuple.
- Curriculum requests link an `as-out` v3 brief.
- All v3 required sections exist.
- The brief has an approved claim set, required example, correction, forbidden
  claims, caveats, and acceptance checks.
- No unresolved knowledge choice is assigned to AnimationStudio.

## Steps

1. Validate the request and duplicate key.
2. Validate the linked curriculum brief when present.
3. Assign the next receiver-owned `rq-XXXX` ID.
4. Write the canonical inbox request with status `processing` and preserve the
   source brief link.
5. Update open-request and duplicate-guard indexes.
6. The next action is project creation followed by `create-script`; do not route
   a v3 brief directly to `create-spec`.

## Failures

| Condition | Result |
|---|---|
| Missing request field or brief section | `BRIEF_INVALID` |
| Unsupported major contract version | `HANDOFF_VERSION_MISMATCH` |
| Unresolved subject-matter decision | `CONTENT_CONTRACT_INCOMPLETE` |
| Duplicate tuple | `DUPLICATE_REQUEST` |
| Commission not found | `COMMISSION_NOT_FOUND` |

## Output

- Canonical inbox request and updated exchange indexes.
