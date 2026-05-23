# Spec: Pythagorean Theorem — Adults Audience

## Project

- **Slug:** `pythagorean-theorem`
- **Composition ID:** `PythagoreanTheoremAdults`
- **Source script:** `scripts/adults.script.md`
- **Target runtime:** ~55 seconds
- **Audience:** Adults who once knew the theorem and want a quick, satisfying refresher of *why* it works geometrically.
- **Core message:** The areas of the squares on the two legs literally add up — by area, not by algebra — to the area of the square on the hypotenuse.

---

## Visual Philosophy

Same bright, saturated palette on cream and same bouncy springs as the kids cut, but tighter and a touch drier. Fewer sparkles, slightly faster pacing, and confident math vocabulary (legs, hypotenuse, area). The geometry carries the explanation; copy stays out of the way.

---

## Cast

Narrator only. No characters.

---

## Beat Map

| Beat | Duration | Speaker | Emotion | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|---|---|
| 1 — intro | 5s | narrator | matter-of-fact | "A right triangle — two legs and a hypotenuse, joined at a perfect ninety-degree corner." | Cream stage. Triangle slides in, bounces once, settles. Filled square pops on the right-angle corner. | Set the subject with proper terminology. |
| 2 — label sides | 6s | narrator | brisk | "Legs of length 3 and 4. Hypotenuse of length 5." | Numbers 3, 4, 5 fly onto their sides, color-coded. | Anchor the 3-4-5 example. |
| 3 — square A | 8s | narrator | building | "Build a square on the first leg. Side length three, area nine." | Red 3×3 square unfolds outward off the short leg. Dot grid fills it; counter ticks to 9. | Show A². |
| 4 — square B | 8s | narrator | rhythmic | "Same move on the second leg. Side length four, area sixteen." | Blue 4×4 square unfolds outward off the long leg. Dot grid fills it; counter ticks to 16. | Show B². |
| 5 — equation appears | 7s | narrator | leading | "Two areas on the legs. Add them." | Equation "A² + B² = ?" types in. 9 and 16 dock beneath their terms. | Frame the question concisely. |
| 6 — sum → C² | 11s | narrator | satisfied | "Twenty-five. Which is exactly the area of the square on the hypotenuse." | 9 and 16 collide into 25 with a small poof. Green 5×5 square unfolds off the hypotenuse; 25 lands on it. | The geometric payoff. |
| 7 — verify & tag | 10s | narrator | landing | "That's the theorem: A² + B² = C². Not algebra — geometry. The areas literally add." | Equation completes to "9 + 16 = 25 ✓". "A² + B² = C²" settles below the triangle. Triangle breathes gently. Minimal sparkle. | Land the takeaway with the formal statement and a one-line insight. |

Total target: ~55s.

---

## Narration Sync Points

| Sync point | Beat ref | Visual event triggered |
|---|---|---|
| `triangle-in` | beat-1, 0.5s in | Triangle settle bounce; right-angle marker pops on "ninety-degree corner". |
| `legs-labeled` | beat-2, 0.8s in | Labels 3, 4 stick on cadence; 5 lands on the hypotenuse word. |
| `square-a-pop` | beat-3, 1s in | Red square begins unfolding. |
| `square-b-pop` | beat-4, 1s in | Blue square begins unfolding. |
| `equation-appear` | beat-5, 0.3s in | Equation typing begins; 9 and 16 dock. |
| `sum-collide` | beat-6, 2.5s in | 9 and 16 collide and merge into 25. |
| `hypotenuse-square` | beat-6, 5.5s in | Green square unfolds off hypotenuse; 25 lands. |
| `verify-equals` | beat-7, 3s in | "✓" tick appears on "the areas literally add"; title settles. |

---

## Assets

- Existing assets: none
- Assets to create: **identical component library to the kids variant** — `RightTriangle`, `LegLabel`, `UnfoldingSquare`, `DotGrid`, `AnimatedEquation`, `SparkleBurst`. The adults variant differs only in beat timings (per `src/data/beats-adults.ts`) and copy, not in components.
- Fonts: **Nunito** (shared with kids variant).
- Colors: shared palette with kids variant.
  - Background (cream): `#FFF8E7`
  - Ink / text primary: `#3A2A1A`
  - Leg A (short, red): `#E85D4A`
  - Leg B (long, blue): `#4A90D9`
  - Hypotenuse C (green): `#7ED321`
  - Sparkle / highlight (gold): `#FFD166`

---

## Constraints

- Runtime: ~55 seconds (±5s acceptable).
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps
- Must include: 3-4-5 right triangle; right-angle marker; squares on all three sides; numeric verification `9 + 16 = 25`; symbolic statement `A² + B² = C²`; explicit use of "legs", "hypotenuse", and "area".
- Must avoid: algebraic derivations, sparkle-heavy effects, kid-cute language, dense paragraphs of text on screen.

---

## Review Checklist

- [ ] Core message lands within the first third of the runtime.
- [ ] Every beat is understandable with audio muted.
- [ ] No code, frame numbers, or component props appear in this spec.
- [ ] Sync points are named and timed.
- [ ] "Legs", "hypotenuse", and "area" each appear at least once.
- [ ] Final frame holds `A² + B² = C²` clearly readable.
