# Skill: Motion Canvas Scene Timing

## Purpose

Write generator-based scenes in Motion Canvas and map `BeatTimeline` sync points to named MC markers.

## Generator Basics

MC scenes are generator functions. `yield*` suspends the generator and resumes after the tween or wait completes. This makes timing reads like a script.

```ts
import { makeScene2D, Txt } from "@motion-canvas/2d";
import { waitFor, all, sequence } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const label = new Txt({ text: "Hello", fontSize: 64, fill: "#fff" });
  view.add(label);

  yield* label.opacity(0, 0);          // set opacity to 0 instantly
  yield* label.opacity(1, 0.5);        // fade in over 0.5 s
  yield* waitFor(1);                   // hold for 1 second
  yield* label.opacity(0, 0.3);        // fade out
});
```

## Core Timing Functions

| Function | Use |
|---|---|
| `yield* waitFor(seconds)` | Hold for a duration without animation |
| `yield* tween(seconds, fn)` | Low-level: call `fn(t)` each frame, `t` is 0→1 |
| `yield* all(...tweens)` | Run multiple tweens in parallel, wait for longest |
| `yield* sequence(gap, ...tweens)` | Run tweens with a delay between each start |
| `yield* chain(...tweens)` | Run tweens strictly one after another (same as sequential `yield*`) |

## Mapping BeatTimeline to Scene Timing

Load beat data and drive scene timing from `start`/`end` durations:

```ts
import type { Beat } from "@studio/spec-types";
import beats from "../data/beats-general";

export default makeScene2D(function* (view) {
  for (const beat of beats.scenes[0].beats) {
    const duration = beat.end - beat.start;
    // animate for this beat's duration
    yield* showBeat(view, beat, duration);
  }
});
```

## Mapping SyncPoints to MC Markers

`BeatTimeline.syncPoints` carry semantic names and times in seconds. Use them as cue points inside a scene via `useScene`:

```ts
import { makeScene2D } from "@motion-canvas/2d";
import { useScene, waitFor } from "@motion-canvas/core";
import type { BeatTimeline } from "@studio/spec-types";

export function makeTrackedScene(timeline: BeatTimeline) {
  return makeScene2D(function* (view) {
    const syncMap: Record<string, number> = {};
    for (const sp of timeline.syncPoints) {
      syncMap[sp.id] = sp.time;
    }

    // Play to first sync point
    yield* waitFor(syncMap["intro-end"] ?? 1);
    // … continue scene
  });
}
```

For frame-accurate mapping, use `resolveSyncPoints` from `@studio/adapter-motion-canvas`:

```ts
import { motionCanvasAdapter } from "@studio/adapter-motion-canvas";
const frameMap = motionCanvasAdapter.resolveSyncPoints(timeline);
// frameMap["intro-end"] === Math.round(time * fps)
```

## Parallel Animations

```ts
// Animate two nodes simultaneously
yield* all(
  circle.position.x(300, 0.8),
  label.opacity(1, 0.5),
);
```

## Staggered Entrances

```ts
// Each item starts 0.1 s after the previous
yield* sequence(
  0.1,
  item1.opacity(1, 0.4),
  item2.opacity(1, 0.4),
  item3.opacity(1, 0.4),
);
```

## Scene Duration

A scene's duration is the sum of all `yield*` time in its generator. There is no fixed `durationInFrames` — the scene ends when the generator returns.
