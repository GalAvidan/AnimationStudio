# Plan 3: Extended Adapters — Three.js + In-House Thin

> **Execution-order note (added during Plan 4):** Plan 4 (Expressive Capability — Narrative + Character) now runs **before** this plan. Spec extensions in Plan 4 define the authoring contract that future adapters here must honor; better to prove them against the working Motion Canvas adapter first.

**TL;DR** — After Motion Canvas is battle-tested in Plan 2, add the Two remaining adapters: **Three.js** for 3D scenes and the **in-house thin adapter** (React + Playwright + ffmpeg) as a zero-proprietary-dependency fallback for 2D. The `RenderAdapter` contract from Plan 2 is already in place; this plan is purely additive.

**Prerequisite:** Plan 2 complete — Motion Canvas adapter stable, pilot project shipped, contract proven. **Plan 4 complete** — narrative spec fields and Motion Canvas rig API shipped.

---

## TODO

### Phase C — Three.js Adapter (3D capability)

- [ ] Create `packages/adapter-threejs/`
  - Frame-stepped animation loop (frame-by-frame clock, not `requestAnimationFrame`)
  - Offscreen WebGL render to PNG sequence via **Playwright** (MIT)
  - PNG sequence → MP4 via ffmpeg
  - Implements `RenderAdapter` from `@studio/adapter-contract`
- [ ] Concept mapping to define before building:
  - Beat → time-keyed keyframe group driven by central clock
  - Scene → Three.js `Scene` + `Camera` + `WebGLRenderer`
  - Sync point → named clock markers
  - Composition → render output target (resolution, fps, duration)
- [ ] Add `threejs` row to `agent-context/map/adapter-registry.md`
- [ ] Create `agent-context/skills/adapters/threejs/`:
  - `scene.skill.md` — scene graph, camera setup, lighting basics
  - `timeline.skill.md` — frame-stepped clock, keyframe groups, easing
  - `capture.skill.md` — offscreen WebGL render to PNG, ffmpeg encoding, perf tips
- [ ] Create `projects/_template-threejs/`
- [ ] Add `!projects/_template-threejs` to `pnpm-workspace.yaml`
- [ ] Create `agent-context/intent/spec-conventions-3d.md` — addendum for camera moves, depth cues, spatial sync points (these are absent from current 2D spec format)
- [ ] Expand `AdapterName` in `spec-types` to include `"threejs"`

### Phase D — In-House Thin Adapter (React + Playwright + ffmpeg)

- [ ] Create `packages/adapter-in-house-2d/`
  - `<Stage frame={n}>` React context (~50 LOC) — replaces Remotion's `useCurrentFrame()`
  - Vite dev server for preview (standard React app, hot reload works naturally)
  - Frame-export script: Playwright → step frame-by-frame → PNG sequence → ffmpeg → MP4
  - Audio: ffmpeg post-mux of a separate audio track
  - Implements `RenderAdapter` from `@studio/adapter-contract`
- [ ] Portability note: existing Remotion scene code is nearly portable — only `useCurrentFrame()` → `useStageFrame()` changes
- [ ] Add `in-house-2d` row to `agent-context/map/adapter-registry.md`
- [ ] Create `agent-context/skills/adapters/in-house-2d/`:
  - `stage.skill.md` — `<Stage>` API, frame provider, scene mounting, `useStageFrame()`
  - `capture.skill.md` — Playwright capture loop, ffmpeg pipe, performance tips, audio mux
- [ ] Create `projects/_template-in-house-2d/`
- [ ] Add `!projects/_template-in-house-2d` to `pnpm-workspace.yaml`
- [ ] Expand `AdapterName` in `spec-types` to include `"in-house-2d"`

### Phase E — ADRs and Docs

- [ ] `agent-context/intent/decisions/0004-pluggable-renderer-adapters.md`
  - Why the adapter pattern
  - MIT/license constraint reasoning
  - Legacy Remotion freeze rationale
- [ ] `agent-context/intent/decisions/0005-default-adapter-choice.md`
  - Motion Canvas as default for new 2D projects and why
  - When to choose Three.js vs in-house-2d
- [ ] Update `readme.md` — adapter section with all four adapters and links
- [ ] Update `references.md` — Three.js docs, Playwright docs

---

## Open Questions (resolve before building)

1. **Audio parity**: Motion Canvas supports audio natively. Three.js and in-house need a custom sync pattern. Standardize on ffmpeg post-mux for all adapters? Preview-time audio is best-effort per adapter?
2. **Three.js + Tailwind**: Three.js scenes are WebGL-rendered — Tailwind doesn't apply. Reference shared theme tokens from `@studio/animation-utils` instead?
3. **Adapter version pinning**: Use `peerDependencies` in each adapter `package.json` with explicit major version pins to avoid silent upstream breakage?
4. **In-house trade-off doc**: Slower first render than Motion Canvas; faster hot preview iteration after first Playwright launch; zero proprietary dependency in critical path. Worth a dedicated trade-off note in the skill files?

---

## Decisions Already Made

- Playwright over Puppeteer (MIT, actively maintained, consistent with Plan 2 capture work)
- Three.js (MIT, dominant 3D web stack, not a game engine)
- In-house is optional — only for projects needing zero third-party rendering engine in the critical path
- Lottie / Rive / Manim adapters excluded — can be added under the same contract later with no structural changes
- Migrating existing Remotion projects excluded — they stay frozen
