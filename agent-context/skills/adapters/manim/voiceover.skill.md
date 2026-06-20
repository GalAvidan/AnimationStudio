# Skill: Manim Voiceover

## Purpose

Sync narration to animation beats using `manim-voiceover`. Covers the
`VoiceoverScene` base class, the `with self.voiceover()` pattern, and
how to map spec beats to narration timing.

## When to Use

- The project spec assigns `narration` to beats.
- The project's `pyproject.toml` includes `manim-voiceover`.
- The adapter row in `adapter-registry.md` lists `audio` as a capability.

## Setup

`manim-voiceover` is already in the template's `pyproject.toml`:

```toml
[project]
dependencies = [
    "manim>=0.18",
    "manim-voiceover>=0.3",
]
```

Run `uv sync` from the project root to install.

## Scene Base Class

Replace `Scene` with `VoiceoverScene` and configure a TTS service:

```python
from manim import *
from manim_voiceover import VoiceoverScene
from manim_voiceover.services.gtts import GTTSService   # free, internet required


class ProjectNameGeneral(VoiceoverScene):
    def construct(self):
        self.set_speech_service(GTTSService())
        # ... animation code
```

## TTS Service Options

| Service | Import path | Requires | Notes |
|---|---|---|---|
| `GTTSService` | `manim_voiceover.services.gtts` | Internet | Free, Google TTS |
| `AzureService` | `manim_voiceover.services.azure` | Azure API key | Natural voice, high quality |
| `OpenAIService` | `manim_voiceover.services.openai` | OpenAI API key | GPT-4 TTS voices |
| `CoquiService` | `manim_voiceover.services.coqui` | Local model | Fully offline |

## Core Pattern — `with self.voiceover()`

```python
with self.voiceover(text="This is the narration text.") as tracker:
    # Animations inside the block sync to narration length.
    # tracker.duration — actual TTS audio length in seconds.
    self.play(Write(title), run_time=tracker.duration)
```

## Mapping BeatTimeline Beats

```python
from manim import *
from manim_voiceover import VoiceoverScene
from manim_voiceover.services.gtts import GTTSService
from src.data.beats_general import BEATS


class ProjectNameGeneral(VoiceoverScene):
    def construct(self):
        self.set_speech_service(GTTSService())

        for beat in BEATS:
            visual_text = beat.get("visual", "")
            narration   = beat.get("narration", "")
            label = Text(visual_text, font_size=48)

            if narration:
                with self.voiceover(text=narration) as tracker:
                    self.play(FadeIn(label), run_time=min(0.5, tracker.duration * 0.3))
                    self.wait(max(0, tracker.duration * 0.6))
                    self.play(FadeOut(label), run_time=min(0.3, tracker.duration * 0.1))
            else:
                # No narration — use spec beat duration directly
                duration = beat["end"] - beat["start"]
                self.play(FadeIn(label), run_time=0.5)
                self.wait(max(0, duration - 0.8))
                self.play(FadeOut(label), run_time=0.3)
```

## Caching

`manim-voiceover` caches TTS audio in `media/voiceover/`. Re-renders reuse
cached audio as long as the narration text is unchanged.

- Commit the cache for reproducible CI renders.
- Add `media/voiceover/` to `.gitignore` to avoid bloating the repo if cache is large.

## Don'ts

- Don't hardcode `run_time` when using `tracker.duration` — TTS length varies between services and input texts.
- Don't use `VoiceoverScene` for scenes with no narration — it adds unnecessary overhead.
- Don't nest `with self.voiceover()` blocks — they queue, not overlap.
