# Spec: <Project Title> — <Variant> Audience

## Project

- **Slug:** `<project-slug>`
- **Composition ID:** `<CompositionId>`
- **Source script:** `scripts/<variant>.script.md`
- **Target runtime:** ~XX seconds
- **Audience:** <!-- who is watching -->
- **Core message:** <!-- the one thing the viewer must remember -->

---

## Visual Philosophy

<!-- Describe the overall look and feel: color palette, typographic style, density of elements,
     motion character (calm / energetic / playful), whether diagrams or characters dominate.
     Two to four sentences is enough. -->

---

## Beat Map

| Beat | Time | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|
| 1 — | 0:00–0:00 | | | |

<!-- Add one row per beat. Use relative timestamps (0:00–0:08).
     "What the viewer sees" describes motion and layout, not code.
     "Purpose" is one clause: why this beat exists in the flow. -->

---

## Narration Sync Points

| Sync point | Time | Visual event triggered |
|---|---:|---|
| `sync-id` | 0:00 | <!-- what visual event fires here --> |

<!-- Add one row per declared sync point.
     Sync IDs must be kebab-case and match markers in the script. -->

---

## Assets

- Existing assets: none
- Assets to create:
  - <!-- ComponentName — description, states -->
- Fonts: <!-- e.g. Inter, system sans-serif -->
- Colors:
  - Background: `#FFFFFF`
  - Text primary: `#111111`
  - <!-- additional semantic colors -->

---

## Constraints

- Runtime: ~XX seconds (±5s acceptable)
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps (drafts), 60fps for finals if motion clarity matters
- Must include: <!-- non-negotiable visual moments -->
- Must avoid: <!-- things that must not appear -->

---

## Review Checklist

- [ ] Core message lands within the first third of the runtime.
- [ ] Every beat can be understood with audio muted.
- [ ] No code, frame numbers, or component props appear in this spec.
- [ ] Sync points are named and timed.
- [ ] Constraints are complete.
