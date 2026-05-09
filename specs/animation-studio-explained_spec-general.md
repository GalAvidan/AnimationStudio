# How AnimationStudio Works — General Audience Spec

## Project

- Project name: `animation-studio-explained`
- Composition name: `AnimationStudioExplained_General`
- Source script: `scripts/animation-studio-explained_script-general.md`
- Target runtime: ~80 seconds
- Audience: Creators, PMs, curious onlookers — non-developers
- Core message: We turn ideas into animations through a repeatable six-stage pipeline (Script → Spec → Build → Preview → Render → Revise). The pipeline stays the same; the story is what changes.

---

## Visual Philosophy

Clean, light, slightly playful. White background, dark text, **stage-coded color** so each pipeline stage has its own identity:

- Script — parchment / warm cream
- Spec — blueprint blue
- Build — code green
- Preview — violet
- Render — amber
- Revise — loop cyan

Motion is **directional and metaphor-driven**: ideas physically travel through the pipeline. Files fly into folders. Cards open into scenes. The pipeline tiles glow as the playhead "passes through" them — even though there is no literal playhead on screen.

Scale is the secondary visual language: we zoom out for high-level overviews, zoom in for the one drill-down moment (beat → scene). The camera (logical, not literal) anchors the viewer's attention.

If muted, the viewer should still understand: *six labeled stages, in order, with one zoom into "scene" and one loop arrow at the end*.

Pacing: calm but purposeful. Each stage gets a clean entrance, a brief hold, a clean handoff. Never two stages competing for attention.

---

## Beat Map

| Beat | Time | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|
| 1 — Hook | 0:00–0:08 | "We have an idea in our heads. By the end of this video, that idea is a moving picture you can watch. So — how does that actually happen?" | A thought bubble on the left, a finished video frame on the right, a question mark in the gap. The question mark pulses gently. | Frame the problem: from idea to artifact. |
| 2 — Pipeline overview | 0:08–0:18 | "We don't wing it. We follow a pipeline. Script. Spec. Build. Preview. Render. Revise. Six stages." | Six labeled tiles slide in left-to-right, forming a horizontal pipeline. Each tile lights up briefly as it lands, in its stage color. | Establish the spine of the whole video — every later beat is a zoom into one of these tiles. |
| 3 — Script stage | 0:18–0:30 | "Stage one — the script. We take the messy idea and write it down in plain language. The script lives as a simple text file." | The Script tile glows. A messy scribbled note settles into a clean document. The document flies into a folder labeled `scripts/`. | Show the first artifact and where it lives. |
| 4 — Spec stage | 0:30–0:45 | "Stage two — the spec. The script tells us what to say. The spec tells us what to show. We break it into beats. No code yet — the spec is the contract." | The script document opens; sentences peel off and arrange into a vertical stack of labeled "beat" cards on a blueprint background. A small "no code" badge appears. | Introduce the spec as a contract; preview the word "beat" before the drill-down. |
| 5 — Drill-down: beat & scene | 0:45–1:00 | "What is a beat? A single moment of understanding. What is a scene? A group of beats that share a visual world. One scene becomes one piece of code." | Camera zooms into a single beat card. It expands into a "scene window" playing a tiny animation inside it. The scene window then sits inside a larger composition frame. | The one drill-down moment. Define the two terms used everywhere downstream. |
| 6 — Build stage | 1:00–1:13 | "Stage three — build. Each scene gets built. Each beat gets its motion. The pieces snap into a project folder we can run." | Beat cards fan out and transform into stacked file icons inside a folder labeled `projects/animation-studio-explained/`. A few reusable shape icons glow as connecting lines link them to multiple files. | Show beats becoming code without showing actual code. |
| 7 — Preview stage | 1:13–1:22 | "Stage four — preview. We open the studio, scrub the timeline, and watch." | A Remotion-Studio-style window appears. A playhead moves across a timeline; frame thumbnails update live. | Make "preview" feel concrete — it's a real window we look at. |
| 8 — Render stage | 1:22–1:30 | "Stage five — render. When it's right, we export. The composition becomes a video file you can share." | The timeline collapses into a single `.mp4` file icon that drops into a folder labeled `output/`. | Close the loop — there is now a tangible artifact at the end. |
| 9 — Revise loop | 1:30–1:42 | "Stage six — revise. If the direction changes, we go back to the spec. If only the look changes, we tweak the code. The pipeline loops." | A curved arrow swings from the Render tile back to the Spec tile. As it travels, the pipeline tiles glow again in sequence. | Show the loop — animations are iterative, not one-shot. |
| 10 — Close | 1:42–1:50 | "The pipeline stays the same. The story is what changes." | Full pipeline visible one final time. The original thought bubble at left now connects through every stage to the finished video frame at right. | Land the takeaway and visually resolve the opening question. |

