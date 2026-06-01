---
dependency: campaign
studio: AnimationStudio
backing: vault                      # vault | github | azure | linear
updated: 2026-06-01
---

# Campaign Dependency — AnimationStudio

## Path Aliases

```
{campaigns}:         Vault/campaigns
{campaign_root}:     Vault/campaigns/{campaign-slug}
{campaign_handoffs}: Vault/campaigns/{campaign-slug}/handoffs
{campaign_shared}:   Vault/campaigns/{campaign-slug}/shared
{campaign_chars}:    Vault/campaigns/{campaign-slug}/shared/characters
{campaign_voices}:   Vault/campaigns/{campaign-slug}/shared/voices
{campaign_style}:    Vault/campaigns/{campaign-slug}/shared/style
```

`{campaign-slug}` is resolved at runtime from the project's `campaign.slug` field in `project.config.ts`.

## Membership Contract

AnimationStudio projects declare campaign membership in `project.config.ts`:

```typescript
campaign: {
  slug: "<campaign-slug>",        // optional field; see spec-types CampaignRef
  subProjectId: "<id>",
}
```

A project without a `campaign` field is standalone.

## Alias Resolution

1. Check `project.config.ts` for a non-empty `campaign.slug` field.
2. If present: set `{campaign-slug}` = `campaign.slug`.
3. Confirm `Vault/campaigns/{campaign-slug}/manifest.md` exists.
   - If not found: emit `CAMPAIGN_NOT_FOUND` warning and degrade to standalone mode.
4. Aliases are frozen for the duration of the task — do not re-resolve mid-task.

## Shared Resource Resolution

Character and voice references in `project.config` use stable IDs + version:

```typescript
characters: [
  { id: "01-robot-kid", version: "v1", campaignRef: true }
]
```

The agent resolves `{campaign_chars}/01-robot-kid/v1/char.md` to load spec + asset paths.
Omit `version` to use the version declared as current in `manifest.md` shared resources table.

## Access Model

- READ:  manifest.md, sub-projects.md, shared/*, handoffs/* (consume handoff as input)
- WRITE: sub-projects.md (register new animation sub-project at creation time)
- NEVER WRITE: handoffs/ (ResearchStudio writes; AnimationStudio reads), shared/* (campaign author)

## Backing System Notes

Current: Vault file-based. Same migration path as ResearchStudio `campaign.md`.

## Load Order

Load after `vault.md`. Required only when working on a project that declares a `campaign` field.
