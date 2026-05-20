# Plan 4: Expressive Capability — Narrative + Character (MVP)

**TL;DR** — On top of the shipped Motion Canvas adapter (Plan 2), add (A) adapter-agnostic narrative fields to the spec so stories can express speaker and emotion, then (B) a minimal character rig API inside the MC adapter so named SVG layers can be animated via poses, blinks, look-at, and layer swaps without hand-tweening every property. **Audio and 3D are explicitly out of scope. Lip-sync, IK, and typed scene transitions are deferred.**

**Execution order:** This plan runs **before** `plan-3-extended-adapters.md`. Spec extensions here define the authoring contract every future adapter will inherit — better proven against one working adapter than retrofitted across three. Plan-3's file gets a one-line prerequisite note; no file renames.

---

## TODO

### Phase 0 — Plan housekeeping
*Do first so the plan record matches what's about to be built.*

- [x] Create `agent-context/.plans/plan-4-expressive-capability.md` (this file).
- [x] Add a one-line prerequisite note to the top of `agent-context/.plans/plan-3-extended-adapters.md` recording that Plan 4 now runs before Plan 3 (no rename).

### Phase A — Narrative spec extensions (adapter-agnostic)
*All new fields optional; existing why-sky-is-blue spec must keep validating.*

- [x] Extend `Beat` in `packages/spec-types/src/index.ts`:
  - `speaker?: string` — character id the line is delivered by (omit = narrator).
  - `emotion?: string` — free-form tag (e.g. `curious`, `worried`); not enumerated yet.
- [x] **Scene transitions: no typed schema this plan.** Keep the prose marker `[TRANSITION: fade <duration>]` in the script template. A skill tells the agent how to translate the marker into a Motion Canvas `fadeTransition(<duration>)` call when registering scenes. The formal `SceneTransition` type is deferred until ≥2 transition kinds or ≥2 projects need it.
- [x] Add `CharacterRef` type + optional `characters?: CharacterRef[]` on `ProjectConfig` (id, label, optional `rigAsset` path).
- [x] Update `agent-context/templates/spec.template.md`: **Cast** section + **Speaker** and **Emotion** beat-table columns.
- [x] Update `agent-context/templates/script.template.md`: document `[SPEAKER: hero]` and `[TRANSITION: fade 400ms]` markers alongside `[VISUAL:]` / `[SYNC:]`.
- [x] Update `agent-context/intent/conventions.md`: short subsection on narrative fields; speaker/emotion vocab free-form for now.
- [x] New skill: `agent-context/skills/core/narrative-structure.skill.md`.
- [x] Update `agent-context/tasks/create-spec.task.md` and `create-script.task.md` to prompt for cast and surface the new fields.

**Verification (Phase A)**

- Workspace typecheck passes; why-sky-is-blue still type-checks unchanged (back-compat proof).
- Small fixture in `spec-types` round-trips a spec with speaker, emotion, and cast.
- Skill files contain at least one worked example each.

### Phase B — MVP rig in Motion Canvas
*Depends on Phase A only for the Cast convention; rig API itself is independent.*

**What a rig is, concretely:** a typed wrapper around a set of named Motion Canvas nodes (the "parts" of a character). It holds an index `partName → Node` and methods that mutate those nodes (`pose`, `blink`, `swapTo`). Thin convenience layer (~150–300 LOC), no framework.

**Cross-scene reuse — Strategy C (per-scene load + named presets):** each scene builds its own rig instance (scenes stay independently runnable). The rig exposes a `presets` map (`{ neutral, happy, worried, surprised, … }`) defined once per character in a sibling `<name>.presets.ts`. Scenes pick the starting emotion by name. The emotion catalog lives with the rig; scenes never duplicate definitions. Pairs naturally with Phase A's `emotion?` field — today the scene-author manually calls `hero.applyPreset(beat.emotion)`; auto-resolution comes later.

- [x] **New module** `packages/adapter-motion-canvas/src/rig.ts`:
  - `loadRig(opts): Rig` — takes a `parts` map (`partName → Node`), optional `presets`, optional `initialPreset`.
  - `Rig` exposes `parts`, `presets`, `layer(name)` escape hatch.
  - `rig.pose(pose, duration?, easing?)` — tween any subset of properties on any subset of parts in one call.
  - `rig.applyPreset(name, duration?)` — tween to a named preset.
  - Helpers: `blink(duration?)`, `lookAt(point, duration?)`, `swapTo(slot, partName, duration?)`.
  - **Explicit non-goals:** no IK, no walk cycle, no viseme lip-sync.
