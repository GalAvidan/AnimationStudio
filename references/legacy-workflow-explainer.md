# Legacy Workflow Explainer — Archived Narrative

This document preserves the conceptual narrative from the original `animation-studio-explained` project. Code, file paths, frame numbers, and component names have been stripped. Only the explainer content is retained.

---

## The Pipeline

AnimationStudio turns ideas into animations through a repeatable six-stage pipeline:

**Script → Spec → Build → Preview → Render → Revise**

Six stages. Every animation passes through all of them. The pipeline stays the same. The story is what changes.

---

## What Each Stage Means

### Stage 1 — Script

Capture the messy idea in plain language. Who is the audience? What is the one thing they should remember? Where should visuals do the talking?

The script is the first artifact: a human-readable file that describes what needs to be explained, not how to animate it.

### Stage 2 — Spec

The script says what to *say*. The spec says what to *show*.

Break the script into **beats** — small moments where the viewer should understand or feel something specific. Describe the look, the pacing, the moments where motion needs to land on a word.

No code. No frame numbers. The spec is the contract between the story and the visuals.

### Key Terms

- **Beat**: a single moment of understanding. One idea landing.
- **Scene**: a group of beats that share a visual world. One scene becomes one piece of code.

### Stage 3 — Build

Each scene gets built. Each beat gets its motion. The pieces snap into a project folder that can be previewed.

### Stage 4 — Preview

Open the studio, scrub the timeline, and watch. Does it land? Is the motion clear? Does the eye know where to look?

### Stage 5 — Render

When it is right, export. The composition becomes a video file that can be shared.

### Stage 6 — Revise

Nothing is ever finished on the first try.

- If the *direction* changes, go back to the spec.
- If only the *look* changes, tweak the code.

The pipeline loops. The story sharpens.

---

## Visual Philosophy (from the general audience spec)

Clean, light, slightly playful. White background, dark text, stage-coded color so each pipeline stage has its own identity. Motion is directional and metaphor-driven: ideas physically travel through the pipeline.

Scale is the secondary visual language: zoom out for high-level overviews, zoom in for the one drill-down moment (beat → scene).

Pacing: calm but purposeful. Each stage gets a clean entrance, a brief hold, a clean handoff.

---

## Source

Archived from `specs/animation-studio-explained_spec-general.md` and `scripts/animation-studio-explained_script-general.md` before clean-slate deletion (Plan 1, Phase A).
