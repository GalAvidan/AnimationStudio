# Task: Generate Narration

## Use When

The user has an approved `audio/plan.json` and wants to produce TTS audio clips for each beat.

## Load

- `agent-context/skills/core/audio-pipeline.skill.md`

## Inputs

| Input | Default | Notes |
|---|---|---|
| Project name | — | Required. Kebab-case. |
| Variant | `general` | Must match a `variants[].id` in `project.config.ts`. |
| Force regenerate | `false` | If `true`, ignore the content-hash cache and regenerate all beats. |

## Prerequisites

- `projects/<name>/audio/plan.json` must exist and be approved.
- The TTS engine specified in each `VoiceProfile.engine` must be installed:
  - **piper** — `piper` binary on PATH; voice ONNX + config files accessible.
  - **xtts** — `tts` CLI from Coqui TTS installed; `referenceAudio` set in `VoiceProfile` if voice cloning.
  - **espeak** — `espeak-ng` on PATH.

## Steps

1. Read `projects/<name>/audio/plan.json` to get `voices` and the spec's narration text.
2. Read `projects/<name>/specs/<variant>.spec.md` to get all beats with `narration` text, `speaker`, and ids.
3. For each beat that has narration text:
   a. Determine the `VoiceProfile` to use: `voices[beat.speaker ?? "_narrator"]`.
   b. Compute the **content hash**: `sha256(narrationText + voiceId + JSON.stringify(voiceProfile))`.
   c. Check if `projects/<name>/audio/narration/<beatId>.wav` already exists. If it does, compare the stored `contentHash` in the alignment file (if present) against the computed hash. Skip if matching and `forceRegenerate` is false.
   d. Run the TTS engine to produce a WAV file at `projects/<name>/audio/narration/<beatId>.wav`:
      - **piper:** `echo "<narrationText>" | piper --model <voiceId> --output_file audio/narration/<beatId>.wav`
      - **xtts:** `tts --text "<narrationText>" --model_name tts_models/multilingual/multi-dataset/xtts_v2 --speaker_wav <referenceAudio> --out_path audio/narration/<beatId>.wav`
      - **espeak:** `espeak-ng -w audio/narration/<beatId>.wav "<narrationText>"`
   e. Measure the output file duration (e.g. `ffprobe -i audio/narration/<beatId>.wav -show_entries format=duration`).
   f. Record the result (beatId, fileRef, contentHash, durationSeconds, words: []) for the compiler to consume.
4. Report a summary: beats generated vs. skipped (cached).

## Output

WAV files at `projects/<name>/audio/narration/<beatId>.wav` for every beat with narration.

## Next Step

```
Run align-narration to produce word-level timestamps.
Run compile-timeline to build the audio timeline (alignment is optional for MVP).
```
