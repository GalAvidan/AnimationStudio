# Task: Create Audio Plan

## Use When

The user has an approved spec and wants to set up the audio layer — voices, music moods, and SFX cues — before any TTS generation runs.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/skills/core/audio-pipeline.skill.md`
- `agent-context/skills/core/narrative-structure.skill.md`

## Inputs

| Input | Default | Notes |
|---|---|---|
| Project name | — | Required. Kebab-case. |
| Variant | `general` | Must match a `variants[].id` in `project.config.ts`. |

## Steps

1. Read `{projects}/<name>/project.config.ts` to confirm the slug, variant, and character ids.
2. Read `{projects}/<name>/specs/<variant>.spec.md` to extract:
   - All scene ids and labels from the Beat Map.
   - All character ids from the Cast table (if any).
   - Mood or tone indicators from the Visual Philosophy section.
3. Read `{projects}/<name>/scripts/<variant>.script.md` to check for `[SPEAKER: ...]` markers and narration text.
4. Build a draft `AudioPlan` (see `@studio/audio-spec`):
   - Populate `voices` with one `VoiceProfile` per character id found in step 2, plus a `"_narrator"` entry for beats without a speaker. Default all to `engine: "piper"`, `voiceId: "en_US-lessac-medium"`.
   - Populate `scenes[]` — one entry per scene, each with a `music` block. Infer `mood` from the spec's Visual Philosophy (e.g. "calm + educational" → `"neutral"`, "tense reveal" → `"tense"`). Leave `trackRef` empty (the agent will resolve it during `select-music-and-sfx`). Leave `sfx: []` for now.
   - Set `mixing` defaults: `musicDuckingRatio: 0.25`, `targetLufs: -16`.
5. Present the draft plan to the user for review. Summarise:
   - Voices proposed per character.
   - Music mood per scene.
   - Any scenes where the mood could not be inferred (flag these explicitly).
6. **Wait for user approval.** Do not generate any TTS or download any assets until the user confirms.
7. After approval (with any edits the user provides), write the plan to `{projects}/<name>/audio/plan.json`. Replace `"project-name"` and `"general"` stub values with the real slug and variant.

## Validation

- Every `Beat.speaker` value in the spec must appear as a key in `plan.voices`.
- `_narrator` must always be present in `plan.voices`.
- Every scene id in `plan.scenes` must appear in the spec.
- `version` must be `"1"`.

## Ask If Missing

- Project name and variant.
- If a character's preferred voice style is not clear from the spec (ask: "What voice style should the hero use? e.g. warm, authoritative, young").
- If music mood cannot be inferred from the spec (ask per scene).

## Output

An authored plan at `{projects}/<name>/audio/plan.json`, ready for `generate-narration`.

## Next Step

```
Run generate-narration to produce TTS clips for each beat.
```
