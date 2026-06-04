# Skill: Campaign Resolution

## Purpose

Resolve the `{campaign-slug}` alias from a project's `project.config.ts` into a frozen map of campaign path aliases, or return a `STANDALONE` signal when no campaign is declared. This skill is the single authoritative source for campaign alias resolution — all tasks that need campaign paths must invoke this skill rather than re-implementing the lookup.

## Inputs

| Field | Type | Required | Notes |
|---|---|---|---|
| `campaign.slug` | `string` | No | Read from `project.config.ts`; absence means standalone |
| `characters[]` | `array` | No | Optional list of character refs with `id`, `version`, `campaignRef` |

## Outputs

### Success — Campaign found

A frozen alias map:

```
{
  campaign_root:      Vault/campaigns/{campaign-slug}
  campaign_handoffs:  Vault/campaigns/{campaign-slug}/handoffs
  campaign_shared:    Vault/campaigns/{campaign-slug}/shared
  campaign_chars:     Vault/campaigns/{campaign-slug}/shared/characters
  campaign_voices:    Vault/campaigns/{campaign-slug}/shared/voices
  campaign_style:     Vault/campaigns/{campaign-slug}/shared/style
}
```

### No campaign field — Standalone

Return signal: `STANDALONE`. No warning. Continue task in standalone mode.

### Campaign slug present but manifest missing — Degraded standalone

Return signal: `STANDALONE` with warning:

```
CAMPAIGN_NOT_FOUND: manifest not found at Vault/campaigns/<slug>/manifest.md
Degrading to standalone mode. Campaign assets will not be available.
```

Continue task. Never hard-fail.

## Rules

1. Check `project.config.ts` for a non-empty `campaign.slug` field.
2. If absent → return `STANDALONE`, no warning.
3. If present → confirm `Vault/campaigns/{campaign-slug}/manifest.md` exists.
   - If not found → emit `CAMPAIGN_NOT_FOUND` warning, return `STANDALONE`.
   - If found → build the alias map above and return it.
4. Aliases are **frozen for the duration of the task** — do not re-resolve mid-task.
5. If `manifest.md` is unreadable or malformed → treat as not-found (same as step 3 missing case).
6. Character refs with `campaignRef: true` resolve to `{campaign_chars}/{id}/{version}/char.md`. If `version` is omitted, use the version declared as current in `manifest.md`.

## Failure Modes

| Condition | Action |
|---|---|
| No `campaign` field | Return `STANDALONE`, no warning |
| Slug present, manifest absent | Warn `CAMPAIGN_NOT_FOUND`, return `STANDALONE`, continue |
| Manifest unreadable | Same as absent — warn and degrade |
| Character ref version missing | Use manifest current version |

## References

- `agent-context/intent/dependencies/campaign.md` — full path alias definitions and membership contract
- `agent-context/map/adapter-registry.md` — adapter resolution (separate concern; runs after this skill)
