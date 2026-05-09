# How AnimationStudio Works — Developer Audience Script

## Working Title

Inside the studio: script → spec → Remotion project

## Audience

Developers using (or evaluating) AnimationStudio. Comfortable with React, the CLI, and project layouts. Wants to see file paths, conventions, and the actual mechanics — not metaphors.

## Target Runtime

~140 seconds

## Tone

Direct, grounded, lightly opinionated. Treats the viewer as a peer engineer. Names files. Shows real folder structure. Doesn't hide the system behind metaphor.

---

## Script

We have an idea. We want it to become a clear, rendered animation.

This is the pipeline that gets us there.

`[VISUAL: title card "AnimationStudio" with a thought bubble on the left and an .mp4 file icon on the right, separated by a question mark]`

---

Six stages. Same pipeline every time:

**Script. Spec. Build. Preview. Render. Revise.**

`[VISUAL: six labeled tiles slide in left-to-right, forming a horizontal pipeline. Each tile carries a small icon: pencil, blueprint, code brackets, play button, film reel, loop arrow.]`
`[SYNC: pipeline-revealed]`

---

**Stage one — the script.**

A markdown file in `scripts/<project-name>_script.md`.

It states the audience, the one core idea, and the narration in plain language. Visual beats are flagged inline with `[VISUAL: ...]` markers — but no implementation, no frame numbers.

This is the only stage where words come before pictures.

`[VISUAL: a markdown file appears with sections "Audience", "Target Runtime", "Script". A `[VISUAL: ...]` marker is highlighted inside the script body. The file flies into a folder labeled `scripts/`.]`

---

**Stage two — the spec.**

The spec is the **contract** between explanation and visuals. It lives at `specs/<project-name>_spec.md`, derived from the spec template.

It contains: goal and audience, target runtime, beat map, visual philosophy, sync points, asset list, constraints, and a review checklist.

What it does **not** contain: code. Component names. Frame numbers. Remotion APIs.

`[VISUAL: spec template appears as a structured document. Sections highlight in sequence: Goal → Beat Map → Visual Philosophy → Sync Points. A red "no code" badge stamps over the file.]`
`[SYNC: spec-locks-in]`

---

This is also the moment to define our terms — because we use them everywhere downstream.

A **beat** is one moment of viewer understanding. Atomic.

A **scene** is a group of beats sharing a visual world. One scene maps to one React component in `src/scenes/`.

A **sync point** is a named moment where motion has to land — like `pipeline-revealed` or `render-complete`. Sync points are semantic; we resolve them to frames at build time, not in the spec.

`[VISUAL: three labeled cards stack: "Beat — atomic moment", "Scene — React component in src/scenes/", "Sync Point — named alignment moment". Each card shows a tiny inline example.]`
`[SYNC: scene-zooms-in]`

---

**Stage three — build.**

The reviewed spec becomes a Remotion project at `projects/<project-name>/`.

`Root.tsx` registers compositions. Each beat from the spec becomes a scene component in `src/scenes/`. Reusable visuals — pipeline tiles, file cards, flow arrows — go in `src/components/`. Beat data and timing live in `src/data/beats.ts`. Easing helpers live in `src/utils/animation.ts`.

Composition defaults: 1920×1080, 30fps for drafts, 60fps for finals.

`[VISUAL: a folder tree expands under `projects/animation-studio-explained/`. The tree shows `src/Root.tsx`, `src/compositions/`, `src/scenes/`, `src/components/`, `src/data/`, `src/utils/`. Beat cards from the spec fly into the corresponding files.]`

---

When one project needs to serve multiple audiences, we use **one project, multiple compositions, shared scenes** — like this very animation, which ships a `general` and a `dev` composition over the same scene set, parameterized by per-variant `beats-general.ts` and `beats-dev.ts`.

`[VISUAL: split view — two composition cards labeled "General" and "Dev" both pointing down into the same shared `scenes/` folder. Each composition reads a different `beats-*.ts` file.]`

---

**Stage four — preview.**

`npm run dev` from the project folder boots Remotion Studio. We scrub the timeline, check sync points to within roughly two frames, and feel the pacing.

`[VISUAL: terminal shows `npm run dev`; Remotion Studio window opens; a playhead moves across the timeline; sync point markers light up as it passes them.]`

---

**Stage five — render.**

We render to `output/<project-name>.mp4`. On Windows we use props files instead of inline JSON to avoid shell-escaping pain.

`[VISUAL: terminal runs the render command with `--props=props/general.json`; a progress bar fills; a green `.mp4` icon drops into the `output/` folder.]`
`[SYNC: render-complete]`

---

**Stage six — revise.**

This is where most of the real work lives. The decision rule is simple:

If the **creative direction** changes — pacing, beat order, visual intent — we go back to the spec. The spec is still the contract.

If only the **implementation** changes — easing, color, layout details — we edit the code directly. No spec churn for tweaks.

`[VISUAL: branching arrow from "Revise" — one path loops back to `specs/`, labeled "direction change"; the other path loops back to `src/scenes/`, labeled "implementation only".]`
`[SYNC: loop-closes]`

---

One more thing worth saying out loud.

The repo has thin adapter files at the root — `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `BOT.md`. They all point at one place: `agent-context/`.

That's where the canonical brain lives. Intent, conventions, glossary, skills, tasks. The adapters are interchangeable. The `agent-context/` is the source of truth.

`[VISUAL: four small adapter file icons at the top all point arrows down into a single labeled folder `agent-context/`, which then radiates out into `intent/`, `map/`, `skills/`, `tasks/`.]`

---

That's the studio.

Six stages. A spec that holds the line between intent and code. A project layout that survives variants and revisions.

The pipeline stays. The story changes.

`[VISUAL: full pipeline visible one final time, with the `agent-context/` folder underneath as a foundation layer. Original thought bubble at left now connects through to the rendered .mp4 at right.]`

---

## Notes

- Name actual files and folders throughout — this script's job is to make the system feel concrete.
- Beats 5 (terminology) and 9 (revise decision rule) are the drill-down moments; the other stages stay high-level.
- The "one project, multiple compositions" beat is the structural insight that distinguishes us from "one Remotion project per video".
- The closing `agent-context/` beat is short on purpose — it's the resolution, not a new topic.
- Math/code formatting kept minimal; we lean on file paths and folder trees as the visual vocabulary.
