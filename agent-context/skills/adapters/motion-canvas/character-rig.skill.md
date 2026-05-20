# Skill: Character Rig (Motion Canvas)

## Purpose

Wire a character with named body parts to a small set of expressive poses, using
`@studio/adapter-motion-canvas/rig`. Works for talking-head animations and
two-character dialogue scenes up to ~30 seconds.

## When to Use

- The project declares `characters` in `project.config.ts`.
- The spec assigns `speaker` (and optionally `emotion`) per beat.
- A scene needs more than a single static character image.

For a pure title card or text-driven explainer, skip this skill.

## What `loadRig` Does (and Does Not)

`loadRig` is a thin orchestrator. It does **not** parse SVG, run IK, or
lip-sync to audio. It expects:

```ts
loadRig({
  parts: { eye_left: <Node>, eye_right: <Node>, mouth_smile: <Node>, ... },
  presets: { neutral: {...}, happy: {...}, worried: {...} },
  initialPreset: "neutral",
});
```

Part names should follow `svg-layer-naming.skill.md` so `blink()`,
`lookAt()`, and `swapTo()` find what they expect.

## Building `parts`

Two patterns work today:

### Pattern A — primitive shapes (fast to prototype)

```tsx
import { Circle, Rect } from "@motion-canvas/2d";

const eye_left  = new Circle({ x: -40, y: -10, size: 18, fill: "#222" });
const eye_right = new Circle({ x:  40, y: -10, size: 18, fill: "#222" });
const mouth_neutral = new Rect({ y: 40, width: 60, height: 6,  fill: "#222", opacity: 1 });
const mouth_smile   = new Rect({ y: 40, width: 60, height: 18, fill: "#c44", opacity: 0 });

const hero = loadRig({
  parts: { eye_left, eye_right, mouth_neutral, mouth_smile },
  presets: heroPresets,
  initialPreset: "neutral",
});
```

The rig captures each node's starting `position()` as that part's baseline.
`pose({ eye_left: { x: -5 } })` later means *offset 5px left of baseline*, not
"absolute x = -5".

### Pattern B — SVG `<SVG>` node with id-keyed children

Use Motion Canvas's `<SVG>` to render an asset, then resolve children by id
into the `parts` map. The exact resolver is project-specific (MC's API for
walking parsed children evolves between minor versions); keep it as a tiny
local helper inside the project's `assets/` until a generic helper is worth
extracting.

## Presets Live Next to the Rig Asset

Pose presets are authoring intent — store them in `assets/<name>.presets.ts`
sibling to the asset:

```ts
// assets/hero.presets.ts
import type { Pose } from "@studio/adapter-motion-canvas/rig";

export const heroPresets: Record<string, Pose> = {
  neutral: { mouth_neutral: { swap: "mouth_neutral" }, brow_left: { rotation: 0 } },
  happy:   { mouth_neutral: { swap: "mouth_smile"   }, brow_left: { rotation: -4 }, brow_right: { rotation: 4 } },
  worried: { mouth_neutral: { swap: "mouth_frown"  }, brow_left: { rotation: 12 }, brow_right: { rotation: -12 } },
};
```

Preset names should match the `emotion` vocabulary you intend to use in
spec beats, so `hero.applyPreset(beat.emotion)` works without a lookup table.

## Worked Example: 4-second Two-Character Beat

```tsx
import { makeScene2D } from "@motion-canvas/2d";
import { waitFor } from "@motion-canvas/core";
import { loadRig } from "@studio/adapter-motion-canvas/rig";
import { buildHero }   from "../characters/hero";
import { buildFriend } from "../characters/friend";
import { heroPresets }   from "../../assets/hero.presets";
import { friendPresets } from "../../assets/friend.presets";

export default makeScene2D(function* (view) {
  const heroLayout   = buildHero({ x: -300 });
  const friendLayout = buildFriend({ x:  300 });
  view.add(heroLayout);
  view.add(friendLayout);

  const hero   = loadRig({ parts: heroLayout.parts,   presets: heroPresets,   initialPreset: "neutral" });
  const friend = loadRig({ parts: friendLayout.parts, presets: friendPresets, initialPreset: "neutral" });

  // Beat 1 (0.0–2.0s): hero asks, looking worried.
  yield* hero.applyPreset("worried", 0.3);
  yield* hero.lookAt([300, 0]);                      // glance at friend
  yield* waitFor(1.2);
  yield* hero.blink();

  // Beat 2 (2.0–4.0s): friend reassures, smiles.
  yield* friend.applyPreset("happy", 0.3);
  yield* friend.lookAt([-300, 0]);
  yield* waitFor(1.2);
});
```

## Translating Spec Beats Into Calls

| Spec field        | Code                                                       |
|-------------------|-----------------------------------------------------------|
| `speaker: hero`   | the next `hero.*` call drives the animation               |
| `emotion: worried`| `yield* hero.applyPreset("worried", 0.3);`                |
| (eye contact)     | `yield* hero.lookAt(otherCharacter.layer("head").position());` |
| (life signs)      | sprinkle `yield* hero.blink()` between waits              |

## Don'ts

- Don't store a single shared rig instance across scenes — load per scene.
- Don't put pixel positions in `presets`; presets are relative offsets from
  baseline.
- Don't call `applyPreset` with a name that isn't in the preset map (throws).
- Don't reach for lip-sync, IK, or a walk cycle — none of that is in scope.
