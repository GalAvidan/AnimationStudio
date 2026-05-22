# Task: Select Music and SFX

## Use When

The `audio/plan.json` has scene music moods and/or SFX cues that reference queries or placeholders rather than resolved file paths.

## Load

- `agent-context/skills/core/audio-pipeline.skill.md`

## Inputs

| Input | Default | Notes |
|---|---|---|
| Project name | — | Required. Kebab-case. |
| Variant | `general` | Must match a `variants[].id` in `project.config.ts`. |

## Prerequisites

- `projects/<name>/audio/plan.json` exists and is approved.
- FFmpeg is available on PATH (used to verify audio file integrity).

## Allowed Sources (Free Only)

Music:
- **Incompetech** (`incompetech.com`) — CC-BY. Download MP3, record `sourceUrl` and `license: "CC-BY 4.0"`.
- **Pixabay Music** (`pixabay.com/music/`) — Pixabay License (free, no attribution required for web use).
- **Free Music Archive** (`freemusicarchive.org`) — filter by CC license.
- **YouTube Audio Library** — free with or without attribution depending on track.
- Local files already inside `projects/<name>/audio/music/` — use as-is.

SFX:
- **Freesound.org** API (`freesound.org/apiv2/`) — free with registration; most content is CC0 or CC-BY.
- **Pixabay SFX** (`pixabay.com/sound-effects/`) — Pixabay License.
- **BBC Sound Effects** (`sound-effects.bbcrewind.co.uk`) — personal / non-commercial use.
- Local files already inside `projects/<name>/audio/sfx/` — use as-is.

Do not use any source that requires a paid subscription or API key with a billing tier.

## Steps

1. Read `projects/<name>/audio/plan.json`.
2. For each scene `music` entry:
   a. If `trackRef` is already a valid relative path to an existing file, skip.
   b. Otherwise, use the `mood` and `intensity` fields to query the allowed sources. Prefer Pixabay Music (no attribution required). Search query example: `"<mood> background music"`.
   c. Present the top 3 candidates (title, source, duration, license) to the user and ask for confirmation before downloading.
   d. On confirmation, download to `projects/<name>/audio/music/<sceneId>.mp3`.
   e. Update `plan.json` `trackRef`, `sourceUrl`, and `license` for this scene. Write the updated plan back.
3. For each `sfx` cue:
   a. If `fileRef` is already a valid relative path to an existing file, skip.
   b. Otherwise, treat `fileRef` as a search query. Query Freesound or Pixabay SFX.
   c. Present the top 3 candidates to the user; confirm before downloading.
   d. Download to `projects/<name>/audio/sfx/<cueId>.wav`.
   e. Update `plan.json` `fileRef`, `sourceUrl`, and `license` for this cue.
4. Run `compile-timeline` automatically after all assets are resolved (or prompt the user to do so).

## Validation

- Every selected track/clip must have a confirmed free license. If uncertain, do not download — ask the user.
- Record `sourceUrl` and `license` in `plan.json` for every asset. Missing attribution is a blocker for `compile-timeline`.

## Output

- Downloaded files in `audio/music/` and `audio/sfx/`.
- Updated `plan.json` with resolved `trackRef`, `fileRef`, `sourceUrl`, and `license` fields.

## Next Step

```
Run compile-timeline to merge music and SFX into the final audio timeline.
```
