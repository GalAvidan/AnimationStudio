# Plan 2: Renderer Independence — Pluggable Adapter Architecture

**TL;DR** — Treat Remotion as one renderer among many, not the foundation. Define a small `RenderAdapter` contract in `packages/adapter-contract/` that any rendering engine can implement: take a `BeatTimeline` + `ProjectConfig` → produce frames or video. Ship two MIT adapters first (**Motion Canvas** for 2D and **Three.js** for 3D), plus an **in-house thin adapter** (React + Puppeteer + ffmpeg) for full ownership. Remotion stays only as a legacy adapter for frozen projects. The "beating heart" — scripts, specs, beats, sync points, agent workflow — is unchanged; only the rendering tail swaps.

---

## Why This Shape

The goals — MIT/in-house licensing, vendor independence, future 3D support, and no game-engine complexity — all point to the same answer: **the spec/beat system is renderer-agnostic; renderers are interchangeable adapters**. This lets you mix engines per project without forking the brain. Each project's `project.config.ts` (established in Plan 1) is the switch that selects the adapter.

---

## The Adapter Contract

Defined in `packages/adapter-contract/src/index.ts`:

```ts
interface RenderAdapter {
  name: string                          // "remotion" | "motion-canvas" | "threejs" | "in-house-2d"
  capabilities: {
    dimensions: "2d" | "3d" | "both"
    audio: boolean
    vector: boolean
  }
  preview(project: ProjectPath): Promise<PreviewServer>
  render(project: ProjectPath, opts: RenderOptions): Promise<RenderResult>
  resolveSyncPoints(timeline: BeatTimeline): SyncPointMap  // semantic name → frame number
}
```

Supporting types (`ProjectPath`, `PreviewServer`, `RenderOptions`, `RenderResult`, `BeatTimeline`, `SyncPointMap`) also live in `adapter-contract/` and depend on `@studio/spec-types` from Plan 1.

---

## Adapter Lineup

| Adapter | License | Use for | Effort |
|---|---|---|---|
| **Motion Canvas** | MIT | New 2D explainers — primary Remotion replacement | Low |
| **Three.js** | MIT | 3D scenes, camera moves, spatial concepts | Medium |
| **In-house thin** (React + Puppeteer + ffmpeg) | All components MIT/Apache | Full ownership for 2D when MC isn't a fit | Medium |
| **Remotion** (legacy) | Custom (paid >3 people) | Frozen `_legacy` projects only | None — already there |

---

## Phases

**Recommended build order: A → B → first pilot project → D → C**
(Three.js last — 3D specs and skills are the most new ground; build after the contract is battle-tested.)

---

### Phase A — Contract and Registry (do first; enables everything else)

1. Create `packages/adapter-contract/` with the `RenderAdapter` interface and all supporting types. Depends on `@studio/spec-types`.
2. Create `agent-context/map/adapter-registry.md` — table of registered adapters with: name, package path, license, capabilities, status (stable / experimental / legacy), required skills folder.
3. Update `agent-context/tasks/build-animation.task.md`, `preview.task.md`, `render.task.md`:
   - Read `projects/<name>/project.config.ts`
   - Look up adapter in `adapter-registry.md`
   - Call `preview()` / `render()` on it

### Phase B — Adapter #1: Motion Canvas (primary Remotion replacement)

4. Create `packages/adapter-motion-canvas/` wrapping `@motion-canvas/core` + `@motion-canvas/2d`. Implements `RenderAdapter`.
5. Concept mapping from Remotion to Motion Canvas:

   | Remotion | Motion Canvas |
   |---|---|
   | `<Composition>` in `Root.tsx` | `makeScene2D()` generator function |
   | `useCurrentFrame()` + `interpolate()` | `yield* tween()` / `yield* waitFor()` |
   | Named sync points resolved at build | Named `useTime()` markers |
   | `variant` prop on shared scenes | Factory function taking variant config |
   | `beats-*.ts` data files | Same — unchanged |

