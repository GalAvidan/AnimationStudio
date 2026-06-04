# Skill: Audio Pipeline

## Purpose

Extend the Script → Spec pipeline with a narration and audio layer:

```
Spec (approved)
  → create-audio-plan    → audio/plan.json           (gate: user approval)
  → generate-narration   → audio/narration/*.wav      (gate: hash cache)
  → align-narration      → audio/alignment/*.json     (non-interactive)
  → select-music-and-sfx → audio/music/*.mp3 + sfx/  (gate: license check)
  → compile-timeline     → audio/compiled.timeline.json (deterministic)
  → build-animation      reads compiled.timeline.json alongside the spec
```

The compiled timeline becomes the **single source of truth** for audio layout in the Remotion composition.

## Inputs

- Approved spec (`specs/<variant>.spec.md`) with beats and sync points.
- `audio/plan.json` with voice/music/sfx intent.
- Generated narration/alignment artifacts when available.

## Outputs

- Deterministic `audio/compiled.timeline.json` ready for composition mounting.
- Resolved narration/music/sfx file references and timing anchors.
- Clear failure reports when assets/anchors are missing.

## Failure Modes

- Missing or invalid `audio/plan.json`.
- Missing narration/audio assets referenced by plan/timeline.
- Invalid sync anchor references (missing sync id or word index).
- License/source metadata absent for selected music or SFX assets.

---

## Five-Layer Architecture

| Layer | Task | Input | Output |
|---|---|---|---|
| 1. Planner | `create-audio-plan` | Approved spec | `audio/plan.json` |
| 2. TTS generator | `generate-narration` | plan.json + script | `audio/narration/*.wav` |
| 3. Alignment | `align-narration` | WAVs + transcript | `audio/alignment/*.json` |
| 4. Asset selector | `select-music-and-sfx` | plan.json | Track + SFX file refs |
| 5. Compiler | `compile-timeline` | Spec + alignment + plan | `audio/compiled.timeline.json` |

---

## Artifact Layout

Inside every project at `projects/<name>/`:

```
audio/
  plan.json               ← authored (version-controlled)
  narration/              ← generated WAVs, gitignored
    <beatId>.wav
  alignment/              ← word timings JSON, gitignored
    <beatId>.json
  music/                  ← selected/downloaded beds, gitignored
    <sceneId>.mp3
  sfx/                    ← selected/downloaded SFX, gitignored
    <cueId>.wav
  compiled.timeline.json  ← generated, gitignored
```

`plan.json` is the only file in `audio/` that is committed. All other files are
regenerated from it and are excluded via `.gitignore`.

Types for all files live in `@studio/audio-spec` (`packages/audio-spec/`).

---

## Idempotency Rules

Every step must be safe to re-run:

1. **Hash-based caching for TTS.** `generate-narration` computes a SHA-256 of
   `(narrationText + voiceId + serialisedVoiceProfile)` per beat. It skips
   generation if `audio/narration/<beatId>.wav` exists *and* `contentHash` matches.
   Only changed beats are regenerated.

2. **Deterministic compiler.** `compile-timeline` must produce the same output for
   the same inputs. Sort scenes and beats by id before writing JSON. Include
   `compiledAt` but treat it as metadata, not a content key.

3. **Prefer authored timing over inferred.** If a beat's `start`/`end` was
   hand-set (i.e. it existed in the spec before any audio was generated),
   keep those values and pad the narration clip to fit. If timing is
   *not* hand-set, derive it from `clipDuration + tailPad` and cascade
   subsequent beats.

4. **Fail loudly on missing assets.** Never silently drop a narration clip or
   SFX cue. If a file ref cannot be resolved, halt compilation and report the
   missing path. A video with misaligned audio is worse than no audio.

5. **Voice pinning.** Once `plan.json` is approved and TTS runs, never silently
   swap voice profiles. If a `VoiceProfile` changes, the hash changes and only
   the affected beats are regenerated.

---

## Timing Derivation

```
beat.endSeconds = beat.startSeconds + clip.durationSeconds + tailPad
nextBeat.startSeconds = beat.endSeconds
```

Default `tailPad` is **0.3 s** unless overridden in `MixingSettings`.

Beats in a spec may declare only `duration` (relative) rather than absolute
`start`/`end`. The compiler cascades them left-to-right after TTS.

---

## SFX Anchoring

Use the most specific anchor that makes intent clear:

| When | Use |
|---|---|
| SFX should hit on a specific word | `{ type: "word-index", beatId, wordIndex }` |
| SFX is generally at a beat boundary | `{ type: "beat-offset", beatId, offsetSeconds }` |
| SFX aligns to a named spec moment | `{ type: "sync-point", syncPointId }` |

Beat ids are the stable key — they survive narration edits. Avoid anchoring by
word text (words change); anchor by word index instead.

---

## Music Ducking

Music volume while narration is playing:
```
musicVolume = bed.volume * plan.mixing.musicDuckingRatio   (default 0.25)
```

Duck windows are computed from the compiled narration clips. Between clips
(pauses), music returns to full volume over a 0.3 s ramp.

---

## Free Tooling Choices

| Purpose | Recommended tool | Notes |
|---|---|---|
| TTS (default) | **Piper** | Single binary + voice file; offline; fast on CPU |
| TTS (characters / cloning) | **Coqui XTTS-v2** | Voice cloning from a short sample; GPU optional |
| TTS (placeholder) | **eSpeak NG** | Robotic but instant; useful during script iteration |
| Forced alignment | **faster-whisper** with `word_timestamps=True` | Runs locally; accurate for SFX + caption sync |
| Precise alignment | **Montreal Forced Aligner** | Use if lip-sync is needed |
| Music (curated pack) | **Incompetech (CC-BY)**, **Pixabay Music**, **Free Music Archive** | Download and tag by mood; agent selects from local pack |
| Music (generative) | **MusicGen** (Meta open weights) | V3+ only; GPU recommended |
| SFX | **Freesound.org API** + **Pixabay SFX** | Cache in `audio/sfx/`; record source URL + license |
| Mixing / muxing | **FFmpeg** | Ducking, LUFS normalization, final mux with rendered video |
| In-engine audio | Remotion `<Audio>` + `<Sequence>` | Use for narration placement; FFmpeg for post-processing |

All tools are free, open source, and cross-platform (Windows / macOS / Linux).

---

## Decision Rules for the Agent

1. **Ask once before generating.** Confirm voice profile and music mood per scene
   before any TTS runs. One approval gate prevents wasted regenerations.

2. **Never change voice IDs silently.** If the user asks to change a voice, update
   `plan.json` and regenerate only the affected beats.

3. **Re-run compile-timeline after any asset change.** It is cheap and deterministic.

4. **Prefer Piper for narration** unless the project has characters that need voice
   cloning (XTTS) or the user explicitly requests a different engine.

5. **License check before downloading.** Music and SFX must come from the curated
   allow-list or a source with a confirmed free-to-use license. Record `sourceUrl`
   and `license` in every resolved cue and bed so the project is auditable.

6. **Do not mix audio inside Remotion** when FFmpeg ducking or LUFS normalization is
   needed. Produce a pre-mixed stereo track and reference it as a single `<Audio>`
   in the composition.

---

## Non-Goals (MVP)

- No cloud TTS APIs (ElevenLabs, Azure) — these are V5+ opt-ins.
- No generative music (MusicGen) — V3+ opt-in.
- No automatic lip-sync / phoneme-driven rig animation — V3+ opt-in.
- No multi-language or SSML in the initial pass.
