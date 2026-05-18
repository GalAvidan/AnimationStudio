# Skill: Remotion Composition

## Purpose

Use Remotion to build inspectable animation projects from reviewed specs.

## Rules

- Register compositions in `src/Root.tsx`.
- Register the root from `src/index.ts`.
- Use `AbsoluteFill` for full-frame composition structure.
- Keep scene components in `src/scenes/`.
- Keep reusable visual components in `src/components/`.
- Derive timing from spec beats during build; do not put frame math in the spec.
- Keep composition IDs stable once a project has been rendered.
- Use `useCurrentFrame` and `interpolate` from `remotion` for frame-based animation.
- Use `@studio/animation-utils` helpers (`progress`, `fadeIn`, `fadeOut`, `sceneOpacity`) as the base — wrap with Remotion's `interpolate` when adapter-specific clamping or easing is needed.

## Easing with Remotion

Remotion's `interpolate` accepts an `easing` option. Wire it to the bezier curves from `@studio/animation-utils`:

```ts
import { interpolate } from "remotion";
import { easeOut, easeInOut } from "@studio/animation-utils";

const opacity = interpolate(frame, [0, 15], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: easeOut,
});
```

## Default Video Settings

- 1920×1080
- 30fps for drafts unless the spec says otherwise
- 60fps for final renders when motion clarity matters

## Preview

Run `pnpm --filter ./projects/<name> dev` from the repo root.

## Render

Run `pnpm --filter ./projects/<name> render -- --props=./props/<variant>.json` from the repo root. Always pass props via a JSON file on Windows to avoid shell-escaping issues.