6. Port `@studio/animation-utils` easing helpers to also expose Motion Canvas-compatible wrappers. Motion Canvas has its own easing; expose a unified API surface so scene code is portable.
7. Create `agent-context/skills/adapters/motion-canvas/`:
   - `motion-canvas-composition.skill.md` — replaces `remotion-composition.skill.md`
   - `motion-canvas-scene.skill.md` — generator-based timing, `yield* waitFor()` / `yield* all()` patterns
   - `motion-canvas-tweening.skill.md` — `tween()`, signals, reactivity
8. Add `projects/_template-motion-canvas/` — Motion Canvas variant of the project scaffold.

### Phase C — Adapter #2: Three.js (3D capability)

9. Create `packages/adapter-threejs/` wrapping Three.js + a thin in-house timeline driver:
   - Frame-stepped animation loop (frame-by-frame clock, not `requestAnimationFrame`)
   - Offscreen WebGL render to PNG sequence via Playwright (MIT-licensed headless browser)
   - PNG sequence → MP4 via ffmpeg
10. Concept mapping:

    | AnimationStudio concept | Three.js equivalent |
    |---|---|
    | Beat | Time-keyed keyframe group driven by central clock |
    | Scene | Three.js `Scene` + `Camera` + `WebGLRenderer` |
    | Sync point | Named clock markers |
    | Composition | Rendered output target (resolution, fps, duration) |

11. Create `agent-context/skills/adapters/threejs/`:
    - `threejs-scene.skill.md` — scene graph, camera setup, lighting basics
    - `threejs-timeline.skill.md` — frame-stepped clock, keyframe groups, easing
    - `threejs-capture.skill.md` — offscreen render to PNG, ffmpeg encoding, perf tips
12. Add `agent-context/intent/spec-conventions-3d.md` — addendum covering camera moves, depth cues, and spatial sync points (not present in the current 2D spec format).
13. Add `projects/_template-threejs/`.

### Phase D — Adapter #3: In-House Thin (React + Puppeteer + ffmpeg)

14. Create `packages/adapter-in-house-2d/`. Implementation:
    - A tiny React frame provider (`<Stage frame={n}>` context, ~50 LOC) replacing Remotion's `useCurrentFrame()`
    - A Vite dev server for preview (standard React app, hot reload works naturally)
    - A frame-export script:
      1. Launch Puppeteer → navigate to the player page
      2. Step frame-by-frame → screenshot each frame to PNG
      3. Pipe PNG sequence into ffmpeg → MP4
    - Audio: ffmpeg muxes a separate audio track as a post-render step
15. The existing scene/component code from Remotion projects is nearly portable — the only change is `useCurrentFrame()` → `useStageFrame()`.
16. Create `agent-context/skills/adapters/in-house-2d/`:
    - `in-house-stage.skill.md` — `<Stage>` API, frame provider, scene mounting, `useStageFrame()`
    - `in-house-capture.skill.md` — Puppeteer capture loop, ffmpeg pipe, performance tips, audio mux
17. Trade-off documented: slower than Motion Canvas for first full render; faster on hot preview iteration (no Chromium startup after first launch); zero proprietary dependency in the critical render path.

### Phase E — Routing, Docs, and ADRs

18. Add ADR `0004-pluggable-renderer-adapters.md`:
    - Why the adapter pattern
    - Why these three engines
    - MIT/license constraint reasoning
    - Legacy Remotion freeze
19. Add ADR `0005-default-adapter-choice.md`:
    - Motion Canvas chosen as default for new 2D projects
    - Reasoning: TypeScript-native, MIT, generator timelines map cleanly to the beat model, large animation community
20. Update `agent-context/intent/overview.md`:
    - Introduce the adapter concept
    - Remove "Remotion is the default render stack" line
21. Update `agent-context/intent/conventions.md`:
    - Every new project picks an adapter at creation time via `create-project` task
    - Document the `project.config.ts` `adapter` field as required
22. Update root `README.md` and `REFERENCES.md` with adapter docs links (Motion Canvas docs, Three.js docs, Playwright docs).

---

## Files to Modify

