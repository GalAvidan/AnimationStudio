# Task: Align Narration

## Use When

Narration WAV clips have been generated and the user wants word-level timestamps for captions, SFX sync, or character lip hints.

## Load

- `agent-context/skills/core/audio-pipeline.skill.md`

## Inputs

| Input | Default | Notes |
|---|---|---|
| Project name | — | Required. Kebab-case. |
| Variant | `general` | Must match a `variants[].id` in `project.config.ts`. |
| Beat ids | all beats | Comma-separated list; defaults to all beats with a WAV. |

## Prerequisites

- WAV files exist at `projects/<name>/audio/narration/<beatId>.wav`.
- **faster-whisper** is installed: `pip install faster-whisper`.
  - Alternatively, **whisperx** for higher-accuracy alignment: `pip install whisperx`.
- `ffprobe` (part of FFmpeg) is available on PATH for duration measurement.

## Steps

1. For each beat id (all by default):
   a. Confirm `audio/narration/<beatId>.wav` exists. Skip with a warning if not.
   b. Run forced alignment. **Run this command from the repo root** (`projects/<name>` is a relative path from there):
      ```
      python -c "
      from faster_whisper import WhisperModel
      import json, sys
      model = WhisperModel('base', device='cpu', compute_type='int8')
      segments, _ = model.transcribe('projects/<name>/audio/narration/<beatId>.wav', word_timestamps=True)
      words = [{'word': w.word, 'startSeconds': w.start, 'endSeconds': w.end} for s in segments for w in (s.words or [])]
      print(json.dumps(words))
      "
      ```
   c. Write the result to `projects/<name>/audio/alignment/<beatId>.json`:
      ```json
      {
        "beatId": "<beatId>",
        "words": [
          { "word": "hello", "startSeconds": 0.02, "endSeconds": 0.35 },
          ...
        ]
      }
      ```
2. Report: beats aligned, beats skipped (WAV not found).

## Notes

- If `whisperx` is available, prefer it for better alignment accuracy.
- Word timestamps are 0-based relative to the start of each clip (not absolute video time). The `compile-timeline` task adds the beat's `startSeconds` offset.
- This task is non-interactive and safe to re-run; it overwrites existing alignment files.

## Output

Alignment JSON files at `projects/<name>/audio/alignment/<beatId>.json` for each processed beat.

## Next Step

```
Run compile-timeline to merge alignment data into the final audio timeline.
```
