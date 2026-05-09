# How AnimationStudio Works — Developer Audience Spec

## Project

- Project name: `animation-studio-explained`
- Composition name: `AnimationStudioExplained_Dev`
- Source script: `scripts/animation-studio-explained_script-dev.md`
- Target runtime: ~140 seconds
- Audience: Developers using or evaluating AnimationStudio. Comfortable with React, the CLI, Remotion concepts.
- Core message: AnimationStudio is a six-stage pipeline (Script → Spec → Build → Preview → Render → Revise) backed by a canonical `agent-context/` brain. The spec is the contract that holds the line between intent and code; the project layout supports multiple compositions sharing scenes.

---

## Visual Philosophy

Same stage-coded color system as the general spec (parchment / blueprint / code-green / violet / amber / loop-cyan), but the **visual vocabulary leans on real artifacts**: file paths, folder trees, terminal lines, composition cards. Where the general cut uses metaphor (scribbles, thought bubbles), the dev cut shows the actual files.

Motion principles:
- Folder trees expand line-by-line, monospace; never as a static block.
- File paths appear as crisp text labels under file icons; the path is part of the visual.
- The pipeline tiles from the general cut return as the spine, but each "drill-down" beat reveals real structure (e.g. spec sections, scene component layout, two-composition fan-out).
- The `agent-context/` foundation is introduced *late* (beat 11) and feels like a payoff, not a setup.

If muted, the dev viewer should still see: six pipeline stages, the script→spec→build→preview→render→revise spine, the terminology cards (beat / scene / sync point), the two-composition fan-out, and the agent-context foundation under everything.

Pacing: a hair faster than the general cut. Dev viewers tolerate density; lean into it for the file-tree and terminology beats.

---

## Beat Map

