---
status: Draft
approvedBy:
approvedDate:
---

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

## Cast

<!-- Optional. Only include if the animation has named characters delivering lines.
     Each row maps a character id (used in the Beat Map's Speaker column and in
     `project.config.ts` characters[].id) to a short description. -->

| Character id | Label | Notes |
|---|---|---|
| `hero` | Hero | <!-- one-line description of the character --> |

---

## Beat Map

| Beat | Duration | Speaker | Emotion | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|---|---|
| 1 — | 0s | | | | | |

<!-- Add one row per beat. Duration is time on screen (e.g. `6s`, `400ms`).
     Do not use absolute timeline positions — beats can be reordered without renumbering timestamps.
     Speaker: character id from the Cast table; leave blank for narrator.
     Emotion: free-form tag (e.g. curious, worried, surprised). Authoring intent only;
              maps to a rig preset of the same name when the adapter supports it.
     "What the viewer sees" describes motion and layout, not code.
     "Purpose" is one clause: why this beat exists in the flow. -->

---

## Narration Sync Points

| Sync point | Beat ref | Visual event triggered |
|---|---|---|
| `sync-id` | beat-N, Xs in | <!-- what visual event fires here --> |

<!-- Add one row per declared sync point.
     Beat ref format: beat name + offset from its start (e.g. `beat-2, 3s in`).
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
