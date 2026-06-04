# Decision 0005: Campaign Membership Model

## Status

Accepted

## Context

AnimationStudio projects started as standalone units. As the Vault grew, a need emerged for related animation projects to share characters, voices, style tokens, and handoff assets across multiple episodes or series — a "campaign".

Two approaches were considered:

1. **Hard dependency:** projects import campaign assets as pnpm workspace packages, enforced at build time.
2. **Opt-in alias model:** projects declare `campaign.slug` in `project.config.ts`; the agent resolves aliases at runtime and degrades gracefully when the campaign is absent.

Option 1 was rejected because it couples the AnimationStudio framework repo to specific Vault content, preventing the framework from being a standalone layer. Option 2 keeps the framework repo content-free.

## Decision

Use the opt-in alias model:

- `project.config.ts` may include a `campaign: { slug, subProjectId }` field. Absence means standalone.
- The `campaign-resolution` skill resolves `{campaign_*}` aliases from `Vault/campaigns/{slug}/` at task start and freezes them for the duration.
- If `Vault/campaigns/{slug}/manifest.md` is not found, the skill emits a `CAMPAIGN_NOT_FOUND` warning and continues in standalone mode — never hard-failing.
- The framework repo never contains campaign content; all campaign assets live in `Vault/campaigns/`.

## Consequences

- New projects are standalone by default; campaign membership is additive.
- Agents always produce valid output even if the campaign content is missing or not yet created.
- Campaign paths are defined once in `agent-context/intent/dependencies/campaign.md` and resolved via `agent-context/skills/cross/campaign-resolution.skill.md`.
- Adding a project to a campaign requires only a `campaign.slug` field in `project.config.ts` — no build system changes.