| Beat | Time | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|
| 1 — Hook | 0:00–0:08 | "We have an idea. We want it to become a clear, rendered animation. This is the pipeline that gets us there." | Title card "AnimationStudio". Thought bubble on left, `.mp4` file icon on right, question mark in the gap. | Frame the goal in concrete terms — the artifact is a real file. |
| 2 — Pipeline overview | 0:08–0:20 | "Six stages. Same pipeline every time. Script. Spec. Build. Preview. Render. Revise." | Six labeled tiles slide in left-to-right. Each carries a small icon: pencil, blueprint, code brackets, play button, film reel, loop arrow. Each lands in its stage color. | Establish the spine. Same shape as the general cut so the visual language is consistent. |
| 3 — Script stage | 0:20–0:35 | "Stage one — the script. A markdown file in `scripts/<project-name>_script.md`. Audience, one core idea, narration in plain language. Visual beats flagged inline with `[VISUAL: …]` markers — but no implementation, no frame numbers." | A markdown document appears with visible section headings: `Audience`, `Target Runtime`, `Script`. A `[VISUAL: ...]` marker in the body highlights. The file flies into a `scripts/` folder labeled with the actual path. | Show the actual artifact, including the path convention. |
| 4 — Spec stage | 0:35–0:55 | "Stage two — the spec. The contract between explanation and visuals. It contains goal, beat map, visual philosophy, sync points, asset list, constraints, review checklist. What it does not contain: code. Component names. Frame numbers." | Spec template appears as a structured document. Section headings highlight in sequence: `Goal` → `Beat Map` → `Visual Philosophy` → `Sync Points`. A red "no code" badge stamps over the file. | Make the spec's role unambiguous — it's a contract, not a draft. |
| 5 — Terminology cards | 0:55–1:15 | "A beat is one moment of viewer understanding. A scene is a group of beats sharing a visual world — one scene maps to one React component in `src/scenes/`. A sync point is a named moment where motion has to land." | Three cards stack vertically: "Beat — atomic moment", "Scene — React component in `src/scenes/`", "Sync Point — named alignment, e.g. `pipeline-revealed`". Each card shows a tiny inline example. | First drill-down. Define terms used in every later beat. |
| 6 — Build: project layout | 1:15–1:35 | "Stage three — build. The reviewed spec becomes a Remotion project at `projects/<project-name>/`. Root.tsx registers compositions. Each beat becomes a scene component in `src/scenes/`. Reusable visuals in `src/components/`. Beat data in `src/data/`." | A folder tree expands under `projects/animation-studio-explained/`. The tree shows `src/Root.tsx`, `src/compositions/`, `src/scenes/`, `src/components/`, `src/data/`, `src/utils/`. Beat cards from the spec fly into the corresponding `src/scenes/` files. | Show the actual project layout. This is the densest beat and earns its time. |
| 7 — Multi-composition pattern | 1:35–1:50 | "When one project needs to serve multiple audiences, we use one project, multiple compositions, shared scenes — like this very animation, with `general` and `dev` compositions over the same scene set, parameterized by per-variant beats files." | Split view: two composition cards labeled "General" and "Dev" both point arrows down into a shared `src/scenes/` folder. Each composition card reads from a different `beats-*.ts` file. | The structural insight. Self-referential — this beat describes the very project being shown. |
| 8 — Preview stage | 1:50–2:00 | "`npm run dev` from the project folder boots Remotion Studio. We scrub the timeline, check sync points within ~2 frames, feel the pacing." | Terminal shows `npm run dev` with caret blinking. Remotion Studio window opens. Playhead moves across the timeline; sync point markers light up as it passes them. | Make preview feel like the actual workflow — a real terminal, a real window. |
| 9 — Render stage | 2:00–2:10 | "We render to `output/<project-name>.mp4`. On Windows we use props files instead of inline JSON to avoid shell-escaping pain." | Terminal runs the render command with `--props=props/general.json`. A progress bar fills. A green `.mp4` icon drops into the `output/` folder. | Concrete render mechanics + the Windows-specific tip from `render.task.md`. |
| 10 — Revise decision rule | 2:10–2:25 | "If the creative direction changes — pacing, beat order, intent — we go back to the spec. If only the implementation changes — easing, color, layout — we edit the code directly. No spec churn for tweaks." | A branching arrow from "Revise" tile. One path loops back to `specs/`, labeled "direction change". The other loops back to `src/scenes/`, labeled "implementation only". | Second drill-down. The decision rule from `revision-workflow.skill.md`. |
| 11 — agent-context foundation | 2:25–2:38 | "The repo has thin adapter files at the root — AGENTS.md, CLAUDE.md, .github/copilot-instructions.md, BOT.md. They all point at one place: `agent-context/`. That's where the canonical brain lives — intent, conventions, glossary, skills, tasks. The adapters are interchangeable. The agent-context is the source of truth." | Four small adapter file icons at the top all point arrows down into a single labeled folder `agent-context/`. The folder then radiates out into `intent/`, `map/`, `skills/`, `tasks/`. | The architectural payoff. Late on purpose — this is what makes the rest of the system durable. |
| 12 — Close | 2:38–2:50 | "Six stages. A spec that holds the line between intent and code. A project layout that survives variants and revisions. The pipeline stays. The story changes." | Full pipeline visible one final time. The `agent-context/` folder sits underneath as a foundation layer. Original thought bubble at left now connects through every stage to the rendered `.mp4` at right. | Land the takeaway. Visually resolve the opening shot with the full system in view. |

---

## Key Moments

- **Beat 2 (pipeline reveal):** Same shape as the general cut so a viewer who has seen both feels the consistency. Tiles land in order, each carrying a small stage icon.
- **Beat 5 (terminology):** The three cards must each show a *concrete example*, not just a definition. The "sync point" example should literally be the string `pipeline-revealed` so the viewer sees the convention.
- **Beat 6 (project layout):** The folder tree is the most information-dense moment in the video. It must be readable — monospace, generous line height, expanded line-by-line so the eye can follow.
- **Beat 7 (multi-composition):** Self-referential payoff. A small "← you are watching this" annotation can point at one of the two composition cards. Optional but recommended.
- **Beat 11 (agent-context):** Should feel like *opening a basement door under the house we just toured*. The adapters at the top are interchangeable; the folder underneath is the foundation.
- **Beat 12 (close):** The `agent-context/` foundation layer must remain visible under the pipeline in the final shot — it's the structural punchline.

