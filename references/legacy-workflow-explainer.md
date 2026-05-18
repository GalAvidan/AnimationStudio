# Legacy Workflow Explainer — Archived Narrative

> Archived from the `animation-studio-explained` meta-project before the clean-slate refactor (Plan 1).
> Code, path specifics, and asset implementation details have been stripped. The conceptual narrative is preserved.

---

## What the Studio Is

AnimationStudio turns ideas into animations through a repeatable six-stage pipeline:

**Script → Spec → Build → Preview → Render → Revise**

The pipeline stays the same every time. The story is what changes.

---

## The Six Stages

### Stage 1 — Script

We take the messy idea and write it down in plain language. Who is it for? What is the one thing they should remember? Where should the visuals do the talking?

The script is a simple text file — human-readable, no code, no implementation details.

### Stage 2 — Spec

The script tells us what to *say*. The spec tells us what to *show*.

We break the script into **beats** — small moments where the viewer should understand or feel something specific. We describe the look, the pacing, the moments where motion needs to land on a word.

No code. No frame numbers. The spec is the contract between the story and the visuals.

### What Is a Beat? What Is a Scene?

A **beat** is a single moment of understanding. One idea landing.

A **scene** is a group of beats that share a visual world.

One scene becomes one piece of code. One file. One thing on screen.

### Stage 3 — Build

The spec becomes real. Each scene gets built. Each beat gets its motion. The pieces snap into a project folder we can actually run.

### Stage 4 — Preview

We open the studio, scrub the timeline, and *watch*. Does it land? Is the motion clear? Does the eye know where to look?

### Stage 5 — Render

When it is right, we export. The composition becomes a video file you can share.

### Stage 6 — Revise

Nothing is ever finished on the first try.

If the *direction* changes, we go back to the spec. If only the *look* changes, we tweak the code. The pipeline loops. The story sharpens.

---

## Visual Philosophy (from the original general-audience spec)

Clean, light, slightly playful. White background, dark text, stage-coded color so each pipeline stage has its own identity. Motion is directional and metaphor-driven: ideas physically travel through the pipeline. Scale is the secondary visual language — zoom out for high-level overviews, zoom in for the one drill-down moment.

If muted, the viewer should still understand: six labeled stages, in order, with one zoom into "scene" and one loop arrow at the end. Pacing is calm but purposeful — each stage gets a clean entrance, a brief hold, a clean handoff.

---

## Key Narrative Moments

1. **Pipeline reveal** — the six stages appearing in order is the visual anchor for everything that follows. Each stage lands with a brief hold so it can be read before the next arrives.
2. **Beat → Scene drill-down** — the one moment where scale changes meaningfully. A single beat card expands into a scene window. The scene window sits inside a composition frame. This is the only zoom.
3. **Revise loop arrow** — a curved arrow from Render back to Spec. The second-most-important shape in the whole video. Must read clearly and not look accidental.
4. **Closing bridge** — the final shot visually answers the opening question: the gap between thought bubble and finished video frame is now bridged by the pipeline.

---

## Takeaway

> The pipeline stays the same. The story is what changes.
