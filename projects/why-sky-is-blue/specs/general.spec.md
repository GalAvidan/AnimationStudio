# Spec: Why the Sky Is Blue — General Audience

## Project

- **Slug:** `why-sky-is-blue`
- **Composition ID:** `WhySkyIsBlueGeneral`
- **Source script:** `scripts/general.script.md`
- **Target runtime:** ~60 seconds
- **Audience:** Curious adults with no science background — they've wondered this casually but want a clear, repeatable answer.
- **Core message:** The sky is blue because blue light scatters off atmospheric molecules in every direction, filling the sky from all angles.

---

## Visual Philosophy

Dark, clean, diagram-over-decoration. The background starts as deep near-black and lives in the blue-to-midnight range throughout — color contrast is the primary visual language, not decoration. Motion is calm and deliberate; each beat introduces exactly one new element. The spectrum and its wavelengths do the heavy conceptual lifting.

Text appears in **two zones**:
- **Zone labels** (small, ~30px, atmosphere color `#b8d4f0`): placed adjacent to the visual element they identify. Examples: “Single molecule”, “← Atmosphere →”, “Visible light spectrum”.
- **Narrative captions** (large, ~48px, white): positioned at the bottom of the frame (y ≈ 400) or in the dead space of a beat (e.g. the space region when Earth fills the bottom). One sentence, maximum. Summarise the beat’s core message so the animation is fully legible with audio muted.

---

## On-Screen Text Per Beat

| Beat | Zone label(s) | Narrative caption |
|---|---|---|
| 1 — The question | — | “Why is the sky blue?” (already the visual centrepiece) |
| 2 — White light | “Visible light spectrum” (near fan) | “Sunlight looks white — but it’s every color at once.” |
| 3 — The atmosphere | “Space”, “← Atmosphere →”, “Earth”, “N₂ · O₂” | “Earth’s atmosphere is full of tiny gas molecules.” |
| 4 — Rayleigh scattering | “Single molecule” | Stage 1: “Shorter wavelengths scatter in every direction.” → Stage 2: “Blue bounces · Red passes through” |
| 5 — Why not violet? | Band names (existing) | Stage 1: “Violet actually scatters even more than blue.” → Stage 2: “Our eyes are simply better tuned for blue.” |
| 6 — Sunrise/sunset | “← longer path through atmosphere” (on path) | Stage 1: “At sunrise and sunset, light travels a much longer path.” → Stage 2: “Blue has already scattered away.” |
| 7 — Payoff | — | “The sky is blue because blue light can’t stop bouncing.” (existing) |

---

## Beat Map

| Beat | Duration | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|
| 1 — The question | 5s | "Why is the sky blue?" | Deep blue sky gradient fills frame; sun rises slowly from lower-left; question text fades in, holds, fades out | Opens with the question; establishes visual tone |
| 2 — White light | 8s | "Sunlight looks white — but it's every color at once." | A single white ray enters from upper-right; on "every" it fans open into a full ROYGBV spectrum spanning the frame | Establishes that sunlight is a mix of all wavelengths |
| 3 — The atmosphere | 7s | "Earth's atmosphere is full of tiny gas molecules — mostly nitrogen and oxygen." | View pulls back to reveal Earth's curve and a thin glowing atmosphere band; small circular particles appear scattered through the layer | Sets the stage for the scattering interaction |
| 4 — Rayleigh scattering | 12s | "When sunlight hits those molecules, shorter wavelengths scatter — in every direction. Blue light bounces. Red light passes straight through." | Zoom into a single molecule; colored rays approach; red and orange continue past undisturbed; blue bursts outward in all directions on "bounces"; pull back to show many molecules doing the same, filling the atmosphere with scattered blue | Core physics beat — the explanation the whole animation builds toward |
| 5 — Why not violet? | 8s | "Violet actually scatters even more. So why not a violet sky? Our eyes are simply better tuned for blue." | Human eye sensitivity curve appears as a soft overlay on the spectrum; blue peak glows bright; violet is visibly present but dims and recedes | Anticipates and resolves the obvious follow-up; makes the explanation feel complete |
| 6 — Sunrise/sunset | 8s | "At sunrise or sunset, light takes a longer path through the atmosphere. By the time it reaches you, the blue has already scattered away — leaving orange and red." | Sun sits at the horizon; a long shallow path traces through the thick lower atmosphere; blue depletes visibly along the path on "longer path"; warm orange and red reach the observer on the ground | Demonstrates the same physics under different geometry; reinforces and extends the core explanation |
| 7 — Payoff | 7s | "The sky is blue because blue light can't stop bouncing." | Wide view of a full blue sky; scattered blue rays stream in from every direction, converging on a single silhouetted observer standing on open ground | Lands the core message with a satisfying spatial payoff |

---

## Narration Sync Points

| Sync point | Beat ref | Visual event triggered |
|---|---|---|
| `spectrum-fan` | beat-2, 3s in | White ray fans open into full ROYGBV spectrum |
| `scatter-bounce` | beat-4, 8s in | Blue rays burst outward from molecule in all directions |
| `long-path` | beat-6, 3s in | Path line extends across the frame through the lower atmosphere |

---

## Assets

- Existing assets: none
- Assets to create:
  - `SkyGradient` — full-frame sky background; states: day-blue, near-black, sunset-warm
  - `SpectrumRay` — animated white ray that fans open into ROYGBV spectrum; collapses back to white
  - `EarthAtmosphere` — Earth's curve with a glowing atmosphere band and scattered molecule dots; molecules fade in on cue
  - `MoleculeScatter` — single molecule with incoming colored rays; red/orange pass through, blue scatter burst fires on sync; repeatable for pull-back view
  - `VisionCurve` — soft human-eye sensitivity curve overlay aligned to the spectrum; blue peak highlight, violet dim state
  - `SunsetPath` — low-angle sun, long shallow path through thick atmosphere, color-depletion gradient along path
  - `ObserverSilhouette` — minimal standing human silhouette, no detail; used in beat-6 and beat-7
- Fonts: Inter, weight 400; fallback system sans-serif
- Colors:
  - Background: `#0a0e1a`
  - Sky blue (primary): `#4a90d9`
  - Atmosphere glow: `#b8d4f0`
  - Molecule / particle: `#c8ddf0`
  - Red wavelength: `#e85d4a`
  - Orange wavelength: `#f5a623`
  - Yellow wavelength: `#f8e71c`
  - Green wavelength: `#7ed321`
  - Violet wavelength: `#9b59b6`
  - Sunset warm: `#ff6b35`
  - Text: `#ffffff`

---

## Constraints

- Runtime: ~60 seconds (±5s acceptable)
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps (drafts), 60fps for finals if scatter motion needs clarity
- Must include: spectrum fan (beat-2), molecule scatter closeup with blue burst (beat-4), long-path sunset comparison (beat-6)
- Must avoid: equations, Greek letters, scientific notation, character animation, decorative particle effects unrelated to the physics

---

## Review Checklist

- [ ] Core message lands within the first third of the runtime.
- [ ] Every beat can be understood with audio muted.
- [ ] No code, frame numbers, or component props appear in this spec.
- [ ] Sync points are named and timed.
- [ ] Constraints are complete.
