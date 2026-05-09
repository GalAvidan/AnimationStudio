# How AnimationStudio Works — General Audience Script

## Working Title

From idea to animation — the studio's pipeline

## Audience

Creators, PMs, and curious onlookers who want to understand how we turn an explanation into a finished animated video. No coding background assumed.

## Target Runtime

~80 seconds

## Tone

Warm, confident, lightly playful. Same diagram-over-decoration spirit as the rest of the studio — every visual earns its place.

---

## Script

We have an idea in our heads.

By the end of this video, that idea is a moving picture you can watch.

So — how does that actually happen?

`[VISUAL: a thought bubble at left, a finished video frame at right, a question mark in the gap between them]`

---

We don't wing it. We follow a pipeline.

**Script. Spec. Build. Preview. Render. Revise.**

Six stages. Every animation we make passes through all of them.

`[VISUAL: six labeled tiles slide in across the screen left-to-right, forming a pipeline. Each tile lights up briefly as its name is spoken.]`
`[SYNC: pipeline-revealed]`

---

**Stage one — the script.**

We take the messy idea and write it down in plain language. Who's it for? What's the one thing they should remember? Where should the visuals do the talking?

The script lives as a simple text file in our `scripts` folder.

`[VISUAL: scribbled notes settle and align into a clean document; the document flies into a folder labeled "scripts/"]`

---

**Stage two — the spec.**

The script tells us what to *say*. The spec tells us what to *show*.

We break the script into **beats** — small moments where the viewer should understand or feel something specific. We describe the look, the pacing, the moments where motion needs to land on a word.

No code yet. No frame numbers. The spec is the contract between the story and the visuals.

`[VISUAL: the script document opens; sentences peel off and arrange themselves into a vertical list of labeled "beat" cards on a blueprint background]`
`[SYNC: spec-locks-in]`

---

So — what *is* a beat? And what's a scene?

A **beat** is a single moment of understanding. One idea landing.

A **scene** is a group of beats that share a visual world.

One scene becomes one piece of code. One file. One thing on screen.

`[VISUAL: zoom into a single beat card; it expands into a scene window playing a tiny animation inside it; the scene window sits inside a larger composition]`
`[SYNC: scene-zooms-in]`

---

**Stage three — build.**

This is where the spec becomes real. Each scene gets built. Each beat gets its motion. The pieces snap into a project folder we can actually run.

`[VISUAL: beat cards fan out and transform into stacked file icons inside a folder labeled "projects/animation-studio-explained/". Reusable shapes glow as they connect to multiple scenes.]`

---

**Stage four — preview.**

We open the studio, scrub the timeline, and *watch*. Does it land? Is the motion clear? Does the eye know where to look?

`[VISUAL: a Remotion Studio window appears; a playhead moves across a timeline; frames update live]`

---

**Stage five — render.**

When it's right, we export. The composition becomes a video file you can share.

`[VISUAL: the timeline collapses into a single .mp4 file icon that drops into a folder labeled "output/"]`
`[SYNC: render-complete]`

---

**Stage six — revise.**

Nothing is ever finished on the first try.

If the *direction* changes, we go back to the spec.
If only the *look* changes, we tweak the code.

The pipeline loops. The story sharpens.

`[VISUAL: an arrow curves from the render stage back to the spec stage; the pipeline tiles glow again as the loop completes]`
`[SYNC: loop-closes]`

---

That's the whole studio.

A repeatable path from a half-formed idea to something you can press play on.

The pipeline stays the same. The story is what changes.

`[VISUAL: full pipeline visible one last time; the original thought bubble at left now connects all the way through to the finished video frame at right]`

---

## Notes

- Avoid Remotion / React jargon entirely — the dev script handles that.
- The "what is a beat / what is a scene" beat is the one drill-down moment; everything else stays high-level.
- Visual rhythm: each stage gets a clean entrance, a brief hold, a clean exit. No two stages should be on screen with equal weight.
- The closing line ("the pipeline stays the same; the story is what changes") echoes `agent-context` philosophy without naming it.
