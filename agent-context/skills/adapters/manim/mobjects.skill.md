# Skill: Manim Mobjects

## Purpose

Use Manim's built-in Mobject classes to construct visual elements: shapes, text,
arrows, groups, and mathematical notation. Covers positioning, styling, and layout
patterns for explanatory animations.

## Core Shapes (VMobject)

```python
from manim import *

circle   = Circle(radius=1, color=BLUE)
square   = Square(side_length=2, color=WHITE)
rect     = Rectangle(width=4, height=2, color=GREEN)
line     = Line(start=LEFT * 2, end=RIGHT * 2, color=YELLOW)
arrow    = Arrow(start=LEFT, end=RIGHT, color=RED)
dot      = Dot(point=ORIGIN, color=WHITE)
triangle = Triangle(color=PURPLE)
```

## Text

```python
# Plain text
label = Text("Hello, Manim!", font_size=48, color=WHITE)

# Mathematical notation (LaTeX) — requires LaTeX installation
formula = MathTex(r"\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}")

# LaTeX text paragraph
paragraph = Tex(r"This is \textbf{bold} and \textit{italic}.")

# Code snippet with syntax highlighting
code = Code(
    code="def hello():\n    return 'world'",
    language="Python",
    font_size=28,
)
```

## Groups

```python
# VGroup — for VMobjects (shapes + text); transforms apply together
group = VGroup(circle, square, label)
self.play(FadeIn(group))

# Group — for mixed Mobject types
mixed = Group(image, group)
```

## Positioning

```python
# Absolute positioning
circle.move_to(ORIGIN)               # center of frame
circle.move_to(RIGHT * 2)            # 2 units right of center
circle.move_to(np.array([1, 2, 0]))  # explicit coordinates

# Relative to another object
subtitle.next_to(title, DOWN, buff=0.3)    # below title, 0.3 gap
arrow.next_to(box, RIGHT, buff=0.5)

# Relative shift from current position
label.shift(UP * 0.5)
group.shift(LEFT * 3)

# Alignment
label.align_to(box, LEFT)    # align left edges
items.align_to(box, UP)      # align top edges

# Stack in one direction
items.arrange(DOWN, buff=0.4)    # vertical stack
items.arrange(RIGHT, buff=0.5)   # horizontal row
items.move_to(ORIGIN)            # center the result
```

## Direction Constants

```python
UP, DOWN, LEFT, RIGHT          # unit vectors
UR, UL, DR, DL                 # diagonals (up-right, up-left, etc.)
ORIGIN                          # np.array([0, 0, 0])
IN, OUT                         # into/out of screen (3D only)
```

## Styling

```python
circle.set_color(BLUE)
circle.set_fill(BLUE, opacity=0.5)      # fill with opacity
circle.set_stroke(WHITE, width=3)       # outline

# Chain styling
rect.set_fill(DARK_BLUE, opacity=0.8).set_stroke(BLUE, width=2)

# Common color constants:
# RED, GREEN, BLUE, YELLOW, WHITE, BLACK, GRAY, ORANGE, PURPLE,
# TEAL, MAROON, GOLD, DARK_BLUE, DARK_BROWN, LIGHT_GRAY
```

## Arranged Layouts

```python
# Vertical stack
stack = VGroup(*items).arrange(DOWN, buff=0.3)

# Horizontal row
row = VGroup(*items).arrange(RIGHT, buff=0.5)

# Grid
grid = VGroup(*items).arrange_in_grid(rows=2, cols=3, buff=0.4)
grid.move_to(ORIGIN)
```

## Axes & Plots

```python
axes = Axes(
    x_range=[-3, 3, 1],
    y_range=[-2, 2, 1],
    axis_config={"color": BLUE},
)
graph = axes.plot(lambda x: x**2, color=YELLOW)
graph_label = axes.get_graph_label(graph, label="x^2")

self.play(Create(axes), run_time=1)
self.play(Create(graph), Write(graph_label))
```

## Annotation Helpers

```python
brace      = Brace(rect, DOWN)                       # curly brace under an object
brace_text = brace.get_text("width")

highlight  = SurroundingRectangle(label, color=YELLOW, buff=0.1)
underline  = Underline(label)
cross      = Cross(wrong_answer, color=RED)
```

## Common Pitfalls

- Always add objects to the scene with `self.add(obj)` or `self.play(Create(obj))` — objects are invisible until added.
- `Text` uses system fonts; `MathTex` and `Tex` require a LaTeX installation (bundled with `manim[cairo]`).
- `VGroup` preserves z-order; last item in the constructor renders on top.
- `arrange()` mutates positions in-place — call before `self.play()`.
