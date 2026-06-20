# Skill: Adapter Selection

## Purpose

Choose the best rendering adapter for a new project based on subject matter,
required visual features, and workflow preferences.

## When to Use

When starting a new project and the adapter has not been specified. Load this
skill before `create-project` when the user has not named an adapter.

## Quick Decision Table

| Factor | Motion Canvas | Manim |
|---|---|---|
| **Best for** | Character animation, UI walkthroughs, branded explainers | Math visualization, algorithm steps, scientific diagrams |
| **Language** | TypeScript | Python |
| **Timing model** | Generator (`yield*`) — reads like a script | Imperative (`self.play`, `self.wait`) |
| **3D support** | No (2D only) | Yes (`ThreeDScene`) |
| **Math notation** | Manual (SVG / `Txt` nodes) | Native LaTeX (`MathTex`, `Tex`) |
| **Audio sync** | Sync points via adapter contract | `manim-voiceover` plugin |
| **Preview** | Live dev server with hot reload | Renders a video file on demand |
| **Render speed** | Fast (browser-based) | Slower (Cairo/OpenGL pipeline) |
| **Dependency mgr** | pnpm (workspace member) | uv (Python project, outside pnpm) |
| **Status** | experimental | experimental |

## Choose Motion Canvas when:

- The animation features characters, faces, or rigged assets.
- The content is branded (product demos, onboarding, UI walkthroughs).
- The team works primarily in TypeScript.
- Hot-reload iteration speed matters.
- The spec has no 3D requirements and no heavy math notation.

## Choose Manim when:

- The content is math-heavy (equations, proofs, geometric constructions).
- The animation needs 3D (rotating solids, graph plots, camera fly-throughs).
- The team is comfortable with Python.
- Accurate scientific or algorithm visualization matters more than branding.
- The spec is driven by `MathTex` formulas or `Code` blocks.

## Remotion

Remotion is **legacy only** — retained for existing projects. Do not create new projects with Remotion.

## Asking the User

If neither adapter is obvious from context, ask:

> "Is this animation primarily math/algorithm visualization, or character/UI explainer content?"

- Math / algorithm / scientific → suggest **Manim**
- Character / UI / branded explainer → suggest **Motion Canvas**
- Mixed content → suggest **Motion Canvas** (handles explanatory text well; add math as SVG assets)

## Capabilities Summary

| Capability | Motion Canvas | Manim | Remotion |
|---|---|---|---|
| 2D animation | ✓ | ✓ | ✓ |
| 3D animation | — | ✓ | — |
| LaTeX rendering | — | ✓ | — |
| Character rigs | ✓ | — | — |
| Audio voiceover sync | ✓ | ✓ | ✓ |
| Hot reload preview | ✓ | — | ✓ |
| TypeScript | ✓ | — | ✓ |
| Python | — | ✓ | — |
