import { Circle, Layout, Rect } from "@motion-canvas/2d";
import type { Node } from "@motion-canvas/2d";

/**
 * Builds a "Hero" character out of Motion Canvas primitives.
 *
 * Returns the root `Layout` (which scenes add to the view) and a `parts`
 * map keyed by the standard character vocabulary so `loadRig({ parts })`
 * can find `eye_*`, `mouth_*`, etc.
 *
 * No SVG yet — primitives are enough to exercise the rig API in the pilot.
 */
export interface BuiltCharacter {
  root: Layout;
  parts: Record<string, Node>;
}

export function buildHero(opts: { x: number; y?: number }): BuiltCharacter {
  const head = new Circle({ size: 280, fill: "#ffd8b1", stroke: "#3a2a1a", lineWidth: 6 });

  const brow_left  = new Rect({ x: -55, y: -70, width: 50, height: 8, fill: "#3a2a1a", rotation: 0 });
  const brow_right = new Rect({ x:  55, y: -70, width: 50, height: 8, fill: "#3a2a1a", rotation: 0 });

  const eye_left  = new Circle({ x: -50, y: -30, size: 28, fill: "#222" });
  const eye_right = new Circle({ x:  50, y: -30, size: 28, fill: "#222" });

  // Mouth slot: exactly one of these is visible at any time. `mouth_neutral`
  // starts visible; the others wait at opacity 0 for `swapTo` / preset swaps.
  const mouth_neutral = new Rect({ y: 60, width: 80, height: 8,  fill: "#3a2a1a", opacity: 1 });
  const mouth_smile   = new Rect({ y: 60, width: 80, height: 28, fill: "#b33",    opacity: 0, radius: 14 });
  const mouth_frown   = new Rect({ y: 70, width: 80, height: 20, fill: "#552",    opacity: 0, radius: 10 });

  const root = new Layout({
    x: opts.x,
    y: opts.y ?? 0,
    children: [head, brow_left, brow_right, eye_left, eye_right, mouth_neutral, mouth_smile, mouth_frown],
  });

  return {
    root,
    parts: { head, brow_left, brow_right, eye_left, eye_right, mouth_neutral, mouth_smile, mouth_frown },
  };
}
