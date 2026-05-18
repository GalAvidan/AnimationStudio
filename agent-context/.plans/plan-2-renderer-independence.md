# Plan 2: Renderer Independence — Motion Canvas Adapter

**TL;DR** — Plan 1 built the routing backbone: `adapter-contract` (metadata shape), `adapter-registry.md`, and adapter-aware task files. Plan 2 fills the remaining contract gaps and ships **Motion Canvas** as the primary MIT replacement for Remotion. Three.js and the in-house thin adapter are deferred to Plan 3 once Motion Canvas is battle-tested. The spec/beat/sync system is unchanged; only the rendering tail swaps.

**Scope:** Phase A (finish contract) + Phase B (Motion Canvas) + validation pilot.
**Out of scope:** Three.js adapter, in-house adapter, ADRs → Plan 3.

---

## Why This Shape

Plan 1 established that renderers are interchangeable adapters selected via `project.config.ts`. Plan 2 makes that real for the first non-Remotion engine. Motion Canvas is chosen as the first target: TypeScript-native, MIT-licensed, generator-based timelines map cleanly to the beat model, large animation community. Remotion lives on as `status: stable` for existing projects. Three.js/in-house land after this contract is proven.

---

## What Plan 1 Already Delivered

These items were completed and require no further work:

| Done | Location |
|---|---|
| `packages/adapter-contract/` — `RenderAdapterMetadata` shape | `packages/adapter-contract/src/index.ts` |
| `packages/spec-types/` — all domain types (`BeatTimeline`, `ProjectConfig`, etc.) | `packages/spec-types/src/index.ts` |
| `agent-context/map/adapter-registry.md` — registry structure with Remotion row | `agent-context/map/adapter-registry.md` |
| Task files read `project.config.ts` and route through registry | `build-animation`, `preview`, `render` tasks |
| `projects/_template/` — Remotion project scaffold | `projects/_template/` |
| `agent-context/skills/adapters/remotion/` — Remotion skill docs | `agent-context/skills/adapters/remotion/` |

---

## The Adapter Contract

The runtime `RenderAdapter` interface lives in `packages/adapter-contract/src/index.ts` (explicitly deferred by Plan 1). It enables typed adapter implementations; agents continue using CLI commands from the registry.

