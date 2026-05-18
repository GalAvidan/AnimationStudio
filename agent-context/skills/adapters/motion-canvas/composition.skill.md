# Skill: Motion Canvas Composition

## Purpose

Use Motion Canvas to build generator-based animation projects from reviewed specs.

## Project Layout

```
projects/<name>/
  src/
    project.ts          ← MC entry point; registers all scenes
    scenes/             ← one .tsx file per scene (generator functions)
    components/         ← reusable MC node helpers
    data/               ← beat data files (e.g. beats-general.ts)
    utils/              ← project-specific helpers
  vite.config.ts        ← loads @motion-canvas/vite-plugin
  project.config.ts     ← adapter: "motion-canvas"
  package.json          ← deps: @motion-canvas/core, @motion-canvas/2d
```

## Entry Point — `src/project.ts`

`src/project.ts` is the MC entry. Import scenes and pass them to `makeProject`:

```ts
import { makeProject } from "@motion-canvas/core";
import intro from "./scenes/intro";

export default makeProject({
  scenes: [intro],
});
```

## Defining Scenes — `makeScene2D`

Scenes are generator functions wrapped with `makeScene2D`. The view parameter is the root `Layout` node:

```ts
import { makeScene2D, Circle } from "@motion-canvas/2d";
import { waitFor, all } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const circle = new Circle({ width: 200, height: 200, fill: "#e13238" });
  view.add(circle);

  yield* circle.scale(2, 1);        // tween scale to 2 over 1 second
  yield* waitFor(0.5);
  yield* circle.scale(1, 0.5);
});
```

## Registering Multiple Scenes

List scenes in order in `makeProject`. MC plays them sequentially:

```ts
export default makeProject({
  scenes: [intro, mainContent, outro],
});
```

## Vite Config

```ts
import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";

export default defineConfig({
  plugins: [motionCanvas()],
});
```

## Key Differences from Remotion

| Remotion | Motion Canvas |
|---|---|
| `<Composition>` in `Root.tsx` | `makeScene2D()` generator + `src/project.ts` |
| `registerRoot()` in `index.ts` | `export default makeProject(...)` in `project.ts` |
| `useCurrentFrame()` for timing | Generator `yield*` controls time directly |
| React JSX components | MC node classes (Circle, Rect, Txt, Layout, …) |
| Props via `--props` JSON file | Variant config via factory functions |

## Composition IDs and Variants

For variant support, export a factory function instead of a static scene:

```ts
// src/scenes/main.ts
import { makeScene2D } from "@motion-canvas/2d";
import type { ProjectVariant } from "@studio/spec-types";

export function makeMainScene(variant: ProjectVariant) {
  return makeScene2D(`main-${variant.id}`, function* (view) {
    // variant-specific animation
  });
}
```

## Preview

Run `pnpm --filter ./projects/<name> dev` from the repo root. Opens at `http://localhost:9000` with hot reload.

## Render (Export)

Run `pnpm --filter ./projects/<name> build` from the repo root. Output goes to the project's `output/` directory.