- [x] ~~Re-export rig API from `packages/adapter-motion-canvas/src/index.ts`.~~ **Changed during implementation:** rig is exposed via a subpath export `@studio/adapter-motion-canvas/rig` instead. The adapter's `index.ts` imports `node:child_process` at module scope, which would break browser bundlers if re-exported into the same entry. Subpath export preserves intent (importable from projects) without coupling browser code to Node code.
- [x] Extend `agent-context/skills/core/svg-layer-naming.skill.md`: add **Standard Character Vocabulary** subsection listing the part names the rig recognises (eye_*, mouth, mouth_smile/neutral/open, brow_left/right, arm_*, head, body). Artists who follow the vocabulary get rig support "for free".
- [x] New skill: `agent-context/skills/adapters/motion-canvas/character-rig.skill.md` — how to build a rig, pose it, blink, look-at, swap mouth shapes; worked example of a 4-second two-character exchange; explicit non-goals.
- [x] Pilot project `projects/character-pilot/` (~15s, 2 scenes, ≥1 sync point):
  - 2 characters (`hero`, `friend`) — built from MC primitives (Pattern A in the rig skill) since the pilot's job is to validate the rig API, not the SVG-loader path. SVG assets are deferred. Sibling `assets/<name>.presets.ts` files define 3 emotion presets each (`neutral`, `happy`, `worried`).
  - `project.config.ts` declares both in the new `characters` field.
  - Spec uses `speaker:` per beat, `emotion:` per beat (varying across scenes to prove same-asset / different-emotion). One scene boundary uses `[TRANSITION: fade 400ms]`; scene-registration code calls MC's `fadeTransition(0.4)` accordingly.
  - Scene file uses only the rig API for character motion (no raw tweens on character parts).

**Verification (Phase B)**

- Pilot previews with hot reload and renders to MP4 via the existing `pnpm --filter ./projects/character-pilot dev` / `build` commands.
- Reviewer can read the scene file and never sees a hand-written tween on `hero_eye_left.opacity` — all character motion flows through the rig API.
- Every `speaker` matches a declared character id in `project.config.ts`.
- `pnpm -w lint` and typecheck pass.

---

## Files

**Phase 0 (create)**
- `agent-context/.plans/plan-4-expressive-capability.md`.

**Phase 0 (modify)**
- `agent-context/.plans/plan-3-extended-adapters.md` — prerequisite note.

**Phase A (modify)**
- `packages/spec-types/src/index.ts` — add `speaker`, `emotion` on `Beat`; add `CharacterRef` type and optional `characters` on `ProjectConfig`. (No `SceneTransition` type this plan.)
- `agent-context/templates/spec.template.md` — Cast section + Speaker/Emotion columns.
- `agent-context/templates/script.template.md` — `[SPEAKER:]`, `[TRANSITION:]` markers.
- `agent-context/intent/conventions.md` — narrative-fields subsection.
- `agent-context/tasks/create-spec.task.md`, `create-script.task.md` — prompt for cast.

**Phase A (create)**
- `agent-context/skills/core/narrative-structure.skill.md`.

**Phase B (create)**
- `packages/adapter-motion-canvas/src/rig.ts` — the rig API.
- `agent-context/skills/adapters/motion-canvas/character-rig.skill.md`.
- `projects/character-pilot/` — full project scaffold (mirrors `_template-motion-canvas`).

**Phase B (modify)**
- `packages/adapter-motion-canvas/src/index.ts` — re-export rig API.
- `agent-context/skills/core/svg-layer-naming.skill.md` — Standard Character Vocabulary.

---

## Decisions

- **Execution order**: this plan runs before `plan-3-extended-adapters.md`. File names unchanged; one-line note added to plan-3.
- **Naming**: Plan 4 on a parallel "expressive capability" track, not Plan 2.1.
- **Phase order**: spec first, then rig — lock authoring vocabulary before code consumes it.
- **Character ambition**: MVP rig only. No lip-sync (would re-introduce audio scope), no IK (no prior art, R&D risk).
- **Cross-scene character reuse**: Strategy C (per-scene load + named presets).
- **Scene transitions**: prose marker + skill only. No typed schema, no generic runner this plan.
- **Back-compat**: All new spec fields optional. `why-sky-is-blue` must not change.
- **Rig input**: `loadRig` takes a pre-built `parts` map of Motion Canvas nodes, not raw SVG-by-path. This sidesteps MC's SVG-by-ID parsing details for the MVP. A future skill can document an SVG-to-parts helper if a project needs it.

## Out of Scope (this plan)

audio loading/mux, viseme/lip-sync, 2D IK, walk-cycle helper, character physics, dialogue camera framing, branching narrative, typed `SceneTransition` schema, generic spec→MC transition runner, shared cross-project rig assets.

## Further Considerations

1. **Emotion as render-time signal?** Today `emotion` is just authoring intent — no code reads it. With Strategy C presets in place, the natural upgrade is to have the rig auto-resolve `beat.emotion` against the character's `presets`. Defer until the pilot reveals patterns.
2. **Typed `SceneTransition` deferred.** Prose marker + skill is sufficient for one pilot using one kind. Promote to a typed field on `Scene` when ≥2 kinds or ≥2 projects exist and inconsistency between agents becomes visible.
3. **Per-project rig assets.** Pilot keeps characters local. Shared cross-project assets revisit only when a second project actually wants to reuse a character.
4. **Speaker→rig binding.** Soft convention: scene file maps `speaker` ids to loaded `Rig` instances at the top. No framework magic.