```ts
interface RenderAdapter {
  name: AdapterName
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

Supporting types (`ProjectPath`, `PreviewServer`, `RenderOptions`, `RenderResult`, `SyncPointMap`) live alongside this interface in `adapter-contract/`. `BeatTimeline` is already defined in `@studio/spec-types`.

---

## Adapter Lineup (Plan 2 scope)

| Adapter | License | Use for | Status |
|---|---|---|---|
| **Remotion** | Remotion license | Existing projects only — no new projects | stable (frozen) |
| **Motion Canvas** | MIT | All new 2D projects — primary Remotion replacement | Plan 2 |
| Three.js | MIT | 3D scenes, camera moves | Plan 3 |
| In-house thin (React + Playwright + ffmpeg) | MIT/Apache | Full ownership fallback for 2D | Plan 3 |

---

## Phases

**Build order: A → B → pilot project**

---

### Phase A — Finish the Contract
*Small targeted edits. Prerequisite for Phase B.*

1. **`packages/spec-types/src/index.ts`** — Expand `AdapterName` from `"remotion"` to `"remotion" | "motion-canvas"`. Add more literals as adapters ship in later plans.

2. **`packages/adapter-contract/src/index.ts`** — Add the runtime `RenderAdapter` interface (code block above) and supporting types: `ProjectPath`, `PreviewServer`, `RenderOptions`, `RenderResult`, `SyncPointMap`.

3. **`agent-context/tasks/preview.task.md`** — Step 3 currently hardcodes `pnpm --filter ./projects/<name> dev`. Replace with: use `previewCmd` from the registry row, substituting `<name>`.

4. **`agent-context/tasks/render.task.md`** — Step 4 currently hardcodes the Remotion render command. Replace with: use `renderCmd` from the registry row, substituting `<name>` and `<variant>`.

5. **`agent-context/intent/overview.md`** — Remove "Use Remotion for v1" / "The Remotion project is generated" language. Add adapter concept paragraph: adapters are interchangeable; `project.config.ts` is the switch; Remotion remains for existing projects only.

6. **`agent-context/tasks/create-project.task.md`** — The adapter input already exists. The gap is Step 2, which always copies `projects/_template/` regardless of adapter. Fix Step 2 to branch on adapter: copy `projects/_template/` for `remotion`, `projects/_template-motion-canvas/` for `motion-canvas`.

---

### Phase B — Motion Canvas Adapter
*Depends on Phase A completing. Steps 7–11 can proceed in parallel.*

7. **`packages/adapter-motion-canvas/`** (new package) — Implements `RenderAdapter`. Wraps `@motion-canvas/core` + `@motion-canvas/2d`. Each MC project still installs `@motion-canvas/*` directly as per-project deps (same pattern as Remotion). This package exists for the typed contract implementation and future shared utilities.

   Concept mapping from Remotion:

   | Remotion | Motion Canvas |
   |---|---|
   | `<Composition>` in `Root.tsx` | `makeScene2D()` generator + `src/project.ts` |
   | `useCurrentFrame()` + `interpolate()` | `yield* tween()` / `yield* waitFor()` |
   | Named sync points resolved at build | Named event markers via `useTime()` |
   | `variant` prop on shared scenes | Factory function taking variant config |
   | `beats-*.ts` data files | Same — unchanged |

8. **`agent-context/map/adapter-registry.md`** — Add `motion-canvas` row:
   - package: `packages/adapter-motion-canvas`
   - license: MIT
   - capabilities: `2d,audio,vector`
   - skillsDir: `skills/adapters/motion-canvas/`
   - previewCmd: `pnpm --filter ./projects/<name> dev`
   - renderCmd: `pnpm --filter ./projects/<name> build`
   - status: experimental

9. **`agent-context/skills/adapters/motion-canvas/`** (new folder, 3 skill files):
   - `composition.skill.md` — MC project file layout, `makeScene2D()`, `src/project.ts` as entry, registering scenes
   - `scene.skill.md` — generator-based timing, `yield* waitFor()`, `yield* all()`, mapping `BeatTimeline.syncPoints` to named MC markers
   - `tweening.skill.md` — `tween()`, signals, MC built-in easing; scope note: `@studio/animation-utils` is frame-renderer-only — use MC built-ins instead

10. **`projects/_template-motion-canvas/`** (new template) — MC scaffold mirroring `_template/` structure:
    - `src/project.ts` (MC entry) replaces `src/Root.tsx`
    - `src/scenes/` contains `.tsx` generator scenes (not React components)
    - `package.json` deps: `@motion-canvas/core`, `@motion-canvas/2d`, `@motion-canvas/vite-plugin`; scripts: `dev`, `build`
    - `project.config.ts` sets `adapter: "motion-canvas"`

11. **`pnpm-workspace.yaml`** — Add `!projects/_template-motion-canvas` exclusion alongside the existing `!projects/_template` line.

---

### Pilot Project
*Validates the full agent loop end-to-end.*

12. Create a small pilot project under `projects/` using `adapter: "motion-canvas"` (5–10 second clip, at least one named sync point). Run: preview → confirm hot reload → render → verify output MP4. Confirm `build-animation`, `preview`, and `render` tasks all route correctly through the registry without hardcoded Remotion assumptions.

---

## Files to Create

| File | Notes |
|---|---|
| `packages/adapter-motion-canvas/src/index.ts` | Implements `RenderAdapter`; per-project deps still install MC directly |
| `packages/adapter-motion-canvas/package.json` | Depends on `@studio/adapter-contract`, `@studio/spec-types` |
| `agent-context/skills/adapters/motion-canvas/composition.skill.md` | MC project layout and entry |
| `agent-context/skills/adapters/motion-canvas/scene.skill.md` | Generator timing patterns |
| `agent-context/skills/adapters/motion-canvas/tweening.skill.md` | Signals, tween, easing |
| `projects/_template-motion-canvas/` | Full scaffold (mirrors `_template/`) |

## Files to Modify

| File | Change |
|---|---|
| `packages/spec-types/src/index.ts` | Expand `AdapterName` union |
| `packages/adapter-contract/src/index.ts` | Add `RenderAdapter` interface + supporting types |
| `agent-context/map/adapter-registry.md` | Add `motion-canvas` row |
| `agent-context/tasks/preview.task.md` | Remove hardcoded `pnpm dev`; use registry `previewCmd` |
| `agent-context/tasks/render.task.md` | Remove hardcoded render command; use registry `renderCmd` |
| `agent-context/tasks/create-project.task.md` | Add adapter selection step if missing |
| `agent-context/intent/overview.md` | Remove Remotion-default language; add adapter concept |
| `pnpm-workspace.yaml` | Add `!projects/_template-motion-canvas` |

---

## Verification Checklist

- [ ] `AdapterName` in `spec-types` includes `"motion-canvas"` and type-checks across workspace
- [ ] `RenderAdapter` interface compiles; `adapter-motion-canvas` package implements it without errors
- [ ] Motion Canvas template previews locally (`pnpm dev`) with hot reload
- [ ] Motion Canvas template renders to MP4 (`pnpm build`)
- [ ] `preview` and `render` tasks use registry commands — no Remotion-specific hardcoding remains
- [ ] `create-project` task offers adapter selection
- [ ] Pilot project completes the full loop: spec → build → preview → render
- [ ] Remotion `_template` projects still preview and render unchanged

---

## Decisions

- **Default adapter for new 2D projects**: Motion Canvas (MIT, generator timelines map to beat/sync model, TypeScript-native)
- **`animation-utils` scope**: unchanged — frame-renderer only; MC scenes use MC built-in easing
- **Per-project deps pattern**: retained for MC (same as Remotion; no shared runtime runner)
- **Three.js + in-house adapters**: deferred to Plan 3
- **Headless browser**: Playwright chosen over Puppeteer for Plan 3 capture work (MIT, actively maintained)
