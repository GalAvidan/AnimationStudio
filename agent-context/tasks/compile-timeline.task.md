# Task: Compile Timeline

## Use When

Narration WAVs (and optionally alignment JSON files) exist and the user wants to produce the final `audio/compiled.timeline.json` that the Remotion composition will read.

## Load

1. Load `agent-context/intent/vault.md`.
- `agent-context/skills/core/audio-pipeline.skill.md`

## Inputs

| Input | Default | Notes |
|---|---|---|
| Project name | — | Required. Kebab-case. |
| Variant | `general` | Must match a `variants[].id` in `project.config.ts`. |
| Tail pad (seconds) | `0.3` | Silence added after each narration clip before the next beat starts. |

## Prerequisites

- `{projects}/<name>/audio/plan.json` is present and valid.
- `{projects}/<name>/specs/<variant>.spec.md` is the approved spec (source of scenes + beats + sync points).
- At least one narration WAV exists in `audio/narration/`.
- FFmpeg is on PATH (used to measure WAV durations via `ffprobe`).

## Algorithm

This task is **deterministic and non-interactive**. Re-running it always produces
the same output for the same inputs.

```
1. Read spec:   scenes[], beats[] (each with id, narration, start?, end?, speaker?, emotion?)
2. Read plan:   voices{}, scenes[]{music, sfx[]}, mixing{}
3. Read WAVs:   for each beat, measure durationSeconds via ffprobe (or read cached value)
4. Read alignment: load audio/alignment/<beatId>.json if it exists; otherwise words: []

5. Compile beats (left-to-right cascade):
   cursor = 0
   for each scene, for each beat:
     clip = WAV for beat (null if no narration)
     startSeconds = cursor
     if clip:
       endSeconds = startSeconds + clip.durationSeconds + tailPad
     else:
       # 2.0 s is a reasonable on-screen pause for a silent beat (title card,
       # transition hold). Adjust per-beat via plan.json if a different duration
       # is needed; the compiler honours an authored beat.end when present.
       endSeconds = startSeconds + (beat.authoredDuration ?? 2.0)
     cursor = endSeconds

     Build CompiledBeat {
       beatId, startSeconds, endSeconds,
       narration: NarrationClip { fileRef, contentHash, durationSeconds, words (from alignment) },
       sfxCues: resolved SFX for this beat (see SFX resolution below)
     }

6. Resolve music beds:
   for each scene:
     startSeconds = first beat's startSeconds
     endSeconds   = last beat's endSeconds
     Build ResolvedMusicBed from plan scene entry

7. Resolve SFX anchors:
   beat-offset → triggerSeconds = compiledBeat.startSeconds + offsetSeconds
   word-index  → triggerSeconds = compiledBeat.startSeconds + words[wordIndex].startSeconds
   sync-point  → look up SyncPoint by id in the spec; error if not found

8. Write CompiledTimeline {
     projectSlug, variantId, version: "1", compiledAt (ISO 8601),
     totalDurationSeconds (last beat's endSeconds),
     scenes (sorted by sceneId), mixing
   }
   → {projects}/<name>/audio/compiled.timeline.json
```

## Error Conditions (halt and report)

- A beat's `speaker` is present but has no matching key in `plan.voices`.
- A WAV file referenced in a narration clip does not exist on disk.
- A music `trackRef` or SFX `fileRef` does not point to an existing file.
- A `sync-point` anchor references a sync point id not found in the spec.

Never silently drop audio — fail loudly with the missing path.

## Output

`{projects}/<name>/audio/compiled.timeline.json` — the final merged timeline.

## How the Remotion Composition Uses This File

In `src/compositions/<variant>Composition.tsx`:

```tsx
import compiledTimeline from "../../audio/compiled.timeline.json";
import { Audio, Sequence, useVideoConfig } from "remotion";

// Inside the composition:
const { fps } = useVideoConfig();
const toFrame = (s: number) => Math.round(s * fps);

{compiledTimeline.scenes.map((scene) =>
  scene.beats.map((beat) =>
    beat.narration ? (
      <Sequence key={beat.beatId} from={toFrame(beat.startSeconds)}>
        <Audio src={beat.narration.fileRef} />
      </Sequence>
    ) : null
  )
)}
```

Music and SFX are added the same way using `scene.music.trackRef` and `beat.sfxCues`.

## Next Step

```
Run build-animation (or revise your composition) to wire the compiled timeline
into the Remotion source, then preview with:
  pnpm --filter @studio/project-<name> dev
```