| File | Change |
|---|---|
| `agent-context/tasks/build-animation.task.md` | Read `project.config.ts` → route to adapter |
| `agent-context/tasks/preview.task.md` | Adapter-aware preview command |
| `agent-context/tasks/render.task.md` | Adapter-aware render command |
| `agent-context/intent/overview.md` | Remove Remotion as "default stack"; add adapter concept |
| `agent-context/intent/conventions.md` | Document adapter field in `project.config.ts` |
| `README.md` | Adapter section + links |
| `REFERENCES.md` | Motion Canvas, Three.js, Playwright docs |

**New files / folders:**
- `packages/adapter-contract/`
- `packages/adapter-motion-canvas/`
- `packages/adapter-threejs/`
- `packages/adapter-in-house-2d/`
- `agent-context/map/adapter-registry.md`
- `agent-context/skills/adapters/motion-canvas/` (3 skill files)
- `agent-context/skills/adapters/threejs/` (3 skill files)
- `agent-context/skills/adapters/in-house-2d/` (2 skill files)
- `agent-context/intent/spec-conventions-3d.md`
- `projects/_template-motion-canvas/`
- `projects/_template-threejs/`
- `projects/_template-in-house-2d/`
- `agent-context/intent/decisions/0004-pluggable-renderer-adapters.md`
- `agent-context/intent/decisions/0005-default-adapter-choice.md`

---

## Verification Checklist

- [ ] Motion Canvas adapter renders a 5-second test composition with one named sync point, beat timing matches spec to ±2 frames
- [ ] Three.js adapter renders a 5-second 3D camera-move scene to MP4 via ffmpeg
- [ ] In-house adapter previews in browser and exports a 5-second MP4 via Puppeteer + ffmpeg
- [ ] The same `build-animation` task works for all three adapters — only `project.config.ts` differs
- [ ] All adapter packages type-check against the `RenderAdapter` interface without errors
- [ ] Legacy Remotion projects in `projects/_legacy/` render unchanged
- [ ] `pnpm install` at root resolves all four adapter packages cleanly

---

## Decisions / Scope Boundaries

- **Default 2D adapter**: Motion Canvas (MIT, lowest swap cost from Remotion, generator timelines fit the beat/sync-point model)
- **3D adapter**: Three.js (MIT, dominant 3D web stack, large ecosystem, not a game engine)
- **In-house thin adapter**: built but optional — reserved for projects needing zero third-party rendering engine dependency in the critical path
- **Excluded**: custom React reconciler (full in-house renderer) — too much surface area; reconsider only if Motion Canvas + Three.js prove insufficient
- **Excluded**: Lottie / Rive / Manim adapters — can be added under the same contract later with no structural changes
- **Excluded**: migrating legacy projects off Remotion (frozen per Plan 1)

---

## Dependency / Licensing Summary

| Package | License | Role |
|---|---|---|
| `@motion-canvas/core` | MIT | 2D animation engine |
| `@motion-canvas/2d` | MIT | 2D drawing primitives |
| `three` | MIT | 3D scene graph and WebGL renderer |
| `puppeteer` | Apache 2.0 | Headless Chrome — frame capture for Three.js and in-house-2d |
| `ffmpeg` (binary via `ffmpeg-static`) | LGPL 2.1+ | Video encoding — all adapters |
| `vite` | MIT | Dev server for in-house-2d preview |
| React, TypeScript, ESLint, Prettier | MIT | Shared across all adapters |

---

## Open Considerations

1. **Audio handling parity**: Remotion has built-in `<Audio>` with synced preview playback. Motion Canvas supports audio natively. Three.js and in-house need a custom audio sync pattern. *Recommend: standardize on ffmpeg post-mux for all adapters; preview-time audio sync is best-effort per adapter.*
2. **Tailwind across adapters**: Works in Motion Canvas (Vite-based) and in-house (React + Vite). Three.js scenes are WebGL-rendered — Tailwind doesn't apply. *Recommend: keep Tailwind for 2D adapters; Three.js projects reference shared theme tokens from `@studio/animation-utils`.*
3. **Adapter versioning**: Pin each adapter package tightly to a single major version of its upstream engine to avoid silent breakage. *Recommend: `peerDependencies` strategy in adapter `package.json` with explicit major version pins.*
4. **First pilot**: the first new-structure project should be a small smoke-test ("hello adapter" 5–10s clip) to validate the contract before committing a real subject to a new adapter.