---

## Narration Sync Points

| Sync point | Time | Visual event triggered |
|---|---:|---|
| `hook-question` | 0:05 | Question mark pulses between bubble and `.mp4` icon |
| `pipeline-revealed` | 0:18 | Sixth pipeline tile lands; full pipeline visible |
| `script-marker-highlight` | 0:30 | `[VISUAL: ...]` marker highlights inside script document |
| `script-folder-lands` | 0:33 | Script file drops into `scripts/` folder |
| `spec-no-code-stamp` | 0:50 | "No code" badge stamps over the spec template |
| `terms-stack-complete` | 1:12 | Third terminology card (Sync Point) lands |
| `tree-expanded` | 1:30 | Folder tree under `projects/animation-studio-explained/` is fully expanded |
| `beats-fly-to-scenes` | 1:33 | Beat cards finish flying into the `src/scenes/` directory |
| `compositions-fan-out` | 1:45 | Both composition cards visible, both arrows reaching shared `src/scenes/` |
| `dev-server-up` | 1:54 | Remotion Studio window fully open, playhead begins moving |
| `render-complete` | 2:08 | `.mp4` icon drops into `output/` folder |
| `revise-branch-clear` | 2:22 | Both branching arrows from Revise tile fully drawn and labeled |
| `agent-context-revealed` | 2:32 | `agent-context/` folder fully labeled with its four subfolders radiating out |
| `final-bridge` | 2:46 | Connecting line completes from thought bubble to `.mp4` icon, with `agent-context/` visible underneath |

---

## Assets

- Existing assets: none
- Assets to create (extends the general cut's set):
  - `PipelineTile` — same as general spec
  - `FileCard` — same as general spec, but supports a `path` label underneath
  - `BeatMarker` — same as general spec
  - `SceneWindow` — same as general spec
  - `FlowArrow` — same as general spec; needs a labeled-branch variant for the revise decision rule
  - `FolderIcon` — same as general spec; needs an "expandable tree" variant showing children
  - `CodeSnippetReveal` — monospace text block that types or fades in line-by-line; used for terminal commands and folder trees (dev-only)
  - `TerminologyCard` — labeled card with title, one-line definition, and a small inline example
- Fonts: clean sans-serif for narration text (Inter); monospace for paths, terminal lines, and folder trees (JetBrains Mono or system mono)
- Colors: same stage palette as the general spec; add `#1A1A1A` background tint for terminal panes only

---

## Constraints

- Runtime: ~140 seconds (±10s acceptable)
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps (drafts), bump to 60fps only for finals
- Must include: real file paths visible at least three times (`scripts/`, `specs/`, `projects/animation-studio-explained/src/scenes/`); the multi-composition fan-out diagram; the `agent-context/` foundation reveal; the labeled revise decision branches
- Must avoid: actual TypeScript code shown in full (file paths and folder trees only); UI mock-ups of Remotion Studio that aren't recognizably its real layout; introducing the `agent-context/` folder before beat 11

---

## Review Checklist

- [ ] All six pipeline stages named and shown in order in beat 2.
- [ ] At least three real file paths visible across the video.
- [ ] Folder tree in beat 6 is readable (monospace, line-by-line expansion).
- [ ] Multi-composition fan-out (beat 7) clearly shows two compositions sharing one scene set.
- [ ] Terminology cards (beat 5) each include a concrete example, not just a definition.
- [ ] Revise decision rule (beat 10) labels both branches: "direction change" and "implementation only".
- [ ] `agent-context/` is introduced no earlier than beat 11.
- [ ] Closing shot (beat 12) keeps the `agent-context/` foundation visible under the pipeline.
- [ ] Total runtime within 130–150 seconds.
- [ ] Every beat can be understood with audio muted.

---

## Do Not Include In This Spec

- Code
- Component props
- Pixel positions
- Frame numbers (use sync points and beat times instead)
- Remotion API references
