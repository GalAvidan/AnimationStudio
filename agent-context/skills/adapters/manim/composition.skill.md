# Skill: Manim Composition

## Purpose

Structure a Manim project, map `project.config.ts` fields to Python conventions,
and use the correct render/preview commands.

## When to Use

- The project declares `adapter: "manim"` in `project.config.ts`.
- You are scaffolding, navigating, or rendering a Manim project.

## Project Layout

```
projects/<name>/
  src/
    __init__.py
    scenes/               ← one .py file per variant; compositionId = class name
      __init__.py
      general.py          ← class ProjectNameGeneral(Scene)
    components/           ← reusable Mobject helpers
      __init__.py
    data/                 ← beat data, palette definitions
      __init__.py
      beats_general.py
      palettes.py
    utils/
      __init__.py
  scripts/                ← variant script markdown files
  specs/                  ← variant spec markdown files
  props/                  ← variant props JSON files
  output/                 ← rendered video files (Manim output dir per manim.cfg)
  assets/                 ← SVGs, images, fonts
  pyproject.toml          ← uv project; deps: manim, manim-voiceover
  manim.cfg               ← Manim config (output dir, verbosity)
  project.config.ts       ← agent-readable metadata; adapter: "manim"
  .python-version         ← Python version pin (e.g. "3.12")
```

## `compositionId` → Python Class Name

`project.config.ts` `compositionId` (PascalCase) is the **exact Python class name**
in the variant's scene file.

```
compositionId: "ProjectNameGeneral"
  → src/scenes/general.py
    class ProjectNameGeneral(Scene):
        def construct(self): ...
```

Convention: variant file = `src/scenes/<variant-id>.py`, class = `compositionId`.

## Entry Point — No Global Registration

Unlike Motion Canvas or Remotion, Manim has no global project registration.
Each class is an independent render unit. `manim.cfg` sets defaults (output dir, quality).

## Dependency Setup

Run once after scaffolding (or cloning):

```bash
# From the project root (where pyproject.toml lives)
uv sync
```

This installs `manim` and `manim-voiceover` from `pyproject.toml` into a local `.venv`.

## Preview Command (Fast Iteration)

```bash
# From the project root — NOT the repo root
uv run manim render -ql -p src/scenes/<variant>.py <CompositionId>
```

- `-ql` — low quality (480p15), fast render
- `-p` — open preview after render completes

Example: `uv run manim render -ql -p src/scenes/general.py ProjectNameGeneral`

## Render Command (Production)

```bash
# From the project root
uv run manim render -qh src/scenes/<variant>.py <CompositionId>
```

- `-qh` — high quality (1080p60)
- Output written to `output/` per `manim.cfg`

Example: `uv run manim render -qh src/scenes/general.py ProjectNameGeneral`

## Quality Flags Reference

| Flag | Resolution | FPS |
|---|---|---|
| `-ql` | 480p | 15 |
| `-qm` | 720p | 30 |
| `-qh` | 1080p | 60 |
| `-qk` | 4K | 60 |

## Manim Project Config (`manim.cfg`)

```ini
[CLI]
media_dir = output
verbosity = WARNING
```

`media_dir = output` routes all rendered files into the project's `output/` directory,
consistent with the variant config `output: "output/<variant>.mp4"`.

## Working Directory Note

Manim commands must be run from the **project root** (where `pyproject.toml` lives),
not from the repo root. Manim projects are **not** members of the pnpm workspace.

## Key Differences from Motion Canvas

| Motion Canvas | Manim |
|---|---|
| TypeScript/TSX | Python |
| Generator (`yield*`) | Imperative (`self.play`, `self.wait`) |
| Vite dev server (hot reload) | Renders a video file on demand |
| `makeProject([...scenes])` | Discrete classes, no registration |
| pnpm workspace member | uv project outside pnpm workspace |
| `pnpm --filter ... dev` | `uv run manim render -ql -p ...` |
| `pnpm --filter ... build` | `uv run manim render -qh ...` |
| 2D only | 2D + 3D (`ThreeDScene`) |