---

## Key Moments

- **Beat 2 (pipeline reveal):** Tiles must land in order, each with a brief pause so the viewer can read the label before the next arrives. The full pipeline as a single visible row is the visual anchor for the rest of the video.
- **Beat 5 (drill-down):** This is the one moment where scale changes meaningfully. The zoom should feel deliberate, not flashy. Hold the "scene inside composition" view long enough to absorb.
- **Beat 9 (revise loop):** The curved arrow from Render → Spec is the second-most-important shape in the whole video (after the pipeline itself). It must read clearly and not look accidental.
- **Beat 10 (close):** The final shot must visually answer the question posed in Beat 1 — the gap between thought bubble and video frame is now bridged by the pipeline.

---

## Narration Sync Points

| Sync point | Time | Visual event triggered |
|---|---:|---|
| `hook-question` | 0:05 | Question mark pulses between bubble and video frame |
| `pipeline-revealed` | 0:16 | Sixth (last) pipeline tile lands; full pipeline visible |
| `script-folder-lands` | 0:28 | Script document drops into `scripts/` folder |
| `spec-locks-in` | 0:42 | "No code" badge stamps; beat cards stack is complete |
| `scene-zooms-in` | 0:55 | Camera reaches the "scene inside composition" framing |
| `build-fans-out` | 1:10 | Beat cards finish transforming into project files |
| `preview-window-open` | 1:16 | Studio window fully visible; playhead begins moving |
| `render-complete` | 1:28 | `.mp4` file drops into `output/` |
| `loop-closes` | 1:40 | Curved arrow reaches the Spec tile |
| `final-bridge` | 1:46 | Connecting line completes from thought bubble to video frame |

---

## Assets

- Existing assets: none
- Assets to create:
  - `PipelineTile` — labeled rounded rectangle with stage icon and stage color; supports an `active` glow state
  - `FileCard` — animated representation of a file/document; supports "fly into folder" motion
  - `BeatMarker` — small labeled card representing one beat
  - `SceneWindow` — a card that can "open" to reveal a mini-scene inside; used for the drill-down
  - `FlowArrow` — curved arrow used for the revise loop and the bridge in the closing shot
  - `FolderIcon` — labeled folder used for `scripts/`, `specs/`, `projects/`, `output/`
- Fonts: clean sans-serif (system or Inter); no serif
- Colors (stage palette):
  - Background: `#FFFFFF`
  - Text primary: `#111111`
  - Script — `#FAF6EC` fill / `#A07A28` accent (parchment)
  - Spec — `#EAF1FA` fill / `#2C5BA1` accent (blueprint)
  - Build — `#EAF8EE` fill / `#1F8A4C` accent (code green)
  - Preview — `#F1ECF9` fill / `#6B40C4` accent (violet)
  - Render — `#FDF1E0` fill / `#C77A1F` accent (amber)
  - Revise — `#E6F6F7` fill / `#1F7A85` accent (loop cyan)

---

## Constraints

- Runtime: ~80 seconds (±5s acceptable)
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps (drafts), bump to 60fps only for finals
- Must include: all six pipeline stages named on screen; the beat→scene drill-down; the revise loop arrow; a visual bridge in the closing shot
- Must avoid: any code on screen; any Remotion / React / TypeScript jargon in narration; dark theme; multiple competing animations on screen at once

---

## Review Checklist

- [ ] Core message lands by Beat 2 (pipeline visible, six stages named).
- [ ] Each stage tile uses its assigned stage color consistently.
- [ ] Beat 5 drill-down is the only moment with a meaningful zoom.
- [ ] Revise loop arrow visually connects Render → Spec without ambiguity.
- [ ] Closing shot bridges the thought bubble and video frame from Beat 1.
- [ ] No code, no file paths beyond folder names, no React/Remotion jargon in narration.
- [ ] Every beat can be understood with audio muted.
- [ ] Total runtime within 75–85 seconds.

---

## Do Not Include In This Spec

- Code
- Component props
- Pixel positions
- Frame numbers (use sync points and beat times instead)
- Remotion API references
