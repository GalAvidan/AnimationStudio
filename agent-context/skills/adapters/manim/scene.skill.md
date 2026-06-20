# Skill: Manim Scene

## Purpose

Write Manim Scene classes that construct animations from reviewed specs.
Covers the core `Scene` and `ThreeDScene` class patterns, animation primitives,
timing, and `rate_func` (easing).

## When to Use

- The project declares `adapter: "manim"` in `project.config.ts`.
- You are building or revising a scene file under `src/scenes/`.

## Scene Class Pattern

Each variant maps to one Python file + one class. The class name is the `compositionId`
from `project.config.ts`.

```python
from manim import *


class ProjectNameGeneral(Scene):
    def construct(self):
        # All animation code goes here.
        # self.play() runs animations.
        # self.wait() holds time.
        circle = Circle(radius=1, color=BLUE)
        self.play(Create(circle))
        self.wait(1)
        self.play(FadeOut(circle))
```

## Scene Types

| Class | Use |
|---|---|
| `Scene` | All 2D animations — default choice |
| `MovingCameraScene` | 2D scenes where the camera pans/zooms |
| `ThreeDScene` | 3D objects and camera movement (see `three_d.skill.md`) |

## Core Animation Primitives

| Animation | Effect |
|---|---|
| `Create(mobject)` | Draw mobject in (shapes, lines) |
| `Write(text)` | Write text/LaTeX stroke by stroke |
| `FadeIn(mobject)` | Fade in from transparent |
| `FadeOut(mobject)` | Fade out to transparent |
| `Transform(a, b)` | Morph one mobject into another |
| `ReplacementTransform(a, b)` | Like Transform but replaces `a` with `b` in the scene |
| `Indicate(mobject)` | Brief highlight pulse — emphasis |
| `ShowCreationThenFadeOut(m)` | Create then auto-fade |
| `DrawBorderThenFill(m)` | Draw outline, then fill |

## Timing

```python
# Hold for N seconds
self.wait(2)

# Animate with explicit run_time (default: 1 second)
self.play(FadeIn(label), run_time=0.6)

# Multiple animations in one play() call — run in parallel
self.play(FadeIn(title), FadeIn(subtitle), run_time=0.8)

# Sequential animations — multiple play() calls
self.play(Write(title))
self.play(FadeIn(subtitle))
```

## Rate Functions (Easing)

Pass `rate_func=` to any animation:

```python
from manim import rate_functions

self.play(FadeIn(box), rate_func=rate_functions.smooth)          # ease in-out (default)
self.play(Create(arrow), rate_func=rate_functions.rush_into)     # fast start
self.play(FadeOut(text), rate_func=rate_functions.rush_from)     # fast end
self.play(circle.animate.scale(2), rate_func=rate_functions.there_and_back)  # bounce back
self.play(box.animate.shift(RIGHT * 2), rate_func=rate_functions.linear)
```

## `.animate` Syntax — Property Tweens

```python
# Tween any property via .animate shorthand
self.play(circle.animate.scale(2))
self.play(rect.animate.shift(RIGHT * 3))
self.play(label.animate.set_color(YELLOW))
self.play(group.animate.rotate(PI / 4))

# Combine in one play() — runs in parallel
self.play(
    title.animate.shift(UP * 2),
    subtitle.animate.set_opacity(0),
    run_time=0.8,
)
```

## Mapping BeatTimeline Beats

Load beat data from `src/data/beats_<variant>.py` and drive timing from `start`/`end`:

```python
from manim import *
from src.data.beats_general import BEATS


class ProjectNameGeneral(Scene):
    def construct(self):
        for beat in BEATS:
            duration = beat["end"] - beat["start"]
            label = Text(beat.get("visual", ""), font_size=36)
            self.play(FadeIn(label), run_time=min(0.5, duration * 0.3))
            self.wait(max(0, duration * 0.6))
            self.play(FadeOut(label), run_time=min(0.3, duration * 0.1))
```

## Scene Composition (Multiple Scenes)

All variants and scenes are separate classes in `src/scenes/`. Run each independently:

```bash
uv run manim render -ql -p src/scenes/general.py ProjectNameGeneral
```

There is no `makeProject`-style scene list — scenes are discrete render units in Manim.
