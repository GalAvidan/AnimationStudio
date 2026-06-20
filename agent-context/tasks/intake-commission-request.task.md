# Task: Intake Commission Request

## Use When

- "Check animation inbox"
- "Intake new commission request"
- "Claim next queued request"

## Load

1. `agent-context/intent/dependencies/vault.md`
2. `agent-context/intent/conventions.md`
3. `Vault/studios/exchange/_schemas/request.schema.md`
4. `Vault/studios/exchange/_schemas/status-codes.md`
5. `Vault/studios/exchange/_indexes/open-requests.md`
6. `Vault/studios/exchange/_indexes/duplicate-guard.md`

## Inputs

| Input | Required | Notes |
|---|---|---|
| Source request file path | Yes | Path in sender outbox, usually CurriculumStudio outbox |

## Steps

1. Confirm source request file exists and validates required schema fields.
2. Build duplicate key tuple: `commission_id + project_slug + episode_or_module`.
3. Check `duplicate-guard.md` for active matching tuple:
   - If match exists, write failed response with `reason_code=DUPLICATE_REQUEST` and stop.
4. Determine next sequential request ID for AnimationStudio inbox queue:
   - Read existing canonical request files in `{exchange_inbox}`.
   - Assign next ID in `rq-XXXX` format.
5. Write canonical request file to `{exchange_inbox}` with filename `<commission-id>-<request-id>-request.md`.
6. Set status to `processing` and update `updated_at`.
7. Append row to `open-requests.md`.
8. Append tuple to `duplicate-guard.md`.
9. Mirror reference in `{exchange_outbox}` if needed for local audit.

## Output

- `{exchange_inbox}/<commission-id>-<request-id>-request.md`
- `Vault/studios/exchange/_indexes/open-requests.md` (updated)
- `Vault/studios/exchange/_indexes/duplicate-guard.md` (updated)

## Failure Modes

| Condition | Action |
|---|---|
| Missing required schema field | Stop with `BRIEF_INVALID` |
| Duplicate tuple open | Stop with `DUPLICATE_REQUEST` |
| Commission not found | Stop with `COMMISSION_NOT_FOUND` |
