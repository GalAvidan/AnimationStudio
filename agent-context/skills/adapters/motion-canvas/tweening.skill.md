# Skill: Motion Canvas Tweening & Signals

## Purpose

Animate node properties using MC's built-in tween system and reactive signals. Do not use `@studio/animation-utils` in MC scenes — that package is frame-renderer-only (Remotion). Use MC built-ins instead.

## Property Tweens

Every MC node property is a signal. Call it as a function with `(targetValue, durationSeconds)` to produce a tween:

```ts
// circle.scale is a signal
yield* circle.scale(2, 0.6);       // tween scale → 2 over 0.6 s
yield* circle.position.x(400, 1);  // tween x position → 400 over 1 s
yield* rect.fill("#e13238", 0.4);  // tween fill color
```

## Built-in Easing

Pass an easing function as the third argument:

```ts
import { easeInOutCubic, easeOutBack, linear } from "@motion-canvas/core";

yield* circle.scale(2, 0.8, easeInOutCubic);
yield* label.opacity(1, 0.5, easeOutBack);
yield* progress.value(1, 2, linear);
```

### Common Easing Functions

| Name | Feel |
|---|---|
| `linear` | Constant speed |
| `easeInCubic` | Slow start |
| `easeOutCubic` | Slow end |
| `easeInOutCubic` | Slow start and end (default for most transitions) |
| `easeOutBack` | Overshoots slightly — good for entrances |
| `easeInBack` | Wind-up before motion |
| `spring` | Physics-based spring — no explicit duration |

## `tween()` for Custom Per-Frame Logic

When the target isn't a simple property, use `tween` directly:

```ts
import { tween, easeInOutQuad } from "@motion-canvas/core";

yield* tween(1.2, (t) => {
  // t goes from 0 to 1 over 1.2 seconds (already eased if you wrap with timingFunction)
  circle.position.x(t * 500);
});
```

## createSignal — Reactive Values

Signals decouple a value from how it's displayed. Use them when multiple nodes share a derived value:

```ts
import { createSignal } from "@motion-canvas/core";
import { Rect, Txt } from "@motion-canvas/2d";

const progress = createSignal(0);

const bar = new Rect({
  width: () => progress() * 600,   // reactive: re-evaluates every frame
  height: 40,
  fill: "#4a9eff",
});

const label = new Txt({
  text: () => `${Math.round(progress() * 100)}%`,
  fontSize: 32,
});

view.add(bar);
view.add(label);

yield* progress(1, 2, easeInOutCubic);  // both bar and label animate together
```

## Compound Animations

```ts
// Run a tween while simultaneously waiting on a signal
yield* all(
  circle.scale(1.5, 0.6, easeOutBack),
  label.opacity(1, 0.4),
);
```

## Scope Note

`@studio/animation-utils` exports `fadeIn`, `fadeOut`, `progress`, `sceneOpacity`, and bezier curves designed for use with Remotion's `interpolate`. **Do not import `@studio/animation-utils` in MC scenes.** Use MC's built-in tweens and easing functions shown above.
