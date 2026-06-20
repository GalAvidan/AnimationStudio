# Skills Index

Quick-reference registry. Read this instead of scanning `skills/` subfolders.

---

## core — universal animation skills

| Skill | File | When to use |
|---|---|---|
| audio-pipeline | `core/audio-pipeline.skill.md` | Designing or debugging the audio layer |
| audio-sync | `core/audio-sync.skill.md` | Syncing narration to animation timeline |
| motion-language | `core/motion-language.skill.md` | Choosing movement style and vocabulary |
| narrative-structure | `core/narrative-structure.skill.md` | Structuring explanations into beats |
| revision-workflow | `core/revision-workflow.skill.md` | Handling revision requests against a spec |
| svg-layer-naming | `core/svg-layer-naming.skill.md` | Naming SVG elements for code-driven animation |
| visual-clarity | `core/visual-clarity.skill.md` | Visual design and readability decisions |

---

## adapters/motion-canvas — default adapter (all new projects)

| Skill | File | When to use |
|---|---|---|
| character-rig | `adapters/motion-canvas/character-rig.skill.md` | Building rigged character animations |
| composition | `adapters/motion-canvas/composition.skill.md` | Structuring Motion Canvas compositions |
| scene | `adapters/motion-canvas/scene.skill.md` | Writing scene files |
| tweening | `adapters/motion-canvas/tweening.skill.md` | Adding motion tweens and easing |

---

## adapters/manim — math, science, 3D projects

| Skill | File | When to use |
|---|---|---|
| composition | `adapters/manim/composition.skill.md` | Project layout, commands, compositionId → class name mapping |
| scene | `adapters/manim/scene.skill.md` | Writing Scene classes, animation primitives, timing, rate_func |
| mobjects | `adapters/manim/mobjects.skill.md` | Shapes, text, MathTex, groups, positioning, styling |
| voiceover | `adapters/manim/voiceover.skill.md` | Narration sync via manim-voiceover, beat mapping |
| three_d | `adapters/manim/three_d.skill.md` | ThreeDScene, 3D Mobjects, camera movement |

---

## adapters/remotion — legacy projects only

| Skill | File | When to use |
|---|---|---|
| composition | `adapters/remotion/composition.skill.md` | Existing Remotion projects only — no new projects |

---

## cross — multi-project or campaign skills

| Skill | File | When to use |
|---|---|---|
| campaign-resolution | `cross/campaign-resolution.skill.md` | Project declares a `campaign` field in config |
| theme-collection | `cross/theme-collection.skill.md` | Applying a shared theme across a collection |

---

## (root) — cross-cutting guidance

| Skill | File | When to use |
|---|---|---|
| adapter-selection | `adapter-selection.skill.md` | Choosing between Motion Canvas and Manim for a new project |
