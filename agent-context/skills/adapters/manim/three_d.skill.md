# Skill: Manim 3D Scenes

## Purpose

Use `ThreeDScene` to build 3D animations with camera movement, 3D Mobjects,
and depth-based composition. Use when the spec requires 3D visualization:
rotating objects, surface plots, 3D graphs, or camera fly-throughs.

## When to Use

- The spec explicitly calls for 3D visuals or camera rotation.
- The subject is a 3D mathematical object (surface, solid, vector field).
- A "zoom out to reveal structure" motion is required.

For most explanatory animations, `Scene` (2D) is sufficient and renders faster.

## Scene Base Class

```python
from manim import *


class MyThreeDScene(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES)
        # ... animation code
```

## Camera Setup

```python
# phi — elevation from z-axis (0 = top-down, 90° = side-on)
# theta — rotation around z-axis
self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES)

# Animated camera move
self.move_camera(phi=45 * DEGREES, theta=30 * DEGREES, run_time=2)

# Continuous ambient rotation
self.begin_ambient_camera_rotation(rate=0.1)   # radians per second
self.wait(4)
self.stop_ambient_camera_rotation()
```

## 3D Mobjects

```python
sphere   = Sphere(radius=1, color=BLUE)
cube     = Cube(side_length=2, color=WHITE, fill_opacity=0.3)
cylinder = Cylinder(radius=0.5, height=2, color=GREEN)
cone     = Cone(base_radius=1, height=2, color=RED)
torus    = Torus(major_radius=1.5, minor_radius=0.3, color=YELLOW)
```

## 3D Axes & Surfaces

```python
axes = ThreeDAxes(
    x_range=[-3, 3, 1],
    y_range=[-3, 3, 1],
    z_range=[-2, 2, 1],
)

surface = Surface(
    lambda u, v: axes.c2p(u, v, np.sin(u) * np.cos(v)),
    u_range=[-PI, PI],
    v_range=[-PI, PI],
    resolution=(30, 30),
    fill_opacity=0.7,
    checkerboard_colors=[BLUE_D, BLUE_E],
)

self.play(Create(axes), Create(surface), run_time=2)
```

## 3D Vectors

```python
vector = Arrow3D(start=ORIGIN, end=np.array([1, 2, 1]), color=YELLOW)
self.play(Create(vector))
```

## Mixing 2D Text with 3D Scenes

Add 2D overlays (labels, titles) pinned to the screen — unaffected by camera rotation:

```python
title = Text("3D Visualization", font_size=36)
title.to_corner(UL)
self.add_fixed_in_frame_mobjects(title)
self.play(Write(title))
```

## Lighting

```python
# ThreeDScene uses ambient + directional light by default.
# Move the light source for dramatic effect:
self.renderer.camera.light_source.move_to([5, 5, 5])
```

## Performance

3D scenes are significantly slower to render than 2D (Cairo rasterizes each frame).
Use `-ql` for all preview iterations. Only use `-qh` for final output.

```bash
# Fast preview
uv run manim render -ql -p src/scenes/my_scene.py MyThreeDScene

# Production
uv run manim render -qh src/scenes/my_scene.py MyThreeDScene
```
