# Task: Emit Commission Response

## Use When

- "Respond to commission request"
- "Mark commission request done"
- "Return failure response to requester"

## Load

1. `agent-context/intent/dependencies/vault.md`
2. `Vault/hub/hub-comunications-queues/exchange/_schemas/response.schema.md`
3. `Vault/hub/hub-comunications-queues/exchange/_schemas/status-codes.md`
4. `Vault/hub/hub-comunications-queues/exchange/_indexes/open-requests.md`
5. `Vault/hub/hub-comunications-queues/exchange/_indexes/duplicate-guard.md`
6. `Vault/hub/hub-comunications-queues/exchange/_indexes/recent-completions.md`

## Inputs

| Input | Required | Notes |
|---|---|---|
| Request file path | Yes | Canonical request in AnimationStudio inbox |
| Response status | Yes | `done` or `failed` |
| Evidence links | Yes | Render/manifest or failure artifacts |
| reason_code | Conditional | Required when status is `failed` |
| next_action | Conditional | Required when status is `failed` |
| blocking_link | Conditional | Required when status is `failed` |
| escalation_owner | Conditional | Required when status is `failed` |

## Steps

1. Parse request metadata from canonical request file.
2. Build response frontmatter payload.
3. If status is `failed`, enforce required failed payload fields.
4. Write response to `{exchange_outbox}` with filename `<commission-id>-<request-id>-response.md`.
5. Write mirrored response to requester inbox path (`Vault/hub/hub-comunications-queues/exchange/CurriculumStudio/inbox/` for Curriculum requests).
6. Remove request row from `open-requests.md`.
7. Remove duplicate tuple from `duplicate-guard.md`.
8. Append row to `recent-completions.md`.

## Output

- `{exchange_outbox}/<commission-id>-<request-id>-response.md`
- Requester inbox mirrored response file
- Updated exchange indexes

## Failure Modes

| Condition | Action |
|---|---|
| Request missing | Stop with `COMMISSION_NOT_FOUND` |
| Failed payload incomplete | Stop with `BRIEF_INVALID` |
