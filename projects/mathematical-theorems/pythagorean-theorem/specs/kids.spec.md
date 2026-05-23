# Spec: Pythagorean Theorem — Kids Audience

## Project

- **Slug:** `pythagorean-theorem`
- **Composition ID:** `PythagoreanTheoremKids`
- **Source script:** `scripts/kids.script.md`
- **Target runtime:** ~60 seconds
- **Audience:** Curious kids (~8–12) with no prior exposure to the theorem.
- **Core message:** On a right triangle, the two short sides' squares add up — by area — to the long side's square.

---

## Visual Philosophy

Bright, saturated shapes on a warm cream stage. Everything moves with bouncy ease-out springs and a small overshoot — like a kids' math app crossed with a Pixar short. Numbers feel like small characters: they pop in, count up, collide, and high-five. Generous sparkle accents at celebratory moments. Rounded sans typography (Nunito), soft drop shadows, no harsh lines.

---

## Cast

Narrator only. No characters.

---

## Beat Map

| Beat | Duration | Speaker | Emotion | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|---|---|
| 1 — intro | 6s | narrator | inviting | "Meet a triangle. But not just any triangle — this one has a perfectly square corner." | Cream stage. A right triangle slides in from below, bounces once, settles centered. A small filled square pops onto the right-angle corner. | Establish the subject and the special corner. |
| 2 — label sides | 7s | narrator | playful | "Its two short sides are 3 and 4. The long side across from the square corner? That's 5." | Numbers 3, 4, 5 fly in from off-screen and stick to each side with a tick. Each number takes the color of its side. | Anchor the 3-4-5 example. |
| 3 — square A | 9s | narrator | curious | "Take the side that's 3 and build a square on it. Three across, three down — that's 9 little squares." | A red 3×3 square unfolds outward off the short leg. A 3×3 grid of dots fills it; a counter ticks 1, 2, 3 … 9. | Show what "squared" means visually for A. |
| 4 — square B | 9s | narrator | building | "Do the same with the side that's 4. Four across, four down — 16 little squares." | A blue 4×4 square unfolds outward off the long leg. A 4×4 grid of dots fills it; counter ticks up to 16. | Repeat the pattern for B; reinforce. |
| 5 — equation appears | 8s | narrator | inviting | "So we have 9 over here, and 16 over there. What if we add them up?" | The equation "A² + B² = ?" types in above the triangle. The 9 and 16 shrink and dock under their letters. | Frame the question. |
| 6 — sum → C² | 12s | narrator | wow | "Nine plus sixteen… twenty-five! And look — that's exactly the square on the longest side." | 9 and 16 slide toward each other, collide with a sparkle poof, and merge into 25. A green 5×5 square unfolds off the hypotenuse; the 25 lands on top of it and settles with a bounce. | The payoff: areas literally add. |
| 7 — verify & tag | 9s | narrator | warm | "A² plus B² equals C² — every single time. That's the Pythagorean theorem. Pretty cool, right?" | Equation completes to "9 + 16 = 25 ✓". A large "A² + B² = C²" title settles below the triangle. Triangle breathes gently. Soft sparkles. | Land the takeaway and the formal statement. |

Total target: ~60s.

---

## Narration Sync Points

| Sync point | Beat ref | Visual event triggered |
|---|---|---|
| `triangle-in` | beat-1, 0.5s in | Triangle settle bounce; right-angle marker pops on the word "square corner". |
| `legs-labeled` | beat-2, 1s in | First number sticks; subsequent two follow on cadence. |
| `square-a-pop` | beat-3, 1s in | Red square begins unfolding off short leg. |
| `square-b-pop` | beat-4, 1s in | Blue square begins unfolding off long leg. |
| `equation-appear` | beat-5, 0.5s in | Equation typing begins; 9 and 16 dock under A² and B². |
| `sum-collide` | beat-6, 3s in | 9 and 16 collide, merge into 25, sparkle burst. |
| `hypotenuse-square` | beat-6, 6s in | Green square unfolds off hypotenuse; 25 lands on it. |
| `verify-equals` | beat-7, 2s in | "✓" tick appears; "A² + B² = C²" title settles. |

---

## Assets

- Existing assets: none
- Assets to create:
  - `RightTriangle` — colored sides, optional right-angle marker; supports entrance bounce and gentle idle breathe.
  - `LegLabel` — colored number that flies onto a side with a tick.
  - `UnfoldingSquare` — square that unfolds outward from a triangle edge; holds a `DotGrid` and a counter.
  - `DotGrid` — N×N grid of dots that fills in sequentially while a counter ticks up.
  - `AnimatedEquation` — equation with token slots (`A²`, `B²`, `C²`, `=`, `?`) supporting typing, docking values, and completion.
  - `SparkleBurst` — short particle accent for collide and verify moments.
- Fonts: **Nunito** (rounded sans). System fallback: rounded sans-serif.
- Colors:
  - Background (cream): `#FFF8E7`
  - Ink / text primary: `#3A2A1A`
  - Leg A (short, red): `#E85D4A`
  - Leg B (long, blue): `#4A90D9`
  - Hypotenuse C (green): `#7ED321`
  - Sparkle / highlight (gold): `#FFD166`

---

## Constraints

- Runtime: ~60 seconds (±5s acceptable).
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps
- Must include: a 3-4-5 right triangle; visible right-angle marker; squares on all three sides; the numeric verification `9 + 16 = 25`; the symbolic statement `A² + B² = C²`.
- Must avoid: algebraic derivations, formal proof language, dense text, dark backgrounds, harsh straight-line motion (everything should feel bouncy).

---

## Review Checklist

- [ ] Core message lands within the first third of the runtime (by end of Beat 3, viewer sees what "squared" means).
- [ ] Every beat is understandable with audio muted.
- [ ] No code, frame numbers, or component props appear in this spec.
- [ ] Sync points are named and timed.
- [ ] 3-4-5 example is visible end-to-end.
- [ ] Final frame holds `A² + B² = C²` clearly readable.
