# Skill: SVG and Layer Naming

## Purpose

Keep design assets easy for agents and code to target.

## Rules

- Preserve layer names when exporting SVGs.
- Prefer internal CSS for SVG styling when practical.
- Do not minify SVGs used for animated layer targeting.
- Name character parts with `<character>_<part>_<side>`.
- Name scene layers with `<layer>_<element>_<number>`.

## Examples

- `hero_eye_left`
- `hero_mouth`
- `bg_grid_01`
- `fg_card_02`

## Standard Character Vocabulary

When a character is going to be loaded as a rig (e.g. via `loadRig` from
`@studio/adapter-motion-canvas/rig`), use these part names where applicable.
The Motion Canvas rig's `blink()`, `lookAt()`, and `swapTo()` helpers rely on
these prefixes.

| Part name           | Purpose                                     | Used by                          |
|---------------------|---------------------------------------------|----------------------------------|
| `head`              | Whole head silhouette / outline             | `pose`                           |
| `body`              | Torso / body silhouette                     | `pose`                           |
| `eye_left`          | Left eye (whole eye, including pupil)       | `blink()`, `lookAt()`            |
| `eye_right`         | Right eye                                   | `blink()`, `lookAt()`            |
| `brow_left`         | Left eyebrow                                | `pose`                           |
| `brow_right`        | Right eyebrow                               | `pose`                           |
| `mouth_<shape>`     | Mouth variant in the `mouth` slot           | `swapTo('mouth', 'mouth_smile')` |
| `cheek_<side>`      | Cheek blush / highlight                     | `pose`                           |
| `arm_<side>`        | Whole arm                                   | `pose`                           |
| `hand_<side>`       | Whole hand                                  | `pose`                           |
| `prop_<name>`       | Held / nearby prop (book, sign, etc.)       | `pose`, `swapTo`                 |

### Slot rule

`swapTo(slot, partName)` operates on every part whose name starts with
`${slot}_`. So all mouth variants must share the `mouth_` prefix
(`mouth_smile`, `mouth_frown`, `mouth_o`, …) and exactly one is visible at a
time. Same pattern works for any swappable layer set (e.g. `prop_book`,
`prop_sign`).

### Minimum viable rig

For a character to read as expressive you need at minimum: `head`, `eye_left`,
`eye_right`, and one mouth variant (`mouth_neutral`). Brows and a second
mouth variant unlock surprised / worried looks cheaply.

